"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function Creation() {
  return (
    <section
      dir="rtl"
      className="bg-[#F3F1FF4D] py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto container px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dbd7ff] bg-white px-5 py-2 text-sm font-medium text-[#6c63ff] shadow-sm">
            <Sparkles className="h-4 w-4" />
            יצירה
          </div>

          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-[#1a1c3d] sm:text-5xl">
            צור פוסטרים ולוגו בשניות
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6b7280]">
            הפוך את הרעיונות שלך לפוסטרים מקצועיים ולוגו ייחודי עם העוצמה של AI.
          </p>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Visual Column (on the left in RTL) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="relative mx-auto h-[260px] w-full max-w-[320px] sm:h-[320px] sm:max-w-[400px] md:h-[420px] md:max-w-[520px] lg:h-[500px] lg:max-w-[700px]">
              {/* Back / Nature Image */}
              <div className="absolute right-0 top-0 z-0 w-[72%] sm:w-[72%] md:w-[74%] lg:w-[58%]">
                <div className="relative overflow-hidden rounded-[4px] shadow-xl">
                  <Image
                    src="/images/nature.png"
                    alt="Branding Design"
                    width={480}
                    height={480}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              {/* Front / Pizza Image */}
              <div className="absolute left-6 top-[18%] z-10 w-[58%] sm:w-[58%] md:w-[60%] lg:w-[46%]">
                <div className="relative overflow-hidden rounded-[6px] border-[3px] border-white shadow-2xl sm:border-4">
                  <Image
                    src="/images/pizza.png"
                    alt="Pizza Poster Design"
                    width={380}
                    height={380}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              {/* Decorative background blur */}
              <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/5 blur-3xl" />
            </div>
          </motion.div>

          {/* Text Column (on the right in RTL) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 text-right"
          >
            <h3 className="mb-8 text-3xl font-extrabold leading-[1.3] text-transparent bg-clip-text bg-gradient-to-r from-[#21c0ff] to-[#4c73ff] md:text-5xl">
              הבא את הרעיונות שלך לחיים עם עיצובי פוסטרים ולוגו המופעלים על ידי
              בינה מלאכותית
            </h3>

            <p className="mb-10 text-[17px] leading-relaxed text-[#6b7280]">
              יצירת פוסטרים מושכי עין ולוגו בלתי נשכח כבר לא דורשת כלי עיצוב
              מורכבים או ניסיון מקצועי. הפלטפורמה ה-AI שלנו מאפשרת לך להפוך
              רעיונות פשוטים לעיצובים מדהימים מבחינה ויזואלית תוך שניות. פשוט
              תאר את הפוסטר או הלוגו שאתה רוצה, בחר את הצבעים, הסגנון והגודל
              המועדפים עליך, ואפשר למערכת ליצור עיצובים יצירתיים המותאמים לצרכים
              שלך.
            </p>

            <button className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#22cafe] to-[#4e74ff] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:opacity-95 active:scale-95 cursor-pointer">
              צור את העיצוב שלך
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
