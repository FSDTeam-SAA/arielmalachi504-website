"use client";

import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full h-full bg-white border-b border-gray-100 flex items-center justify-end px-6 lg:px-10">
      {/* User Profile */}
      <div className="flex items-center gap-3">
        {/* Text Info */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            John Dow
          </p>
          <p className="text-xs text-gray-400 leading-tight">
            example@example.com
          </p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
