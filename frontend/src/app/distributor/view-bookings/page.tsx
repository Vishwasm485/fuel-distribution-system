"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./view-bookings.css";

export default function DistributorBookingsPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  const distributor = JSON.parse(
    localStorage.getItem("distributor") || "{}"
  );

  const [showCustomerModal,
  setShowCustomerModal] =
    useState(false);

  const [selectedCustomer,
  setSelectedCustomer] =
    useState<any>(null);

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

  const acceptBooking = async (
    id: number
  ) => {

    try {

      await API.put(
        `/distributor/accept-booking/${id}`
      );

      toast.success(
        "Booking Accepted"
      );

      fetchBookings();

    }

    catch{

      toast.error(
        "Accept Failed"
      );
    }
  };

  const rejectBooking = async (
    id: number
  ) => {

    try {

      await API.put(
        `/distributor/reject-booking/${id}`
      );

      toast.success(
        "Booking Rejected"
      );

      fetchBookings();

    }

    catch{

      toast.error(
        "Reject Failed"
      );
    }
  };

  const markDelivered = async (
    id: number
  ) => {

    try {

      await API.put(
        `/distributor/mark-delivered/${id}`
      );

      toast.success(
        "Marked as Delivered"
      );

      fetchBookings();

    }

    catch{

      toast.error(
        "Update Failed"
      );
    }
  };

  return (

    <DashboardLayout role="distributor">

      <div className="booking-page">

        <div className="booking-header">

          <h1>
            Distributor Bookings
          </h1>

          <p>
            Manage customer fuel delivery requests.
          </p>

        </div>

        <div className="booking-grid">

          {bookings.map((booking) => (

            <div
              key={booking.booking_id}
              className="booking-card"
            >

              <div className="booking-top">

                <div>

                  <span className="booking-label">
                    Booking ID
                  </span>

                  <h2>
                    {booking.booking_id}
                  </h2>

                </div>

                <div className="booking-price">

                  ₹ {booking.price}

                </div>

              </div>

              <div className="booking-info-grid">

                <div className="info-box">

                  <span>
                    Fuel Type
                  </span>

                  <p>
                    {booking.fuel_type}
                  </p>

                </div>

                <div className="info-box">

                  <span>
                    Quantity
                  </span>

                  <p>
                    {booking.quantity}
                  </p>

                </div>

                <div className="info-box">

                  <span>
                    Booking Status
                  </span>

                  <p>
                    {booking.status}
                  </p>

                </div>

                <div className="info-box">

                  <span>
                    Payment
                  </span>

                  <p
                    className={
                      booking.payment_status === "Success"
                      ?
                      "green-text"
                      :
                      "red-text"
                    }
                  >

                    {

                      booking.payment_status === "Success"

                      ?

                      "Paid"

                      :

                      booking.status === "Pending"

                      ?

                      "No Action Yet"

                      :

                      "Unpaid"
                    }

                  </p>

                </div>

              </div>

              <button

                onClick={() => {

                  setSelectedCustomer({

                    name:
                      booking.customer_name,

                    phone:
                      booking.customer_phone,

                    email:
                      booking.customer_email,

                    address:
                      booking.delivery_address,

                    pincode:
                      booking.delivery_pincode
                  });

                  setShowCustomerModal(true);
                }}

                className="details-btn"
              >

                View Customer Details

              </button>

              <div className="action-section">

                {

                  booking.status === "Pending"

                  &&

                  <>

                    <button
                      onClick={() =>
                        acceptBooking(booking.id)
                      }
                      className="accept-btn"
                    >

                      Accept

                    </button>

                    <button
                      onClick={() =>
                        rejectBooking(booking.id)
                      }
                      className="reject-btn"
                    >

                      Reject

                    </button>

                  </>
                }

                {

                  booking.status === "Accepted"

                  &&
                  booking.payment_status === "Success"

                  &&

                  <button
                    onClick={() =>
                      markDelivered(booking.id)
                    }
                    className="deliver-btn"
                  >

                    Mark Delivered

                  </button>
                }

                {

                  booking.status === "Rejected"

                  &&

                  <div className="status-pill rejected-pill">

                    Rejected

                  </div>
                }

                {

                  booking.status === "Delivered"

                  &&

                  <div className="status-pill delivered-pill">

                    Delivered

                  </div>
                }

              </div>

            </div>

          ))}

        </div>

      </div>

      {

        showCustomerModal

        &&

        selectedCustomer

        &&

        <div className="modal-overlay">

          <div className="customer-modal">

            <h2>
              Customer Details
            </h2>

            <div className="modal-fields">

              <div>

                <label>
                  Customer Name
                </label>

                <input
                  readOnly
                  value={selectedCustomer.name}
                />

              </div>

              <div>

                <label>
                  Phone Number
                </label>

                <input
                  readOnly
                  value={selectedCustomer.phone}
                />

              </div>

              <div>

                <label>
                  Email
                </label>

                <input
                  readOnly
                  value={selectedCustomer.email}
                />

              </div>

              <div>

                <label>
                  Delivery Address
                </label>

                <textarea
                  readOnly
                  value={selectedCustomer.address}
                />

              </div>

              <div>

                <label>
                  Pincode
                </label>

                <input
                  readOnly
                  value={selectedCustomer.pincode}
                />

              </div>

            </div>

            <button

              onClick={() =>
                setShowCustomerModal(false)
              }

              className="close-btn"
            >

              Close

            </button>

          </div>

        </div>
      }

    </DashboardLayout>
  );
}