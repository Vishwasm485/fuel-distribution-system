"use client";

import { useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

export default function RegisterPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await API.post(
        "/customer/register",
        formData
      );

      toast.success(
        "Registration Successful"
      );

    }

    catch(error: any){

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <form
        onSubmit={handleRegister}
        className="bg-slate-900 p-10 rounded-xl w-112.5"
      >

        <h1 className="text-3xl font-bold mb-8 text-center text-orange-400">
          Customer Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-6"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded font-semibold"
        >
          Register
        </button>

      </form>

    </div>
  );
}