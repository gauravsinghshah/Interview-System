import React from "react";
import { FaInstagram, FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pbg relative overflow-hidden border-t border-white/10 pt-16 pb-8 text-white">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute top-0 h-[150px] w-full"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="mb-6 bg-clip-text text-3xl font-bold text-transparent text-white font-mono uppercase ">
              Interview
            </h2>
            <p className="mb-8 max-w-sm leading-relaxed text-zinc-400">
              Elevate your career with our smart AI-powered platform. Practice,
              analyze, and master your interview skills in real-time.
            </p>
            <div className="flex gap-4">
              <SocialIcon
                href="https://twitter.com"
                Icon={FaTwitter}
                hoverColor="hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10"
              />
              <SocialIcon
                href="https://github.com"
                Icon={FaGithub}
                hoverColor="hover:text-white hover:border-white/50 hover:bg-white/10"
              />
              <SocialIcon
                href="https://linkedin.com"
                Icon={FaLinkedinIn}
                hoverColor="hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10"
              />
              <SocialIcon
                href="https://instagram.com"
                Icon={FaInstagram}
                hoverColor="hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-zinc-100">
              Product
            </h3>
            <ul className="space-y-4">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#changelog">Changelog</FooterLink>
              <FooterLink href="#docs">Documentation</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-zinc-100">
              Company
            </h3>
            <ul className="space-y-4">
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-zinc-100">
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-zinc-400">
              Subscribe to our newsletter for the latest AI interview tips.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-black transition-colors duration-300 hover:bg-zinc-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} InterviewAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <span className="cursor-pointer transition-colors hover:text-white">
              Privacy
            </span>
            <span className="cursor-pointer transition-colors hover:text-white">
              Terms
            </span>
            <span className="cursor-pointer transition-colors hover:text-white">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="group flex items-center gap-2 text-zinc-400 transition-colors duration-300 hover:text-blue-400"
    >
      <span className="h-px w-0 bg-blue-400 transition-all duration-300 group-hover:w-3"></span>
      {children}
    </a>
  </li>
);

const SocialIcon = ({ href, Icon, hoverColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`rounded-full border border-white/10 bg-white/5 p-3 text-zinc-400 transition-all duration-300 hover:-translate-y-1 ${hoverColor}`}
  >
    <Icon className="text-lg" />
  </a>
);

export default Footer;
