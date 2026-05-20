"use client";

import { useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";
import "../login/login.css";

export default function RegisterPage() {

  const [formData, setFormData] =
    useState({

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

      [e.target.name]:
        e.target.value,
    });
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const trimmedName =
      formData.name.trim();

    const trimmedEmail =
      formData.email.trim();

    const trimmedPhone =
      formData.phone.trim();

    const trimmedAddress =
      formData.address.trim();

    const trimmedPassword =
      formData.password.trim();

    // =========================
    // NAME VALIDATION
    // =========================

    if(!trimmedName){

      toast.error(
        "Name is required"
      );

      return;
    }

    if(trimmedName.length < 3){

      toast.error(
        "Name must be at least 3 characters"
      );

      return;
    }

    // =========================
    // EMAIL VALIDATION
    // =========================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!trimmedEmail){

      toast.error(
        "Email is required"
      );

      return;
    }

    if(!emailRegex.test(trimmedEmail)){

      toast.error(
        "Enter valid email address"
      );

      return;
    }

    // =========================
    // PHONE VALIDATION
    // =========================

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if(!trimmedPhone){

      toast.error(
        "Phone number is required"
      );

      return;
    }

    if(!phoneRegex.test(trimmedPhone)){

      toast.error(
        "Enter valid 10 digit phone number"
      );

      return;
    }

    // =========================
    // ADDRESS VALIDATION
    // =========================

    if(!trimmedAddress){

      toast.error(
        "Address is required"
      );

      return;
    }

    if(trimmedAddress.length < 10){

      toast.error(
        "Address is too short"
      );

      return;
    }

    // =========================
    // PASSWORD VALIDATION
    // =========================

    if(!trimmedPassword){

      toast.error(
        "Password is required"
      );

      return;
    }

    if(trimmedPassword.length < 6){

      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    try {

      await API.post(

        "/customer/register",

        {
          name: trimmedName,

          email: trimmedEmail,

          phone: trimmedPhone,

          address: trimmedAddress,

          password: trimmedPassword,
        }
      );

      toast.success(
        "Registration Successful"
      );

      setFormData({

        name: "",

        email: "",

        phone: "",

        address: "",

        password: "",
      });

    }

    catch(error: any){

      toast.error(

        error.response?.data?.message ||

        "Registration failed"
      );
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card register-card">

        <div className="auth-header">

          <h1>
            Create Account
          </h1>

          <p>
            Register as a customer
          </p>

        </div>

        <form onSubmit={handleRegister}>

          <div className="input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter name"
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="Enter phone number"
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              placeholder="Enter address"
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
              value={formData.password}
              placeholder="Create password"
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
          >

            Register

          </button>

        </form>

      </div>

    </div>
  );
}