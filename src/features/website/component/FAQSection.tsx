"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useTranslation } from "@/locales";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50/50 text-blue-600 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold">{t.faq.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#1a2b4b] mb-6"
          >
            {t.faq.title} <span className="">{t.faq.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            {t.faq.subtitle}
          </motion.p>
        </div>

        {/* Accordion Items */}
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          {t.faq.items.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-[#00F6FF] shadow-lg shadow-cyan-500/5 bg-cyan-50/10"
                    : "border-gray-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-right group"
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-[#00F6FF] text-white"
                        : "bg-gray-50 text-gray-400 group-hover:text-blue-500 cursor-pointer"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>

                  <span
                    className={`text-lg md:text-xl font-bold transition-colors ${
                      isOpen
                        ? "text-[#1a2b4b]"
                        : "text-gray-600 group-hover:text-[#00F6FF]"
                    }`}
                  >
                    {faq.question}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-500 leading-relaxed text-right md:text-lg border-t border-gray-100/50 pt-4 pr-[3.25rem]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
