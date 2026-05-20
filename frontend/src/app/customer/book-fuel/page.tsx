"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useSearchParams,
  useRouter
} from "next/navigation";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./book-fuel.css";

export default function BookFuelPage() {

  const searchParams =
    useSearchParams();

  const router =
    useRouter();

  const distributorId =
    searchParams.get("distributor_id");

  const [fuels, setFuels] =
    useState<any[]>([]);

  const [formData, setFormData] =
    useState({
      fuel_price_id: "",
      quantity: "",
      delivery_pincode: "",
      delivery_address: "",
      landmark: "",
    });

  const customer = JSON.parse(
    localStorage.getItem("customer") || "{}"
  );

  const fetchFuels = async () => {

    try {

      const response = await API.get(
        `/customer/distributor-fuel-prices/${distributorId}`
      );

      setFuels(
        response.data.fuels
      );

    }

    catch{

      toast.error(
        "Failed to fetch fuels"
      );
    }
  };

  useEffect(() => {

    if(distributorId){
      fetchFuels();
    }

  }, [distributorId]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await API.post(
        "/customer/book-fuel",
        {
          ...formData,

          customer_id:
            customer.id,

          distributor_id:
            Number(distributorId),

          fuel_price_id:
            Number(formData.fuel_price_id),

          quantity:
            Number(formData.quantity),
        }
      );

      toast.success(
        "Booking Request Sent"
      );

      router.push(
        "/customer/check-status"
      );

    }

    catch(error: any){

      toast.error(
        error.response?.data?.message ||
        "Booking failed"
      );
    }
  };

  return (

    <DashboardLayout role="customer">

      <div className="book-fuel-page">

        <h1 className="book-fuel-title">
          Book Fuel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="book-fuel-form"
        >

          <select
            value={formData.fuel_price_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                fuel_price_id: e.target.value,
              })
            }
            className="fuel-input"
          >

            <option value="">
              Select Fuel
            </option>

            {fuels.map((fuel) => (

              <option
                key={fuel.fuel_price_id}
                value={fuel.fuel_price_id}
              >

                {fuel.fuel_type}
                {" "}
                - ₹ {fuel.price}

              </option>

            ))}

          </select>

          <input
            type="number"
            placeholder="Quantity (Liters)"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: e.target.value,
              })
            }
            className="fuel-input"
          />

          <input
            type="text"
            placeholder="Delivery Pincode"
            value={formData.delivery_pincode}
            onChange={(e) =>
              setFormData({
                ...formData,
                delivery_pincode:
                  e.target.value,
              })
            }
            className="fuel-input"
          />

          <textarea
            placeholder="Delivery Address"
            value={formData.delivery_address}
            onChange={(e) =>
              setFormData({
                ...formData,
                delivery_address:
                  e.target.value,
              })
            }
            className="fuel-textarea"
          />

          <input
            type="text"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={(e) =>
              setFormData({
                ...formData,
                landmark:
                  e.target.value,
              })
            }
            className="fuel-input"
          />

          <button
            type="submit"
            className="fuel-submit-btn"
          >

            Book Fuel

          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}