Fuel Distribution System

A full-stack Fuel Distribution Management System built using Next.js, TypeScript, Flask, and MySQL.
The platform allows customers to book fuel online, distributors to manage fuel pricing and bookings, and administrators to monitor the entire system through dedicated dashboards.

Features
Customer Module
Customer Registration & Login
Search Fuel Distributors
Book Fuel Online
Payment System Integration
Booking Status Tracking
View Booking History
Submit Feedback & Ratings
Distributor Module
Distributor Login
Add Fuel Prices
Update/Delete Fuel Prices
Manage Customer Bookings
Accept / Reject Deliveries
Revenue Management Dashboard
Admin Module
Admin Dashboard
Add & Manage Distributors
View Customers
Monitor Feedback
Platform Statistics
Tech Stack
Frontend
Next.js 16
TypeScript
CSS Modules / Custom CSS
React Hot Toast
Framer Motion
Lucide React
Backend
Flask
SQLAlchemy
Flask Blueprint Architecture
REST APIs
Database
MySQL
Project Structure
fuel-distribution-system/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── run.py
│
└── README.md
Installation
Clone Repository
git clone https://github.com/YOUR_USERNAME/fuel-distribution-system.git
Frontend Setup
cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:3000
Backend Setup
cd backend

pip install -r requirements.txt

Run Flask Server:

python run.py

Backend runs on:

http://127.0.0.1:5000
Environment Variables

Create .env files if needed.

Example:

DATABASE_URL=mysql://username:password@localhost/fuel_db
SECRET_KEY=your_secret_key
Main Functionalities
Secure Authentication
Role Based Access
Fuel Booking System
Payment Handling
Distributor Management
Booking Tracking
Revenue Monitoring
Feedback Management
UI Improvements
Responsive Dashboards
Separate Modular CSS Files
Optimized Card Layouts
Professional Sidebar Navigation
Interactive Status Components
Payment Modal UI
Future Enhancements
Real Payment Gateway Integration
Email Notifications
Fuel Delivery Tracking
Analytics Dashboard
JWT Authentication
Mobile Responsive Enhancements
Author

Developed by Vishwas M

License

This project is developed for educational and portfolio purposes.
