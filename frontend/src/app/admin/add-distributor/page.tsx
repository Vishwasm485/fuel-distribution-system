"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AddDistributorPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    address: "",
    password: "",
  });

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
        "/admin/add-distributor",
        formData
      );

      toast.success(
        "Distributor Added Successfully"
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        pincode: "",
        address: "",
        password: "",
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

    <DashboardLayout role="admin">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Add Distributor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl max-w-2xl"
      >

        <div className="grid grid-cols-2 gap-5">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 rounded"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-3 rounded"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded"
          />

        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              address: e.target.value,
            })
          }
          className="w-full p-3 rounded mt-5 h-32"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg mt-5"
        >
          Add Distributor
        </button>

      </form>

    </DashboardLayout>
  );
}