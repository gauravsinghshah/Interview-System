import React from "react";

const About = () => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-10 bg-[#f0ebe3] px-6 py-16 text-black md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-20">
      <div className="flex max-w-2xl flex-col text-[42px] leading-none font-extrabold uppercase md:text-[65px] mb-10">
        <span className="mt-2">Don't Be</span>
        <span>
          Behind<span className="text-5xl">.</span>
        </span>
        <span className="text-[#2400ff]">
          Catch Up<span className="text-5xl">.</span>
        </span>
        <span className="mt-8 w-md text-[25px] font-medium normal-case">
          Your competitors shipped 3 products last month using AI.
        </span>
        <span className="mt-3 w-md text-[25px] font-medium normal-case">
          You're still reviewing PRs by hand.
        </span>
        <span className="mt-8 w-md text-[20px] leading-8 font-normal text-gray-600 normal-case">
          VIBECON is where the top 1% share exact workflows, prompts, and
          architectures they use to build 10x faster — the stuff that never
          makes it to Twitter or YouTube. Two days. The playbook everyone else
          is paying $10K/hour consultants for.
        </span>
      </div>
      <div className=" mb-20 grid h-120 w-full max-w-152 grid-cols-2 grid-rows-2 border border-gray-300 lg:mt-16">
        <div className="flex flex-col justify-center border-r border-b border-gray-300 p-8 hover:bg-black hover:text-white">
          <span className="text-7xl font-bold">50+</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Speakers who build, not pitch
          </span>
        </div>
        <div className="flex flex-col justify-center border-b border-gray-300 p-8 hover:bg-black hover:text-white">
          <span className="text-7xl font-bold">1000</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Seats. 73% already gone.
          </span>
        </div>
        <div className="flex flex-col justify-center border-r border-gray-300 p-8 hover:bg-black hover:text-white">
          <span className="text-7xl font-bold">2</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Days = 6 months of catching up
          </span>
        </div>
        <div className="flex flex-col justify-center p-8 hover:bg-black hover:text-white">
          <span className="text-7xl font-bold">12</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Workshops you can't find on YouTube
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
