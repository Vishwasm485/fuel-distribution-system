
from flask import request, jsonify
from flask_jwt_extended import create_access_token

from app.config.db import db

from app.models.customer.customer_model import Customer
from app.models.distributor.distributor_model import Distributor
from datetime import datetime
import uuid

from app.models.fuel_model import FuelPrice
from app.models.booking_model import Booking
from app.models.payment_model import Payment
from app.models.feedback_model import Feedback
# =========================================
# CUSTOMER REGISTER
# =========================================

def customer_register():

    data = request.get_json()

    email_exists = Customer.query.filter_by(
        email=data.get("email")
    ).first()

    if not data.get("name") \
    or not data.get("email") \
    or not data.get("phone") \
    or not data.get("address") \
    or not data.get("password"):

        return jsonify({

            "success": False,

            "message":
                "All fields are required"

        }), 400

    if email_exists:
        return jsonify({
            "success": False,
            "message": "Email already exists"
        }), 400

    customer = Customer(
        name=data.get("name"),
        email=data.get("email"),
        phone=data.get("phone"),
        address=data.get("address"),
        password=data.get("password")
    )

    db.session.add(customer)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Customer registered successfully"
    }), 201


# =========================================
# CUSTOMER LOGIN
# =========================================

def customer_login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    customer = Customer.query.filter_by(
        email=email
    ).first()

    if not customer:
        return jsonify({
            "success": False,
            "message": "Customer not found"
        }), 404

    if customer.password != password:
        return jsonify({
            "success": False,
            "message": "Invalid password"
        }), 401

    access_token = create_access_token(
        identity={
            "id": customer.id,
            "role": "customer"
        }
    )

    return jsonify({

    "success": True,

    "token": access_token,

    "customer": {

        "id": customer.id,

        "name": customer.name,

        "email": customer.email
    }

}), 200


# =========================================
# VIEW DISTRIBUTORS
# =========================================

def view_distributors():

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
# SEARCH DISTRIBUTORS
# =========================================

def search_distributors():

    search = request.args.get("search")

    distributors = Distributor.query.filter(
        Distributor.city.ilike(f"%{search}%")
    ).all()

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
# VIEW DISTRIBUTOR FUEL PRICES
# =========================================

def distributor_fuel_prices(distributor_id):

    fuels = FuelPrice.query.filter_by(
        distributor_id=distributor_id
    ).all()

    fuel_list = []

    for fuel in fuels:

        fuel_list.append({
            "fuel_price_id": fuel.id,
            "fuel_type": fuel.fuel_type,
            "price": float(fuel.price)
        })

    return jsonify({
        "success": True,
        "fuels": fuel_list
    }), 200
# =========================================
# BOOK FUEL
# =========================================

def book_fuel():

    data = request.get_json()

    booking_unique_id = "BK" + str(uuid.uuid4())[:8]

    fuel = FuelPrice.query.get(
        data.get("fuel_price_id")
    )

    if not fuel:

        return jsonify({

            "success": False,

            "message":
                "Fuel not found"

        }), 404

    quantity = float(
        data.get("quantity")
    )

    total_price = (
        quantity * float(fuel.price)
    )

    booking = Booking(

        booking_id =
            booking_unique_id,

        customer_id =
            data.get("customer_id"),

        distributor_id =
            data.get("distributor_id"),

        fuel_price_id =
            fuel.id,

        booking_date =
            datetime.now().date(),

        fuel_type =
            fuel.fuel_type,

        quantity =
            quantity,

        price_per_liter =
            fuel.price,

        total_price =
            total_price,

        delivery_pincode =
            data.get(
                "delivery_pincode"
            ),

        delivery_address =
            data.get(
                "delivery_address"
            ),

        landmark =
            data.get("landmark"),

        booking_status =
            "Pending"
    )

    db.session.add(booking)

    db.session.commit()

    return jsonify({

        "success": True,

        "message":
            "Booking request sent",

        "booking_id":
            booking.booking_id,

        "total_price":
            total_price

    }), 201
