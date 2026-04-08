import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 w-full bg-[#0a0a0a] font-mono">
      <div className="flex items-center justify-between px-4 py-3 md:px-12">
        <div className="cursor-pointer text-lg font-black tracking-[0.2em] text-white md:text-xl">
          INTERVIEW
        </div>
        <div className="hidden items-center gap-8 text-sm font-bold tracking-widest text-gray-400 md:flex uppercase">
          <a href="#about" className="transition-colors hover:text-white">
            ABOUT
          </a>
          <a href="#dev" className="transition-colors hover:text-white">
            Developers
          </a>
          <a href="#updates" className="transition-colors hover:text-white">
            Updates
          </a>
          <a href="#footer" className="transition-colors hover:text-white">
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="cursor-pointer bg-blue-600 px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-blue-700 md:px-6 md:py-3 md:text-xs">
              GET STARTED
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
