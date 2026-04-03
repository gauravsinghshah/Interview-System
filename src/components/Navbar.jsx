import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#0a0a0a] font-mono">
      <div className="flex items-center justify-between px-4 py-3 md:px-12">
        {/* Logo */}
        <div className="cursor-pointer text-lg font-black tracking-[0.2em] text-white md:text-xl">
          INTERVIEW
        </div>

        {/* Desktop Links */}
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
        <div className="flex items-center gap-3">
          <button className="cursor-pointer bg-blue-600 px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-blue-700 md:px-6 md:py-3 md:text-xs">
            GET STARTED
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 text-sm font-bold tracking-widest text-gray-400 md:hidden">
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
      )}
    </nav>
  );
};

export default Navbar;
