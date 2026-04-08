"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useUserProfileSettings } from "@/features/UserDashboard/settings/hooks/useSettings";
import { Sparkles, LayoutDashboard } from "lucide-react";
import { useTranslation } from "@/locales";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { titleKey: "home", href: "/" },
  { titleKey: "features", href: "#features" },
  { titleKey: "howItWorks", href: "#how-it-works" },
  { titleKey: "pricing", href: "#pricing" },
] as const;

export default function Navbar() {
  const { t } = useTranslation();
  const { status } = useSession();
  const { data: profileData } = useUserProfileSettings();
  const credits = profileData?.data?.credits || 0;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#4481EB] hover:text-[#00F6FF] font-medium transition-colors duration-200 text-lg"
              >
                {t.navbar[link.titleKey]}
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 lg:gap-4">
            <LanguageSwitcher />

            {status === "authenticated" ? (
              <>
                {/* Credits Balance */}
                <div className="hidden sm:flex items-center gap-2 bg-[#EEF2FF] border border-indigo-200 rounded-full p-1 h-[42px]">
                  <div className="bg-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[#1E293B] font-bold text-sm whitespace-nowrap px-2">
                    {new Intl.NumberFormat().format(credits)}
                  </span>
                </div>

                <Link
                  href="/dashboard-overview"
                  className="bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white px-5 lg:px-7 py-2.5 rounded-xl font-bold text-base lg:text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 lg:w-5 lg:h-5" />
                  {t.common.dashboard}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/sign-up"}
                  className="bg-white border-2 border-[#00F6FF] text-[#4481EB] px-8 py-2.5 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-all duration-300 cursor-pointer"
                >
                  {t.common.signup}
                </Link>

                <Link
                  href="/login"
                  className="bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white px-8 py-2.5 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 cursor-pointer"
                >
                  {t.common.login}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
