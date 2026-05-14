"use client";

import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CustomerDashboard() {

  const [stats, setStats] =
    useState({

      totalBookings: 0,

      totalFuel: 0,

      latestStatus: "No Orders"
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

      const latestStatus =

        bookings.length > 0

        ?

        bookings[0].status

        :

        "No Orders";

      setStats({

        totalBookings:
          bookings.length,

        totalFuel,

        latestStatus
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

      <h1 className="text-5xl font-bold text-orange-400 mb-10">
        Customer Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">

          <h2 className="text-xl text-gray-300 mb-4">
            My Bookings
          </h2>

          <p className="text-5xl font-bold text-orange-400">
            {stats.totalBookings}
          </p>

        </div>

        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">

          <h2 className="text-xl text-gray-300 mb-4">
            Fuel Orders
          </h2>

          <p className="text-5xl font-bold text-orange-400">
            {stats.totalFuel}
          </p>

        </div>

        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">

          <h2 className="text-xl text-gray-300 mb-4">
            Booking Status
          </h2>

          <p className="text-3xl font-bold text-green-400">
            {stats.latestStatus}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}