import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-[calc(100vh-16px)] w-full overflow-hidden bg-white md:min-h-[calc(100vh-24px)]">
        {/* Left image side */}
        <div className="relative hidden lg:block lg:w-[46%]">
          <Image
            src="/images/auth.jpg"
            alt="Auth Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right content side */}
        <div className="flex w-full items-center justify-center bg-[#f8f8f8] px-6 py-10 sm:px-10 lg:w-[54%] lg:px-16">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
