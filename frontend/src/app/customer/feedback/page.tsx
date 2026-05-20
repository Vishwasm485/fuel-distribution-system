"use client";

import {
  useState,
  useEffect
} from "react";

import { Star } from "lucide-react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./feedback.css";

export default function FeedbackPage() {

  const [customer, setCustomer] =
    useState<any>(null);

  const [distributors, setDistributors] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [selectedDistributor,
  setSelectedDistributor] =
    useState("");

  const [formData, setFormData] =
    useState({

      distributor_id: "",

      rating: "5",

      feedback_message: "",
    });

  useEffect(() => {

    const storedCustomer = JSON.parse(
      localStorage.getItem("customer") || "{}"
    );

    setCustomer(storedCustomer);

  }, []);

  const fetchDistributors = async () => {

    try {

      const response = await API.get(
        "/customer/view-distributors"
      );

      setDistributors(
        response.data.distributors
      );

    }

    catch{

      toast.error(
        "Failed to load distributors"
      );
    }
  };

  useEffect(() => {

    fetchDistributors();

  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
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

    if(!formData.distributor_id){

      toast.error(
        "Please select distributor"
      );

      return;
    }

    if(!formData.feedback_message){

      toast.error(
        "Please enter feedback"
      );

      return;
    }

    if(!customer?.id){

      toast.error(
        "Customer not found"
      );

      return;
    }

    try {

      await API.post(
        "/customer/add-feedback",
        {

          customer_id:
            customer.id,

          distributor_id:
            Number(formData.distributor_id),

          rating:
            Number(formData.rating),

          feedback_message:
            formData.feedback_message,
        }
      );

      toast.success(
        "Feedback Submitted"
      );

      setFormData({

        distributor_id: "",

        rating: "5",

        feedback_message: "",
      });

      setSearch("");

      setSelectedDistributor("");

    }

    catch{

      toast.error(
        "Failed to submit feedback"
      );
    }
  };

  return (

    <DashboardLayout role="customer">

      <div className="feedback-page">

        <div className="feedback-header">

          <h1>
            Customer Feedback
          </h1>

          <p>
            Share your distributor experience and service quality.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="feedback-form"
        >

          <div className="input-group">

            <label>
              Search Distributor
            </label>

            <input
              type="text"
              placeholder="Search by distributor name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="feedback-input"
            />

          </div>

          <div className="input-group">

            <label>
              Select Distributor
            </label>

            <select
              value={selectedDistributor}
              onChange={(e) => {

                setSelectedDistributor(
                  e.target.value
                );

                setFormData({

                  ...formData,

                  distributor_id:
                    e.target.value
                });
              }}
              className="feedback-input"
            >

              <option value="">
                Select Distributor
              </option>

              {

                distributors

                .filter((distributor) =>

                  distributor.name
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
                )

                .map((distributor) => (

                  <option
                    key={distributor.id}
                    value={distributor.id}
                  >

                    {distributor.name}
                    {" - "}
                    {distributor.city}

                  </option>

                ))
              }

            </select>

          </div>

          <div className="input-group">

            <label>
              Rating
            </label>

            <div className="star-row">

              {[1,2,3,4,5].map((star) => (

                <button
                  type="button"
                  key={star}
                  className="star-btn"
                  onClick={() =>
                    setFormData({

                      ...formData,

                      rating: String(star)
                    })
                  }
                >

                  <Star

                    size={28}

                    className={`

                    ${
                      Number(formData.rating) >= star

                      ?

                      "fill-yellow-400 text-yellow-400"

                      :

                      "text-slate-500"
                    }`}
                  />

                </button>

              ))}

            </div>

          </div>

          <div className="input-group">

            <label>
              Feedback Message
            </label>

            <textarea
              name="feedback_message"
              placeholder="Write your feedback..."
              value={formData.feedback_message}
              onChange={handleChange}
              className="feedback-textarea"
            />

          </div>

          <button
            type="submit"
            className="feedback-btn"
          >

            Submit Feedback

          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}