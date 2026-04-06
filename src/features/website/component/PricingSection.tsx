"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "חבילה בסיסית",
    tagline: "התחילו ליצור בקלות",
    price: "$0",
    period: "לחודש",
    features: [
      "50 נקודות זכות כלל",
      "אידיאלי למתחילים",
      "צור פוסטרים ולוגואים",
      "שימוש קל על בסיס אשראי",
      "אין התחייבות חודשית",
    ],
    highlight: false,
    buttonStyle:
      "bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white shadow-[0_10px_20px_rgba(0,246,255,0.2)]",
  },
  {
    name: "חבילה סטנדרטית",
    tagline: "התמורה הטובה ביותר לעיצוב בנפח גבוה",
    price: "49 דולר",
    period: "לחודש",
    features: [
      "300 נקודות זכות כלולים",
      "אידיאלי לאנשי מקצוע ולצוותים",
      "צור פוסטרים ולוגואים ללא הגבלה בתוך הקרדיטים",
      "חסכוני לשימוש תכוף",
      "אין צורך במנוי",
    ],
    highlight: true,
    badge: "הכי פופולרי",
    buttonStyle: "bg-white text-[#4F46E5] shadow-xl",
  },
  {
    name: "חבילת פרימיום",
    tagline: "שחררו יצירתיות מרבית עם נקודות זכות פרימיום",
    price: "99 דולר",
    period: "לחודש",
    features: [
      "500 נקודות זכות כללים",
      "הטוב ביותר ליצירת עיצובים תכופים",
      "צור פוסטרים ולוגואים בכל עת",
      "יותר ערך לכל זיכוי",
      "אין צורך במנוי חודשי",
    ],
    highlight: false,
    buttonStyle:
      "bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white shadow-[0_10px_20px_rgba(0,246,255,0.2)]",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50/50 text-blue-600 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">
              תמחור
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a2b4b] mb-6"
          >
            תמחור <span className="text-[#4F46E5]">פשוט ושקוף</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            התחל בחינם, שדרג כשתהיה מוכן. ללא עמלות נסתרות.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch px-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-[3rem] p-10 md:p-12 transition-all duration-500 overflow-hidden ${
                plan.highlight
                  ? "bg-[#4F46E5] text-white shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] scale-105 z-10"
                  : "bg-white text-[#1a2b4b] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)]"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.highlight && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                  <div className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-5 py-1.5 rounded-full border border-white/30 tracking-tight">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan Info */}
              <div className="mt-10 mb-12 text-center">
                <h3
                  className={`text-2xl font-black mb-3 ${plan.highlight ? "text-white" : "text-[#4F46E5]"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm font-bold min-h-[40px] leading-relaxed ${plan.highlight ? "text-indigo-100/80" : "text-gray-400"}`}
                >
                  {plan.tagline}
                </p>
                <div className="mt-10 flex flex-col items-center">
                  <span className="text-5xl font-black tracking-tighter">
                    {plan.price}
                  </span>
                  <span
                    className={`text-xl font-bold mt-3 ${plan.highlight ? "text-indigo-100" : "text-[#4F46E5]"}`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Feature List */}
              <div className="flex-grow mb-14">
                <ul className="space-y-6">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex flex-row-reverse items-start gap-4"
                    >
                      <div
                        className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                          plan.highlight
                            ? "bg-white/10 border-white/30"
                            : "bg-indigo-50 border-indigo-100"
                        }`}
                      >
                        <Check
                          className={`w-3.5 h-3.5 ${plan.highlight ? "text-white" : "text-[#4F46E5]"}`}
                        />
                      </div>
                      <span
                        className={`flex-1 text-right font-bold text-[15px] leading-snug ${plan.highlight ? "text-white" : "text-gray-600"}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-5 rounded-[1.5rem] font-black text-xl transition-all duration-300 ${plan.buttonStyle}`}
              >
                צור את העיצוב שלך
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
