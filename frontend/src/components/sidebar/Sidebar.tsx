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

    <div className="w-70 min-h-screen bg-slate-900/90 backdrop-blur-lg border-r border-slate-700 p-6 flex flex-col justify-between">

      <div>

        <h1 className="text-3xl font-extrabold text-orange-400 mb-12 tracking-wide">
          Fuel System
        </h1>

        <div className="flex flex-col gap-4">

          {links.map((link, index) => (

            <Link
              key={index}
              href={link.path}
              className="flex items-center gap-3 bg-slate-800 hover:bg-orange-500 transition-all duration-300 px-5 py-4 rounded-xl shadow-md hover:translate-x-2"
            >

              {link.icon}

              <span className="font-medium">
                {link.name}
              </span>

            </Link>

          ))}

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all px-5 py-4 rounded-xl font-semibold"
      >

        <LogOut size={20} />

        Logout

      </button>

    </div>
  );
}