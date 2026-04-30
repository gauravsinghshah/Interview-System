import { ArrowRight } from "lucide-react";

const Card = ({
  _id,
  companyName = "Company",
  detail = "Details",
  salaryMin = 0,
  salaryMax = 0,
  status = "New",
  role = "Role",
  onApply,
}) => {
  return (
    <div className="flex flex-col border-2 border-black bg-white p-6 transition-all hover:translate-x-1 hover:translate-y-1">
      <div className="mb-4 flex items-start justify-between">
        <div className="text-2xl font-black text-black uppercase">
          {companyName}
        </div>
        <span
          className={`border border-black px-2 py-1 font-mono text-xs font-bold uppercase ${
            status === "New"
              ? "bg-[#1800ff] text-white"
              : status === "Priority"
                ? "bg-red-500 text-white"
                : "bg-green-400 text-black"
          }`}
        >
          {status}
        </span>
      </div>
      <h3 className="mb-2 text-xl leading-tight font-extrabold uppercase">
        {role}
      </h3>
      <div className="mb-6 font-mono text-sm font-semibold text-gray-600 uppercase">
        {detail}
      </div>
      <div className="mt-auto flex items-center justify-between border-t-2 border-black pt-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-widest uppercase">
            Comp Range
          </span>
          <span className="text-lg font-black">
            ${salaryMin}k - ${salaryMax}k
          </span>
        </div>
        <button onClick={() => onApply && onApply(_id)} className="group flex items-center border border-black bg-black p-2 text-white transition-colors hover:bg-[#1800ff] cursor-pointer">
          <span className="mr-2 text-xs font-bold uppercase transition-transform group-hover:-translate-x-1">Apply</span>
          <ArrowRight
            size={20}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
