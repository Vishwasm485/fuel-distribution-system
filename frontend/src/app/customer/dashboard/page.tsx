"use client";

import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./customer-dashboard.css";

export default function CustomerDashboard() {

  const [stats, setStats] =
    useState({

      totalBookings: 0,

      totalFuel: 0,

      pendingDeliveries: 0
    });

  const [customer, setCustomer] =
    useState<any>(null);

  const fetchDashboardStats = async () => {

    if(!customer?.id) return;
  

    try {

      const response = await API.get(
        `/customer/my-bookings/${customer.id}`
      );

      const bookings =
        response.data.bookings;

      const totalFuel =
        bookings.reduce(

          (
            sum: number,
            booking: any
          ) =>

            sum + booking.quantity,

          0
        );

      const pendingDeliveries =

        bookings.filter(

          (booking: any) =>

            booking.status === "Accepted"

        ).length;

      setStats({

        totalBookings:
          bookings.length,

        totalFuel,

        pendingDeliveries
      });

    }

    catch{

      toast.error(
        "Failed to load dashboard"
      );
    }
  };

  useEffect(() => {

    const storedCustomer = JSON.parse(
      localStorage.getItem("customer") || "{}"
    );

    setCustomer(storedCustomer);

  }, []);

  useEffect(() => {

    if(customer){

      fetchDashboardStats();
    }

  }, [customer]);

  return (

    <DashboardLayout role="customer">

      <div className="customer-dashboard">

        <h1 className="customer-dashboard-title">
          Customer Dashboard
        </h1>

        <div className="dashboard-stats-grid">

          <div className="dashboard-card">

            <p className="dashboard-card-label">
              My Bookings
            </p>

            <h2 className="dashboard-card-value">
              {stats.totalBookings}
            </h2>

          </div>

          <div className="dashboard-card">

            <p className="dashboard-card-label">
              Fuel Orders
            </p>

            <h2 className="dashboard-card-value">
              {stats.totalFuel}
            </h2>

          </div>

          <div className="dashboard-card">

            <p className="dashboard-card-label">
              Pending Deliveries
            </p>

            <h2 className="dashboard-card-success">
              {stats.pendingDeliveries}
            </h2>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}