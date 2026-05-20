"use client";

import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./view-revenue.css";

export default function RevenuePage() {

  const [revenues, setRevenues] =
    useState<any[]>([]);

  const distributor = JSON.parse(
    localStorage.getItem("distributor") || "{}"
  );

  const fetchRevenue = async () => {

    if(!distributor.id) return;

    try {

      const response = await API.get(
        `/distributor/view-revenue/${distributor.id}`
      );

      setRevenues(
        response.data.revenue
      );

    }

    catch{

      toast.error(
        "Failed to fetch revenue"
      );
    }
  };

  useEffect(() => {

    fetchRevenue();

  }, []);

  return (

    <DashboardLayout role="distributor">

      <div className="revenue-page">

        <div className="revenue-header">

          <h1>
            Revenue Details
          </h1>

          <p>
            Monitor sales performance and delivered fuel revenue.
          </p>

        </div>

        <div className="revenue-grid">

          {revenues.map((revenue, index) => (

            <div
              key={index}
              className="revenue-card"
            >

              <div className="revenue-date">

                {revenue.date}

              </div>

              <div className="revenue-section">

                <span>
                  Fuel Type
                </span>

                <h2>
                  {revenue.fuel_type}
                </h2>

              </div>

              <div className="revenue-info-grid">

                <div className="info-box">

                  <span>
                    Quantity
                  </span>

                  <p>
                    {revenue.total_quantity}
                  </p>

                </div>

                <div className="info-box">

                  <span>
                    Revenue
                  </span>

                  <p className="green-text">
                    ₹ {revenue.total_price}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}