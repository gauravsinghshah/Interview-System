import React, { useState } from "react";
import { FaInstagram, FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="relative overflow-hidden border-t border-white/10 bg-[#f0ebe3] pt-16 pb-8 text-black">
      <div className="pointer-events-none absolute top-0 h-[150] w-full"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="t mb-6 bg-clip-text font-mono text-3xl font-bold text-black uppercase">
              Interview
            </h2>
            <p className="mb-8 max-w-sm leading-relaxed text-black">
              Elevate your career with our smart AI-powered platform. Practice,
              analyze, and master your interview skills in real-time.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-black transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-400"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-black transition-all duration-300 hover:-translate-y-1 hover:border-black/50 hover:bg-black/10 hover:text-black"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-black transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-700"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-black transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-500"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-black-100 mb-6 text-lg font-semibold">
              Product
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#features"
                  className="text-black transition-colors duration-300 hover:text-blue-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-black transition-colors duration-300 hover:text-blue-400"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#changelog"
                  className="text-black transition-colors duration-300 hover:text-blue-400"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-black transition-colors duration-300 hover:text-blue-400"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-black-100 mb-6 text-lg font-semibold">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#about"
                  className="text-black transition-colors duration-300 hover:text-blue-400"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-black transition-colors duration-300 hover:text-blue-400"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-black transition-colors duration-300 hover:text-blue-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-black transition-colors duration-300 hover:text-blue-400"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-semibold text-black">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-black">
              Subscribe to our newsletter for the latest AI interview tips.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(email);
                setEmail("");
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-black/10 bg-black/5 px-4 py-3 text-black placeholder-zinc-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-black transition-colors duration-300 hover:scale-105 hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} InterviewAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <span className="cursor-pointer transition-colors hover:text-black">
              Privacy
            </span>
            <span className="cursor-pointer transition-colors hover:text-black">
              Terms
            </span>
            <span className="cursor-pointer transition-colors hover:text-black">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
