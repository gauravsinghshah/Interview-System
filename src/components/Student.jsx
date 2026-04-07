import React from "react";
import Box from "./Box";
import Card from "./Cards";
import { ArrowRight, Sparkles } from "lucide-react";

const Student = () => {
  const invitations = [
    {
      role: "Software Engineer II",
      status: "New",
      companyName: "Amazon",
      detail: "Remote",
      salaryMin: 145,
      salaryMax: 200,
    },
    {
      role: "Frontend Engineer",
      status: "Priority",
      companyName: "Razorpay",
      detail: "Bangalore",
      salaryMin: 120,
      salaryMax: 165,
    },
    {
      role: "Platform Developer",
      status: "New",
      companyName: "Atlassian",
      detail: "Hybrid",
      salaryMin: 132,
      salaryMax: 185,
    },
    {
      role: "Backend Engineer",
      status: "Fast Track",
      companyName: "Stripe",
      detail: "Remote",
      salaryMin: 150,
      salaryMax: 215,
    },
  ];

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
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-16">
          <h1 className="mb-4 text-5xl font-black uppercase md:text-7xl">
            Welcome back, <br className="hidden md:block" />
            <span className="text-[#1800ff]">Alex</span>
            <span className="animate-pulse text-[#1800ff]">_</span>
          </h1>
          <p className="border-l-4 border-black pl-4 font-mono text-sm font-bold tracking-widest uppercase md:text-base">
            Dashboard / Overview / Action Items
          </p>
        </div>

        <div className="mb-24">
          <div className="mb-10 flex flex-col items-baseline justify-between gap-4 border-b-2 border-black pb-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
                Interview Invitations
              </h2>
              <p className="mt-2 font-mono text-sm font-bold text-gray-600 uppercase">
                Manage your active interview requests
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 bg-black px-4 py-2 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#1800ff]"
            >
              View all
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {invitations.map((item, index) => (
              <div
                key={index}
                className="flex flex-col border-2 border-black bg-white p-6 transition-all hover:translate-x-1 hover:translate-y-1"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="text-2xl font-black text-black uppercase">
                    {item.companyName}
                  </div>
                  <span
                    className={`px-2 py-1 font-mono text-xs font-bold uppercase ${item.status === "New" ? "bg-[#1800ff] text-white" : item.status === "Priority" ? "bg-red-500 text-white" : "bg-green-400 text-black"} border border-black`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="mb-2 text-xl leading-tight font-extrabold uppercase">
                  {item.role}
                </h3>
                <div className="mb-6 font-mono text-sm font-semibold text-gray-600 uppercase">
                  {item.detail}
                </div>
                <div className="mt-auto flex items-center justify-between border-t-2 border-black pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase">
                      Comp Range
                    </span>
                    <span className="text-lg font-black">
                      ${item.salaryMin}k - ${item.salaryMax}k
                    </span>
                  </div>
                  <button className="group border border-black bg-black p-2 text-white transition-colors hover:bg-[#1800ff]">
                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-10 flex items-center gap-4 border-b-2 border-black pb-4">
            <Sparkles size={32} className="text-[#1800ff]" />
            <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
              Recommended Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="flex flex-col border-2 border-black bg-[#1800ff] p-6 text-white transition-all hover:translate-x-1 hover:translate-y-1"
              >
                <div className="mb-6 inline-flex max-w-fit items-center gap-2 border-2 border-white bg-transparent px-3 py-1 text-xs font-bold tracking-widest uppercase">
                  <Sparkles size={14} className="text-white" />
                  {track.plan}
                </div>

                <h3 className="mb-6 text-2xl leading-tight font-black uppercase">
                  {track.role}
                </h3>

                <div className="mb-8 flex flex-wrap gap-2">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/40 bg-white/10 px-2 py-1 font-mono text-xs font-bold tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="mt-auto flex w-full items-center justify-center gap-2 border-2 border-transparent bg-white py-3 font-bold tracking-widest text-black uppercase transition-colors hover:bg-black hover:text-white">
                  Start Practice
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student;
