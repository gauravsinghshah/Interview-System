import React from "react";
import Box from "./Box";
import Card from "./Cards";
import Navbar from "./Navbar";
import { ArrowRight, Sparkles } from "lucide-react";

const [set, notset] = "";


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
    <div className="min-h-screen bg-[#010409]">
      <main className="mx-auto mt-10 max-w-7xl px-6 py-8">
        {/* First Heading Section */}
        <div className="mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Welcome back, <span className="text-pb">Alex</span>
            <span className="animate-pulse">_</span>
          </h1>
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
              className="text-pb hover:text-pb flex items-center gap-1 text-sm font-semibold transition-colors"
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
