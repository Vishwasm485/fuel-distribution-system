"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./distributors.css";

export default function CustomerDistributorsPage() {

  const [distributors, setDistributors] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const fetchDistributors = async () => {

    try {

      let response;

      if(search){

        response = await API.get(
          `/customer/search-distributors?search=${search}`
        );
      }

      else{

        response = await API.get(
          "/customer/view-distributors"
        );
      }

      setDistributors(
        response.data.distributors
      );

    }

    catch{

      toast.error(
        "Failed to fetch distributors"
      );
    }
  };

  useEffect(() => {

    fetchDistributors();

  }, [search]);

  return (

    <DashboardLayout role="customer">

      <div className="distributor-page">

        <div className="page-header">

          <div>

            <h1 className="page-title">
              Fuel Distributors
            </h1>

            <p className="page-subtitle">
              Find trusted fuel distributors near your location.
            </p>

          </div>

          <input
            type="text"
            placeholder="Search by city..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="search-input"
          />

        </div>

        <div className="distributor-grid">

          {distributors.map((item) => (

            <div
              key={item.id}
              className="distributor-card"
            >

              <div className="card-top">

                <div className="distributor-logo">

                  {item.name.charAt(0)}

                </div>

                <div>

                  <h2 className="distributor-name">
                    {item.name}
                  </h2>

                  <p className="distributor-id">
                    Distributor ID:
                    {" "}
                    {item.id}
                  </p>

                </div>

              </div>

              <div className="details-box">

                <div className="detail-item">

                  <span>Email</span>

                  <p>{item.email}</p>

                </div>

                <div className="detail-item">

                  <span>Phone</span>

                  <p>{item.phone}</p>

                </div>

              </div>

              <div className="details-grid">

                <div className="mini-box">

                  <span>City</span>

                  <p>{item.city}</p>

                </div>

                <div className="mini-box">

                  <span>Pincode</span>

                  <p>{item.pincode}</p>

                </div>

              </div>

              <div className="address-box">

                <span>Address</span>

                <textarea
                  value={item.address}
                  readOnly
                />

              </div>

              <Link
                href={`/customer/book-fuel?distributor_id=${item.id}`}
                className="book-btn"
              >

                Book Fuel

              </Link>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}