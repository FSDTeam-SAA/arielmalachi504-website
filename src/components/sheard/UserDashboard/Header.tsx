"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useUserProfileSettings } from "@/features/UserDashboard/settings/hooks/useSettings";
import { Sparkles, Plus } from "lucide-react";
import { useTranslation } from "@/locales";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";

export default function Header() {
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
    <div className="w-full h-full bg-white border-b border-gray-100 flex items-center justify-end px-6 lg:px-10 gap-3 sm:gap-6">
      <LanguageSwitcher />

      {/* Credits Balance */}
      <div className="flex items-center gap-2 lg:gap-3 bg-[#EEF2FF] border border-indigo-200 rounded-full p-1.5 h-[44px] lg:h-[48px]">
        <div className="bg-indigo-500 w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-white shadow-sm">
          <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
        </div>
        <span className="text-[#1E293B] font-bold text-sm lg:text-lg whitespace-nowrap px-1">
          {new Intl.NumberFormat().format(credits)} {t.dashboardHeader.credits}
        </span>
        <Link
          href="/billing-payments"
          className="bg-indigo-500 w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-white transition hover:bg-indigo-600 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
        </Link>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        {/* Text Info */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-gray-400 leading-tight">
            {user?.email || ""}
          </p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center bg-gray-50">
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
  );
}
