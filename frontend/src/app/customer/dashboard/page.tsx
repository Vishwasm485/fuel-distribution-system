"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";

export default function CustomerDashboard() {
    const loading = useAuth("customer");
    if(loading){
        return <h1>Loading...</h1>;
    }

  return (

    <DashboardLayout role="customer">

      <h1 className="text-4xl font-bold text-orange-400 mb-6">
        Customer Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          My Bookings
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          Fuel Orders
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          Booking Status
        </div>

      </div>

    </DashboardLayout>
  );
}