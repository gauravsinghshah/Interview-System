import { Database } from "lucide-react";

const Card = ({
  companyName,
  detail,
  salaryMin,
  salaryMax,
  status,
  role,
  icon: Icon = Database,
}) => {
  return (
    <div className="flex h-62 w-74 cursor-pointer flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Icon */}
      <div className="flex w-full justify-between">
        <div className="rounded-xl bg-blue-100 p-3">
          <Icon size={28} className="text-blue-700" />
        </div>
        <div className="rounded-md bg-[#323543] px-3 py-4 text-xs font-semibold tracking-widest text-gray-300 uppercase">
          {status}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">{role}</h2>
      <span className="text-sm font-bold">
        {companyName} • {detail} | ${salaryMin} - ${salaryMax}
      </span>
      {/* Button Place Holder */}
      <div className="mt-6 flex w-full items-center gap-3">
        <button
          onClick={""}
          className="flex-1 rounded-lg bg-linear-to-r from-indigo-400 to-indigo-500 py-2.5 text-sm font-semibold text-black uppercase hover:opacity-90"
        >
          Accept Invite
        </button>
      </div>
    </div>
  );
};

export default Card;
