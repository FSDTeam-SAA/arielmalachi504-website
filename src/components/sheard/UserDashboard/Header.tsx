"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useUserProfileSettings } from "@/features/UserDashboard/settings/hooks/useSettings";
import { Sparkles, Plus, Menu } from "lucide-react";
import { useTranslation } from "@/locales";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const user = session?.user;
  const { data: profileData } = useUserProfileSettings();
  const credits = profileData?.data?.credits || 0;

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="w-full h-full bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-10 gap-2 sm:gap-4 md:gap-6">
      {/* Mobile Menu Toggle */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Right Content */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 ml-auto">
        <LanguageSwitcher />

        {/* Credits Balance */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-[#EEF2FF] border border-indigo-200 rounded-full p-1 sm:p-1.5 h-[40px] sm:h-[44px] lg:h-[48px]">
          <div className="bg-indigo-500 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </div>
          <span className="text-[#1E293B] font-bold text-xs sm:text-sm lg:text-lg whitespace-nowrap px-0.5 sm:px-1">
            {new Intl.NumberFormat().format(credits)}{" "}
            {t.dashboardHeader.credits}
          </span>
          <Link
            href="/billing-payments"
            className="bg-indigo-500 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-white transition hover:bg-indigo-600 shadow-sm cursor-pointer flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Text Info */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-400 leading-tight">
              {user?.email || ""}
            </p>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center bg-gray-50">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-gray-500">
                {getInitials(user?.name)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
