"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DistributorBookingsPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);
  const distributor = JSON.parse(
    localStorage.getItem("distributor") || "{}"
  );

  const fetchBookings = async () => {

    if(!distributor.id) return;

    try {

      const response = await API.get(
        `/distributor/view-bookings/${distributor.id}`
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

    fetchBookings();

  }, [distributor.id]);

  const updateStatus = async (
    id: number,
    action: string
  ) => {

    try {

      await API.put(
        `/distributor/${action}/${id}`
      );

      toast.success(
        "Booking Updated"
      );

      fetchBookings();

    }

    catch{

      toast.error(
        "Update failed"
      );
    }
  };

  return (

    <DashboardLayout role="distributor">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Distributor Bookings
      </h1>


      <div className="overflow-auto">

        <table className="w-full bg-slate-900 rounded-xl overflow-hidden">

          <thead className="bg-orange-500">

            <tr>

              <th className="p-4">
                Booking ID
              </th>

              <th className="p-4">
                Fuel Type
              </th>

              <th className="p-4">
                Quantity
              </th>

              <th className="p-4">
                Price
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-b border-slate-700"
              >

                <td className="p-4">
                  {booking.booking_id}
                </td>

                <td className="p-4">
                  {booking.fuel_type}
                </td>

                <td className="p-4">
                  {booking.quantity}
                </td>

                <td className="p-4">
                  ₹ {booking.price}
                </td>

                <td className="p-4">
                  {booking.status}
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "accept-booking"
                      )
                    }
                    className="bg-green-500 px-3 py-2 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "reject-booking"
                      )
                    }
                    className="bg-red-500 px-3 py-2 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "mark-delivered"
                      )
                    }
                    className="bg-blue-500 px-3 py-2 rounded"
                  >
                    Delivered
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}