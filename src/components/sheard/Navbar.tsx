"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { title: "בית", href: "/" },
  { title: "תכונות", href: "#features" },
  { title: "איך זה עובד", href: "#how-it-works" },
  { title: "תמחור", href: "#pricing" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section - Now on the Left in LTR */}

          <div className="flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Navigation Links - Centered, ordered Home to Pricing */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#4481EB] hover:text-[#00F6FF] font-medium transition-colors duration-200 text-lg"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Action Buttons - Now on the Right in LTR */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border-2 border-[#00F6FF] text-[#4481EB] px-8 py-2.5 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-all duration-300 cursor-pointer"
            >
              הירשם
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white px-8 py-2.5 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 cursor-pointer"
            >
              היכנס
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
