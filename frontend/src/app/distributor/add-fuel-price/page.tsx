"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./add-fuel-price.css";

export default function AddFuelPricePage() {

  const [formData, setFormData] = useState({
    fuel_type: "",
    price: "",
  });

  const distributor = JSON.parse(
    localStorage.getItem("distributor") || "{}"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await API.post(
        "/distributor/add-fuel-price",
        {
          distributor_id:
            distributor.id,

          fuel_type:
            formData.fuel_type,

          price:
            Number(formData.price),
        }
      );

      toast.success(
        "Fuel Price Added"
      );

      setFormData({
        fuel_type: "",
        price: "",
      });

    }

    catch(error: any){

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    <DashboardLayout role="distributor">

      <div className="fuel-price-page">

        <div className="fuel-price-header">

          <h1>
            Add Fuel Price
          </h1>

          <p>
            Add new fuel type and update latest pricing.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="fuel-price-form"
        >

          <div className="input-group">

            <label>
              Fuel Type
            </label>

            <input
              type="text"
              name="fuel_type"
              placeholder="Petrol / Diesel / Gas"
              value={formData.fuel_type}
              onChange={handleChange}
              className="fuel-input"
            />

          </div>

          <div className="input-group">

            <label>
              Price Per Liter
            </label>

            <input
              type="number"
              name="price"
              placeholder="Enter amount"
              value={formData.price}
              onChange={handleChange}
              className="fuel-input"
            />

          </div>

          <button
            type="submit"
            className="fuel-submit-btn"
          >

            Add Fuel Price

          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}