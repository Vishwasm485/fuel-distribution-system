"use client";

import { useEffect, useState } from "react";

import QRCode from "react-qr-code";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./check-status.css";

/* KEEP ALL YOUR EXISTING LOGIC EXACTLY SAME */

export default function CheckStatusPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [showPaymentModal,
  setShowPaymentModal] =
    useState(false);

  const [selectedBooking,
  setSelectedBooking] =
    useState<any>(null);

  const [paymentMode,
  setPaymentMode] =
    useState("");

  const [processing,
  setProcessing] =
    useState(false);

  const [upiData,
  setUpiData] =
    useState({
      from_upi: "",
      to_upi: "fuel@upi"
    });

  const [cardData,
  setCardData] =
    useState({
      card_number: "",
      card_name: "",
      expiry: "",
      cvv: "",
      card_type: ""
    });

  useEffect(() => {

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
          "Unable to fetch bookings."
        );
      }
    };

    if(customer.id){

      fetchBookings();
    }

  }, []);
  const handlePayment = async (
  bookingId: number,
  mode: string
) => {

  try {

    setProcessing(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    await API.post(
      "/customer/make-payment",
      {
        booking_id: bookingId,
        payment_mode: mode
      }
    );

    toast.success(
      "Payment Successful"
    );

    setShowPaymentModal(false);

    window.location.reload();

  }

  catch{

    toast.error(
      "Payment Failed"
    );
  }

  finally{

    setProcessing(false);
  }
};

  /* KEEP ALL YOUR STATES + FUNCTIONS SAME */

  return (

    <DashboardLayout role="customer">

      <div className="status-page">

        <h1 className="status-title">
          Check Booking Status
        </h1>

        <div className="status-grid">

          {

            bookings.map((booking) => (

              <div
                key={booking.booking_id}
                className="status-card"
              >

                <h2 className="booking-title">

                  Booking #{booking.booking_id}

                </h2>

                <div className="booking-details">

                  <p>
                    <span>Fuel Type:</span>
                    {booking.fuel_type}
                  </p>

                  <p>
                    <span>Quantity:</span>
                    {booking.quantity}
                  </p>

                  <p>
                    <span>Price:</span>
                    ₹ {booking.price}
                  </p>

                  <p>
                    <span>Status:</span>

                    <strong
                      className={`

                        ${

                          booking.status === "Pending"

                          ?

                          "yellow-status"

                          :

                          booking.status === "Accepted"

                          ?

                          "blue-status"

                          :

                          booking.status === "Rejected"

                          ?

                          "red-status"

                          :

                          "green-status"
                        }
                      `}
                    >

                      {booking.status}

                    </strong>

                  </p>

                  <p>

                    <span>Payment:</span>

                    <strong
                      className={`

                        ${

                          booking.payment_status === "Success"

                          ?

                          "green-status"

                          :

                          "red-status"
                        }
                      `}
                    >

                      {

                        booking.payment_status || "Unpaid"
                      }

                    </strong>

                  </p>
                  {

                    booking.status === "Accepted"

                    &&

                    booking.payment_status !== "Success"

                    &&

                    <button

                      onClick={() => {
                        console.log(booking);

                        setSelectedBooking(booking);

                        setShowPaymentModal(true);
                      }}

                      className="pay-now-btn"
                    >

                      Pay Now

                    </button>
                  }

                </div>

                {

                  booking.status === "Pending"

                  &&

                  <div className="yellow-box">

                    Waiting for distributor approval

                  </div>

                }

                {

                  booking.status === "Rejected"

                  &&

                  <div className="red-box">

                    Booking Rejected

                  </div>

                }

                {

                  booking.status === "Delivered"

                  &&

                  <div className="green-box">

                    Fuel Delivered Successfully

                  </div>

                }

              </div>

            ))

          }

        </div>

      </div>
      {

        showPaymentModal

        &&

        selectedBooking

        &&

        <div className="payment-overlay">

          <div className="payment-modal">

            <h2>
              Complete Payment
            </h2>

            <p className="payment-amount">

              Amount:
              ₹ {selectedBooking.price}

            </p>

            {

              !paymentMode

              &&

              <div className="payment-options">

                <button
                  onClick={() =>
                    setPaymentMode("UPI")
                  }
                >
                  Pay with UPI
                </button>

                <button
                  onClick={() =>
                    setPaymentMode("CARD")
                  }
                >
                  Pay with Card
                </button>

                <button
                  onClick={() =>
                    handlePayment(
                      selectedBooking.id,
                      "Cash"
                    )
                  }
                >
                  Cash on Delivery
                </button>

              </div>
            }

            {

              paymentMode === "UPI"

              &&

              <div className="upi-section">

                <input
                  type="text"
                  placeholder="From UPI ID"
                  value={upiData.from_upi}
                  onChange={(e) =>
                    setUpiData({
                      ...upiData,
                      from_upi: e.target.value
                    })
                  }
                />

                <input
                  type="text"
                  value={upiData.to_upi}
                  readOnly
                />

                <div className="qr-box">

                  <QRCode
                    value={`upi://pay?pa=${upiData.to_upi}&am=${selectedBooking.price}`}
                    size={180}
                  />

                </div>

                <button
                  onClick={() =>
                    handlePayment(
                      selectedBooking.id,
                      "UPI"
                    )
                  }
                >

                  {

                    processing

                    ?

                    "Processing..."

                    :

                    "Paid"
                  }

                </button>

              </div>
            }

            {

              paymentMode === "CARD"

              &&

              <div className="card-section">

                <input
                  type="text"
                  placeholder="Card Number"
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      card_number: e.target.value
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Name on Card"
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      card_name: e.target.value
                    })
                  }
                />

                <div className="card-row">

                  <input
                    type="text"
                    placeholder="MM/YY"
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        expiry: e.target.value
                      })
                    }
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        cvv: e.target.value
                      })
                    }
                  />

                </div>

                <select
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      card_type: e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Card Type
                  </option>

                  <option>
                    Visa
                  </option>

                  <option>
                    MasterCard
                  </option>

                  <option>
                    RuPay
                  </option>

                </select>

                <button
                  onClick={() =>
                    handlePayment(
                      selectedBooking.id,
                      "Card"
                    )
                  }
                >

                  {

                    processing

                    ?

                    "Processing..."

                    :

                    "Pay Now"
                  }

                </button>

              </div>
            }

            <button

              className="close-payment-btn"

              onClick={() => {

                setShowPaymentModal(false);

                setPaymentMode("");
              }}
            >

              Close

            </button>

          </div>

        </div>
      }

    </DashboardLayout>
  );
}