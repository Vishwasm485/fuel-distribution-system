"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

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

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Add Fuel Price
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl max-w-xl"
      >

        <input
          type="text"
          name="fuel_type"
          placeholder="Fuel Type"
          value={formData.fuel_type}
          onChange={handleChange}
          className="w-full p-3 rounded mb-4"
        />

        <input
          type="number"
          name="price"
          placeholder="Price Per Liter"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 rounded mb-6"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg"
        >
          Add Fuel Price
        </button>

      </form>

    </DashboardLayout>
  );
}