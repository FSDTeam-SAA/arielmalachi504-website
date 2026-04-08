"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Layout,
  Clock,
  Globe,
  Briefcase,
  LucideIcon,
} from "lucide-react";
import { useTranslation } from "@/locales";

const iconDefs: { Icon: LucideIcon; color: string }[] = [
  { Icon: Zap, color: "text-[#00F6FF]" },
  { Icon: Shield, color: "text-[#4481EB]" },
  { Icon: Layout, color: "text-[#6C63FF]" },
  { Icon: Clock, color: "text-[#00F6FF]" },
  { Icon: Globe, color: "text-[#4481EB]" },
  { Icon: Briefcase, color: "text-[#6C63FF]" },
];

export default function FeaturesSection() {
  const { t } = useTranslation();
  const features = t.featuresSection.features.map((f, i) => ({
    ...f,
    ...iconDefs[i],
  }));

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
            {t.featuresSection.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900"
          >
            {t.featuresSection.title}{" "}
            <span className="text-[#00F6FF]">
              {t.featuresSection.titleHighlight}
            </span>
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
                <feature.Icon className={`w-8 h-8 ${feature.color}`} />
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
