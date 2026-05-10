"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import toast from "react-hot-toast";

import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function CustomerDistributorsPage() {

  const [distributors, setDistributors] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const fetchDistributors = async () => {

    try {

      let response;

      if(search){

        response = await API.get(
          `/customer/search-distributors?search=${search}`
        );
      }

      else{

        response = await API.get(
          "/customer/view-distributors"
        );
      }

      setDistributors(
        response.data.distributors
      );

    }

    catch{

      toast.error(
        "Failed to fetch distributors"
      );
    }
  };

  useEffect(() => {

    fetchDistributors();

  }, [search]);

  return (

    <DashboardLayout role="customer">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Fuel Distributors
      </h1>

      <input
        type="text"
        placeholder="Search by city..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="p-3 rounded mb-8 w-87.5"
      />

      <div className="grid grid-cols-3 gap-6">

        {distributors.map((item) => (

          <div
            key={item.id}
            className="bg-slate-900 p-6 rounded-xl"
          >

            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              {item.name}
            </h2>

            <p className="mb-2">
              Email: {item.email}
            </p>

            <p className="mb-2">
              Phone: {item.phone}
            </p>

            <p className="mb-2">
              City: {item.city}
            </p>

            <p className="mb-2">
              Pincode: {item.pincode}
            </p>

            <p className="mb-5">
              Address: {item.address}
            </p>

            <Link
              href={`/customer/book-fuel?distributor_id=${item.id}`}
              className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-lg inline-block"
            >
              Book Fuel
            </Link>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}