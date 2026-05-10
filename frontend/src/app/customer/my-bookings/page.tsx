"use client";

import {
  useState,
  useEffect
} from "react";
import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function MyBookingsPage() {


  const [bookings, setBookings] =
    useState<any[]>([]);

  const customer = JSON.parse(
    localStorage.getItem("customer") || "{}"
  );

  const fetchBookings = async () => {

    try {

      const response = await API.get(
        `/customer/my-bookings/${customer.id}`
      );

      setBookings(
        response.data.bookings
      );

    }

    catch{

      toast.error(
        "Failed to fetch bookings"
      );
    }
  };
  useEffect(() => {

  if(customer.id){
    fetchBookings();
  }

}, []);

  return (

    <DashboardLayout role="customer">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        My Bookings
      </h1>


      <div className="grid grid-cols-2 gap-6">

        {bookings.map((booking) => (

          <div
            key={booking.booking_id}
            className="bg-slate-900 p-6 rounded-xl"
          >

            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              {booking.booking_id}
            </h2>

            <p className="mb-2">
              Fuel: {booking.fuel_type}
            </p>

            <p className="mb-2">
              Quantity: {booking.quantity}
            </p>

            <p className="mb-2">
              Price: ₹ {booking.price}
            </p>

            <p className="mb-2">
              Payment: {booking.payment_mode}
            </p>

            <p className="mb-2">
              Status: {booking.status}
            </p>

            <p>
              Address:
              {" "}
              {booking.delivery_address}
            </p>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}