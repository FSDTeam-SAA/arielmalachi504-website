"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/locales";

export default function Design() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-4 overflow-hidden">
      <div className="mx-auto container px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dbd7ff] bg-white px-5 py-2 text-sm font-medium text-[#6c63ff] shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span className="text-[16px]">{t.design.badge}</span>
          </div>

          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-[#1a1c3d] sm:text-5xl">
            {t.design.title}
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6b7280]">
            {t.design.subtitle}
          </p>
        </motion.div>

        {/* Staggered Image Grid */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
          {/* Column 1: Headphone (Large/Tall) */}
          <div className="flex-[1.5] lg:min-w-[580px] min-w-[280px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <div className="group relative h-full overflow-hidden border border-gray-100 shadow-sm ">
                <Image
                  src="/images/headphone-3.png"
                  alt="Headphone Design"
                  width={600}
                  height={800}
                  className="h-full w-full object-cover "
                />
              </div>
            </motion.div>
          </div>

          {/* Column 2: Coffee & Burger */}
          <div className="flex flex-col gap-4 flex-1 min-w-[180px]">
            {[
              { src: "/images/coffe.png", delay: 0.2 },
              { src: "/images/burger.png", delay: 0.3 },
            ].map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: image.delay }}
                className="flex-1"
              >
                <div className="group relative h-full overflow-hidden  border border-gray-100 shadow-sm ">
                  <Image
                    src={image.src}
                    alt="AI Design"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover "
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 3: Omega & Lunare */}
          <div className="flex flex-col gap-4 flex-1 min-w-[180px]">
            {[
              { src: "/images/omega.png", delay: 0.4 },
              { src: "/images/lunare.png", delay: 0.5 },
            ].map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: image.delay }}
                className="flex-1"
              >
                <div className="group relative h-full overflow-hidden border border-gray-100 shadow-sm">
                  <Image
                    src={image.src}
                    alt="AI Design"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover "
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 4: Supra & Chicken */}
          <div className="flex flex-col gap-4 flex-[1.4] min-w-[240px]">
            {[
              { src: "/images/supra.png", delay: 0.6 },
              { src: "/images/chiken.png", delay: 0.7 },
            ].map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: image.delay }}
                className="flex-1"
              >
                <div className="group relative h-full overflow-hidden   border border-gray-100 shadow-sm ">
                  <Image
                    src={image.src}
                    alt="AI Design"
                    width={500}
                    height={400}
                    className="h-full w-full object-cover "
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 5: Orange (Tall) */}
          <div className="flex-1 lg:min-w-[380px] min-w-[280px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-full"
            >
              <div className="group relative h-full overflow-hidden  border border-gray-100 shadow-sm ">
                <Image
                  src="/images/orange.png"
                  alt="Orange Design"
                  width={400}
                  height={800}
                  className="h-full w-full object-cover "
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
