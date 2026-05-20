"use client";

import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./distributor-dashboard.css";

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

      <div className="distributor-dashboard">

        <div className="dashboard-header">

          <h1>
            Distributor Dashboard
          </h1>

          <p>
            Monitor bookings, fuel inventory and revenue.
          </p>

        </div>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <span>
              Fuel Types
            </span>

            <h2>
              {stats.fuel_types}
            </h2>

          </div>

          <div className="dashboard-card">

            <span>
              Total Bookings
            </span>

            <h2>
              {stats.total_bookings}
            </h2>

          </div>

          <div className="dashboard-card revenue-card">

            <span>
              Revenue
            </span>

            <h2>
              ₹ {stats.revenue}
            </h2>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}