# =========================================
# MY BOOKINGS
# =========================================

def my_bookings(customer_id):

    bookings = Booking.query.filter_by(
        customer_id=customer_id
    ).all()

    booking_list = []

    for booking in bookings:

        payment = Payment.query.filter_by(
            booking_id=booking.id
        ).first()

        booking_list.append({

            "id":
                booking.id,

            "booking_id":
                booking.booking_id,

            "booking_date":
                str(booking.booking_date),

            "fuel_type":
                booking.fuel_type,

            "quantity":
                float(booking.quantity),

            "price":
                float(booking.total_price),

            "delivery_address":
                booking.delivery_address,

            "status":
                booking.booking_status,

            "payment_mode":
                booking.payment_mode
                if booking.payment_mode
                else "Not Paid",

            "payment_status":
                booking.payment_status
                if booking.payment_status
                else "Pending",
        })

    return jsonify({

        "success": True,

        "bookings":
            booking_list

    }), 200
# =========================================
# ADD FEEDBACK
# =========================================

def add_feedback():

    data = request.get_json()

    print(data)

    customer_id = data.get(
        "customer_id"
    )

    distributor_id = data.get(
        "distributor_id"
    )

    rating = data.get(
        "rating"
    )

    feedback_message = data.get(
        "feedback_message"
    )

    # =========================================
    # VALIDATION
    # =========================================

    if not distributor_id:

        return jsonify({

            "message":
                "Distributor ID required"

        }), 400

    if not feedback_message:

        return jsonify({

            "message":
                "Feedback message required"

        }), 400
    
    if not rating:

        return jsonify({

            "message":
                "Rating required"

        }), 400

    existing_feedback = Feedback.query.filter_by(

        customer_id=customer_id,

        distributor_id=distributor_id

    ).first()

    if existing_feedback:

        return jsonify({

            "message":
                "Feedback already submitted"

        }), 400
    # =========================================
    # CREATE FEEDBACK
    # =========================================

    feedback = Feedback(

        customer_id =
            customer_id,

        distributor_id =
            distributor_id,

        rating =
            rating,

        feedback_message =
            feedback_message
    )

    db.session.add(feedback)

    db.session.commit()

    return jsonify({

        "message":
            "Feedback added successfully"

    }), 201
# =========================================
# MAKE PAYMENT
# =========================================

def make_payment():

    data = request.get_json()

    booking_id = data.get(
        "booking_id"
    )

    payment_mode = data.get(
        "payment_mode"
    )

    # =========================================
    # GET BOOKING FIRST
    # =========================================

    booking = Booking.query.get(
        booking_id
    )

    if not booking:

        return jsonify({

            "success": False,

            "message":
                "Booking not found"

        }), 404

    # =========================================
    # ONLY ACCEPTED BOOKINGS
    # =========================================

    if booking.booking_status != "Accepted":

        return jsonify({

            "success": False,

            "message":
                "Booking not accepted yet"

        }), 400

    # =========================================
    # REJECTED BOOKINGS CANNOT PAY
    # =========================================

    if booking.booking_status == "Rejected":

        return jsonify({

            "success": False,

            "message":
                "Rejected booking"

        }), 400

    # =========================================
    # PREVENT DUPLICATE PAYMENT
    # =========================================

    existing_payment = Payment.query.filter_by(
        booking_id=booking.id
    ).first()

    if existing_payment:

        return jsonify({

            "success": False,

            "message":
                "Payment already completed"

        }), 400

    # =========================================
    # SECURE AMOUNT
    # =========================================

    amount = booking.total_price

    # =========================================
    # CREATE PAYMENT
    # =========================================

    payment = Payment(

        booking_id =
            booking.id,

        payment_mode =
            payment_mode,

        amount =
            amount,

        payment_status =
            "Success"
    )

    db.session.add(payment)
    booking.payment_mode = payment_mode

    booking.payment_status = "Success"

    db.session.commit()

    return jsonify({

        "success": True,

        "message":
            "Payment Successful"

    }), 201