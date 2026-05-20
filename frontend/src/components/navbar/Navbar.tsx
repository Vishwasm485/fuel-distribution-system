"use client";

import Link from "next/link";

import "./navbar.css";

export default function Navbar() {

  return (

    <nav className="navbar">

      <div className="navbar-logo">

        <div className="logo-box">
          F
        </div>

        <div>

          <h1>
            FuelFlow
          </h1>

          <p>
            Smart Distribution
          </p>

        </div>

      </div>

      <div className="navbar-links">

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