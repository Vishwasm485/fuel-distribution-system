"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import API from "@/services/api";

import toast from "react-hot-toast";

import "./login.css";

export default function LoginPage() {

  const router = useRouter();

  const [role, setRole] =
    useState("customer");

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
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

      toast.success(
        "Login Successful"
      );

      if(role === "admin"){

        router.push(
          "/admin/dashboard"
        );
      }

      else if(
        role === "distributor"
      ){

        router.push(
          "/distributor/dashboard"
        );
      }

      else{

        router.push(
          "/customer/dashboard"
        );
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

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to continue to FuelFlow
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>
              Login As
            </label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
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

          </div>

          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
          >

            Login

          </button>

        </form>

      </div>

    </div>
  );
}