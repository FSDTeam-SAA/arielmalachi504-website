"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Palette,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "סקירה כללית של לוח המחוונים",
    icon: <LayoutGrid className="w-5 h-5" />,
    href: "/dashboard-overview",
  },
  {
    title: "העיצובים שלי",
    icon: <Palette className="w-5 h-5" />,
    href: "/my-designs",
  },
  {
    title: "חיוב ותשלומים",
    icon: <CreditCard className="w-5 h-5" />,
    href: "/billing-payments",
  },
  {
    title: "הגדרות",
    icon: <Settings className="w-5 h-5" />,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      dir="ltr"
      className="w-full h-full bg-white border-l border-gray-100 flex flex-col py-8 px-4"
    >
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Craftad Logo"
            width={70}
            height={30}
            className="h-auto w-auto"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-[#3B82F6] text-white shadow-md shadow-blue-500/20"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <span className={isActive ? "text-white" : "text-gray-400"}>
                {item.icon}
              </span>
              <span className="text-base font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group"
          onClick={() => {
            // Add logout logic here (e.g., from next-auth)
            console.log("Logging out...");
          }}
        >
          <LogOut className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-bold">התנתק</span>
        </button>
      </div>
    </div>
  );
}
