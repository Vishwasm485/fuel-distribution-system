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

import PaymentModal from "@/components/common/PaymentModal";

export default function BookFuelPage() {

  const searchParams =
    useSearchParams();

  const router =
    useRouter();

  const distributorId =
    searchParams.get("distributor_id");

  const [fuels, setFuels] =
    useState<any[]>([]);

  const [paymentOpen, setPaymentOpen] =
    useState(false);

  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fuel_price_id: "",
      quantity: "",
      delivery_pincode: "",
      delivery_address: "",
      landmark: "",
      payment_mode: "UPI",
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

      setPaymentOpen(true);

      setPaymentSuccess(false);

      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

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

      setPaymentSuccess(true);

      toast.success(
        "Fuel Booking Successful"
      );

      setTimeout(() => {

        setPaymentOpen(false);

        router.push(
          "/customer/my-bookings"
        );

      }, 2000);

    }

    catch(error: any){

      setPaymentOpen(false);

      toast.error(
        error.response?.data?.message ||
        "Booking failed"
      );
    }
  };

  return (

    <>

      <PaymentModal
        open={paymentOpen}
        success={paymentSuccess}
      />

      <DashboardLayout role="customer">

        <h1 className="text-4xl font-bold text-orange-400 mb-8">
          Book Fuel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-xl max-w-2xl"
        >
          <select
            value={formData.fuel_price_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                fuel_price_id: e.target.value,
              })
            }
            className="w-full p-3 rounded mb-4"
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
            className="w-full p-3 rounded mb-4"
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
            className="w-full p-3 rounded mb-4"
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
            className="w-full p-3 rounded mb-4 h-32"
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
            className="w-full p-3 rounded mb-4"
          />

          <select
            value={formData.payment_mode}
            onChange={(e) =>
              setFormData({
                ...formData,
                payment_mode:
                  e.target.value,
              })
            }
            className="w-full p-3 rounded mb-6"
          >

            <option value="UPI">
              UPI
            </option>

            <option value="Card">
              Card
            </option>

          </select>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg"
          >
            Book Fuel
          </button>

        </form>

      </DashboardLayout>

    </>

  );
}