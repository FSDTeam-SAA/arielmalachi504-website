"use client";

import { motion } from "framer-motion";

const brands = [
  "Microsoft",
  "Google",
  "Amazon",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Netflix",
  "Spotify",
  "Apple",
  "Disney",
];

export default function Slider() {
  return (
    <div className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <span className="text-sm font-bold tracking-widest text-[#4481EB] uppercase">
          שותפים מובילים
        </span>
      </div>
      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 py-4 items-center"
        >
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-3xl md:text-5xl font-black text-gray-200 hover:text-[#00F6FF] transition-colors duration-300 cursor-default select-none"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
