import React, { useState, useEffect } from "react";
import { Plus, ArrowRight, Briefcase } from "lucide-react";
import RecruiterNav from "./RecruiterNav";

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
  const [activeJob, setActiveJob] = useState("Senior Frontend Engineer");
  const [userName, setUserName] = useState("Recruiter");
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
    fetch(`http://localhost:5000/api/jobs?postedBy=${name}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        if (data.length > 0 && activeJob === "Senior Frontend Engineer") {
          setActiveJob(data[0].role);
        }
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newJobData, postedBy: userName }),
      });
      if (response.ok) {
        const newJob = await response.json();
        setJobs([newJob, ...jobs]);
        if (jobs.length === 0) setActiveJob(newJob.role);
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

  const filteredCandidates = mockCandidates.filter((c) => activeJob);
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
                  onClick={() => setActiveJob(job.role)}
                  className={`cursor-pointer border-2 border-black p-6 transition-all ${
                    activeJob === job.role
                      ? "translate-x-1 translate-y-1 bg-black text-white"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <Briefcase
                      size={28}
                      className={
                        activeJob === job.role ? "text-[#1800ff]" : "text-black"
                      }
                    />
                    <span
                      className={`border px-2 py-1 font-mono text-xs font-bold uppercase ${
                        activeJob === job.role
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
                    className={`font-mono text-sm font-bold tracking-widest uppercase ${activeJob === job.role ? "text-gray-300" : "text-gray-500"}`}
                  >
                    0 Candidates
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
                Found {filteredCandidates.length} matches for {activeJob}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex flex-col border-2 border-black bg-white p-6 transition-all hover:translate-x-1 hover:translate-y-1"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl leading-tight font-black uppercase">
                      {candidate.name}
                    </h3>
                    <p className="mt-2 font-mono text-sm font-bold text-gray-500 uppercase">
                      {candidate.exp} Exp
                    </p>
                  </div>

                  <div className="min-w-70px flex flex-col items-center justify-center border-2 border-black bg-[#1800ff] p-2 text-white">
                    <span className="mb-1 font-mono text-[10px] font-bold tracking-widest uppercase">
                      AI Score
                    </span>
                    <div className="flex items-center gap-1 text-2xl font-black">
                      {candidate.rating}
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t-2 border-black pt-6">
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
                  <button className="group border-2 border-black p-2 transition-colors hover:bg-black hover:text-white">
                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}

            {filteredCandidates.length === 0 && (
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
