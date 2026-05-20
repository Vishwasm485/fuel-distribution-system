# Fuel Distribution System

A full-stack Fuel Distribution Management System built using **Next.js**, **TypeScript**, **Flask**, and **MySQL**.

This platform allows customers to book fuel online, distributors to manage fuel pricing and delivery operations, and administrators to monitor the entire system through dedicated dashboards.

---

# Features

## Customer Module

- Customer Registration & Login
- Search Fuel Distributors
- Book Fuel Online
- Fuel Booking Status Tracking
- Payment System Integration
- View Booking History
- Submit Feedback & Ratings

---

## Distributor Module

- Distributor Login
- Add Fuel Prices
- Update Fuel Prices
- Delete Fuel Prices
- Manage Customer Bookings
- Accept / Reject Orders
- Delivery Management
- Revenue Dashboard

---

## Admin Module

- Admin Dashboard
- Add New Distributors
- Manage Distributors
- View Customers
- Monitor Feedbacks
- System Statistics

---

# Tech Stack

## Frontend

- Next.js 16
- TypeScript
- Custom CSS
- React Hot Toast
- Framer Motion
- Lucide React

---

## Backend

- Flask
- SQLAlchemy
- REST APIs
- Flask Blueprints

---

## Database

- MySQL

---

# Project Structure

```bash
fuel-distribution-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/
│   │   │   ├── customer/
│   │   │   ├── distributor/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── globals.css
│   │   │   └── layout.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── navbar/
│   │   │   └── sidebar/
│   │   │
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── app/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   ├── admin/
│   │   │   ├── customer/
│   │   │   └── distributor/
│   │   │
│   │   ├── models/
│   │   │   ├── admin/
│   │   │   ├── customer/
│   │   │   └── distributor/
│   │   │
│   │   ├── routes/
│   │   │   ├── admin/
│   │   │   ├── customer/
│   │   │   └── distributor/
│   │   │
│   │   └── utils/
│   │
│   ├── run.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/fuel-distribution-system.git
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on:

```bash
http://localhost:3000
```

---

# Backend Setup

```bash
cd backend

pip install -r requirements.txt

python run.py
```

Backend will run on:

```bash
http://127.0.0.1:5000
```

---

# Environment Variables

Create `.env` file if required.

Example:

```env
DATABASE_URL=mysql://username:password@localhost/fuel_db
SECRET_KEY=your_secret_key
```

---

# Main Functionalities

- Secure Authentication
- Role-Based Dashboards
- Fuel Booking System
- Fuel Price Management
- Payment Handling
- Delivery Status Tracking
- Revenue Monitoring
- Feedback System
- Responsive UI

---

# UI Improvements

- Modular CSS Architecture
- Responsive Dashboard Layouts
- Optimized Card Designs
- Interactive Sidebar Navigation
- Payment Modal Interface
- Booking Status Indicators
- Modern Dark Theme

---

# Future Enhancements

- Real Payment Gateway Integration
- Email Notifications
- Fuel Delivery Tracking
- JWT Authentication
- Mobile App Version
- Analytics Dashboard

---

# Screenshots

Add project screenshots here.

Example:

```markdown
![Homepage](./screenshots/homepage.png)
```

---

# Author

## Vishwas M

MCA Student  
Full Stack Developer

---

# License

This project is developed for educational and portfolio purposes.
