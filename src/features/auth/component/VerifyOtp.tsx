"use client";

import {
  FormEvent,
  KeyboardEvent,
  ChangeEvent,
  ClipboardEvent,
  useRef,
  useState,
} from "react";
import { Clock3 } from "lucide-react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const lastChar = value.slice(-1);
    const updatedOtp = [...otp];
    updatedOtp[index] = lastChar;
    setOtp(updatedOtp);

    if (lastChar && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowRight" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const updatedOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      updatedOtp[i] = char;
    });

    setOtp(updatedOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalOtp = otp.join("");
    console.log("Submitted OTP:", finalOtp);
  };

  return (
    <div dir="rtl" className="w-full text-center">
      <div className="mb-10">
        <h1 className="text-[34px] font-bold leading-tight text-[#5a95ff] md:text-[48px]">
          אמת אימייל
        </h1>
        <p className="mt-3 text-[14px] text-[#7a7f8c] md:text-[15px]">
          הזן קוד OTP בן 6 ספרות לאמת את כתובת הדוא&quot;ל שלך
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-[520px]">
        <div className="mb-5 flex items-center justify-center gap-3 md:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="h-[52px] w-[52px] rounded-[6px] border border-[#4f8df7] bg-[#eef7fb] text-center text-[20px] font-semibold text-[#4b5563] outline-none md:h-[58px] md:w-[58px]"
            />
          ))}
        </div>

        <div className="mb-8 flex items-center justify-between text-[13px]">
          <p className="cursor-pointer text-[#b1b58d]">לא קיבלת קוד? שלח שוב</p>

          <div className="flex items-center gap-2 text-[#7a7f8c]">
            <Clock3 className="h-4 w-4" />
            {/* <span>00:59</span> */}
          </div>
        </div>

        <button
          type="submit"
          className="h-[52px] w-full rounded-[8px] bg-gradient-to-r from-[#1fd2ea] to-[#4c86f7] text-[16px] font-semibold text-white transition hover:opacity-95"
        >
          אמת
        </button>
      </form>
    </div>
  );
}
