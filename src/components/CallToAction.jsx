import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div id="updates" className="flex w-full flex-col items-center justify-center border-b-2 border-black bg-[#1800ff] px-4 py-24 text-center text-white md:py-32">
      <h1 className="mb-8 max-w-[90vw] text-5xl leading-[0.9] font-black tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-[7vw]">
        While you're stressing, <br className="hidden md:block" /> we just made
        interviews easy
      </h1>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-4 font-mono text-xs tracking-widest uppercase sm:text-sm md:text-base">
        <span>No More Anxiety</span>
        <span className="hidden sm:inline">·</span>
        <span>AI-assisted evaluation</span>
      </div>

      <Link to="/login">
        <button className="flex cursor-pointer items-center justify-center gap-4 border-2 border-transparent bg-[#f2efe9] px-8 py-4 text-sm font-bold tracking-[0.2em] text-black uppercase duration-300 hover:scale-105 hover:bg-black hover:text-white md:text-base">
          get started <span className="text-xl leading-none">&rarr;</span>
        </button>
      </Link>
    </div>
  );
};

export default CallToAction;
