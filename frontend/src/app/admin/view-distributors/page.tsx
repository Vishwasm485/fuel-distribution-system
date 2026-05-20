"use client";

import {

  useEffect,

  useState

} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./view-distributors.css";

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

      <div className="distributors-page">

        <div className="distributors-header">

          <h1>
            View Distributors
          </h1>

          <p>
            Manage registered fuel distributors across the platform.
          </p>

        </div>

        <div className="distributors-grid">

          {distributors.map((item) => (

            <div
              key={item.id}
              className="distributor-card"
            >

              <div className="distributor-top">

                <div className="distributor-avatar">

                  {item.name?.charAt(0)}

                </div>

                <div>

                  <h2>
                    {item.name}
                  </h2>

                  <p>
                    Distributor ID:
                    {" "}
                    {item.id}
                  </p>

                </div>

              </div>

              <div className="distributor-info">

                <div className="info-box">

                  <span>
                    Email
                  </span>

                  <p>
                    {item.email}
                  </p>

                </div>

                <div className="info-box">

                  <span>
                    Phone
                  </span>

                  <p>
                    {item.phone}
                  </p>

                </div>

                <div className="info-row">

                  <div className="info-box">

                    <span>
                      City
                    </span>

                    <p>
                      {item.city}
                    </p>

                  </div>

                  <div className="info-box">

                    <span>
                      Pincode
                    </span>

                    <p>
                      {item.pincode}
                    </p>

                  </div>

                </div>

                <div className="info-box">

                  <span>
                    Address
                  </span>

                  <textarea
                    readOnly
                    value={item.address}
                  />

                </div>

              </div>

              <button
                onClick={() =>
                  handleDelete(item.id)
                }
                className="delete-btn"
              >

                Delete Distributor

              </button>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}