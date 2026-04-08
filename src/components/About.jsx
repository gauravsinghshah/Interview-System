import React from "react";

const About = () => {
  return (
    <div id="about" className="flex min-h-screen w-full flex-col gap-10 bg-[#f0ebe3] px-6 py-16 text-black md:px-10 lg:flex-row lg:items-center lg:px-20">
      <div className="mb-10 flex w-full max-w-2xl flex-col overflow-hidden text-[42px] leading-none font-extrabold uppercase md:text-[65px]">
        <span className="mt-2">Hire Talent</span>
        <span>
          Faster<span className="text-5xl">.</span>
        </span>
        <span className="text-[#2400ff]">
          With AI<span className="text-5xl">.</span>
        </span>
        <span className="mt-8 w-full max-w-md text-[20px] font-medium normal-case md:text-[25px]">
          Your competitors are closing candidates in 3 days.
        </span>
        <span className="mt-3 w-full max-w-md text-[20px] font-medium normal-case md:text-[25px]">
          You're still reviewing resumes by hand.
        </span>
        <span className="mt-8 w-full max-w-md text-[16px] leading-7 font-normal text-gray-600 normal-case md:text-[20px] md:leading-8">
          Our platform helps recruiters identify the top 1% instantly. Automate
          technical screening, standardize grading, and receive deep insights on
          every applicant. Save hundreds of hours and make offers before anyone
          else.
        </span>
      </div>
      <div className="mb-20 grid w-full max-w-152 grid-cols-1 border border-gray-300 sm:grid-cols-2 lg:mt-16">
        <div className="flex flex-col justify-center border-b border-gray-300 p-6 transition-colors duration-300 hover:bg-black hover:text-white md:p-8  sm:border-r sm:border-b-0 ">
          <span className="text-5xl font-bold md:text-7xl">10x</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Faster hiring pipelines
          </span>
        </div>
        <div className="flex flex-col justify-center border-b border-gray-300 p-6 transition-colors duration-300 hover:bg-black hover:text-white md:p-8">
          <span className="text-5xl font-bold md:text-7xl">500+</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Hours saved per open role
          </span>
        </div>
        <div className="flex flex-col justify-center border-b border-gray-300 p-6 transition-colors duration-300 hover:bg-black hover:text-white sm:border-r sm:border-b-0 md:p-8">
          <span className="text-5xl font-bold md:text-7xl">1</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Platform for all screening
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 transition-colors duration-300 hover:bg-black hover:text-white md:p-8">
          <span className="text-5xl font-bold md:text-7xl">99%</span>
          <span className="mt-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Accuracy in skill assessment
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
