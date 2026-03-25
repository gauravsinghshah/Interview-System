import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#0a0a0a] px-3 py-3 font-mono md:px-12">
      {/* Logo */}
      <div className="cursor-pointer text-xl font-black tracking-[0.2em] tracking-widest text-white">
        INTERVIEW
      </div>

      {/* Center Links - Hidden on mobile */}
      <div className="hidden items-center gap-8 text-sm font-bold tracking-widest text-gray-400 md:flex">
        <a href="#" className="transition-colors hover:text-white">
          ABOUT
        </a>
        <a href="#" className="transition-colors hover:text-white">
          FEATURES
        </a>
        <a href="#" className="transition-colors hover:text-white">
          PRICING
        </a>
        <a href="#" className="transition-colors hover:text-white">
          FAQ
        </a>
      </div>

      {/* Right Button */}
      <button className="cursor-pointer bg-blue-600 px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-blue-700">
        GET STARTED
      </button>
    </nav>
  );
};

export default Navbar;
