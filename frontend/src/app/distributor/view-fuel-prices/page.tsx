"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ViewFuelPricesPage() {

  const [distributorId, setDistributorId] =
    useState("");

  const [fuelPrices, setFuelPrices] =
    useState<any[]>([]);

  const fetchFuelPrices = async () => {

    if(!distributorId) return;

    try {

      const response = await API.get(
        `/distributor/view-fuel-prices/${distributorId}`
      );

      setFuelPrices(
        response.data.fuel_prices
      );

    }

    catch{

      toast.error(
        "Failed to fetch fuel prices"
      );
    }
  };

  useEffect(() => {

    fetchFuelPrices();

  }, [distributorId]);

  return (

    <DashboardLayout role="distributor">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        View Fuel Prices
      </h1>

      <input
        type="number"
        placeholder="Enter Distributor ID"
        value={distributorId}
        onChange={(e) =>
          setDistributorId(e.target.value)
        }
        className="p-3 rounded mb-6 w-75"
      />

      <div className="overflow-auto">

        <table className="w-full bg-slate-900 rounded-xl overflow-hidden">

          <thead className="bg-orange-500">

            <tr>

              <th className="p-4">
                Fuel Type
              </th>

              <th className="p-4">
                Price
              </th>

            </tr>

          </thead>

          <tbody>

            {fuelPrices.map((fuel) => (

              <tr
                key={fuel.id}
                className="border-b border-slate-700"
              >

                <td className="p-4">
                  {fuel.fuel_type}
                </td>

                <td className="p-4">
                  ₹ {fuel.price}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}