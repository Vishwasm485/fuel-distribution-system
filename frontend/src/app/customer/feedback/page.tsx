"use client";

import {
  useState,
  useEffect
} from "react";

import { Star } from "lucide-react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function FeedbackPage() {
  const [distributors, setDistributors] =
  useState<any[]>([]);

  const [filteredDistributors, setFilteredDistributors] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");
  
  const customer = JSON.parse(
    localStorage.getItem("customer") || "{}"
  );

  const fetchDistributors = async () => {

    try {

      const response = await API.get(
        "/customer/view-distributors"
      );

      setDistributors(
        response.data.distributors
      );

      setFilteredDistributors(
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

  useEffect(() => {

  const filtered =
    distributors.filter((distributor) =>

      distributor.name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      distributor.city
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  setFilteredDistributors(filtered);

}, [search, distributors]);

  const [formData, setFormData] =
    useState({

      distributor_id: "",

      rating: "5",

      message: "",
    });
  const handleChange = (
    e: React.ChangeEvent<
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

          message:
            formData.message,
        }
      );

      toast.success(
        "Feedback Submitted"
      );

      setFormData({
        distributor_id: "",
        rating: "5",
        message: "",
        
      });
      setSearch: ("");

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
          type="text"
          placeholder="Search Distributor by Name or City"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800 mb-4"
        />

        <select
          name="distributor_id"
          value={formData.distributor_id}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 mb-4"
        >

          <option value="">
            Select Distributor
          </option>

          {filteredDistributors.map((distributor) => (

            <option
              key={distributor.id}
              value={distributor.id}
            >

              {distributor.name} ({distributor.city})

            </option>

          ))}

        </select>
         <div className="flex gap-2 mb-6">

            {[1,2,3,4,5].map((star) => (

              <button
                type="button"
                key={star}
                onClick={() =>
                  setFormData({

                    ...formData,

                    rating: String(star)
                  })
                }
              >

                <Star

                  size={34}

                  className={`transition-all duration-200

                  ${
                    Number(formData.rating) >= star

                    ?

                    "fill-yellow-400 text-yellow-400 scale-110"

                    :

                    "text-gray-500"
                  }`}
                />

              </button>

            ))}

          </div>
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