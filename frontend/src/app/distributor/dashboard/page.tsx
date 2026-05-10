"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";

export default function DistributorDashboard() {
    const loading = useAuth("distributor");
        if(loading){
            return <h1>Loading...</h1>;
        }

  return (

    <DashboardLayout role="distributor">

      <h1 className="text-4xl font-bold text-orange-400 mb-6">
        Distributor Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          Fuel Types
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          Total Bookings
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          Revenue
        </div>

      </div>

    </DashboardLayout>
  );
}