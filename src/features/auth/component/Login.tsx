"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming sonner is available based on common modern stacks, fallback to alert if not

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push("/dashboard-overview");
        router.refresh();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="w-full text-right">
      <div className="mb-10 text-center">
        <h1 className="text-[28px] font-extrabold leading-tight text-[#4f8df7] md:text-[34px]">
          ברוך הבא בחזרה!
        </h1>
        <p className="mt-1 text-sm text-[#8b95a7]">היכנס לחשבון שלך</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-[#8a93a3]">
            כתובת אימייל
          </label>
          <div className="flex h-[42px] items-center rounded-[4px] border border-[#4f8df7] bg-[#eef6fb] px-3">
            <input
              name="email"
              type="email"
              placeholder="hello@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-full w-full bg-transparent text-sm text-[#4b5563] outline-none placeholder:text-[#b8c0cc]"
            />
            <Mail className="h-4 w-4 text-[#aab4c3]" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#8a93a3]">
            סיסמה
          </label>
          <div className="flex h-[42px] items-center rounded-[4px] border border-[#4f8df7] bg-[#eef6fb] px-3">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="h-full w-full bg-transparent text-sm text-[#4b5563] outline-none placeholder:text-[#b8c0cc]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer text-[#aab4c3]"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 text-xs">
          <Link
            href="/forgot-password"
            className="cursor-pointer text-[#6d8df7] hover:underline"
          >
            שכחת סיסמה?
          </Link>

          <label className="flex items-center gap-2 text-[#8a93a3]">
            <input
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300"
            />
            זכור אותי
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[44px] w-full items-center justify-center rounded-[4px] bg-gradient-to-r from-[#22d3ee] to-[#4f86f7] text-sm font-medium text-white transition hover:opacity-95 disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "התחבר"}
        </button>
      </form>

      <div className="mt-10 text-center text-sm text-[#8a93a3]">
        אין לך חשבון עדיין?{" "}
        <Link href="/sign-up" className="text-[#4f86f7] hover:underline">
          הירשם
        </Link>
      </div>
    </div>
  );
}
