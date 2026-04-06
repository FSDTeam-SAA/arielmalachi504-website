"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ads = [
  {
    title: "Chocolate Special",
    image:
      "https://images.unsplash.com/photo-1582176604445-667dc9ac3e07?q=80&w=2426&auto=format&fit=crop",
  },
  {
    title: "Heated",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2426&auto=format&fit=crop",
  },
  {
    title: "Hot & Crispy Samosa",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Time is Power",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2426&auto=format&fit=crop",
  },
  {
    title: "Wireless Headphone",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2426&auto=format&fit=crop",
  },
];

const getCardStyle = (index: number, centerIndex: number) => {
  const diff = index - centerIndex;

  const styles = [
    {
      rotate: -14,
      translateY: 8,
      translateX: 70,
      scale: 0.9,
      zIndex: 1,
      opacity: 0.85,
    },
    {
      rotate: -7,
      translateY: 2,
      translateX: 35,
      scale: 0.95,
      zIndex: 2,
      opacity: 0.92,
    },
    {
      rotate: 0,
      translateY: 0,
      translateX: 0,
      scale: 1,
      zIndex: 5,
      opacity: 1,
    },
    {
      rotate: 7,
      translateY: 2,
      translateX: -35,
      scale: 0.95,
      zIndex: 2,
      opacity: 0.92,
    },
    {
      rotate: 14,
      translateY: 8,
      translateX: -70,
      scale: 0.9,
      zIndex: 1,
      opacity: 0.85,
    },
  ];

  return (
    styles[index] ?? {
      rotate: diff * 8,
      translateY: Math.abs(diff) * 4,
      translateX: diff * -30,
      scale: 1 - Math.abs(diff) * 0.05,
      zIndex: 1,
      opacity: 0.85,
    }
  );
};

export default function Slider() {
  const centerIndex = Math.floor(ads.length / 2);

  return (
    <section className="w-full bg-white py-10 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-3 md:px-6">
        <div className="relative flex items-center justify-center min-h-[260px] md:min-h-[520px]">
          {ads.map((ad, index) => {
            const card = getCardStyle(index, centerIndex);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{
                  opacity: card.opacity,
                  y: 0,
                  scale: card.scale,
                  rotate: card.rotate,
                  x: card.translateX,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: card.scale + 0.03,
                }}
                className="absolute"
                style={{ zIndex: card.zIndex }}
              >
                <div className="relative w-[120px] h-[180px] sm:w-[150px] sm:h-[220px] md:w-[220px] md:h-[330px] lg:w-[260px] lg:h-[390px] rounded-[8px] md:rounded-[10px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] bg-neutral-200">
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 150px, 260px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  <div className="absolute left-0 right-0 bottom-0 p-3 md:p-5">
                    <h3 className="text-white text-xs sm:text-sm md:text-xl font-bold leading-tight">
                      {ad.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
