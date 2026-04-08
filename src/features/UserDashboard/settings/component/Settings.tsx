"use client";

import Image from "next/image";
import { Pencil, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useUserProfileSettings } from "../hooks/useSettings";

export default function Settings() {
  const { data, isLoading, isError } = useUserProfileSettings();

  const profile = data?.data;

  if (isLoading) {
    return (
      <section className="min-h-screen p-4 md:p-6">
        <div className="mx-auto container">
          <h1 className="mb-6 mt-4 text-2xl font-bold">Settings</h1>
          <div className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_6px_18px_rgba(39,93,143,0.08)]">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <section className="min-h-screen p-4 md:p-6">
        <div className="mx-auto container">
          <h1 className="mb-6 mt-4 text-2xl font-bold">Settings</h1>
          <div className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_6px_18px_rgba(39,93,143,0.08)]">
            <p className="text-sm text-red-500">Failed to load profile data.</p>
          </div>
        </div>
      </section>
    );
  }

  const name = profile?.name || "N/A";
  const email = profile?.email || "N/A";
  const isSubscribed = profile?.isSubscribed ?? false;

  // If backend later sends actual plan name, use it here.
  // const planName =
  //     profile?.planName ||
  //     profile?.subscriptionPlanName ||
  //     (isSubscribed ? "Subscribed Plan" : "Free Plan");

  const profileImage =
    profile?.profileImage && profile.profileImage.trim() !== ""
      ? profile.profileImage
      : "/no-image.jpg";

  return (
    <section className="min-h-screen p-4 md:p-6">
      <div className="mx-auto container">
        <h1 className="mb-6 mt-4 text-2xl font-bold">Settings</h1>

        <div className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_6px_18px_rgba(39,93,143,0.08)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="relative h-[120px] w-[120px] overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-[26px] font-medium text-[#1f2937]">{name}</h2>

              <p className="text-sm text-[#6b7280]">{email}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {/* <div className="flex items-center gap-2 rounded-full bg-[#e6f0ff] px-4 py-2 text-sm font-medium text-[#3b82f6]">
                                    <Zap className="h-4 w-4" />
                                    {planName}
                                </div> */}

                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                    isSubscribed
                      ? "border border-[#22c55e] bg-[#ecfdf5] text-[#16a34a]"
                      : "border border-[#f59e0b] bg-[#fff7ed] text-[#d97706]"
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  {isSubscribed ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/settings/edit-information"
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#18c7df] to-[#4f8df7] text-sm font-medium text-white shadow-sm transition hover:opacity-95"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
