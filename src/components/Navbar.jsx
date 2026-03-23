import { Bell, Search, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          <h1 className="bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-xl font-bold tracking-tight text-transparent">
            InterviewAI
          </h1>
          <div className="hidden items-center gap-6 text-sm font-medium text-zinc-400 md:flex">
            <a
              href="#"
              className="text-zinc-100 transition-colors hover:text-white"
            >
              Dashboard
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Practice
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Resources
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
            <Search size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
            <Bell size={18} />
          </button>
          <div className="h-9 w-9 overflow-hidden rounded-full bg-indigo-500">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
