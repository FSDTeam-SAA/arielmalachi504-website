"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { register } from "../api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("הסיסמאות אינן תואמות ❌");
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (response.status) {
        toast.success(response.message || "החשבון נוצר בהצלחה! 🎉");
        router.push("/login");
      } else {
        toast.error(response.message || "נכשל ביצירת החשבון");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "נכשל ביצירת החשבון");
      } else {
        toast.error("אירעה שגיאה בלתי צפויה");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div dir="rtl" className="w-full text-right">
      <div className="mb-10 text-center">
        <h1 className="text-[34px] font-bold leading-tight text-[#5a95ff] md:text-[48px]">
          צור את החשבון שלך
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[15px] text-[#6b7280]">
              שם פרטי
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="שם כאן"
              className="h-[52px] w-full border border-[#4f8df7] rounded-[8px] bg-[#eef7fb] px-4 text-[16px] text-[#4b5563] outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-[15px] text-[#6b7280]">
              שם משפחה
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="שם כאן"
              className="h-[52px] w-full border border-[#4f8df7] rounded-[8px] bg-[#eef7fb] px-4 text-[16px] text-[#4b5563] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[15px] text-[#6b7280]">
            כתובת אימייל
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="hello@example.com"
            className="h-[52px] w-full border border-[#4f8df7] rounded-[8px] bg-[#eef7fb] px-4 text-[16px] text-[#4b5563] outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-[15px] text-[#6b7280]">
            צור סיסמה
          </label>
          <div className="flex h-[52px] items-center rounded-[8px] border border-[#4f8df7] bg-[#eef7fb] px-4">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full bg-transparent text-[16px] text-[#4b5563] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-[#7b8794]" />
              ) : (
                <Eye className="h-5 w-5 text-[#7b8794]" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-[15px] text-[#6b7280]">
            אשר את הסיסמה
          </label>
          <div className="flex h-[52px] items-center rounded-[8px] border border-[#4f8df7] bg-[#eef7fb] px-4">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="w-full bg-transparent text-[16px] text-[#4b5563] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-[#7b8794]" />
              ) : (
                <Eye className="h-5 w-5 text-[#7b8794]" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 flex h-[54px] w-full items-center justify-center gap-2 rounded-[8px] bg-gradient-to-r from-[#1fd2ea] to-[#4c86f7] text-[16px] font-semibold text-white transition hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              מעבד...
            </>
          ) : (
            "הירשם"
          )}
        </button>
      </form>

      <p className="mt-12 text-center text-[15px] text-[#666]">
        כבר יש לך חשבון?{" "}
        <Link href="/login" className="text-[#4c86f7] hover:underline">
          התחבר
        </Link>
      </p>
    </div>
  );
}
