import React, { useState } from "react";
import {
  User,
  Briefcase,
  Mail,
  Lock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const bodyPayload = isLogin
        ? { email: loginData.email, password: loginData.password, role }
        : {
            email: loginData.email,
            password: loginData.password,
            name: loginData.name,
            role,
          };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "An error occurred");
        setIsLoading(false);
        return;
      }
      if (data.name) {
        localStorage.setItem("userName", data.name);
      }
      if (data.role) {
        localStorage.setItem("userRole", data.role);
      }
      if (data.role === "student") {
        navigate("/student");
      } else {
        navigate("/recruiter");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to connect to the server.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010409] p-4">
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]"></div>
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px]"></div>
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer border-2 border-black bg-white px-6 py-2 font-black text-black uppercase transition-all duration-200 hover:translate-x-2 hover:translate-y-2"
        >
          ← Home
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md border-2 border-black bg-white p-8 transition-transform duration-200">
        {/* Header */}
        <div className="mb-8 border-2 border-black bg-[#b8ff22] py-4 text-center">
          <h2 className="mb-1 text-4xl font-black tracking-tight text-black uppercase">
            {isLogin ? "Welcome Back" : "Get Smart"}
          </h2>
          <p className="text-sm font-bold text-black uppercase">
            {isLogin ? "Access your dashboard" : "Join the revolution"}
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="mb-8 flex gap-4 p-1">
          <button
            onClick={() => setRole("student")}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-3 font-black uppercase transition-all duration-200 ${
              role === "student"
                ? "-translate-x-2px -translate-y-2px border-2 border-black bg-[#20beff] text-black"
                : "border-2 border-black bg-white text-black hover:bg-gray-100"
            }`}
          >
            <User size={18} />
            STUDENT
          </button>
          <button
            onClick={() => setRole("recruiter")}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-3 font-black uppercase transition-all duration-200 ${
              role === "recruiter"
                ? "-translate-x-2 -translate-y-2 border-2 border-black bg-[#ff90e8] text-black"
                : "border-2 border-black bg-white text-black hover:bg-gray-100"
            }`}
          >
            <Briefcase size={18} />
            RECRUITER
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 border-2 border-red-600 bg-red-100 p-3 text-center font-bold text-red-600 uppercase">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1">
              <label className="ml-1 text-sm font-black text-black uppercase">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User size={18} className="text-black" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={loginData.name}
                  onChange={handleInputChange}
                  placeholder="JOHN DOE"
                  className="w-full border-2 border-black bg-white py-3 pr-4 pl-10 font-semibold text-black uppercase placeholder-gray-400 transition-all duration-200"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="ml-1 text-sm font-black text-black uppercase">
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail size={18} className="text-black" />
              </div>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                placeholder="YOU@EXAMPLE.COM"
                className="w-full border-2 border-black bg-white py-3 pr-4 pl-10 font-semibold text-black uppercase placeholder-gray-400 transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="ml-1 text-sm font-black text-black uppercase">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={18} className="text-black" />
              </div>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                placeholder="......."
                className="w-full border-2 border-black bg-white py-3 pr-4 pl-10 font-semibold text-black transition-all duration-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`group mt-4 flex w-full items-center justify-center gap-2 border-2 border-black bg-[#ff3366] py-4 font-black text-white uppercase transition-all duration-200 ${isLoading ? "translate-x-2 translate-y-2 cursor-not-allowed opacity-50 shadow-none" : "cursor-pointer "}`}
          >
            <span>
              {isLoading
                ? "Processing..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </span>
            {!isLoading && (
              <ChevronRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </form>
        <div className="mt-8 border-2 border-black bg-gray-100 p-2 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-black text-black uppercase transition-colors hover:text-[#ff3366]"
          >
            {isLogin
              ? "DON'T HAVE AN ACCOUNT? SIGN UP"
              : "ALREADY HAVE AN ACCOUNT? LOG IN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
