"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/locales";

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-16">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#5D5CFF] px-2 py-10 md:py-12 text-center text-white"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute -top-1/2 -left-1/4 w-[500px] h-[500px] bg-white rounded-full blur-[120px]" />
            <div className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              {t.cta.title}
            </h2>

            <p className="text-xl md:text-2xl text-blue-50/90 font-medium max-w-4xl mx-auto leading-relaxed">
              {t.cta.subtitle}
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <Link
                href="/login"
                className="inline-block bg-white text-[#5D5CFF] px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/95 transition-all shadow-2xl shadow-black/20"
              >
                {t.cta.button}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
