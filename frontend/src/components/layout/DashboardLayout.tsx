"use client";

import Sidebar from "@/components/sidebar/Sidebar";

import "./dashboard-layout.css";

type LayoutProps = {

  children: React.ReactNode;

  role: string;
};

export default function DashboardLayout({

  children,

  role,

}: LayoutProps) {

  return (

    <div className="dashboard-layout">

      <Sidebar role={role} />

      <main className="dashboard-main">

        <div className="dashboard-content">

          {children}

        </div>

      </main>

    </div>
  );
}