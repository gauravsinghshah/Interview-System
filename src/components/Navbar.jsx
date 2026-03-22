const Navbar = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-4 text-sm">
        <h3 className="font-manrope text-2xl font-bold tracking-tighter text-[#E5E2E1]">
          Smart Interview
        </h3>
        <div className="flex items-center gap-6">
          <a
            className="font-manrope border-b-2 border-[#5D5FEF] pb-1 text-[#C0C1FF] transition-all"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="font-manrope text-[#464555] transition-colors hover:text-[#E5E2E1]"
            href="#"
          >
            Interviews
          </a>
          <a
            className="font-manrope text-[#464555] transition-colors hover:text-[#E5E2E1]"
            href="#"
          >
            Resources
          </a>
          <a
            className="font-manrope text-[#464555] transition-colors hover:text-[#E5E2E1]"
            href="#"
          >
            Settings
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
