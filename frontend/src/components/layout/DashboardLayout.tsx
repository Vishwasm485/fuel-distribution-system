"use client";

import Sidebar from "@/components/sidebar/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
  role: string;
};

export default function DashboardLayout({
  children,
  role,
}: LayoutProps) {

  return (

    <div className="flex min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      <Sidebar role={role} />

      <div className="flex-1 p-10 overflow-auto">

        {children}

      </div>

    </div>
  );
}