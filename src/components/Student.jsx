import Navbar from "./Navbar";

const Student = () => {
  return (
    <div className="h-screen text-white">
      <Navbar />
      <div className="">
        {/* First Heading */}
        <span className="px-4 py-4 text-2xl font-bold text-white">
          Welcome back,
          <span className="text-2xl font-bold text-green-500"> Alex</span>
          <span className="text-sm">.</span>
        </span>
        {/* Lower Line */}
        <span className="flex gap-2 px-4 text-2xl">
          Your technical readiness is at
          <span className="gap-0 text-blue-500">
            84%{" "}
            <span className="text-white">
              , Two comapnies are waiting for your response.
            </span>
          </span>
        </span>
      </div>
      <div className="flex justify-between py-4">
        <span className="px-4 font-serif text-2xl">Interview Invitation</span>
        <span className="px-5 py-2 text-blue-400"> View all application </span>
      </div>
    </div>
  );
};

export default Student;
