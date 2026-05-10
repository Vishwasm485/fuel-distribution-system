"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ViewDistributorsPage() {

  const [distributors, setDistributors] =
    useState<any[]>([]);

  const fetchDistributors = async () => {

    try {

      const response = await API.get(
        "/admin/view-distributors"
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

  const handleDelete = async (
    id: number
  ) => {

    try {

      await API.delete(
        `/admin/delete-distributor/${id}`
      );

      toast.success(
        "Distributor Deleted"
      );

      fetchDistributors();

    }

    catch{

      toast.error(
        "Delete failed"
      );
    }
  };

  return (

    <DashboardLayout role="admin">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        View Distributors
      </h1>

      <div className="overflow-auto">

        <table className="w-full bg-slate-900 rounded-xl overflow-hidden">

          <thead className="bg-orange-500">

            <tr>

              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">City</th>
              <th className="p-4">Pincode</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {distributors.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-700"
              >

                <td className="p-4">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.email}
                </td>

                <td className="p-4">
                  {item.phone}
                </td>

                <td className="p-4">
                  {item.city}
                </td>

                <td className="p-4">
                  {item.pincode}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="bg-red-500 px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}