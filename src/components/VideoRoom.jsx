import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Copy,
  Check,
  Clock,
  Loader2,
  Users,
  AlertCircle,
} from "lucide-react";
import { useWebRTC } from "../hooks/useWebRTC";
import { API_URL } from "../config";

const VideoRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [meetingInfo, setMeetingInfo] = useState(null);
  const [canJoin, setCanJoin] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [pageError, setPageError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const {
    localStreamRef,
    remoteStream,
    connectionState,
    isMuted,
    isCameraOff,
    error: rtcError,
    connect,
    disconnect,
    toggleMute,
    toggleCamera,
  } = useWebRTC();

  // Check if user can join this meeting
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(
          `${API_URL}/api/interviews/${roomId}/join`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await res.json();

        if (res.status === 404) {
          setPageError("Meeting not found. Please check your link.");
          setLoading(false);
          return;
        }

        if (res.status === 403 && data.scheduledAt) {
          // Student trying to join early
          setMeetingInfo(data);
          setCanJoin(false);
          setLoading(false);
          return;
        }

        if (res.status === 403) {
          setPageError(data.error || "Access denied");
          setLoading(false);
          return;
        }

        if (res.ok && data.canJoin) {
          setMeetingInfo(data);
          setCanJoin(true);
          setLoading(false);
        }
      } catch (err) {
        console.error("Access check error:", err);
        setPageError("Failed to connect to server");
        setLoading(false);
      }
    };

    checkAccess();
  }, [roomId, navigate]);

  // Countdown timer for waiting room
  useEffect(() => {
    if (canJoin || !meetingInfo?.scheduledAt) return;

    const scheduledTime = new Date(meetingInfo.scheduledAt).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = scheduledTime - now;

      if (diff <= 0) {
        setCanJoin(true);
        setTimeRemaining(null);
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [canJoin, meetingInfo]);

  // Auto-connect when canJoin becomes true
  useEffect(() => {
    if (canJoin && connectionState === "idle") {
      connect(roomId);
    }
  }, [canJoin, connectionState, connect, roomId]);

  // Attach local stream to video element
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  });

  // Attach remote stream to video element
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const handleEndCall = useCallback(() => {
    disconnect();
    const role = sessionStorage.getItem("userRole");
    navigate(role === "recruiter" ? "/recruiter" : "/student");
  }, [disconnect, navigate]);

  const handleCopyLink = useCallback(() => {
    const link = `${window.location.origin}/meeting/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [roomId]);

  // ─── Loading State ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2efe9]">
        <div className="flex flex-col items-center gap-4 border-2 border-black bg-white p-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <Loader2 size={40} className="animate-spin text-[#1800ff]" />
          <p className="font-mono text-sm font-bold tracking-widest uppercase">
            Checking access...
          </p>
        </div>
      </div>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────────────
  if (pageError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2efe9]">
        <div className="max-w-md border-2 border-black bg-white p-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <div className="mb-4 flex items-center gap-3">
            <AlertCircle size={28} className="text-red-500" />
            <h2 className="text-2xl font-black uppercase">Access Denied</h2>
          </div>
          <p className="mb-8 font-mono text-sm font-bold text-gray-600">
            {pageError}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full cursor-pointer border-2 border-black bg-black px-6 py-3 font-bold text-white uppercase transition-all hover:bg-[#1800ff]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ─── Waiting Room (Student before scheduled time) ────────────────────────
  if (!canJoin && timeRemaining) {
    const interview = meetingInfo?.interview || {};
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2efe9]">
        <div className="w-full max-w-lg border-2 border-black bg-white p-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <div className="mb-8 flex items-center gap-3 border-b-2 border-black pb-6">
            <Clock size={32} className="text-[#1800ff]" />
            <div>
              <h2 className="text-3xl font-black uppercase">Waiting Room</h2>
              <p className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
                Interview hasn't started yet
              </p>
            </div>
          </div>

          {interview.jobId && (
            <div className="mb-6 border-2 border-black bg-[#f2efe9] p-4">
              <p className="text-sm font-bold text-gray-500 uppercase">Role</p>
              <p className="text-xl font-black uppercase">
                {interview.jobId.role}
              </p>
              <p className="mt-1 font-mono text-sm font-bold text-gray-600">
                {interview.jobId.companyName}
              </p>
            </div>
          )}

          <div className="mb-8">
            <p className="mb-2 text-center font-mono text-sm font-bold text-gray-500 uppercase">
              Starting in
            </p>
            <div className="border-2 border-black bg-black p-6 text-center">
              <span className="font-mono text-5xl font-black tracking-widest text-[#1800ff]">
                {timeRemaining}
              </span>
            </div>
          </div>

          <p className="text-center font-mono text-xs font-bold text-gray-400">
            This page will automatically connect when the meeting starts
          </p>
        </div>
      </div>
    );
  }

  // ─── Video Call UI ───────────────────────────────────────────────────────
  const interview = meetingInfo?.interview || {};

  return (
    <div className="relative flex h-screen flex-col bg-black">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b-2 border-gray-800 bg-[#0a0a0a] px-6 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`h-3 w-3 border border-black ${connectionState === "connected" ? "bg-green-400" : connectionState === "waiting" ? "animate-pulse bg-yellow-400" : "bg-red-400"}`}
          />
          <span className="font-mono text-xs font-bold tracking-widest text-gray-400 uppercase">
            {connectionState === "connected"
              ? "Connected"
              : connectionState === "waiting"
                ? "Waiting for peer..."
                : connectionState === "connecting"
                  ? "Connecting..."
                  : "Call ended"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {interview.jobId && (
            <span className="border border-gray-700 bg-gray-900 px-3 py-1 font-mono text-xs font-bold text-gray-300 uppercase">
              {interview.jobId.role}
            </span>
          )}
          <button
            onClick={handleCopyLink}
            className="flex cursor-pointer items-center gap-2 border border-gray-700 bg-gray-900 px-3 py-1 font-mono text-xs font-bold text-gray-300 uppercase transition-colors hover:bg-gray-800"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* Video area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Remote video (full screen) */}
        {remoteStream ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-32 w-32 items-center justify-center border-2 border-gray-700">
              <Users size={48} className="text-gray-600" />
            </div>
            <div className="text-center">
              <p className="mb-1 font-mono text-lg font-bold tracking-widest text-gray-400 uppercase">
                {connectionState === "waiting"
                  ? "Waiting for the other participant..."
                  : connectionState === "ended"
                    ? "Call has ended"
                    : "Connecting..."}
              </p>
              {connectionState === "waiting" && (
                <Loader2
                  size={20}
                  className="mx-auto mt-3 animate-spin text-[#1800ff]"
                />
              )}
            </div>
          </div>
        )}

        {/* Local video (PiP) */}
        <div className="absolute right-4 bottom-24 z-10 overflow-hidden border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`h-36 w-48 object-cover ${isCameraOff ? "hidden" : ""}`}
          />
          {isCameraOff && (
            <div className="flex h-36 w-48 items-center justify-center bg-gray-900">
              <VideoOff size={24} className="text-gray-500" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 bg-black/70 px-2 py-0.5">
            <span className="font-mono text-[10px] font-bold text-white uppercase">
              You
            </span>
          </div>
        </div>

        {/* RTC error overlay */}
        {rtcError && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 border-2 border-red-500 bg-red-500/10 px-6 py-3 backdrop-blur-sm">
            <p className="font-mono text-sm font-bold text-red-400">
              {rtcError}
            </p>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-4 border-t-2 border-gray-800 bg-[#0a0a0a] px-6 py-4">
        <button
          onClick={toggleMute}
          className={`flex cursor-pointer items-center justify-center border-2 p-4 font-bold uppercase transition-all ${
            isMuted
              ? "border-red-500 bg-red-500 text-white"
              : "border-gray-600 bg-gray-900 text-white hover:border-white"
          }`}
        >
          {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
        </button>

        <button
          onClick={toggleCamera}
          className={`flex cursor-pointer items-center justify-center border-2 p-4 font-bold uppercase transition-all ${
            isCameraOff
              ? "border-red-500 bg-red-500 text-white"
              : "border-gray-600 bg-gray-900 text-white hover:border-white"
          }`}
        >
          {isCameraOff ? <VideoOff size={22} /> : <Video size={22} />}
        </button>

        <button
          onClick={handleEndCall}
          className="flex cursor-pointer items-center gap-2 border-2 border-red-600 bg-red-600 px-8 py-4 font-black text-white uppercase transition-all hover:bg-red-700"
        >
          <PhoneOff size={22} />
          <span className="hidden sm:inline">End Call</span>
        </button>
      </div>
    </div>
  );
};

export default VideoRoom;
