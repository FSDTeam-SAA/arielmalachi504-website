"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 mb-6">
              <span className="text-3xl font-black tracking-tight text-cyan-400">
                Craft
              </span>
              <div className="bg-gradient-to-r from-[#00F6FF] to-[#4481EB] rounded-lg px-2 py-0.5">
                <span className="text-xl font-bold text-white italic">ad</span>
              </div>
            </div>
          </div>

          {/* Product Section */}
          <div>
            <h3 className="text-lg font-bold mb-8 text-white">מוצר</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  עיצוב פוסטרים
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  עיצוב לוגו
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-bold mb-8 text-white">חוקי</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  תנאים והגבלות
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  מדיניות עוגיות
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-8 text-white">צור קשר</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <span className="flex-1 text-right">support@gmail.com</span>
                <Mail className="w-5 h-5 text-gray-400" />
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span className="flex-1 text-right">+888 345 455</span>
                <Phone className="w-5 h-5 text-gray-400" />
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span className="flex-1 text-right whitespace-pre-line text-sm leading-relaxed">
                  סן פרנסיסקו, קליפורניה, <br /> 123 AI Avenue
                </span>
                <MapPin className="w-5 h-5 text-gray-400 self-start" />
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <div className="relative flex items-center p-1 border border-gray-700 rounded-xl bg-gray-900/50">
              <input
                type="email"
                placeholder="הזן את המייל שלך"
                className="bg-transparent border-none outline-none px-4 py-2 text-white placeholder-gray-500 w-full text-right"
              />
              <button className="bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white px-6 py-2.5 rounded-lg font-bold whitespace-nowrap hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                הכנס
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="h-px bg-gray-800 w-full mb-10" />

        {/* Bottom Attribution */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
          <p>© 2026 Craft ad AI. כל הזכויות שמורות.</p>
          <p>נבנה עבור בעלי עסקים שרוצים לבלוט.</p>
        </div>
      </div>
    </footer>
  );
}
