import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const Box = ({ plan, role, tags }) => {
  return (
    <div className="flex flex-col border-2 border-black bg-[#1800ff] p-6 text-white transition-all hover:translate-x-1 hover:translate-y-1">
      <div className="mb-6 inline-flex max-w-fit items-center gap-2 border-2 border-white bg-transparent px-3 py-1 text-xs font-bold tracking-widest uppercase">
        <Sparkles size={14} className="text-white" />
        {plan}
      </div>

      <h3 className="mb-6 text-2xl leading-tight font-black uppercase">
        {role}
      </h3>

      <div className="mb-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border border-white/40 bg-white/10 px-2 py-1 font-mono text-xs font-bold tracking-wider uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      <button className="mt-auto flex w-full items-center justify-center gap-2 border-2 border-transparent bg-white py-3 font-bold tracking-widest text-black uppercase transition-colors hover:bg-black hover:text-white">
        Start Practice
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Box;
