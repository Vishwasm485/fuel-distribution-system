"use client";

import Link from "next/link";

import {

  LayoutDashboard,

  Fuel,

  Users,

  MessageSquare,

  IndianRupee,

  ClipboardList,

  LogOut,

} from "lucide-react";

import { useRouter } from "next/navigation";

import "./sidebar.css";

type SidebarProps = {

  role: string;
};

export default function Sidebar({

  role,

}: SidebarProps) {

  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    router.push("/login");
  };

  const adminLinks = [

    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Add Distributor",
      path: "/admin/add-distributor",
      icon: <Users size={20} />,
    },

    {
      name: "View Distributors",
      path: "/admin/view-distributors",
      icon: <Users size={20} />,
    },

    {
      name: "View Customers",
      path: "/admin/view-customers",
      icon: <Users size={20} />,
    },

    {
      name: "Feedback",
      path: "/admin/customer-feedback",
      icon: <MessageSquare size={20} />,
    },
  ];

  const distributorLinks = [

    {
      name: "Dashboard",
      path: "/distributor/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Add Fuel",
      path: "/distributor/add-fuel-price",
      icon: <Fuel size={20} />,
    },

    {
      name: "Fuel Prices",
      path: "/distributor/view-fuel-prices",
      icon: <Fuel size={20} />,
    },

    {
      name: "Bookings",
      path: "/distributor/view-bookings",
      icon: <ClipboardList size={20} />,
    },

    {
      name: "Revenue",
      path: "/distributor/view-revenue",
      icon: <IndianRupee size={20} />,
    },
  ];

  const customerLinks = [

    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Distributors",
      path: "/customer/distributors",
      icon: <Users size={20} />,
    },

    {
      name: "My Bookings",
      path: "/customer/my-bookings",
      icon: <ClipboardList size={20} />,
    },

    {
      name: "Check Status",
      path: "/customer/check-status",
      icon: <ClipboardList size={20} />,
    },

    {
      name: "Feedback",
      path: "/customer/feedback",
      icon: <MessageSquare size={20} />,
    },
  ];

  let links = customerLinks;

  if(role === "admin"){
    links = adminLinks;
  }

  else if(role === "distributor"){
    links = distributorLinks;
  }

  return (

    <aside className="sidebar">

      <div>

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            F
          </div>

          <div>

            <h1>
              FuelFlow
            </h1>

            <p>
              Control Panel
            </p>

          </div>

        </div>

        <div className="sidebar-links">

          {links.map((link, index) => (

            <Link
              key={index}
              href={link.path}
              className="sidebar-link"
            >

              <span className="sidebar-icon">

                {link.icon}

              </span>

              <span>

                {link.name}

              </span>

            </Link>

          ))}

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="logout-btn"
      >

        <LogOut size={20} />

        Logout

      </button>

    </aside>
  );
}