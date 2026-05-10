"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import API from "@/services/api";

import toast from "react-hot-toast";

export default function LoginPage() {

  const router = useRouter();

  const [role, setRole] = useState("customer");

  const [formData, setFormData] = useState({
    email: "",
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

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response = await API.post(
        `/${role}/login`,
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        role
      );

      if(role === "customer"){

        localStorage.setItem(
          "customer",
          JSON.stringify(
            response.data.customer
          )
        );
      }

      if(role === "distributor"){

        localStorage.setItem(
          "distributor",
          JSON.stringify(
            response.data.distributor
          )
        );
      }

      toast.success("Login Successful");

      if(role === "admin"){
        router.push("/admin/dashboard");
      }

      else if(role === "distributor"){
        router.push("/distributor/dashboard");
      }

      else{
        router.push("/customer/dashboard");
      }

    }

    catch(error: any){

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-10 rounded-xl w-100"
      >

        <h1 className="text-3xl font-bold mb-8 text-center text-orange-400">
          Login
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded mb-4"
        >
          <option value="customer">
            Customer
          </option>

          <option value="distributor">
            Distributor
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
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
          Login
        </button>

      </form>

    </div>
  );
}