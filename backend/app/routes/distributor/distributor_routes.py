from flask import Blueprint

from app.controllers.distributor.distributor_controller import (
    distributor_login,
    add_fuel_price,
    view_fuel_prices,
    update_fuel_price,
    view_bookings,
    accept_booking,
    reject_booking,
    mark_delivered,
    view_revenue
)
distributor_bp = Blueprint(
    "distributor_bp",
    __name__
)


# =========================================
# DISTRIBUTOR LOGIN
# =========================================

@distributor_bp.route(
    "/login",
    methods=["POST"]
)
def login():
    return distributor_login()


# =========================================
# ADD FUEL PRICE
# =========================================

@distributor_bp.route(
    "/add-fuel-price",
    methods=["POST"]
)
def add_fuel():
    return add_fuel_price()


# =========================================
# VIEW FUEL PRICES
# =========================================

@distributor_bp.route(
    "/view-fuel-prices/<int:distributor_id>",
    methods=["GET"]
)
def view_fuels(distributor_id):
    return view_fuel_prices(distributor_id)


# =========================================
# UPDATE FUEL PRICE
# =========================================

@distributor_bp.route(
    "/update-fuel-price/<int:id>",
    methods=["PUT"]
)
def update_fuel(id):
    return update_fuel_price(id)

# =========================================
# VIEW BOOKINGS
# =========================================

@distributor_bp.route(
    "/view-bookings/<int:distributor_id>",
    methods=["GET"]
)
def bookings(distributor_id):
    return view_bookings(distributor_id)


# =========================================
# ACCEPT BOOKING
# =========================================

@distributor_bp.route(
    "/accept-booking/<int:id>",
    methods=["PUT"]
)
def accept(id):
    return accept_booking(id)


# =========================================
# REJECT BOOKING
# =========================================

@distributor_bp.route(
    "/reject-booking/<int:id>",
    methods=["PUT"]
)
def reject(id):
    return reject_booking(id)


# =========================================
# DELIVERED STATUS
# =========================================

@distributor_bp.route(
    "/mark-delivered/<int:id>",
    methods=["PUT"]
)
def delivered(id):
    return mark_delivered(id)


# =========================================
# VIEW REVENUE
# =========================================

@distributor_bp.route(
    "/view-revenue/<int:distributor_id>",
    methods=["GET"]
)
def revenue(distributor_id):
    return view_revenue(distributor_id)