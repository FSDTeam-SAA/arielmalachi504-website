"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutGrid,
  Palette,
  CreditCard,
  Settings,
  LogOut,
  X,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "@/locales";

export default function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      title: t.sidebar.overview,
      icon: <LayoutGrid className="w-5 h-5" />,
      href: "/dashboard-overview",
    },
    {
      title: t.sidebar.myDesigns,
      icon: <Palette className="w-5 h-5" />,
      href: "/my-designs",
    },
    {
      title: t.sidebar.billing,
      icon: <CreditCard className="w-5 h-5" />,
      href: "/billing-payments",
    },
    {
      title: t.sidebar.settings,
      icon: <Settings className="w-5 h-5" />,
      href: "/settings",
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
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
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold">{t.sidebar.logout}</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t.logoutModal.title}
              </h3>
              <p className="text-gray-500 mb-8 max-w-[280px]">
                {t.logoutModal.message}
              </p>

              <div className="flex w-full gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {t.logoutModal.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-shadow shadow-lg shadow-red-500/20 cursor-pointer"
                >
                  {t.logoutModal.confirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
