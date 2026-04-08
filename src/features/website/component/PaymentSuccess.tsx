"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#eef4f8] p-4">
      <div className="w-full max-w-[600px] rounded-2xl bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#1f2937] mb-3">
          Payment Successful 🎉
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6 leading-relaxed">
          Your payment has been completed successfully. Your subscription is now
          active and ready to use.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard-overview"
            className="flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#18c7df] to-[#4f8df7] px-6 text-sm font-medium text-white transition hover:opacity-95"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
