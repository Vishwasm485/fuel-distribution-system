"use client";

import {

  useEffect,

  useState

} from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

import DashboardLayout from "@/components/layout/DashboardLayout";

import "./view-customers.css";

export default function ViewCustomersPage() {

  const [customers, setCustomers] =
    useState<any[]>([]);

  const fetchCustomers = async () => {

    try {

      const response = await API.get(
        "/admin/view-customers"
      );

      setCustomers(
        response.data.customers
      );

    }

    catch{

      toast.error(
        "Failed to fetch customers"
      );
    }
  };

  useEffect(() => {

    fetchCustomers();

  }, []);

  return (

    <DashboardLayout role="admin">

      <div className="customers-page">

        <div className="customers-header">

          <h1>
            View Customers
          </h1>

          <p>
            Manage and monitor registered customers.
          </p>

        </div>

        <div className="customers-grid">

          {customers.map((customer) => (

            <div
              key={customer.id}
              className="customer-card"
            >

              <div className="customer-top">

                <div className="customer-avatar">

                  {customer.name?.charAt(0)}

                </div>

                <div className="customer-name">

                  <h2>
                    {customer.name}
                  </h2>

                  <p>
                    Customer ID:
                    {" "}
                    {customer.id}
                  </p>

                </div>

              </div>

              <div className="customer-info">

                <div className="info-box">

                  <span>
                    Email
                  </span>

                  <p>
                    {customer.email}
                  </p>

                </div>

                <div className="info-box">

                  <span>
                    Phone
                  </span>

                  <p>
                    {customer.phone}
                  </p>

                </div>

                <div className="info-box">

                  <span>
                    Address
                  </span>

                  <textarea
                    readOnly
                    value={customer.address}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}