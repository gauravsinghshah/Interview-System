import React, { useState } from "react";
import { Plus, ArrowRight, Briefcase } from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    candidates: 45,
    status: "Active",
  },
  {
    id: 2,
    title: "Backend Systems Architect",
    candidates: 12,
    status: "Active",
  },
  { id: 3, title: "Product Designer", candidates: 89, status: "Closed" },
];

const mockCandidates = [
  {
    id: 101,
    name: "Sarah Connor",
    role: "Senior Frontend Engineer",
    rating: 98,
    status: "Offer Ready",
    exp: "8 Yrs",
  },
  {
    id: 102,
    name: "John Smith",
    role: "Senior Frontend Engineer",
    rating: 85,
    status: "Interviewed",
    exp: "5 Yrs",
  },
  {
    id: 103,
    name: "Emily Chen",
    role: "Senior Frontend Engineer",
    rating: 92,
    status: "Screening",
    exp: "6 Yrs",
  },
  {
    id: 104,
    name: "Michael Chang",
    role: "Backend Systems Architect",
    rating: 95,
    status: "Interviewed",
    exp: "10 Yrs",
  },
  {
    id: 105,
    name: "Jessica Davis",
    role: "Backend Systems Architect",
    rating: 78,
    status: "Pending",
    exp: "4 Yrs",
  },
];

const Recruiter = () => {
  const [activeJob, setActiveJob] = useState("Senior Frontend Engineer");

  const filteredCandidates = mockCandidates.filter((c) => c.role === activeJob);

  return (
    <div className="min-h-screen w-full border-y-2 border-black bg-[#f2efe9] font-sans text-black">
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mb-4 text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
              Recruiter <br className="hidden md:block" />
              <span className="text-[#1800ff]">Portal</span>
              <span className="animate-pulse text-[#1800ff]">_</span>
            </h1>
            <p className="border-l-4 border-black pl-4 font-mono text-sm font-bold tracking-widest uppercase md:text-base">
              Manage Roles / Filter Candidates / Hire
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 border-2 border-black bg-[#1800ff] px-6 py-4 font-bold tracking-widest text-white uppercase hover:translate-x-1 hover:translate-y-1">
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
            {mockJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setActiveJob(job.title)}
                className={`cursor-pointer border-2 border-black p-6 transition-all ${
                  activeJob === job.title
                    ? "translate-x-1 translate-y-1 bg-black text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <Briefcase
                    size={28}
                    className={
                      activeJob === job.title ? "text-[#1800ff]" : "text-black"
                    }
                  />
                  <span
                    className={`border px-2 py-1 font-mono text-xs font-bold uppercase ${
                      activeJob === job.title
                        ? "border-white/20 bg-white/10"
                        : "border-black bg-[#1800ff] text-white"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl leading-tight font-black uppercase">
                  {job.title}
                </h3>
                <div
                  className={`font-mono text-sm font-bold tracking-widest uppercase ${activeJob === job.title ? "text-gray-300" : "text-gray-500"}`}
                >
                  {job.candidates} Candidates
                </div>
              </div>
            ))}
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

          {/* Candidate Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex flex-col border-2 border-black bg-white p-6  transition-all hover:translate-x-1 hover:translate-y-1"
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

                  <div className="flex min-w-[70px] flex-col items-center justify-center border-2 border-black bg-[#1800ff] p-2 text-white">
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
