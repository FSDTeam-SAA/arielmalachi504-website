"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-32 translate-y-[-80px] pt-[160px]">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none">
        <div className="aspect-square w-[500px] bg-gradient-to-br from-[#00F6FF] to-[#4481EB] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              צרו פרסומות{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F6FF] to-[#4481EB]">
                חכמות ומנצחות
              </span>{" "}
              בקלות
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
              הפלטפורמה המהירה והיעילה ביותר לעיצוב וניהול קמפיינים פרסומיים.
              שדרגו את המותג שלכם עם עיצובים מהשורה הראשונה במינימום מאמץ.
            </p>
            <div className="flex flex-wrap gap-4 items-center justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-500/20"
              >
                התחילו עכשיו חינם
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-gray-100 text-[#4481EB] px-10 py-4 rounded-2xl font-bold text-lg hover:border-[#00F6FF] transition-all duration-300"
              >
                למידע נוסף
              </motion.button>
            </div>

            <div className="mt-12 flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-sm font-semibold tracking-wider text-gray-400">
                נבטח על ידי:
              </span>
              <div className="flex gap-4">
                {/* Mock logos */}
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="w-8 h-8 rounded-lg bg-gray-200" />
                <div className="w-8 h-8 rounded bg-gray-200" />
              </div>
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                alt="Dashboard Preview"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#00F6FF] rounded-full blur-2xl opacity-30 z-0" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#4481EB] rounded-full blur-2xl opacity-30 z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
