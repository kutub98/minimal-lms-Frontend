"use client";

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">LMS</h2>
          <p className="mt-4 text-gray-400 text-sm">
            Empowering learners with world-class online education. Master skills
            with flexible, expert-led courses.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="#"
              className="p-2 bg-white text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-white text-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-white text-blue-700 rounded-full hover:bg-blue-700 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-2 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                All Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Certifications
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Popular Topics
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Instructors
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get the latest courses, news, and updates.
          </p>
          <form className="flex items-center bg-white rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full outline-none text-black text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700"
            >
              <IoMdSend className="text-lg" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1e293b] py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} LMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
