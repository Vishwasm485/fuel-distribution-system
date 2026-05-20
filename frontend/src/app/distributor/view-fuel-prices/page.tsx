"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./view-fuel-prices.css";

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

      <div className="fuel-page">

        <div className="fuel-header">

          <h1>
            Fuel Prices
          </h1>

          <p>
            Manage fuel pricing and update latest rates.
          </p>

        </div>

        <div className="fuel-grid">

          {fuelPrices.map((fuel) => (

            <div
              key={fuel.id}
              className="fuel-card"
            >

              <div className="fuel-top">

                <div>

                  <span className="fuel-label">
                    Fuel Type
                  </span>

                  <h2>
                    {fuel.fuel_type}
                  </h2>

                </div>

                <div className="fuel-price">

                  ₹ {fuel.price}

                </div>

              </div>

              {

                editingId === fuel.id

                ?

                <div className="edit-section">

                  <input
                    type="number"
                    placeholder="New Price"
                    value={newPrice}
                    onChange={(e) =>
                      setNewPrice(e.target.value)
                    }
                    className="fuel-input"
                  />

                  <button
                    onClick={() =>
                      updateFuel(fuel.id)
                    }
                    className="save-btn"
                  >

                    Save

                  </button>

                </div>

                :

                <div className="fuel-actions">

                  <button
                    onClick={() => {

                      setEditingId(
                        fuel.id
                      );

                      setNewPrice(
                        fuel.price
                      );
                    }}
                    className="update-btn"
                  >

                    Update

                  </button>

                  <button
                    onClick={() =>
                      deleteFuel(fuel.id)
                    }
                    className="delete-btn"
                  >

                    Delete

                  </button>

                </div>
              }

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}