"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Monitor,
  FileText,
  Flag,
  Image as ImageIcon,
  BadgeCheck,
  Zap,
  Settings,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useUserProfileSettings } from "../../settings/hooks/useSettings";
import { useDashboardOverview } from "../hooks/useDashboardOverview";
import { useTranslation } from "@/locales";

export default function DashboardOverview() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useUserProfileSettings();
  const {
    data: overviewData,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
  } = useDashboardOverview();

  const profile = profileData?.data;
  const statsData = overviewData?.data;

  const stats = [
    {
      title: "Designs Created",
      value: statsData?.totalDesigns || 0,
      icon: Monitor,
      iconBg: "bg-[#eaf5ff]",
      iconColor: "text-[#4ea4ff]",
    },
    {
      title: "Posters",
      value: statsData?.totalPosters || 0,
      icon: FileText,
      iconBg: "bg-[#eaf5ff]",
      iconColor: "text-[#4ea4ff]",
    },
    {
      title: "Logos",
      value: statsData?.totalLogos || 0,
      icon: Flag,
      iconBg: "bg-[#eaf5ff]",
      iconColor: "text-[#4ea4ff]",
    },
    {
      title: "Credits Used",
      value: statsData?.totalCreditsUsed || 0,
      icon: Zap,
      iconBg: "bg-[#fff8dd]",
      iconColor: "text-[#e8bf12]",
    },
  ];

  const services = [
    {
      title: "Poster Design",
      description: "Create social media posts & promotional posters",
      icon: FileText,
      iconBg: "bg-[#eaf5ff]",
      iconColor: "text-[#4e86f7]",
      buttonClass: "bg-[#4e86f7] hover:bg-[#3f77e8]",
      titleClass: "text-[#4e86f7]",
      borderClass: "border-[#cfe2ff]",
      path: "/dashboard-overview/poster-design",
    },
    {
      title: "Logo Maker",
      description: "Generate professional logos for your brand.",
      icon: Flag,
      iconBg: "bg-[#e7fbff]",
      iconColor: "text-[#20cbe3]",
      buttonClass: "bg-[#20cbe3] hover:bg-[#17bdd4]",
      titleClass: "text-[#20cbe3]",
      borderClass: "border-[#d7f6fb]",
      path: "/dashboard-overview/logo-maker",
    },
    {
      title: "Subscription",
      description: "Upgrade your plan for unlimited designs .",
      icon: Zap,
      iconBg: "bg-[#fff8dd]",
      iconColor: "text-[#e8bf12]",
      buttonClass: "bg-[#e8bf12] hover:bg-[#d8b00e]",
      titleClass: "text-[#e8bf12]",
      borderClass: "border-[#f3e6b3]",
      path: "/billing-payments",
    },
    {
      title: "Account Settings",
      description: "Manage your profile and preferences",
      icon: Settings,
      iconBg: "bg-[#efefef]",
      iconColor: "text-[#7a7a7a]",
      buttonClass: "bg-[#6f6f6f] hover:bg-[#5f5f5f]",
      titleClass: "text-[#666666]",
      borderClass: "border-[#dddddd]",
      path: "/settings",
    },
  ];

  return (
    <section className="min-h-screen p-4 md:p-6">
      <div className="mx-auto container">
        <div className="mb-10">
          <h2 className="mb-4 text-[22px] font-medium text-[#666]">
            {t.dashboardOverview.profileTitle}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {isOverviewLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-lg border border-[#d8ebf6] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                  >
                    <div className="mb-5 h-8 w-8 rounded-md bg-gray-200" />
                    <div className="h-8 w-16 rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-24 rounded bg-gray-200" />
                  </div>
                ))
              : stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-lg border border-[#d8ebf6] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                    >
                      <div
                        className={`mb-5 flex h-8 w-8 items-center justify-center rounded-md ${item.iconBg}`}
                      >
                        <Icon className={`h-4 w-4 ${item.iconColor}`} />
                      </div>

                      <div className="text-[34px] font-medium leading-none text-[#444]">
                        {item.value}
                      </div>
                      <p className="mt-2 text-[18px] text-[#666]">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="mb-4 text-[22px] font-medium text-[#666]">
            {t.dashboardOverview.profileTitle}
          </h2>

          <div className="rounded-lg border border-[#e2edf4] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] min-h-[160px] flex items-center justify-center">
            {isProfileLoading ? (
              <div className="flex flex-col items-center gap-2 text-[#777]">
                <Loader2 className="h-8 w-8 animate-spin text-[#22c8ea]" />
                <p className="text-sm">Loading profile data...</p>
              </div>
            ) : isProfileError || !profile ? (
              <div className="text-red-500 font-medium">
                Failed to load profile information.
              </div>
            ) : (
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start">
                <div className="h-[100px] w-[100px] overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
                  <Image
                    src={
                      profile.profileImage && profile.profileImage !== ""
                        ? profile.profileImage
                        : "/no-image.jpg"
                    }
                    alt={profile.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-[32px] font-medium leading-none text-[#444] break-words">
                    {profile.name}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#777]">
                    {profile.email}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${profile.isSubscribed ? "bg-[#fff8dd] text-[#e8bf12]" : "bg-[#eff7ff] text-[#69a8ff]"}`}
                    >
                      ♦ {profile.isSubscribed ? "Premium Plan" : "Free Plan"}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${profile.isSubscribed ? "border-[#8bdd9a] bg-[#e9f9ec] text-[#2e9b48]" : "border-gray-200 bg-gray-50 text-gray-500"}`}
                    >
                      {profile.isSubscribed && (
                        <BadgeCheck className="h-3 w-3 fill-[#2e9b48] text-[#2e9b48]" />
                      )}
                      {profile.isSubscribed
                        ? t.dashboardOverview.active
                        : t.dashboardOverview.inactive}
                    </span>
                  </div>

                  <button
                    onClick={() => router.push("/billing-payments")}
                    className="mt-5 rounded-md bg-[#22c8ea] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#18bbdc]"
                  >
                    {profile.isSubscribed
                      ? t.dashboardOverview.manageSub
                      : t.dashboardOverview.upgrade}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-[22px] font-medium text-[#666]">
            Available Services
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-lg border bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] ${item.borderClass}`}
                >
                  <div
                    className={`mb-5 flex h-8 w-8 items-center justify-center rounded-md ${item.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${item.iconColor}`} />
                  </div>

                  <h3 className={`text-[18px] font-medium ${item.titleClass}`}>
                    {item.title}
                  </h3>

                  <p className="mt-2 min-h-[38px] text-[12px] leading-5 text-[#888]">
                    {item.description}
                  </p>

                  <button
                    onClick={() => router.push(item.path)}
                    className={`mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-white transition ${item.buttonClass}`}
                  >
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
