import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* 1️⃣ Brand Section */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-white"
          >
            SmartLMS
          </Link>

          <p className="mt-3 text-sm text-gray-400">
            Learn new skills with expert-led courses and grow your career.
          </p>

          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🐙</a>
            <a href="#" className="hover:text-white">💼</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>

        {/* 2️⃣ Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* 3️⃣ Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 Cyberpark, Gurugram</li>
            <li>📧 support@smartlms.com</li>
            <li>📞 +91 99999 99999</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SmartLMS. All rights reserved.
      </div>
    </footer>
  );
}
