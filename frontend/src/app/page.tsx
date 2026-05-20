import Navbar from "@/components/navbar/Navbar";

import "./homepage.css";

export default function HomePage() {

  return (

    <div className="home-page">

      <Navbar />

      <section className="hero-section">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <span className="hero-badge">
            Smart Fuel Delivery Platform
          </span>

          <h1 className="hero-title">

            Fuel Distribution
            <span>
              Made Modern
            </span>

          </h1>

          <p className="hero-description">

            Streamline fuel booking, payments,
            distributor management, and live
            delivery tracking through one
            centralized digital platform.

          </p>

          <div className="hero-buttons">

            <a
              href="/login"
              className="primary-btn"
            >
              Login
            </a>

            <a
              href="/register"
              className="secondary-btn"
            >
              Register
            </a>

          </div>

        </div>

      </section>

      <section className="features-section">

        <div className="feature-card">

          <h2>
            Smart Booking
          </h2>

          <p>
            Book fuel instantly from trusted
            distributors with real-time status updates.
          </p>

        </div>

        <div className="feature-card">

          <h2>
            Secure Payments
          </h2>

          <p>
            UPI and Card payment system with
            QR support and transaction verification.
          </p>

        </div>

        <div className="feature-card">

          <h2>
            Live Delivery
          </h2>

          <p>
            Track fuel approval, delivery,
            and payment flow in real time.
          </p>

        </div>

      </section>

    </div>
  );
}