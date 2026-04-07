import React from "react";

const About = () => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-10 bg-[#f0ebe3] px-6 py-16 text-black md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-20">
      <div className="mb-10 flex w-full max-w-2xl flex-col overflow-hidden text-[42px] leading-none font-extrabold uppercase md:text-[65px]">
        <span className="mt-2">Don't Be</span>
        <span>
          Behind<span className="text-5xl">.</span>
        </span>
        <span className="text-[#2400ff]">
          Catch Up<span className="text-5xl">.</span>
        </span>
        <span className="mt-8 w-full max-w-md text-[20px] font-medium normal-case md:text-[25px]">
          Your competitors shipped 3 products last month using AI.
        </span>
        <span className="mt-3 w-full max-w-md text-[20px] font-medium normal-case md:text-[25px]">
          You're still reviewing PRs by hand.
        </span>
        <span className="mt-8 w-full max-w-md text-[16px] leading-7 font-normal text-gray-600 normal-case md:text-[20px] md:leading-8">
          VIBECON is where the top 1% share exact workflows, prompts, and
          architectures they use to build 10x faster — the stuff that never
          makes it to Twitter or YouTube. Two days. The playbook everyone else
          is paying $10K/hour consultants for.
        </span>
      </div>
      <div className="mb-20 grid w-full max-w-152 grid-cols-1 border border-gray-300 sm:grid-cols-2 lg:mt-16 ">
        <div className="flex flex-col justify-center border-b border-gray-300 p-6 transition-colors duration-300 hover:bg-black hover:text-white  md:p-8">
          <span className="text-5xl font-bold md:text-7xl">50+</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Speakers who build, not pitch
          </span>
        </div>
        <div className="flex flex-col justify-center border-b border-gray-300 p-6 transition-colors duration-300 hover:bg-black hover:text-white md:p-8">
          <span className="text-5xl font-bold md:text-7xl">1000</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Seats. 73% already gone.
          </span>
        </div>
        <div className="flex flex-col justify-center border-b border-gray-300 p-6 transition-colors duration-300 hover:bg-black hover:text-white sm:border-r sm:border-b-0 md:p-8">
          <span className="text-5xl font-bold md:text-7xl">2</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Days = 6 months of catching up
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 transition-colors duration-300 hover:bg-black hover:text-white md:p-8">
          <span className="text-5xl font-bold md:text-7xl">12</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Workshops you can't find on YouTube
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
