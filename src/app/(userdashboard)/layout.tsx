import React from "react";
import Sidebar from "@/components/sheard/UserDashboard/Sidebar";
import Header from "@/components/sheard/UserDashboard/Header";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar - Fixed width, fixed height */}
      <aside className="w-64 lg:w-72 hidden md:block h-full">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 lg:h-20 flex-shrink-0">
          <Header />
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto container">{children}</div>
        </main>
      </div>
    </div>
  );
}
