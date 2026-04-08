"use client";

import { motion } from "framer-motion";
import { Upload, MessageSquarePlus, WandSparkles } from "lucide-react";
import { useTranslation } from "@/locales";
import { ElementType } from "react";

const icons: ElementType[] = [Upload, MessageSquarePlus, WandSparkles];

export default function HowItWorksSection() {
  const { t } = useTranslation();
  const steps = t.howItWorks.steps.map((s, i) => ({ ...s, Icon: icons[i] }));

  return (
    <section id="how-it-works" className="overflow-hidden py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8b7cff] px-4 py-2 text-sm font-medium text-[#6c63ff] bg-white/70">
            <WandSparkles className="h-4 w-4" />
            {t.howItWorks.badge}
          </div>

          <h2 className="mb-3 text-3xl font-bold tracking-[-0.02em] text-[#1e2746] md:text-5xl">
            {t.howItWorks.title}
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-7 text-[#667085] md:text-base">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="rounded-[8px] border border-[#9ed8ff] bg-white px-8 py-10 text-center shadow-[0_0_0_1px_rgba(158,216,255,0.15)]"
            >
              <div className="mb-6 flex justify-center md:justify-center">
                <div className="rounded-[10px] bg-gradient-to-b from-[#6c63ff] to-[#3fa9f5] p-3 shadow-md ">
                  <step.Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                </div>
              </div>

              <h3 className="mb-3 text-[30px] font-bold leading-tight text-[#1e2746]">
                {step.title}
              </h3>

              <p className="text-[15px] leading-7 text-[#667085]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
