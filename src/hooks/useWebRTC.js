import { useState, useRef, useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../config";

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

const SOCKET_URL = API_URL;

export function useWebRTC() {
  const [connectionState, setConnectionState] = useState("idle"); // idle | connecting | waiting | connected | ended
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const [error, setError] = useState(null);

  const socketRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const pendingCandidatesRef = useRef([]);
  const isInitiatorRef = useRef(false);

  const cleanup = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setRemoteStream(null);
    pendingCandidatesRef.current = [];
  }, []);

  const createPeerConnection = useCallback(
    (roomId) => {
      const pc = new RTCPeerConnection(ICE_SERVERS);

      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit("ice-candidate", {
            roomId,
            candidate: event.candidate,
          });
        }
      };

      pc.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        setConnectionState("connected");
      };

      pc.oniceconnectionstatechange = () => {
        if (pc.iceConnectionState === "disconnected" || pc.iceConnectionState === "failed") {
          setConnectionState("ended");
        }
      };

      // Add local tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current);
        });
      }

      pcRef.current = pc;
      return pc;
    },
    [],
  );

  const connect = useCallback(
    async (roomId) => {
      try {
        setConnectionState("connecting");
        setError(null);

        // Get local media
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;

        // Connect to signaling server
        const socket = io(SOCKET_URL);
        socketRef.current = socket;

        socket.on("connect", () => {
          socket.emit("join-room", roomId);
          setConnectionState("waiting");
        });

        // When another peer joins, we are the initiator (create offer)
        socket.on("peer-joined", async () => {
          isInitiatorRef.current = true;
          const pc = createPeerConnection(roomId);
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit("offer", { roomId, offer });
        });

        // Receive an offer (we are the responder)
        socket.on("offer", async ({ offer }) => {
          isInitiatorRef.current = false;
          const pc = createPeerConnection(roomId);
          await pc.setRemoteDescription(new RTCSessionDescription(offer));

          // Process any pending ICE candidates
          for (const candidate of pendingCandidatesRef.current) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          }
          pendingCandidatesRef.current = [];

          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("answer", { roomId, answer });
        });

        // Receive an answer
        socket.on("answer", async ({ answer }) => {
          if (pcRef.current) {
            await pcRef.current.setRemoteDescription(
              new RTCSessionDescription(answer),
            );

            // Process any pending ICE candidates
            for (const candidate of pendingCandidatesRef.current) {
              await pcRef.current.addIceCandidate(
                new RTCIceCandidate(candidate),
              );
            }
            pendingCandidatesRef.current = [];
          }
        });

        // Receive ICE candidates
        socket.on("ice-candidate", async ({ candidate }) => {
          if (pcRef.current && pcRef.current.remoteDescription) {
            await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          } else {
            // Queue candidates until remote description is set
            pendingCandidatesRef.current.push(candidate);
          }
        });

        // Peer left
        socket.on("peer-left", () => {
          setConnectionState("ended");
          setRemoteStream(null);
          if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
          }
        });

        socket.on("connect_error", () => {
          setError("Failed to connect to signaling server");
          setConnectionState("ended");
        });
      } catch (err) {
        console.error("WebRTC connect error:", err);
        setError(
          err.name === "NotAllowedError"
            ? "Camera/microphone permission denied"
            : "Failed to start video call",
        );
        setConnectionState("ended");
      }
    },
    [createPeerConnection],
  );

  const disconnect = useCallback(() => {
    cleanup();
    setConnectionState("ended");
  }, [cleanup]);

  const toggleMute = useCallback(() => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  }, []);

  const toggleCamera = useCallback(() => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOff(!videoTrack.enabled);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return {
    localStream: localStreamRef.current,
    localStreamRef,
    remoteStream,
    connectionState,
    isMuted,
    isCameraOff,
    error,
    connect,
    disconnect,
    toggleMute,
    toggleCamera,
  };
}
