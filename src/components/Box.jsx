import React from "react";
import { MoveRight, Sparkles } from "lucide-react";

const Box = ({ plan, role, tags }) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-lg hover:shadow-indigo-500/10">
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium tracking-wide text-zinc-300 uppercase">
          <Sparkles size={12} className="text-indigo-400" />
          {plan}
        </div>

        <h3 className="mb-4 text-xl font-bold text-white transition-colors group-hover:text-indigo-400">
          {role}
        </h3>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-zinc-700 bg-zinc-800/50 px-2.5 py-1 text-xs font-medium text-zinc-400 transition-colors group-hover:border-zinc-600 group-hover:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-transparent py-2.5 text-sm font-semibold text-zinc-300 transition-all group-hover:border-zinc-600 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white">
        Start Practice
        <MoveRight size={16} />
      </button>
    </div>
  );
};

export default Box;
