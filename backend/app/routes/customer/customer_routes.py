from flask import Blueprint

from app.controllers.customer.customer_controller import (
    customer_register,
    customer_login,
    view_distributors,
    search_distributors,
    distributor_fuel_prices,
    book_fuel,
    my_bookings,
    make_payment,
    add_feedback
)

customer_bp = Blueprint(
    "customer_bp",
    __name__
)


# =========================================
# CUSTOMER REGISTER
# =========================================

@customer_bp.route(
    "/register",
    methods=["POST"]
)
def register():
    return customer_register()


# =========================================
# CUSTOMER LOGIN
# =========================================

@customer_bp.route(
    "/login",
    methods=["POST"]
)
def login():
    return customer_login()


# =========================================
# VIEW DISTRIBUTORS
# =========================================

@customer_bp.route(
    "/view-distributors",
    methods=["GET"]
)
def distributors():
    return view_distributors()


# =========================================
# SEARCH DISTRIBUTORS
# =========================================

@customer_bp.route(
    "/search-distributors",
    methods=["GET"]
)
def search():
    return search_distributors()
# =========================================
# DISTRIBUTOR FUEL PRICES
# =========================================

@customer_bp.route(
    "/distributor-fuel-prices/<int:distributor_id>",
    methods=["GET"]
)
def fuel_prices(distributor_id):
    return distributor_fuel_prices(distributor_id)


# =========================================
# BOOK FUEL
# =========================================

@customer_bp.route(
    "/book-fuel",
    methods=["POST"]
)
def booking():
    return book_fuel()


# =========================================
# MY BOOKINGS
# =========================================

@customer_bp.route(
    "/my-bookings/<int:customer_id>",
    methods=["GET"]
)
def bookings(customer_id):
    return my_bookings(customer_id)
# =========================================
# ADD FEEDBACK
# =========================================

@customer_bp.route(
    "/add-feedback",
    methods=["POST"]
)
def feedback():
    return add_feedback()
# =========================================
# MAKE PAYMENT
# =========================================

@customer_bp.route(
    "/make-payment",
    methods=["POST"]
)
def payment():

    return make_payment()