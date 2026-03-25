import Navbar from "./Navbar";
import {
  Briefcase,
  User,
  MessagesSquare,
  ChartNoAxesCombined,
} from "lucide-react";

const Recruiter = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <div className="flex w-48 flex-1 flex-col gap-4 bg-[#020815] p-3 px-6 font-bold text-white hover:shadow-lg shadow-emerald-400 ">
        <button className="flex items-center gap-2">
          <Briefcase /> Job
        </button>
        <button className="flex items-center gap-2">
          <User /> Candidate
        </button>
        <button className="flex items-center gap-2">
          <MessagesSquare /> Interviews
        </button>
        <button className="flex items-center gap-2">
          <ChartNoAxesCombined /> Analytics
        </button>
        {/* New Job Place Holder */}
        <button
          onClick={""}
          className="mt-auto mb-4 items-center rounded-2xl border-2 bg-purple-800 py-3 text-sm whitespace-nowrap  hover:bg-white hover:text-black"
        >
          Create New Job
        </button>
      </div>
    </div>
  );
};

export default Recruiter;
