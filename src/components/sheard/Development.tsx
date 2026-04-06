"use client";

import React from "react";

export default function Development() {
  return (
    <section className="flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-[#d8ebf6] bg-white p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <h1 className="text-2xl font-semibold text-[#4481EB] mb-3">
          🚀 Page Under Development
        </h1>

        <p className="text-sm text-[#6b7280] leading-relaxed">
          This feature is currently being built. Please check back soon.
        </p>
      </div>
    </section>
  );
}
