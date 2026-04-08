"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="w-full h-full bg-white border-b border-gray-100 flex items-center justify-end px-6 lg:px-10">
      {/* User Profile */}
      <div className="flex items-center gap-3">
        {/* Text Info */}
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800 leading-tight">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-gray-400 leading-tight">
            {user?.email || ""}
          </p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center bg-gray-50">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User Avatar"}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-gray-500">
              {getInitials(user?.name)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
