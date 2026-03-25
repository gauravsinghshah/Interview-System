import React from "react";

const Hero = () => {
  return (
    <div className="mt-4 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#010409] font-sans text-white select-none selection:bg-blue-500 selection:text-white">
      <div className="absolute top-18 left-12 z-20 flex items-center gap-4">
        <div className="h-[2px] w-10 bg-blue-600 md:w-14"></div>
        <p className="font-mono text-xs font-bold tracking-[0.18em] text-[#f1ede6] uppercase md:text-lg">
          29-30 APRIL, 2026 / VIRTUAL
        </p>
      </div>
      <div className="relative z-10 flex -translate-y-6 flex-col items-center justify-center leading-[0.85] md:-translate-y-12">
        <h1 className="m-0 cursor-default p-0 text-[15vw] font-black tracking-tighter text-[#e8e4dc] transition-transform duration-700 ease-out hover:scale-105 md:text-[18vw]">
          INTER
        </h1>
        <h1 className="cursor-default text-[15vw] font-black tracking-tighter text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_#2563eb] hover:text-[#2563eb] md:text-[18vw] md:[-webkit-text-stroke:2px_#2563eb]">
          VIEW
        </h1>
      </div>
      <div className="absolute bottom-10 z-20 flex max-w-sm flex-col gap-2 md:max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-gray-400 md:text-lg">
          <span className="bg-blue-600 px-1 py-0.5 font-bold text-white md:px-2 md:py-1">
            60% OF ALL HIRES
          </span>
          <span>will be AI-assisted by end of year.</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-gray-400 md:text-lg">
          <span>Manual screening isn't a trend —</span>
          <span className="bg-blue-600 px-1 py-0.5 font-bold text-white md:px-2 md:py-1">
            it's the new standard.
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[40vw] w-[40vw] animate-pulse rounded-full bg-blue-900/10 blur-[100px]"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
    </div>
  );
};

export default Hero;
