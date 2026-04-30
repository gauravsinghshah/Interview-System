import { Link } from "react-router-dom";

const StudentNav = () => {
  return (
    <div className="fixed z-50 w-full bg-[#0a0a0a] font-mono">
      <div className="flex items-center justify-between px-4 py-3 md:px-12">
        <div className="cursor-pointer text-lg font-black tracking-[0.2em] text-white md:text-xl">
          INTERVIEW
        </div>
        <div className="hidden items-center gap-8 text-sm font-bold tracking-widest text-gray-400 uppercase md:flex">
          <Link to="/student" className="transition-colors hover:text-white">
            Dashboard
          </Link>
          <Link to="/profile" className="transition-colors hover:text-white">
            Profile
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="cursor-pointer bg-blue-600 px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-blue-700 md:px-6 md:py-3 md:text-xs">
              LOG OUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentNav;
