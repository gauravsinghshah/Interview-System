import React, { useState, useEffect } from "react";
import Box from "./Box";
import Card from "./Cards";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "./Navbar";

const Student = () => {
  const [userName, setUserName] = useState("Alex");

  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName.split(" ")[0]);
    }
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setInvitations(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

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
            <span className="text-[#1800ff]">{userName}</span>
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
            {invitations.length === 0 ? (
              <p className="col-span-full font-bold tracking-widest text-gray-500 uppercase">
                No active invitations found.
              </p>
            ) : (
              invitations.map((item, index) => <Card key={index} {...item} />)
            )}
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
              <Box key={index} {...track} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student;
