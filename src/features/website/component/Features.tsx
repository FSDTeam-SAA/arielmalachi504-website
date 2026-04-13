"use client";

import { Crown, Sparkles } from "lucide-react";
import { useTranslation } from "@/locales";

const featureIcons = [
  <Sparkles key="sparkles" />,
  <svg
    key="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <path d="M21 3H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
    <path d="M3 7v10a2 2 0 0 0 2 2h2" />
    <path d="m13 13 3-3 3 3" />
    <path d="M16 10v6" />
  </svg>,
  <svg
    key="style"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.707-.484 2.103-1.206.35-.64.437-1.405.195-2.09-.317-.897-.133-1.95.454-2.607a4.46 4.46 0 0 1 3.393-1.32c.783.034 1.58-.177 2.146-.648C21.26 13.24 22 12.029 22 10c0-4.418-4.477-8-10-8z" />
  </svg>,
  <Crown key="crown" />,
  <svg
    key="poster"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>,
  <svg
    key="logo"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  <svg
    key="edit"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>,
];

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl border border-[#dbedff] bg-white px-7 py-9 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(83,118,255,0.08)]">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#5376ff] transition-colors group-hover:bg-[#ebf3ff]">
        {icon}
      </div>

      <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-[#1a1c3d]">
        {title}
      </h3>

      <p className="mx-auto max-w-[260px] text-[15px] leading-relaxed text-[#6b7280]">
        {description}
      </p>
    </div>
  );
}

export default function Features() {
  const { t, language } = useTranslation();
  const dir = language === "he" ? "rtl" : "ltr";

  return (
    <section dir={dir} className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dbedff] bg-white px-4 py-2 text-sm font-medium text-[#5376ff] shadow-sm">
            <Sparkles />
            <span className="text-[18px]">{t.features.badge}</span>
          </div>

          <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-[#1a1c3d] sm:text-5xl">
            {t.features.title}
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6b7280]">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {t.features.items.slice(0, 4).map((item, index) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={featureIcons[index]}
            />
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.slice(4).map((item, index) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={featureIcons[index + 4]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
