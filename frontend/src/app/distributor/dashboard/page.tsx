"use client";

import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DistributorDashboard() {

  const [stats, setStats] =
    useState({

      fuel_types: 0,

      total_bookings: 0,

      revenue: 0
    });

  const [distributor, setDistributor] =
    useState<any>(null);

  useEffect(() => {

    const storedDistributor = JSON.parse(
      localStorage.getItem("distributor") || "{}"
    );

    setDistributor(storedDistributor);

  }, []);

  const fetchDashboard = async () => {

    if(!distributor?.id) return;

    try {

      const response = await API.get(
        `/distributor/dashboard/${distributor.id}`
      );

      setStats(
        response.data
      );

    }

    catch{

      toast.error(
        "Failed to load dashboard"
      );
    }
  };

  useEffect(() => {

    if(distributor){

      fetchDashboard();
    }

  }, [distributor]);

  return (

    <DashboardLayout role="distributor">

      <h1 className="text-5xl font-bold text-orange-500 mb-10">
        Distributor Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">

          <h2 className="text-2xl text-white mb-2">
            Fuel Types
          </h2>

          <p className="text-4xl font-bold text-orange-400">
            {stats.fuel_types}
          </p>

        </div>

        <div className="bg-slate-900 p-6 rounded-xl">

          <h2 className="text-2xl text-white mb-2">
            Total Bookings
          </h2>

          <p className="text-4xl font-bold text-orange-400">
            {stats.total_bookings}
          </p>

        </div>

        <div className="bg-slate-900 p-6 rounded-xl">

          <h2 className="text-2xl text-white mb-2">
            Revenue
          </h2>

          <p className="text-4xl font-bold text-orange-400">
            ₹ {stats.revenue}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}