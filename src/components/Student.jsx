import React from "react";
import Box from "./Box";
import Card from "./Cards";
import Navbar from "./Navbar";
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
    <div className="min-h-screen bg-zinc-950 -12">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* First Heading Section */}
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Welcome back, <span className="text-indigo-500">Alex</span>
            <span className="animate-pulse">_</span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-zinc-400">
                Technical Readiness
              </span>
              <span className="text-2xl font-bold text-white">84%</span>
            </div>
            <div className="hidden h-10 w-px bg-zinc-800 sm:block"></div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-zinc-400">
                Profile Status
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                Active & Visible
              </span>
            </div>

            <div className="ml-auto">
              <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-500">
                2 Companies waiting for response
              </span>
            </div>
          </div>
        </div>

        {/* Interviews Section */}
        <div className="mb-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Interview Invitations
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Manage your active interview requests
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              View all <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {invitations.map((item, index) => (
              <Card
                key={index}
                role={item.role}
                status={item.status}
                companyName={item.companyName}
                detail={item.detail}
                salaryMin={item.salaryMin}
                salaryMax={item.salaryMax}
              />
            ))}
          </div>
        </div>

        {/* Learning Tracks Section */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-amber-400" />
            <h2 className="text-xl font-bold text-white">
              Recommended Learning Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, index) => (
              <Box
                key={index}
                plan={track.plan}
                role={track.role}
                tags={track.tags}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student;
