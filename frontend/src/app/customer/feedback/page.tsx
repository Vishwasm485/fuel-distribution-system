"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function FeedbackPage() {

  const [formData, setFormData] =
    useState({
      customer_id: "",
      rating: "5",
      message: "",
    });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await API.post(
        "/customer/add-feedback",
        {
          customer_id:
            Number(formData.customer_id),

          rating:
            Number(formData.rating),

          message:
            formData.message,
        }
      );

      toast.success(
        "Feedback Submitted"
      );

      setFormData({
        customer_id: "",
        rating: "5",
        message: "",
      });

    }

    catch{

      toast.error(
        "Failed to submit feedback"
      );
    }
  };

  return (

    <DashboardLayout role="customer">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Customer Feedback
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl max-w-xl"
      >

        <input
          type="number"
          placeholder="Customer ID"
          value={formData.customer_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              customer_id:
                e.target.value,
            })
          }
          className="w-full p-3 rounded mb-4"
        />

        <select
          value={formData.rating}
          onChange={(e) =>
            setFormData({
              ...formData,
              rating:
                e.target.value,
            })
          }
          className="w-full p-3 rounded mb-4"
        >

          <option value="5">
            ⭐⭐⭐⭐⭐
          </option>

          <option value="4">
            ⭐⭐⭐⭐
          </option>

          <option value="3">
            ⭐⭐⭐
          </option>

          <option value="2">
            ⭐⭐
          </option>

          <option value="1">
            ⭐
          </option>

        </select>

        <textarea
          placeholder="Feedback Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message:
                e.target.value,
            })
          }
          className="w-full p-3 rounded mb-6 h-40"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg"
        >
          Submit Feedback
        </button>

      </form>

    </DashboardLayout>
  );
}