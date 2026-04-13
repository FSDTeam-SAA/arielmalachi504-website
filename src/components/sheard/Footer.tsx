"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/locales";

export default function Footer() {
  const { t, language } = useTranslation();
  const dir = language === "he" ? "rtl" : "ltr";
  const textAlign = language === "he" ? "text-right" : "text-left";

  return (
    <footer dir={dir} className="bg-[#111827] pt-20 pb-10 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 grid grid-cols-1 gap-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-5">
          {/* Logo Section */}
          <div className="flex flex-col items-center lg:col-span-1 md:items-start">
            <div className="mb-6 flex items-center justify-center gap-1 md:justify-start">
              <span className="text-3xl font-black tracking-tight text-cyan-400">
                Craft
              </span>
              <div className="rounded-lg bg-gradient-to-r from-[#00F6FF] to-[#4481EB] px-2 py-0.5">
                <span className="text-xl font-bold italic text-white">ad</span>
              </div>
            </div>
          </div>

          {/* Product Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-8 text-lg font-bold text-white">
              {t.footer.product}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {t.footer.posterDesign}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {t.footer.logoDesign}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-8 text-lg font-bold text-white">
              {t.footer.legal}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {t.footer.cookies}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-8 text-lg font-bold text-white">
              {t.footer.contact}
            </h3>
            <ul className="space-y-4">
              <li className="flex flex-col items-center gap-2 text-gray-400 md:flex-row md:justify-between md:gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className={`text-center md:flex-1 md:${textAlign}`}>
                  support@gmail.com
                </span>
              </li>

              <li className="flex flex-col items-center gap-2 text-gray-400 md:flex-row md:justify-between md:gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className={`text-center md:flex-1 md:${textAlign}`}>
                  +888 345 455
                </span>
              </li>

              <li className="flex flex-col items-center gap-2 text-gray-400 md:flex-row md:justify-between md:gap-3">
                <MapPin className="h-5 w-5 text-gray-400 md:self-start" />
                <span
                  className={`text-center text-sm leading-relaxed whitespace-pre-line md:flex-1 md:${textAlign}`}
                >
                  {t.footer.address} <br /> {t.footer.addressLine2}
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <div className="relative flex items-center p-1 border border-gray-700 rounded-xl bg-gray-900/50">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className={`bg-transparent border-none outline-none px-4 py-2 text-white placeholder-gray-500 w-full ${language === "he" ? "text-right" : "text-left"}`}
              />
              <button className="bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white px-6 py-2.5 rounded-lg font-bold whitespace-nowrap hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                {t.footer.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="mb-10 h-px w-full bg-gray-800" />

        {/* Bottom Attribution */}
        <div className="flex flex-col items-center justify-center gap-4 text-center text-sm font-medium text-gray-500 md:flex-row md:justify-between">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.builtFor}</p>
        </div>
      </div>
    </footer>
  );
}
