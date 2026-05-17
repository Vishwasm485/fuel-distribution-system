"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ViewFuelPricesPage() {

  const [fuelPrices, setFuelPrices] =
    useState<any[]>([]);

  const [distributor, setDistributor] =
    useState<any>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [newPrice, setNewPrice] =
    useState("");

  const updateFuel = async (
  id: number
) => {

  if(!newPrice){

    toast.error(
      "Enter new price"
    );

    return;
  }

  try {

    await API.put(
      `/distributor/update-fuel-price/${id}`,
      {
        price: Number(newPrice)
      }
    );

    toast.success(
      "Fuel Updated"
    );

    setEditingId(null);

    setNewPrice("");

    fetchFuelPrices();

  }

  catch{

    toast.error(
      "Update Failed"
    );
  }
};
  
  const fetchFuelPrices = async () => {

    if(!distributor?.id) return;

    try {

      const response = await API.get(
        `/distributor/view-fuel-prices/${distributor.id}`
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

    const storedDistributor = JSON.parse(
      localStorage.getItem("distributor") || "{}"
    );

    setDistributor(storedDistributor);

  }, []);

  useEffect(() => {

    if(distributor){

      fetchFuelPrices();
    }

  }, [distributor]);  

  const deleteFuel = async (
    id: number
  ) => {

    try {

      await API.delete(
        `/distributor/delete-fuel-price/${id}`
      );

      toast.success(
        "Fuel Deleted"
      );

      fetchFuelPrices();

    }

    catch{

      toast.error(
        "Delete Failed"
      );
    }
  };

  return (

    <DashboardLayout role="distributor">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        View Fuel Prices
      </h1>

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

              <th className="p-4">
                Actions
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
                <td className="p-4 flex gap-3">

                {

editingId === fuel.id

?

<div className="flex gap-2">

  <input
    type="number"
    placeholder="New Price"
    value={newPrice}
    onChange={(e) =>
      setNewPrice(e.target.value)
    }
    className="p-2 rounded bg-slate-800 w-28"
  />

  <button
    onClick={() =>
      updateFuel(
        fuel.id
      )
    }
    className="bg-green-500 px-3 py-2 rounded"
  >
    Save
  </button>

</div>

:

<button
  onClick={() => {

    setEditingId(
      fuel.id
    );

    setNewPrice(
      fuel.price
    );
  }}
  className="bg-blue-500 px-4 py-2 rounded"
>
  Update
</button>

}

                <button
                  onClick={() =>
                    deleteFuel(
                      fuel.id
                    )
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