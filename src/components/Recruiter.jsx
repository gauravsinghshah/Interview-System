import React, { useState, useEffect } from "react";
import { Plus, ArrowRight, Briefcase, Copy, Check, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecruiterNav from "./RecruiterNav";
import { API_URL } from "../config";

const mockCandidates = [
  {
    id: 102,
    name: "Nijamudin Sourabh",
    role: "Senior Frontend Engineer",
    rating: 85,
    status: "Interviewed",
    exp: "5 Yrs",
  },
  {
    id: 103,
    name: "Mohmad Naman",
    role: "Senior Frontend Engineer",
    rating: 92,
    status: "Screening",
    exp: "6 Yrs",
  },
  {
    id: 104,
    name: "Abdul Shahil",
    role: "Backend Systems Architect",
    rating: 95,
    status: "Interviewed",
    exp: "10 Yrs",
  },
  {
    id: 105,
    name: "Molana Gaurav Singh",
    role: "Backend Systems Architect",
    rating: 78,
    status: "Pending",
    exp: "4 Yrs",
  },
];

const Recruiter = () => {
  const navigate = useNavigate();
  const [activeJobId, setActiveJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [userName, setUserName] = useState("Recruiter");
  const [viewStyle, setViewStyle] = useState("grid");
  const [candidateDetailsModalOpen, setCandidateDetailsModalOpen] =
    useState(false);
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: "",
  });
  const [scheduledLink, setScheduledLink] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [myInterviews, setMyInterviews] = useState([]);
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [newJobData, setNewJobData] = useState({
    role: "",
    companyName: "",
    detail: "",
    salaryMin: "",
    salaryMax: "",
  });
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    let name = "Recruiter";
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      name = storedName.split(" ")[0];
      setUserName(name);
    }
    const token = sessionStorage.getItem("token");
    fetch(`${API_URL}/api/jobs?me=true`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        if (data.length > 0) {
          setActiveJobId(data[0]._id);
        }
      })
      .catch((err) => console.error("Error fetching jobs:", err));

    fetch(`${API_URL}/api/interviews`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMyInterviews(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching interviews:", err));
  }, []);

  useEffect(() => {
    if (!activeJobId) return;
    const token = sessionStorage.getItem("token");
    fetch(`${API_URL}/api/applications/${activeJobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setApplicants(data))
      .catch((err) => console.error("Error fetching applicants:", err));
  }, [activeJobId]);
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newJobData, postedBy: userName }),
      });
      if (response.ok) {
        const newJob = await response.json();
        setJobs([newJob, ...jobs]);
        if (jobs.length === 0) setActiveJobId(newJob._id);
        alert("Job Posted Successfully!");
        setIsPostingModalOpen(false);
        setNewJobData({
          role: "",
          companyName: "",
          detail: "",
          salaryMin: "",
          salaryMax: "",
        });
      } else {
        alert("Failed to post job");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  const handleScheduleClick = (app) => {
    setSelectedApplication(app);
    setScheduleModalOpen(true);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/interviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: activeJobId,
          studentId: selectedApplication.studentId._id,
          date: interviewDetails.date,
          time: interviewDetails.time,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const meetingUrl = `${window.location.origin}/meeting/${data.roomId}`;
        setScheduledLink(meetingUrl);
        setApplicants(
          applicants.map((app) =>
            app._id === selectedApplication._id
              ? { ...app, status: "Screening" }
              : app,
          ),
        );
        setMyInterviews([data, ...myInterviews]);
      } else {
        alert("Failed to schedule interview");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const activeJobData = jobs.find((j) => j._id === activeJobId);
  const activeJobRole = activeJobData ? activeJobData.role : "";

  return (
    <div className="relative min-h-screen w-full border-y-2 border-black bg-[#f2efe9] font-sans text-black">
      <RecruiterNav />
      {isPostingModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg border-2 border-black bg-white p-8">
            <h2 className="mb-6 text-3xl font-black uppercase">
              Post a New Role
            </h2>
            <form onSubmit={handleJobSubmit} className="space-y-4 font-bold">
              <div>
                <label className="mb-1 block text-sm uppercase">
                  Job Role / Title
                </label>
                <input
                  required
                  type="text"
                  value={newJobData.role}
                  onChange={(e) =>
                    setNewJobData({ ...newJobData, role: e.target.value })
                  }
                  className="w-full border-2 border-black px-4 py-3 placeholder-gray-400 transition-all hover:translate-x-1 hover:translate-y-1"
                  placeholder="E.g., Senior Developer"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm uppercase">
                  Company Name
                </label>
                <input
                  required
                  type="text"
                  value={newJobData.companyName}
                  onChange={(e) =>
                    setNewJobData({
                      ...newJobData,
                      companyName: e.target.value,
                    })
                  }
                  className="w-full border-2 border-black px-4 py-3 placeholder-gray-400 transition-all hover:translate-x-1 hover:translate-y-1"
                  placeholder="Company Inc."
                />
              </div>
              <div>
                <label className="mb-1 block text-sm uppercase">
                  Location Details
                </label>
                <input
                  required
                  type="text"
                  value={newJobData.detail}
                  onChange={(e) =>
                    setNewJobData({ ...newJobData, detail: e.target.value })
                  }
                  className="w-full border-2 border-black px-4 py-3 placeholder-gray-400 transition-all hover:translate-x-1 hover:translate-y-1"
                  placeholder="Remote / New York"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm uppercase">
                    Min Salary (k)
                  </label>
                  <input
                    required
                    type="number"
                    value={newJobData.salaryMin}
                    onChange={(e) =>
                      setNewJobData({
                        ...newJobData,
                        salaryMin: e.target.value,
                      })
                    }
                    className="w-full border-2 border-black px-4 py-3 placeholder-gray-400 transition-all hover:translate-x-1 hover:translate-y-1"
                    placeholder="80"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm uppercase">
                    Max Salary (k)
                  </label>
                  <input
                    required
                    type="number"
                    value={newJobData.salaryMax}
                    onChange={(e) =>
                      setNewJobData({
                        ...newJobData,
                        salaryMax: e.target.value,
                      })
                    }
                    className="w-full border-2 border-black px-4 py-3 placeholder-gray-400 transition-all hover:translate-x-1 hover:translate-y-1"
                    placeholder="150"
                  />
                </div>
              </div>
              <div className="mt-8 flex items-center justify-end gap-4 border-t-2 border-black pt-6">
                <button
                  type="button"
                  onClick={() => setIsPostingModalOpen(false)}
                  className="font-bold text-gray-500 uppercase hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer border-2 border-black bg-[#1800ff] px-8 py-3 font-black text-white uppercase transition-all hover:translate-x-1 hover:translate-y-1"
                >
                  Submit Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md border-2 border-black bg-white p-8">
            {scheduledLink ? (
              <div>
                <h2 className="mb-6 text-2xl font-black uppercase">Interview Scheduled!</h2>
                <p className="mb-2 text-sm font-bold text-gray-500 uppercase">Meeting Link (auto-generated)</p>
                <div className="mb-4 flex items-center gap-2 border-2 border-black bg-[#f2efe9] p-3">
                  <p className="flex-1 truncate font-mono text-sm font-bold">{scheduledLink}</p>
                  <button
                    onClick={() => handleCopyLink(scheduledLink)}
                    className="cursor-pointer border-2 border-black bg-[#1800ff] px-3 py-1 text-white transition-colors hover:bg-black"
                  >
                    {linkCopied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="mb-6 font-mono text-xs text-gray-500">Share this link with the candidate. They can only join at the scheduled time.</p>
                <button
                  onClick={() => { setScheduleModalOpen(false); setScheduledLink(null); setInterviewDetails({ date: "", time: "" }); }}
                  className="w-full cursor-pointer border-2 border-black bg-black px-6 py-3 font-bold text-white uppercase transition-colors hover:bg-[#1800ff]"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2 className="mb-6 text-2xl font-black uppercase">Schedule Interview</h2>
                <form onSubmit={handleScheduleSubmit} className="space-y-4 font-bold">
                  <div>
                    <label className="mb-1 block text-sm uppercase">Date</label>
                    <input required type="date" value={interviewDetails.date}
                      onChange={(e) => setInterviewDetails({ ...interviewDetails, date: e.target.value })}
                      className="w-full border-2 border-black px-4 py-3 transition-all hover:translate-x-1 hover:translate-y-1" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm uppercase">Time</label>
                    <input required type="time" value={interviewDetails.time}
                      onChange={(e) => setInterviewDetails({ ...interviewDetails, time: e.target.value })}
                      className="w-full border-2 border-black px-4 py-3 transition-all hover:translate-x-1 hover:translate-y-1" />
                  </div>
                  <div className="border-2 border-dashed border-gray-400 bg-[#f2efe9] p-3">
                    <p className="font-mono text-xs font-bold text-gray-500"><Video size={14} className="mr-1 inline" />A meeting link will be auto-generated. No Zoom needed.</p>
                  </div>
                  <div className="mt-8 flex justify-end gap-4 border-t-2 border-black pt-6">
                    <button type="button" onClick={() => setScheduleModalOpen(false)} className="cursor-pointer text-gray-500 uppercase hover:text-black">Cancel</button>
                    <button type="submit" className="cursor-pointer border-2 border-black bg-[#1800ff] px-6 py-2 font-black text-white uppercase">Schedule</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {candidateDetailsModalOpen && candidateDetails && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl border-2 border-black bg-white p-8">
            <div className="mb-6 flex items-start justify-between border-b-2 border-black pb-4">
              <div>
                <h2 className="text-3xl font-black uppercase">
                  {candidateDetails.studentId?.name || "Unknown"}
                </h2>
                <p className="font-mono font-bold text-gray-600">
                  {candidateDetails.studentId?.email}
                </p>
              </div>
              <button
                onClick={() => setCandidateDetailsModalOpen(false)}
                className="cursor-pointer border-2 border-black px-3 py-1 font-bold uppercase transition-colors hover:bg-black hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-black p-4">
                  <h3 className="mb-2 text-sm font-black text-gray-500 uppercase">
                    Experience
                  </h3>
                  <p className="font-bold">
                    {candidateDetails.studentId?.experience || "N/A"}
                  </p>
                </div>
                <div className="border-2 border-black p-4">
                  <h3 className="mb-2 text-sm font-black text-gray-500 uppercase">
                    Global Skills
                  </h3>
                  <p className="font-bold">
                    {candidateDetails.studentId?.skills?.join(", ") ||
                      "None listed"}
                  </p>
                </div>
              </div>

              <div className="border-2 border-black bg-gray-50 p-4">
                <h3 className="mb-2 text-sm font-black text-[#1800ff] uppercase">
                  Application Specific Details
                </h3>
                <div className="mb-4">
                  <h4 className="mb-1 text-xs font-bold text-gray-500 uppercase">
                    Custom Skills
                  </h4>
                  <p className="font-bold">
                    {candidateDetails.applicationSkills?.length > 0
                      ? candidateDetails.applicationSkills.join(", ")
                      : "Used global profile skills"}
                  </p>
                </div>
                <div>
                  <h4 className="mb-1 text-xs font-bold text-gray-500 uppercase">
                    Cover Letter / Notes
                  </h4>
                  <p className="font-medium whitespace-pre-wrap">
                    {candidateDetails.applicationNotes ||
                      "No specific notes provided."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                {candidateDetails.studentId?.resumeUrl && (
                  <a
                    href={candidateDetails.studentId.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 border-2 border-black py-2 text-center font-bold uppercase transition-colors hover:bg-gray-100"
                  >
                    View Resume
                  </a>
                )}
                {candidateDetails.studentId?.githubUrl && (
                  <a
                    href={candidateDetails.studentId.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 border-2 border-black py-2 text-center font-bold uppercase transition-colors hover:bg-gray-100"
                  >
                    View GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4 border-t-2 border-black pt-6">
              <button
                onClick={() => {
                  setCandidateDetailsModalOpen(false);
                  handleScheduleClick(candidateDetails);
                }}
                className="cursor-pointer border-2 border-black bg-[#1800ff] px-6 py-2 font-black text-white uppercase transition-colors hover:bg-black"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mb-4 text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
              Welcome back, <br className="hidden md:block" />
              <span className="text-[#1800ff]">{userName}</span>
              <span className="animate-pulse text-[#1800ff]">_</span>
            </h1>
            <p className="border-l-4 border-black pl-4 font-mono text-sm font-bold tracking-widest uppercase md:text-base">
              Manage Roles / Filter Candidates / Hire
            </p>
          </div>
          <button
            onClick={() => setIsPostingModalOpen(true)}
            className="flex cursor-pointer items-center justify-center gap-2 border-2 border-black bg-[#1800ff] px-6 py-4 font-bold tracking-widest text-white uppercase transition-all hover:translate-x-1 hover:translate-y-1"
          >
            <Plus size={20} />
            Post New Role
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-2 font-mono text-sm font-bold text-gray-500 uppercase">
              Active Roles
            </h3>
            <p className="text-5xl font-black text-[#1800ff]">{jobs.length}</p>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-2 font-mono text-sm font-bold text-gray-500 uppercase">
              Pipeline Candidates
            </h3>
            <p className="text-5xl font-black text-[#1800ff]">
              {applicants.length}
            </p>
          </div>
          <div className="flex flex-col justify-center border-2 border-black bg-[#1800ff] p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-2 font-mono text-sm font-bold text-white uppercase">
              Profile Views
            </h3>
            <p className="text-5xl font-black text-white">{jobs.length * 14}</p>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="mb-20">
          <h2 className="mb-8 border-b-2 border-black pb-4 text-3xl font-black tracking-tight uppercase md:text-4xl">
            Active Roles
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.length === 0 ? (
              <p className="col-span-full font-bold tracking-widest text-gray-500 uppercase">
                No Active roles posted yet.
              </p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id || job.id}
                  onClick={() => setActiveJobId(job._id)}
                  className={`cursor-pointer border-2 border-black p-6 transition-all ${
                    activeJobId === job._id
                      ? "translate-x-1 translate-y-1 bg-black text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <Briefcase
                      size={28}
                      className={
                        activeJobId === job._id
                          ? "text-[#1800ff]"
                          : "text-black"
                      }
                    />
                    <span
                      className={`border px-2 py-1 font-mono text-xs font-bold uppercase ${
                        activeJobId === job._id
                          ? "border-white/20 bg-white/10"
                          : "border-black bg-[#1800ff] text-white"
                      }`}
                    >
                      {job.status || "Active"}
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl leading-tight font-black uppercase">
                    {job.role}
                  </h3>
                  <div
                    className={`font-mono text-sm font-bold tracking-widest uppercase ${activeJobId === job._id ? "text-gray-300" : "text-gray-500"}`}
                  >
                    {job._id === activeJobId ? applicants.length : "?"}{" "}
                    Candidates
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Interviews Section */}
        <div className="mt-20">
          <h2 className="mb-8 border-b-2 border-black pb-4 text-3xl font-black tracking-tight uppercase md:text-4xl">Scheduled Interviews</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myInterviews.length === 0 ? (
              <p className="col-span-full font-bold tracking-widest text-gray-500 uppercase">No interviews scheduled yet.</p>
            ) : (
              myInterviews.map((interview) => (
                <div key={interview._id} className="border-2 border-black bg-white p-6 transition-all hover:translate-x-1 hover:translate-y-1">
                  <div className="mb-2 text-xl font-black uppercase">{interview.jobId?.role || "Role"}</div>
                  <div className="mb-1 font-mono text-sm font-bold text-gray-500">Candidate: {interview.studentId?.name || "Student"}</div>
                  <div className="mb-1 font-mono text-sm font-bold">Date: {interview.date}</div>
                  <div className="mb-4 font-mono text-sm font-bold">Time: {interview.time}</div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/meeting/${interview.roomId}`)}
                      className="flex-1 cursor-pointer border-2 border-black bg-[#1800ff] py-2 text-center font-bold text-white uppercase transition-colors hover:bg-black">
                      <Video size={16} className="mr-1 inline" />Join Call
                    </button>
                    <button onClick={() => handleCopyLink(`${window.location.origin}/meeting/${interview.roomId}`)}
                      className="cursor-pointer border-2 border-black px-3 py-2 font-bold uppercase transition-colors hover:bg-gray-100">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="mb-8 flex flex-col justify-between gap-6 border-b-2 border-black pb-4 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
                Candidate Pipeline
              </h2>
              <p className="mt-2 font-mono text-sm font-bold text-gray-600 uppercase">
                Found {applicants.length} matches for {activeJobRole}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewStyle("grid")}
                className={`cursor-pointer border-2 border-black px-4 py-2 font-bold uppercase transition-colors ${viewStyle === "grid" ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewStyle("list")}
                className={`cursor-pointer border-2 border-black px-4 py-2 font-bold uppercase transition-colors ${viewStyle === "list" ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`}
              >
                List
              </button>
            </div>
          </div>

          <div
            className={
              viewStyle === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-4"
            }
          >
            {applicants.map((candidate) => (
              <div
                key={candidate._id}
                className={`flex flex-col border-2 border-black bg-white p-6 transition-all hover:translate-x-1 hover:translate-y-1 ${viewStyle === "list" ? "md:flex-row md:items-center md:justify-between" : ""}`}
              >
                <div
                  className={`mb-6 flex items-start justify-between ${viewStyle === "list" ? "mb-0 flex-1" : ""}`}
                >
                  <div>
                    <h3
                      onClick={() => {
                        setCandidateDetails(candidate);
                        setCandidateDetailsModalOpen(true);
                      }}
                      className="cursor-pointer text-2xl leading-tight font-black uppercase hover:text-[#1800ff] hover:underline"
                    >
                      {candidate.studentId
                        ? candidate.studentId.name
                        : "Unknown"}
                    </h3>
                    <p className="mt-2 font-mono text-sm font-bold text-gray-500 uppercase">
                      {candidate.exp} Exp
                    </p>
                  </div>

                  <div
                    className={`min-w-70px flex flex-col items-center justify-center border-2 border-black bg-[#1800ff] p-2 text-white ${viewStyle === "list" ? "ml-6" : ""}`}
                  >
                    <span className="mb-1 font-mono text-[10px] font-bold tracking-widest uppercase">
                      AI Score
                    </span>
                    <div className="flex items-center gap-1 text-2xl font-black">
                      {candidate.rating}
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-auto flex items-center justify-between border-t-2 border-black pt-6 ${viewStyle === "list" ? "mt-0 ml-6 flex-1 justify-end gap-6 border-t-0 pt-0" : ""}`}
                >
                  <span
                    className={`border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase ${
                      candidate.status === "Offer Ready"
                        ? "bg-green-400"
                        : candidate.status === "Screening"
                          ? "bg-yellow-300"
                          : "bg-white"
                    }`}
                  >
                    {candidate.status}
                  </span>
                  <button
                    onClick={() => handleScheduleClick(candidate)}
                    className="group cursor-pointer border-2 border-black px-4 py-2 text-xs font-black uppercase transition-colors hover:bg-black hover:text-white"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            ))}

            {applicants.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-black bg-white py-16 text-center">
                <p className="font-mono text-xl font-bold text-gray-500 uppercase">
                  No candidates match your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recruiter;
