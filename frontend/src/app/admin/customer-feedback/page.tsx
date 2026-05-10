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
            className="bg-slate-900 p-6 rounded-xl"
          >

            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              Customer ID:
              {" "}
              {item.customer_id}
            </h2>

            <p className="mb-3">
              Rating:
              {" "}
              {"⭐".repeat(item.rating)}
            </p>

            <p>
              {item.message}
            </p>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}