"use client";

import {

  useEffect,

  useState

} from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import useAuth from "@/hooks/useAuth";

import API from "@/services/api";

import "./admin-dashboard.css";

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

    return (

      <div className="dashboard-loading">

        Loading Dashboard...

      </div>
    );
  }

  return (

    <DashboardLayout role="admin">

      <div className="admin-dashboard">

        <div className="dashboard-header">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Monitor platform activity and distributor operations.
            </p>

          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">

              <span>
                Total Distributors
              </span>

              <div className="stat-icon orange-glow">
                D
              </div>

            </div>

            <h2>
              {stats.total_distributors}
            </h2>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <span>
                Total Customers
              </span>

              <div className="stat-icon cyan-glow">
                C
              </div>

            </div>

            <h2>
              {stats.total_customers}
            </h2>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <span>
                Total Bookings
              </span>

              <div className="stat-icon green-glow">
                B
              </div>

            </div>

            <h2>
              {stats.total_bookings}
            </h2>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}