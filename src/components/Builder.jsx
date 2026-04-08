import React from "react";
import { FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    username: "Graphical27",
    name: "Sourabh Singh",
    role: "Full Stack Developer",
    company: "GitHub"
  },
  {
    username: "gauravsinghshah",
    name: "Gaurav Singh Shah",
    role: "Frontend Engineer",
    company: "GitHub"
  },
  {
    username: "ShahilChand",
    name: "Shahil Chand",
    role: "Backend Architect",
    company: "GitHub"
  },
  {
    username: "NAMAN3342",
    name: "Naman Joshi",
    role: "Software Engineer",
    company: "GitHub"
  },
];

const Builder = () => {
  return (
    <div id="dev" className="min-h-screen w-full bg-[#f2efe9] text-black">
      <hr className="border-2 border-black" />
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-18">
        <div className="mb-16 -ml-2 text-left md:-ml-28">
          <span className="text-4xl font-black uppercase md:text-6xl">
            Develo
          </span>
          <span className="text-4xl font-black text-blue-600 uppercase md:text-6xl">
            pers
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {teamMembers.map((member) => (
            <div
              className="flex cursor-pointer flex-col items-center text-center"
            >
              <div className="mb-6 h-56 w-56 overflow-hidden rounded-full border border-black md:h-60 md:w-60">
                <img
                  src={`https://github.com/${member.username}.png?size=400`}
                  className="h-full w-full grayscale transition-all duration-500 ease-in-out hover:scale-105 hover:grayscale-0"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
              <p className="mb-1 font-mono text-sm text-gray-600">
                {member.role}
              </p>
              <p className={`text-lg font-bold text-blue-600 mb-3`}>
                {member.company}
              </p>
              <a
                href={`https://github.com/${member.username}`}
                className="text-gray-400 transition-colors duration-300 hover:text-black"
              >
                <FaGithub className="text-2xl" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Builder;
