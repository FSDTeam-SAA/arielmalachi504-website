"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Reset Password Form Data:", {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  };

  return (
    <div dir="rtl" className="w-full text-right">
      <div className="mb-10 text-center">
        <h1 className="text-[34px] font-bold leading-tight text-[#5a95ff] md:text-[48px]">
          שנה סיסמה
        </h1>
        <p className="mt-3 text-[14px] text-[#7a7f8c] md:text-[15px]">
          הזן את האימייל שלך כדי לשחזר את הסיסמה שלך
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-[560px] space-y-8"
      >
        <div>
          <label className="mb-2 block text-[15px] text-[#6b7280]">
            צור סיסמה
          </label>
          <div className="flex h-[52px] items-center rounded-[8px] border border-[#4f8df7] bg-[#eef7fb] px-4">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-[16px] text-[#4b5563] outline-none placeholder:text-[#b8c0cc]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer text-[#7b8794]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[15px] text-[#6b7280]">
            אשר את הסיסמה
          </label>
          <div className="flex h-[52px] items-center rounded-[8px] border border-[#4f8df7] bg-[#eef7fb] px-4">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent text-[16px] text-[#4b5563] outline-none placeholder:text-[#b8c0cc]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="cursor-pointer text-[#7b8794]"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 h-[54px] w-full cursor-pointer rounded-[8px] bg-gradient-to-r from-[#1fd2ea] to-[#4c86f7] text-[16px] font-semibold text-white transition hover:opacity-95"
        >
          שנה סיסמה
        </button>
      </form>
    </div>
  );
}
