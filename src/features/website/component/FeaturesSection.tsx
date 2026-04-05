"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Layout, Clock, Globe, Briefcase } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-[#00F6FF]" />,
    title: "מהירות שיא",
    description:
      "צרו וערכו פרסומות ברקע תוך דקות ספורות בעזרת כלים חכמים וממשק משתמש אינטואיטיבי.",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#4481EB]" />,
    title: "אבטחה מקסימלית",
    description:
      "אנחנו מגנים על הנתונים והנכסים הדיגיטליים שלכם ברמת אבטחה של בנק, כדי שתהיו רגועים.",
  },
  {
    icon: <Layout className="w-8 h-8 text-[#6C63FF]" />,
    title: "עיצובים נקיים",
    description:
      "כל העיצובים שלנו מותאמים לטרנדים וחדשים ביותר בשוק הפרסום העולמי.",
  },
  {
    icon: <Clock className="w-8 h-8 text-[#00F6FF]" />,
    title: "ניהול זמן חסכוני",
    description:
      "המערכת שלנו חוסכת לכם עד 70% מהזמן המושקע בניהול וביצוע קמפיינים שיווקיים.",
  },
  {
    icon: <Globe className="w-8 h-8 text-[#4481EB]" />,
    title: "פריסה עולמית",
    description:
      "שלחו את הפרסומת שלכם לכל מקום בעולם בלחיצת כפתור אחת פשוטה ויעילה.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-[#6C63FF]" />,
    title: "פתרונות לעסקים",
    description:
      "כלים ייעודיים לעסקים וחברות גדולות שצריכים לנהל עשרות ומאות פרסומות בבת אחת.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-cyan-50 text-[#4481EB] font-bold text-sm mb-4"
          >
            למה לבחור בנו?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900"
          >
            הכלים שיעזרו לכם{" "}
            <span className="text-[#00F6FF]">לכבוש את השוק</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:bg-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
