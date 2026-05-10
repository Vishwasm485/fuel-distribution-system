"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ViewCustomersPage() {

  return (

    <DashboardLayout role="admin">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        View Customers
      </h1>

      <div className="bg-slate-900 p-8 rounded-xl">
        Customer list will appear here.
      </div>

    </DashboardLayout>
  );
}