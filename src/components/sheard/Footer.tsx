"use client";

import { Facebook, Twitter, Instagram } from "lucide-react";

const footerLinks = [
  {
    title: "מוצר",
    links: ["תכונות", "תמחור", "איך זה עובד", "עדכונים"],
  },
  {
    title: "חברה",
    links: ["עלינו", "קריירה", "בלוג", "צור קשר"],
  },
  {
    title: "תמיכה",
    links: ["מרכז עזרה", "תנאי שימוש", "מדיניות פרטיות", "שאלות ותשובות"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F6FF] rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#4481EB] rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
          {/* Logo & About Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 mb-6">
              <span className="text-3xl font-black tracking-tight">Craft</span>
              <div className="bg-gradient-to-r from-[#00F6FF] to-[#4481EB] rounded-lg px-2 py-0.5">
                <span className="text-xl font-bold text-white italic">ad</span>
              </div>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              המרכז המוביל לפרסום דיגיטלי חכם. אנחנו הופכים את עולם השיווק
              לפשוט, נגיש ומניב תוצאות עבור כל עסק, קטן כגדול.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#00F6FF] transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#4481EB] transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#6C63FF] transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-12 text-left">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-black mb-8 text-[#00F6FF] uppercase tracking-widest">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 font-medium text-center">
            © {new Date().getFullYear()} Craftad. כל הזכויות שמורות.
          </p>
          <div className="flex gap-8 text-gray-400 font-medium whitespace-nowrap">
            <a
              href="#"
              className="hover:text-[#00F6FF] transition-colors duration-300"
            >
              עברית
            </a>
            <a
              href="#"
              className="hover:text-[#00F6FF] transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-[#00F6FF] transition-colors duration-300"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
