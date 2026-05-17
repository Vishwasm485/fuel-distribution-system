
from flask import request, jsonify
from flask_jwt_extended import create_access_token

from app.config.db import db

from app.models.distributor.distributor_model import Distributor
from app.models.fuel_model import FuelPrice

from sqlalchemy import func

from app.models.booking_model import Booking

# =========================================
# DISTRIBUTOR LOGIN
# =========================================

def distributor_login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    distributor = Distributor.query.filter_by(
        email=email
    ).first()

    if not distributor:
        return jsonify({
            "success": False,
            "message": "Distributor not found"
        }), 404

    if distributor.password != password:
        return jsonify({
            "success": False,
            "message": "Invalid password"
        }), 401

    access_token = create_access_token(
        identity={
            "id": distributor.id,
            "role": "distributor"
        }
    )

    return jsonify({

        "success": True,

        "token": access_token,

        "distributor": {

            "id": distributor.id,

            "name": distributor.name,

            "email": distributor.email
        }

    }), 200


# =========================================
# ADD FUEL PRICE
# =========================================

def add_fuel_price():

    data = request.get_json()

    distributor_id = data.get("distributor_id")
    fuel_type = data.get("fuel_type")
    price = data.get("price")

    fuel_exists = FuelPrice.query.filter_by(
        distributor_id=distributor_id,
        fuel_type=fuel_type
    ).first()

    if fuel_exists:
        return jsonify({
            "success": False,
            "message": "Fuel already exists. Please update fuel price."
        }), 400

    fuel = FuelPrice(
        distributor_id=distributor_id,
        fuel_type=fuel_type,
        price=price
    )

    db.session.add(fuel)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Fuel price added successfully"
    }), 201


# =========================================
# VIEW FUEL PRICES
# =========================================

def view_fuel_prices(distributor_id):

    fuel_prices = FuelPrice.query.filter_by(
        distributor_id=distributor_id
    ).all()

    fuel_list = []

    for fuel in fuel_prices:

        fuel_list.append({
            "id": fuel.id,
            "fuel_type": fuel.fuel_type,
            "price": float(fuel.price)
        })

    return jsonify({
        "success": True,
        "fuel_prices": fuel_list
    }), 200


# =========================================
# UPDATE FUEL PRICE
# =========================================

def update_fuel_price(id):

    fuel = FuelPrice.query.get(id)

    if not fuel:
        return jsonify({
            "success": False,
            "message": "Fuel not found"
        }), 404

    data = request.get_json()

    fuel.price = data.get(
        "price",
        fuel.price
    )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Fuel price updated successfully"
    }), 200
# =========================================
# VIEW BOOKINGS
# =========================================

def view_bookings(distributor_id):

    bookings = Booking.query.filter_by(
        distributor_id=distributor_id
    ).all()

    booking_list = []

    for booking in bookings:

        booking_list.append({

            "id": booking.id,

            "booking_id": booking.booking_id,

            "fuel_type": booking.fuel_type,

            "quantity": float(booking.quantity),

            "price": float(booking.total_price),

            "delivery_pincode": booking.delivery_pincode,

            "delivery_address": booking.delivery_address,

            "payment_mode": booking.payment_mode,

            "status": booking.booking_status,

            "customer_id": booking.customer_id
        })

    return jsonify({
        "success": True,
        "bookings": booking_list
    }), 200
# =========================================
# ACCEPT BOOKING
# =========================================

def accept_booking(id):

    booking = Booking.query.get(id)

    if not booking:
        return jsonify({
            "success": False,
            "message": "Booking not found"
        }), 404

    booking.booking_status = "Accepted"

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Booking accepted"
    }), 200
# =========================================
# REJECT BOOKING
# =========================================

def reject_booking(id):

    booking = Booking.query.get(id)

    if not booking:
        return jsonify({
            "success": False,
            "message": "Booking not found"
        }), 404

    booking.booking_status = "Rejected"

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Booking rejected"
    }), 200
# =========================================
# MARK AS DELIVERED
# =========================================

def mark_delivered(id):

    booking = Booking.query.get(id)

    if not booking:
        return jsonify({
            "success": False,
            "message": "Booking not found"
        }), 404

    booking.booking_status = "Delivered"

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Fuel delivered successfully"
    }), 200
# =========================================
# VIEW REVENUE
# =========================================

def view_revenue(distributor_id):

    revenue_data = db.session.query(

        Booking.booking_date,

        Booking.fuel_type,

        func.sum(Booking.quantity).label(
            "total_quantity"
        ),

        func.sum(Booking.total_price).label(
            "total_revenue"
        )

    ).filter(

        Booking.distributor_id == distributor_id,

        Booking.booking_status == "Delivered"

    ).group_by(

        Booking.booking_date,
        Booking.fuel_type

    ).all()

    revenue_list = []

    for revenue in revenue_data:

        revenue_list.append({

            "date": str(revenue.booking_date),

            "fuel_type": revenue.fuel_type,

            "total_quantity": float(
                revenue.total_quantity
            ),

            "total_price": float(
                revenue.total_revenue
            )
        })

    return jsonify({
        "success": True,
        "revenue": revenue_list
    }), 200

# =========================================
# Delete fuel price
# =========================================
def delete_fuel_price(id):

    fuel = FuelPrice.query.get(id)

    if not fuel:

        return jsonify({

            "success": False,

            "message": "Fuel not found"

        }), 404

    db.session.delete(fuel)

    db.session.commit()

    return jsonify({

        "success": True,

        "message": "Fuel deleted successfully"

    }), 200

# =========================================
# DISTRIBUTOR DASHBOARD
# =========================================

def distributor_dashboard(distributor_id):

    total_fuel_types = FuelPrice.query.filter_by(
        distributor_id=distributor_id
    ).count()

    total_bookings = Booking.query.filter_by(
        distributor_id=distributor_id
    ).count()

    revenue = db.session.query(
        func.sum(Booking.total_price)
    ).filter(
        Booking.distributor_id == distributor_id,
        Booking.booking_status == "Delivered"
    ).scalar()

    return jsonify({

        "success": True,

        "fuel_types":
            total_fuel_types,

        "total_bookings":
            total_bookings,

        "revenue":
            float(revenue or 0)

    }), 200