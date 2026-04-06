"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "8.4K +", label: "בעלי עסקים" },
  { value: "9K +", label: "נוצרו פוסטים" },
  { value: "5.6K +", label: "דירוג משתמש" },
];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-white py-14 lg:py-24 pt-[60px]">
      {/* Background Decorative Blobs - Subtle as per screenshot */}
      <div className="absolute top-0 left-0 -translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-purple-50/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-[500px] h-[500px] bg-cyan-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Headline - Bold Dark Navy */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1a2b4b] tracking-tight leading-[1.1] mb-10"
          >
            צור עיצובים גרפיים <br className="hidden md:block" />
            מדהימים עם AI
          </motion.h1>

          {/* Subheadline - Gray text, balanced width for 2 lines on desktop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mb-14 px-4"
          >
            תאר את העיצוב שאתה רוצה, התאם אישית את הגודל והצבעים וה-AI שלנו
            ייצור באופן מיידי גרפיקה מוכנה לשימוש עבור מדיה חברתית, שיווק ועוד.
          </motion.p>

          {/* Action Buttons - Order matching LTR view of the screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-18 w-full"
          >
            {/* Outline Button (Left) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-white border border-[#00F6FF] text-[#4481EB] px-14 py-4 rounded-xl font-bold text-lg hover:bg-cyan-50/50 transition-all duration-300"
            >
              חקור תכונות
            </motion.button>
            {/* Gradient Button (Right) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-white px-14 py-4 rounded-xl font-bold text-lg shadow-[0_10px_30px_rgba(59,130,246,0.25)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.4)] transition-all duration-300"
            >
              התחל ליצור
            </motion.button>
          </motion.div>

          {/* Statistics Section - Identical to screenshot columns */}
          <div className="w-full max-w-4xl mx-auto border-t border-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 items-center justify-center">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-4xl md:text-5xl font-black text-[#38BDF8] mb-4">
                      {stat.value}
                    </span>
                    <span className="text-gray-400 font-bold text-base md:text-lg tracking-wide uppercase">
                      {stat.label}
                    </span>
                  </motion.div>
                  {/* Vertical Divider */}
                  {index < stats.length - 1 && (
                    <div className="hidden md:block absolute -right-[0.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-16 bg-gray-100" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
