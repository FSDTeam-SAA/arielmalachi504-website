"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "בסיסי",
    price: "₪49",
    description: "מושלם לעסקים קטנים",
    features: [
      "5 פרסומות בחודש",
      "תמיכה במייל",
      "עד 2 משתמשים",
      "ניתוח נתונים בסיסי",
    ],
    button: "התחל עכשיו",
    highlight: false,
  },
  {
    name: "מקצועי",
    price: "₪199",
    description: "הבחירה הפופולרית ביותר",
    features: [
      "פרסומות ללא הגבלה",
      "תמיכה 24/7",
      "עד 10 משתמשים",
      "ניתוח נתונים מתקדם",
      "ייצוא דוחות",
    ],
    button: "נסה חינם",
    highlight: true,
  },
  {
    name: "ארגוני",
    price: "מותאם אישית",
    description: "לפתרונות רחבי היקף",
    features: [
      "כל התכונות של Pro",
      "ניהול חשבון אישי",
      "התממשקות API",
      "אבטחה מוגברת",
    ],
    button: "צור קשר",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6"
          >
            תוכניות{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F6FF] to-[#4481EB]">
              שמתאימות לכם
            </span>
          </motion.h2>
          <p className="text-xl text-gray-500 font-medium">
            בחרו את המסלול הנכון עבור העסק שלכם
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[3rem] border-2 transition-all duration-500 ${
                plan.highlight
                  ? "bg-gradient-to-b from-[#00F6FF]/5 to-white border-[#00F6FF] shadow-2xl shadow-cyan-500/20 scale-105 z-10"
                  : "bg-gray-50 border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </div>
              <div className="text-5xl font-black text-[#4481EB] mb-4">
                {plan.price}
              </div>
              <p className="text-gray-500 mb-8 font-semibold">
                {plan.description}
              </p>

              <ul className="space-y-4 mb-10 text-right">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-700 font-medium"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-[#00F6FF]">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white shadow-xl shadow-cyan-500/30"
                    : "bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
              >
                {plan.button}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
