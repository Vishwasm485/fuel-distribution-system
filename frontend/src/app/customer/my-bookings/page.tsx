"use client";

import {
  useState,
  useEffect
} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./my-bookings.css";

export default function MyBookingsPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  const [customer, setCustomer] =
    useState<any>(null);

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

  const storedCustomer = JSON.parse(
    localStorage.getItem("customer") || "{}"
  );

  setCustomer(storedCustomer);

}, []);

  useEffect(() => {

    if(customer?.id){
      fetchBookings();
    }

  }, [customer?.id]);
  

  return (

    <DashboardLayout role="customer">

      <div className="bookings-page">

        <div className="bookings-header">

          <h1>
            My Bookings
          </h1>

          <p>
            Track all your fuel orders and delivery details.
          </p>

        </div>

        <div className="bookings-grid">

          {bookings.map((booking) => (

            <div
              key={booking.booking_id}
              className="booking-card"
            >

              <div className="booking-top">

                <div>

                  <h2>
                    {booking.booking_id}
                  </h2>

                  <p>
                    Fuel Booking
                  </p>

                </div>

                <div
                  className={`

                    booking-status

                    ${

                      booking.status === "Pending"

                      ?

                      "pending"

                      :

                      booking.status === "Accepted"

                      ?

                      "accepted"

                      :

                      booking.status === "Delivered"

                      ?

                      "delivered"

                      :

                      "rejected"
                    }
                  `}
                >

                  {booking.status}

                </div>

              </div>

              <div className="booking-details">

                <div className="detail-box">

                  <span>
                    Fuel Type
                  </span>

                  <p>
                    {booking.fuel_type}
                  </p>

                </div>

                <div className="detail-box">

                  <span>
                    Quantity
                  </span>

                  <p>
                    {booking.quantity} L
                  </p>

                </div>

                <div className="detail-box">

                  <span>
                    Total Price
                  </span>

                  <p>
                    ₹ {booking.price}
                  </p>

                </div>

                <div className="detail-box">

                  <span>
                    Payment Mode
                  </span>

                  <p>
                    {booking.payment_mode || "Not Paid"}
                  </p>

                </div>

              </div>

              <div className="address-section">

                <span>
                  Delivery Address
                </span>

                <textarea
                  readOnly
                  value={booking.delivery_address}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}