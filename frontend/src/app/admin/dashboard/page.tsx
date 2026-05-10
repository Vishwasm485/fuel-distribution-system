"use client";

import {
  useEffect,
  useState
} from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import useAuth from "@/hooks/useAuth";

import API from "@/services/api";

export default function AdminDashboard() {

  const loading =
    useAuth("admin");

  const [stats, setStats] =
    useState({

      total_distributors: 0,

      total_customers: 0,

      total_bookings: 0,
    });

  const fetchStats = async () => {

    try {

      const response = await API.get(
        "/admin/dashboard-stats"
      );

      setStats(response.data);

    }

    catch(error){

      console.log(error);
    }
  };

  useEffect(() => {

    fetchStats();

  }, []);

  if(loading){
    return <h1>Loading...</h1>;
  }

  return (

    <DashboardLayout role="admin">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900 p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl mb-3">
            Total Distributors
          </h2>

          <p className="text-5xl font-bold text-orange-400">
            {stats.total_distributors}
          </p>

        </div>

        <div className="bg-slate-900 p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl mb-3">
            Total Customers
          </h2>

          <p className="text-5xl font-bold text-orange-400">
            {stats.total_customers}
          </p>

        </div>

        <div className="bg-slate-900 p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl mb-3">
            Total Bookings
          </h2>

          <p className="text-5xl font-bold text-orange-400">
            {stats.total_bookings}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}