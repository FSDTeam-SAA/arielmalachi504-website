"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { id: 1, src: "/images/chocolate.png", alt: "Chocolate" },
  { id: 2, src: "/images/heated.png", alt: "Heated" },
  { id: 3, src: "/images/samosa.png", alt: "Samosa" },
  { id: 4, src: "/images/timeIsPower.png", alt: "Time is Power" },
  { id: 5, src: "/images/headphone.png", alt: "Headphone" },
  { id: 6, src: "/images/pizza.png", alt: "Pizza" },
  { id: 7, src: "/images/burger.png", alt: "Burger" },
  { id: 8, src: "/images/coffe.png", alt: "Coffee" },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = slides.length;

  const getIndex = (offset: number) =>
    (((activeIndex + offset) % total) + total) % total;

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (((prev - 1) % total) + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  // Visible cards: positions from -2 to +2
  const positions = [-2, -1, 0, 1, 2];

  const getCardStyle = (position: number) => {
    const absPos = Math.abs(position);

    // 3D transform values
    const rotateY = position * -25;
    const translateX = position * 220;
    const translateZ = absPos === 0 ? 200 : absPos === 1 ? 50 : -100;
    const scale = absPos === 0 ? 1 : absPos === 1 ? 0.85 : 0.7;
    const opacity = absPos === 0 ? 1 : absPos === 1 ? 0.8 : 0.5;
    const zIndex = 10 - absPos * 2;

    return {
      rotateY,
      x: translateX,
      z: translateZ,
      scale,
      opacity,
      zIndex,
    };
  };

  return (
    <section className="relative w-full py-6 overflow-hidden  ">
      <div className="px-4">
        {/* 3D Carousel */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "900px", height: "520px" }}
        >
          <div
            className="relative w-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="popLayout">
              {positions.map((position) => {
                const slideIndex = getIndex(position);
                const slide = slides[slideIndex];
                const style = getCardStyle(position);

                return (
                  <motion.div
                    key={`${slide.id}-${position}`}
                    className="absolute cursor-pointer"
                    initial={{
                      rotateY: style.rotateY + direction * 25,
                      x: style.x + direction * 220,
                      scale: style.scale * 0.8,
                      opacity: 0,
                    }}
                    animate={{
                      rotateY: style.rotateY,
                      x: style.x,
                      scale: style.scale,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                    }}
                    exit={{
                      rotateY: style.rotateY - direction * 25,
                      x: style.x - direction * 220,
                      scale: style.scale * 0.8,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: style.zIndex,
                    }}
                    onClick={() => {
                      if (position > 0) next();
                      if (position < 0) prev();
                    }}
                  >
                    <div
                      className={`relative w-[240px] h-[340px] md:w-[360px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl
                        ${position === 0 ? "ring-2 ring-[#00F6FF]/40 shadow-[0_0_40px_rgba(0,246,255,0.15)]" : ""}
                      `}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 240px, 260px"
                        priority={Math.abs(position) <= 1}
                      />
                      {/* Gradient overlay on side cards */}
                      {position !== 0 && (
                        <div className="absolute inset-0 bg-black/30" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center
              hover:border-[#00F6FF] hover:bg-[#00F6FF]/10 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 text-white/70 group-hover:text-[#00F6FF] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const diff = i - activeIndex;
                  setDirection(diff > 0 ? 1 : -1);
                  setActiveIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-[#00F6FF]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center
              hover:border-[#00F6FF] hover:bg-[#00F6FF]/10 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 text-white/70 group-hover:text-[#00F6FF] transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
