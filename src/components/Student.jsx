import React, { useState, useEffect } from "react";
import Box from "./Box";
import Card from "./Cards";
import { ArrowRight, Sparkles, Video, Clock } from "lucide-react";
import StudentNav from "./StudentNav";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const Student = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Alex");
  const [invitations, setInvitations] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState(null);
  const [applyOption, setApplyOption] = useState("existing");
  const [activeTab, setActiveTab] = useState("invitations");
  const [customApplyData, setCustomApplyData] = useState({
    skills: "",
    notes: "",
    exp: "",
    resumeUrl: "",
    githubUrl: "",
  });
  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName.split(" ")[0]);
    }
    const token = sessionStorage.getItem("token");

    Promise.all([
      fetch(`${API_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
      fetch(`${API_URL}/api/applications/student/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([jobsData, appsData]) => {
        const validJobs = Array.isArray(jobsData) ? jobsData : [];
        const validApps = Array.isArray(appsData) ? appsData : [];

        setMyApplications(validApps);
        // Filter out jobs already applied to
        const appliedJobIds = new Set(
          validApps.map((a) => a.jobId && a.jobId._id),
        );
        setInvitations(validJobs.filter((job) => !appliedJobIds.has(job._id)));
      })
      .catch((err) => console.error("Error fetching jobs/apps:", err));

    fetch(`${API_URL}/api/interviews`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setInterviews(data))
      .catch((err) => console.error("Error fetching interviews:", err));
  }, []);

  const handleApplyClick = (jobId) => {
    setJobToApply(jobId);
    setApplyModalOpen(true);
    setApplyOption("existing");
    setCustomApplyData({
      skills: "",
      notes: "",
      exp: "",
      resumeUrl: "",
      githubUrl: "",
    });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const payload = { jobId: jobToApply };
      if (applyOption === "custom") {
        payload.applicationSkills = customApplyData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s);
        payload.applicationNotes = customApplyData.notes;
        payload.exp = customApplyData.exp;
        payload.resumeUrl = customApplyData.resumeUrl;
        payload.githubUrl = customApplyData.githubUrl;
      }

      const response = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("Successfully applied!");
        setApplyModalOpen(false);
        // Refresh jobs and applications locally
        const newApp = await response.json();
        const appliedJob = invitations.find((job) => job._id === jobToApply);

        if (appliedJob) {
          setMyApplications([
            ...myApplications,
            { ...newApp, jobId: appliedJob },
          ]);
          setInvitations(invitations.filter((job) => job._id !== jobToApply));
        }
      } else {
        const errData = await response.json();
        alert(errData.error || "Failed to apply");
      }
    } catch (error) {
      console.error("Apply error:", error);
      alert("Error applying");
    }
  };

  const handleRevoke = async (applicationId, jobId) => {
    if (!window.confirm("Are you sure you want to revoke this application?"))
      return;
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/applications/${applicationId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        alert("Application revoked successfully.");
        // Restoring to invitations isn't strictly necessary but helpful, we'll just fetch again or assume page reload works
        const revokedApp = myApplications.find(
          (app) => app._id === applicationId,
        );
        if (revokedApp && revokedApp.jobId) {
          setInvitations([revokedApp.jobId, ...invitations]);
        }
        setMyApplications(
          myApplications.filter((app) => app._id !== applicationId),
        );
      } else {
        const errData = await response.json();
        alert(errData.error || "Failed to revoke application");
      }
    } catch (error) {
      console.error("Revoke error:", error);
      alert("Error revoking application");
    }
  };

  const tracks = [
    {
      plan: "SDE TRACK",
      role: "Software Development",
      tags: ["DSA", "System Design", "Clean Code"],
    },
    {
      plan: "DATA TRACK",
      role: "Data Engineering",
      tags: ["SQL", "Pipelines", "Spark"],
    },
    {
      plan: "PRODUCT TRACK",
      role: "Product Analytics",
      tags: ["Case Solving", "Metrics", "Stakeholder Comms"],
    },
  ];

  return (
    <div className="w-full border-y-2 border-black bg-[#f2efe9] text-black">
      <StudentNav />

      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg border-2 border-black bg-white p-8">
            <h2 className="mb-6 text-3xl font-black uppercase">
              Apply for Role
            </h2>
            <form onSubmit={handleApplySubmit} className="space-y-4 font-bold">
              <div className="mb-4 flex gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="applyOption"
                    checked={applyOption === "existing"}
                    onChange={() => setApplyOption("existing")}
                  />
                  <span className="text-sm uppercase">
                    Send Existing Profile
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="applyOption"
                    checked={applyOption === "custom"}
                    onChange={() => setApplyOption("custom")}
                  />
                  <span className="text-sm uppercase">Add Custom Skills</span>
                </label>
              </div>

              {applyOption === "custom" && (
                <div className="space-y-4 border-2 border-black bg-gray-50 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm uppercase">
                        Experience
                      </label>
                      <input
                        type="text"
                        value={customApplyData.exp}
                        onChange={(e) =>
                          setCustomApplyData({
                            ...customApplyData,
                            exp: e.target.value,
                          })
                        }
                        className="w-full border-2 border-black px-4 py-2"
                        placeholder="e.g. 2 Yrs"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm uppercase">
                        Key Skills (comma separated)
                      </label>
                      <input
                        type="text"
                        value={customApplyData.skills}
                        onChange={(e) =>
                          setCustomApplyData({
                            ...customApplyData,
                            skills: e.target.value,
                          })
                        }
                        className="w-full border-2 border-black px-4 py-2"
                        placeholder="React, Node.js..."
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm uppercase">
                        Resume URL
                      </label>
                      <input
                        type="url"
                        value={customApplyData.resumeUrl}
                        onChange={(e) =>
                          setCustomApplyData({
                            ...customApplyData,
                            resumeUrl: e.target.value,
                          })
                        }
                        className="w-full border-2 border-black px-4 py-2"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm uppercase">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={customApplyData.githubUrl}
                        onChange={(e) =>
                          setCustomApplyData({
                            ...customApplyData,
                            githubUrl: e.target.value,
                          })
                        }
                        className="w-full border-2 border-black px-4 py-2"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm uppercase">
                      Cover Letter / Notes
                    </label>
                    <textarea
                      value={customApplyData.notes}
                      onChange={(e) =>
                        setCustomApplyData({
                          ...customApplyData,
                          notes: e.target.value,
                        })
                      }
                      className="w-full border-2 border-black px-4 py-2"
                      rows="3"
                      placeholder="Why are you a good fit?"
                    ></textarea>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end gap-4 border-t-2 border-black pt-6">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="cursor-pointer text-gray-500 uppercase hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer border-2 border-black bg-[#1800ff] px-6 py-2 font-black text-white uppercase transition-colors hover:bg-black"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-16">
          <h1 className="mb-4 text-5xl font-black uppercase md:text-7xl">
            Welcome back, <br className="hidden md:block" />
            <span className="text-[#1800ff]">{userName}</span>
            <span className="animate-pulse text-[#1800ff]">_</span>
          </h1>
          <p className="border-l-4 border-black pl-4 font-mono text-sm font-bold tracking-widest uppercase md:text-base">
            Dashboard / Overview / Action Items
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-2 font-mono text-sm font-bold text-gray-500 uppercase">
              Available Jobs
            </h3>
            <p className="text-5xl font-black text-[#1800ff]">
              {invitations.length}
            </p>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-2 font-mono text-sm font-bold text-gray-500 uppercase">
              My Applications
            </h3>
            <p className="text-5xl font-black text-[#1800ff]">
              {myApplications.length}
            </p>
          </div>
          <div className="border-2 border-black bg-[#1800ff] p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-2 font-mono text-sm font-bold text-white uppercase">
              Interviews
            </h3>
            <p className="text-5xl font-black text-white">
              {interviews.length}
            </p>
          </div>
        </div>

        <div className="mb-10">
          <label
            htmlFor="dashboard-view"
            className="mb-2 block text-sm font-bold tracking-widest uppercase"
          >
            Select View:
          </label>
          <select
            id="dashboard-view"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full border-2 border-black bg-white px-4 py-3 font-bold uppercase transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-[#1800ff] focus:outline-none md:w-auto"
          >
            <option value="invitations">Posted Jobs</option>
            <option value="applications">Current Applications</option>
            <option value="interviews">Upcoming Interviews</option>
          </select>
        </div>

        {activeTab === "invitations" && (
          <div className="mb-24">
            <div className="mb-10 flex flex-col items-baseline justify-between gap-4 border-b-2 border-black pb-4 md:flex-row">
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
                  Posted Jobs
                </h2>
                <p className="mt-2 font-mono text-sm font-bold text-gray-600 uppercase">
                  Explore and apply for new roles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {invitations.length === 0 ? (
                <p className="col-span-full font-bold tracking-widest text-gray-500 uppercase">
                  No posted jobs found.
                </p>
              ) : (
                invitations.map((item, index) => (
                  <Card key={index} {...item} onApply={handleApplyClick} />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="mb-24">
            <div className="mb-10 flex flex-col items-baseline justify-between gap-4 border-b-2 border-black pb-4 md:flex-row">
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
                  Current Applications
                </h2>
                <p className="mt-2 font-mono text-sm font-bold text-gray-600 uppercase">
                  Track your active job applications
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {myApplications.length === 0 ? (
                <p className="col-span-full font-bold tracking-widest text-gray-500 uppercase">
                  No active applications found.
                </p>
              ) : (
                myApplications.map((app, index) => (
                  <div
                    key={index}
                    className="flex flex-col border-2 border-black bg-white p-5 transition-transform hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-black uppercase">
                          {app.jobId?.role || "Role"}
                        </h3>
                        <p className="font-mono text-sm font-bold text-gray-600">
                          {app.jobId?.companyName || "Company"}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block border-2 border-black bg-[#f2efe9] px-2 py-1 font-mono text-xs font-bold uppercase">
                        Status: {app.status || "Pending"}
                      </span>
                    </div>
                    <div className="mt-auto border-t-2 border-dashed border-black pt-4">
                      <button
                        onClick={() => handleRevoke(app._id)}
                        className="w-full cursor-pointer bg-red-500 px-4 py-2 font-bold text-white uppercase transition-colors hover:bg-black"
                      >
                        Revoke Application
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "interviews" && (
          <div className="mb-24">
            <div className="mb-10 flex flex-col items-baseline justify-between gap-4 border-b-2 border-black pb-4 md:flex-row">
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
                  Upcoming Interviews
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {interviews.length === 0 ? (
                <p className="col-span-full font-bold tracking-widest text-gray-500 uppercase">
                  No upcoming interviews.
                </p>
              ) : (
                interviews.map((interview, index) => {
                  const scheduledTime = interview.scheduledAt ? new Date(interview.scheduledAt) : null;
                  const now = new Date();
                  const isReady = scheduledTime ? now >= scheduledTime : true;

                  return (
                    <div
                      key={index}
                      className="border-2 border-black bg-white p-6 transition-all hover:translate-x-1 hover:translate-y-1"
                    >
                      <div className="mb-2 text-xl font-black uppercase">
                        {interview.jobId?.role || "Role"}
                      </div>
                      <div className="mb-4 text-sm font-bold text-gray-600">
                        {interview.jobId?.companyName || "Company"}
                      </div>
                      <div className="mb-1 font-mono text-sm font-bold">
                        Date: {interview.date}
                      </div>
                      <div className="mb-4 font-mono text-sm font-bold">
                        Time: {interview.time}
                      </div>
                      {isReady ? (
                        <button
                          onClick={() => navigate(`/meeting/${interview.roomId}`)}
                          className="block w-full cursor-pointer border-2 border-black bg-[#1800ff] py-2 text-center font-bold text-white uppercase transition-colors hover:bg-black"
                        >
                          <Video size={16} className="mr-1 inline" />
                          Join Meeting
                        </button>
                      ) : (
                        <div className="border-2 border-dashed border-gray-400 bg-[#f2efe9] py-2 text-center font-mono text-sm font-bold text-gray-500 uppercase">
                          <Clock size={14} className="mr-1 inline" />
                          Starts at {interview.time} on {interview.date}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        <div>
          <div className="mb-10 flex items-center gap-4 border-b-2 border-black pb-4">
            <Sparkles size={32} className="text-[#1800ff]" />
            <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
              Recommended Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, index) => (
              <Box key={index} {...track} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student;
