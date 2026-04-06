"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      console.log("Email is required");
      return;
    }

    console.log("Forgot Password Email:", email);
  };

  return (
    <div dir="rtl" className="w-full text-right">
      <div className="mb-10 text-center">
        <h1 className="text-[28px] font-extrabold leading-tight text-[#4f8df7] md:text-[34px]">
          שכחת סיסמה?
        </h1>
        <p className="mt-1 text-sm text-[#8b95a7]">
          הזן את האימייל שלך כדי לאפס את הסיסמה
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-[#8a93a3]">
            כתובת אימייל
          </label>
          <div className="flex h-[42px] items-center rounded-[4px] border border-[#4f8df7] bg-[#eef6fb] px-3">
            <input
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-full w-full bg-transparent text-sm text-[#4b5563] outline-none placeholder:text-[#b8c0cc]"
            />
            <Mail className="h-4 w-4 text-[#aab4c3]" />
          </div>
        </div>

        <button
          type="submit"
          className="h-[44px] w-full rounded-[4px] bg-gradient-to-r from-[#22d3ee] to-[#4f86f7] text-sm font-medium text-white transition hover:opacity-95"
        >
          שלח קישור לאיפוס
        </button>
      </form>

      <div className="mt-10 text-center text-sm text-[#8a93a3]">
        <Link href="/login" className="text-[#4f86f7] hover:underline">
          חזרה להתחברות
        </Link>
      </div>
    </div>
  );
}
