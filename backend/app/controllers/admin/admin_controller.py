from flask import request, jsonify
from flask_jwt_extended import create_access_token

from app.config.db import db

from app.models.admin.admin_model import Admin
from app.models.distributor.distributor_model import Distributor
from app.models.feedback_model import Feedback

from app.models.customer.customer_model import Customer
from app.models.booking_model import Booking

# =========================================
# ADMIN LOGIN
# =========================================

def admin_login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    admin = Admin.query.filter_by(email=email).first()

    if not admin:
        return jsonify({
            "success": False,
            "message": "Admin not found"
        }), 404

    if admin.password != password:
        return jsonify({
            "success": False,
            "message": "Invalid password"
        }), 401

    access_token = create_access_token(
        identity={
            "id": admin.id,
            "role": "admin"
        }
    )

    return jsonify({
        "success": True,
        "message": "Login successful",
        "token": access_token
    }), 200


# =========================================
# ADD DISTRIBUTOR
# =========================================

def add_distributor():

    data = request.get_json()

    email_exists = Distributor.query.filter_by(
        email=data.get("email")
    ).first()

    if email_exists:
        return jsonify({
            "success": False,
            "message": "Distributor email already exists"
        }), 400

    distributor = Distributor(
        name=data.get("name"),
        email=data.get("email"),
        phone=data.get("phone"),
        city=data.get("city"),
        pincode=data.get("pincode"),
        address=data.get("address"),
        password=data.get("password")
    )

    db.session.add(distributor)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Distributor added successfully"
    }), 201


# =========================================
# VIEW DISTRIBUTORS
# =========================================

def get_distributors():

    distributors = Distributor.query.all()

    distributor_list = []

    for distributor in distributors:

        distributor_list.append({
            "id": distributor.id,
            "name": distributor.name,
            "email": distributor.email,
            "phone": distributor.phone,
            "city": distributor.city,
            "pincode": distributor.pincode,
            "address": distributor.address
        })

    return jsonify({
        "success": True,
        "distributors": distributor_list
    }), 200

# =========================================
# VIEW CUSTOMERS
# =========================================

def get_customers():

    customers = Customer.query.all()

    customer_list = []

    for customer in customers:

        customer_list.append({

            "id":
                customer.id,

            "name":
                customer.name,

            "email":
                customer.email,

            "phone":
                customer.phone,

            "address":
                customer.address
        })

    return jsonify({

        "success": True,

        "customers":
            customer_list

    }), 200

# =========================================
# UPDATE DISTRIBUTOR
# =========================================

def update_distributor(id):

    distributor = Distributor.query.get(id)

    if not distributor:
        return jsonify({
            "success": False,
            "message": "Distributor not found"
        }), 404

    data = request.get_json()

    distributor.phone = data.get(
        "phone",
        distributor.phone
    )

    distributor.pincode = data.get(
        "pincode",
        distributor.pincode
    )

    distributor.address = data.get(
        "address",
        distributor.address
    )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Distributor updated successfully"
    }), 200


# =========================================
# DELETE DISTRIBUTOR
# =========================================

def delete_distributor(id):

    distributor = Distributor.query.get(id)

    if not distributor:
        return jsonify({
            "success": False,
            "message": "Distributor not found"
        }), 404

    db.session.delete(distributor)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Distributor deleted successfully"
    }), 200
# =========================================
# VIEW FEEDBACK
# =========================================

def view_feedbacks():

    feedbacks = Feedback.query.all()

    feedback_list = []

    for feedback in feedbacks:

        feedback_list.append({

            "id": feedback.id,

            "booking_id":
                feedback.booking_id,

            "customer_id":
                feedback.customer_id,

            "distributor_id":
                feedback.distributor_id,

            "rating":
                feedback.rating,

            "feedback_message":
                feedback.feedback_message,

            "created_at":
                feedback.created_at
        })

    return jsonify({

        "success": True,

        "feedbacks": feedback_list

    }), 200
# =========================================
# ADMIN DASHBOARD STATS
# =========================================

def admin_dashboard_stats():
    total_distributors = Distributor.query.count()
    total_customers = Customer.query.count()
    total_bookings = Booking.query.count()

    return jsonify({
        "success": True,
        "total_distributors": total_distributors,
        "total_customers": total_customers,
        "total_bookings": total_bookings
    }), 200
