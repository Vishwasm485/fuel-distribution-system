"use client";

import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function RevenuePage() {

  const [revenues, setRevenues] =
    useState<any[]>([]);

  const distributor = JSON.parse(
    localStorage.getItem("distributor") || "{}"
  );

  const fetchRevenue = async () => {

    if(!distributor.id) return;

    try {

      const response = await API.get(
        `/distributor/view-revenue/${distributor.id}`
      );

      setRevenues(
        response.data.revenue
      );

    }

    catch{

      toast.error(
        "Failed to fetch revenue"
      );
    }
  };

  useEffect(() => {

    fetchRevenue();

  }, []);

  return (

    <DashboardLayout role="distributor">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Revenue Details
      </h1>

      <div className="overflow-auto">

        <table className="w-full bg-slate-900 rounded-xl overflow-hidden">

          <thead className="bg-orange-500">

            <tr>

              <th className="p-4">
                Date
              </th>

              <th className="p-4">
                Fuel Type
              </th>

              <th className="p-4">
                Total Quantity
              </th>

              <th className="p-4">
                Total Revenue
              </th>

            </tr>

          </thead>

          <tbody>

            {revenues.map((revenue, index) => (

              <tr
                key={index}
                className="border-b border-slate-700"
              >

                <td className="p-4">
                  {revenue.date}
                </td>

                <td className="p-4">
                  {revenue.fuel_type}
                </td>

                <td className="p-4">
                  {revenue.total_quantity}
                </td>

                <td className="p-4 text-green-400 font-bold">
                  ₹ {revenue.total_price}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}