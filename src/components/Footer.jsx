import React from 'react'
import { FaInstagram, FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#010409] text-white h-60 w-full p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div>
          <h2 className="text-2xl font-bold mb-8">
            InterviewAI
          </h2>
          <p>Smart AI-powered interview platform to practice, analyze, and improve your skills in real-time.</p>

          <div className="flex gap-20 text-xl mt-4">

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="cursor-pointer hover:text-gray-400 transition" />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="cursor-pointer hover:text-blue-600 transition" />
            </a>

          </div>

        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8">
            Quick Links
          </h2>
            <ul>
              <li><a href="" className=" hover:text-blue-900">Home</a></li>
              <li><a href="" className=" hover:text-blue-900">Contact</a></li>
              <li><a href="" className=" hover:text-blue-900">About Us</a></li>
          
            </ul>
        </div>

        <div>Contact</div>
        
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2026 InterviewAI. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
