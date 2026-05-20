"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./add-distributor.css";

export default function AddDistributorPage() {

  const [formData, setFormData] =
    useState({

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

      [e.target.name]:
        e.target.value,
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

      <div className="add-distributor-page">

        <div className="page-header">

          <h1>
            Add Distributor
          </h1>

          <p>
            Register and manage new fuel distributors.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="distributor-form"
        >

          <div className="form-grid">

            <div className="input-group">

              <label>
                Distributor Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter distributor name"
                value={formData.name}
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
                placeholder="Enter email"
                value={formData.email}
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
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
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
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="input-group">

            <label>
              Address
            </label>

            <textarea
              name="address"
              placeholder="Enter distributor address"
              value={formData.address}
              onChange={(e) =>
                setFormData({

                  ...formData,

                  address:
                    e.target.value,
                })
              }
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
          >

            Add Distributor

          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}