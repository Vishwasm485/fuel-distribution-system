"use client";

import {

  useEffect,

  useState

} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./customer-feedback.css";

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

      <div className="feedback-page">

        <div className="feedback-header">

          <h1>
            Customer Feedbacks
          </h1>

          <p>
            Monitor customer reviews and distributor service quality.
          </p>

        </div>

        <div className="feedback-grid">

          {feedbacks.map((item) => (

            <div
              key={item.id}
              className="feedback-card"
            >

              <div className="feedback-top">

                <div>

                  <h2>
                    Customer #{item.customer_id}
                  </h2>

                  <p>
                    Distributor ID:
                    {" "}
                    {item.distributor_id}
                  </p>

                </div>

                <div className="rating-box">

                  {"⭐".repeat(item.rating)}

                </div>

              </div>

              <div className="feedback-message">

                {item.feedback_message}

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}