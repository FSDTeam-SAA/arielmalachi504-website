"use client";

import { useLanguageStore } from "@/store/language.store";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center p-1 bg-gray-100/50 backdrop-blur-sm rounded-full border border-gray-200 shadow-inner overflow-hidden">
      <button
        onClick={() => setLanguage("he")}
        className={`relative px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-black transition-colors duration-300 cursor-pointer ${
          language === "he"
            ? "text-[#4481EB]"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        {language === "he" && (
          <motion.div
            layoutId="activeLang"
            className="absolute inset-0 bg-white rounded-full shadow-sm"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">עברית</span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`relative px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-black transition-colors duration-300 cursor-pointer ${
          language === "en"
            ? "text-[#4481EB]"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        {language === "en" && (
          <motion.div
            layoutId="activeLang"
            className="absolute inset-0 bg-white rounded-full shadow-sm"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">English</span>
      </button>
    </div>
  );
}
