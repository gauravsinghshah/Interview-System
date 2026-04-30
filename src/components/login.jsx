import React, { useState } from "react";
import { User, Briefcase, Mail, Lock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const API_BASE_URL = API_URL;

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (
      !loginData.email ||
      !loginData.password ||
      (!isLogin && !loginData.name)
    ) {
      setErrorMsg(
        isLogin ? "Please enter email and password" : "Please fill all fields",
      );
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const payload = {
      email: loginData.email,
      password: loginData.password,
      role,
      ...(isLogin ? {} : { name: loginData.name }),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      sessionStorage.setItem("userName", data.name);
      sessionStorage.setItem("userRole", data.role);
      sessionStorage.setItem("token", data.token);
      navigate(data.role === "student" ? "/student" : "/recruiter");
    } catch (error) {
      setErrorMsg(error.message || "Unable to sign in right now");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010409] p-4">
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96"></div>
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96"></div>
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer border-2 border-black bg-white px-6 py-2 font-black text-black uppercase transition-all duration-200 hover:translate-x-2 hover:bg-pb hover:text-white  "
        >
          ← Home
        </button>
      </div>
      <div className="relative rounded-2xl z-10 w-full max-w-md border-2 border-black bg-white p-8 transition-transform duration-200">
        <div className="bg-pb mb-8 border-2 border-black py-4 text-center">
          <h2 className="mb-1 text-4xl font-black tracking-tight text-white uppercase">
            {isLogin ? "Welcome Back" : "Get Smart"}
          </h2>
          <p className="text-sm font-bold text-white uppercase">
            {isLogin ? "Access your dashboard" : "Join the revolution"}
          </p>
        </div>
        <div className="mb-8 flex gap-4 p-1">
          <button
            onClick={() => setRole("student")}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-3 font-black uppercase transition-all duration-200 ${
              role === "student"
                ? "bg-pb border-2 border-black text-white"
                : "border-2 border-black bg-white text-black hover:bg-pb"
            }`}
          >
            <User size={18} />
            STUDENT
          </button>
          <button
            onClick={() => setRole("recruiter")}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-3 font-black uppercase transition-all duration-200 ${
              role === "recruiter"
                ? "bg-pb border-2 border-black text-white"
                : "border-2 border-black bg-white text-black hover:bg-pb"
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
                  placeholder="Enter Name"
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
            disabled={isSubmitting}
            className="group hover:bg-pb mt-4 flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-black bg-white py-4 font-black text-black uppercase transition-all duration-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span>
              {isSubmitting
                ? "Please wait..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </span>
            <ChevronRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>
        <div className="hover:bg-pb group mt-3 border-2 border-black bg-gray-100 p-2 text-center transition-colors">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full cursor-pointer font-black text-black uppercase transition-colors group-hover:text-white"
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
