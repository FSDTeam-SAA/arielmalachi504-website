"use client";

import { motion } from "framer-motion";
import { MousePointer2, Settings2, BarChart4 } from "lucide-react";

const steps = [
  {
    icon: <MousePointer2 className="w-10 h-10 text-white" />,
    title: "בחירת פורמט",
    description:
      "בחרו מתוך מגוון רחב של תבניות מעוצבות או התחילו מאפס בהתאמה אישית מלאה.",
    color: "bg-[#00F6FF]",
  },
  {
    icon: <Settings2 className="w-10 h-10 text-white" />,
    title: "התאמת המותג",
    description:
      "הוסיפו את הלוגו, הצבעים והפונטים שלכם בלחיצת כפתור אחת פשוטה ויעילה.",
    color: "bg-[#4481EB]",
  },
  {
    icon: <BarChart4 className="w-10 h-10 text-white" />,
    title: "פרסום ומדידה",
    description:
      "פרסמו את הקמפיין שלכם וקבלו נתונים מדויקים על הביצועים והרווחים בזמן אמת.",
    color: "bg-[#6C63FF]",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-left mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-1 bg-gradient-to-r from-[#00F6FF] to-transparent" />
            <span className="text-[#4481EB] font-black tracking-widest text-sm uppercase">
              התהליך הפשוט שלנו
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            איך <span className="text-[#4481EB]">זה עובד?</span>
          </motion.h2>
        </div>

        <div className="relative grid md:grid-cols-3 gap-12 text-center">
          {/* Connecting lines for desktop */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gray-200 -z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 p-8 pt-0 group"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-24 h-24 ${step.color} rounded-full shadow-2xl flex items-center justify-center mb-8 border-8 border-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </div>
                <p className="text-gray-600 leading-relaxed font-semibold">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
