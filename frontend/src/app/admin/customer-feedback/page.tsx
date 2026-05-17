"use client";

import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CustomerFeedbackPage() {

  const [feedbacks, setFeedbacks] =
    useState<any[]>([]);

  const fetchFeedbacks = async () => {

    try {

      const response = await API.get(
        "/admin/view-feedbacks"
      );

      setFeedbacks(
        response.data.feedbacks
      );

    }

    catch{

      toast.error(
        "Failed to load feedbacks"
      );
    }
  };

  useEffect(() => {

    fetchFeedbacks();

  }, []);

  return (

    <DashboardLayout role="admin">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Customer Feedbacks
      </h1>

      <div className="grid grid-cols-2 gap-6">

        {feedbacks.map((item) => (

          <div
            key={item.id}
            className="bg-slate-900 p-6 rounded-xl border border-slate-800"
          >

            <h2 className="text-2xl font-bold text-orange-400 mb-3">
              Customer #{item.customer_id}
            </h2>

            <p className="mb-2 text-gray-300">
              Distributor ID:
              {" "}
              {item.distributor_id}
            </p>

            <p className="mb-2 text-gray-300">
              Booking ID:
              {" "}
              {item.booking_id}
            </p>

            <p className="mb-4 text-yellow-400 text-xl">
              {"⭐".repeat(item.rating)}
            </p>

            <div className="bg-slate-800 p-4 rounded-lg text-gray-200">
              {item.feedback_message}
            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}