"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sheard/UserDashboard/Sidebar";
import Header from "@/components/sheard/UserDashboard/Header";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div dir="ltr" className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar - Fixed width, fixed height (Desktop) */}
      <aside className="w-64 lg:w-72 hidden md:block h-full flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Panel */}
        <aside
          className={`absolute top-0 bottom-0 left-0 w-72 max-w-[80vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 lg:h-20 flex-shrink-0">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto container">{children}</div>
        </main>
      </div>
    </div>
  );
}
