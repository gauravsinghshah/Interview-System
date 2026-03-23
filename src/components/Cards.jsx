import { Building2, MapPin, DollarSign, ArrowRight } from "lucide-react";

const Card = ({
  companyName = "Company",
  detail = "Details",
  salaryMin = 0,
  salaryMax = 0,
  status = "New",
  role = "Role",
}) => {
  const statusColors = {
    New: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    Priority: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    "Fast Track": "bg-indigo-500/10 text-indigo-400 ring-indigo-500/20",
    default: "bg-zinc-800 text-zinc-400 ring-zinc-700",
  };

  const badgeStyle = statusColors[status] || statusColors.default;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 font-bold text-white shadow-inner ring-1 ring-white/5">
          {companyName.charAt(0)}
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase ring-1 ${badgeStyle}`}
        >
          {status}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-white transition-colors group-hover:text-indigo-400">
          {role}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
          <span className="flex items-center gap-1">
            <Building2 size={14} />
            {companyName}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {detail}
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between border-t border-zinc-800 pt-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Salary Range
          </p>
          <div className="flex items-center gap-1 font-medium text-zinc-200">
            <DollarSign size={14} className="text-emerald-500" />
            <span>
              ${salaryMin}k - ${salaryMax}k
            </span>
          </div>
        </div>

        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors duration-300 group-hover:translate-x-1 hover:bg-indigo-600 hover:text-white">
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Card;
