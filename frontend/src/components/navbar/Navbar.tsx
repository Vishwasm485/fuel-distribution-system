"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-900 shadow-lg px-10 py-5 flex items-center justify-between">

      <h1 className="text-2xl font-bold text-orange-400">
        Fuel Distribution
      </h1>

      <div className="flex items-center gap-6">

        <Link href="/">
          Home
        </Link>

        <Link href="/login">
          Login
        </Link>

        <Link href="/register">
          Register
        </Link>

      </div>

    </nav>
  );
}