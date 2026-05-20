from flask import Blueprint
from app.controllers.admin.admin_controller import (
    admin_login,
    add_distributor,
    get_customers,
    get_distributors,
    update_distributor,
    delete_distributor,
    view_feedbacks,
    admin_dashboard_stats
)

admin_bp = Blueprint(
    "admin_bp",
    __name__
)

# =========================================
# ADMIN LOGIN
# =========================================

admin_bp.route(
    "/login",
    methods=["POST"]
)(admin_login)


# =========================================
# ADD DISTRIBUTOR
# =========================================

admin_bp.route(
    "/add-distributor",
    methods=["POST"]
)(add_distributor)


# =========================================
# VIEW DISTRIBUTORS
# =========================================

admin_bp.route(
    "/view-distributors",
    methods=["GET"]
)(get_distributors)


# =========================================
# UPDATE DISTRIBUTOR
# =========================================

admin_bp.route(
    "/update-distributor/<int:id>",
    methods=["PUT"]
)(update_distributor)


# =========================================
# DELETE DISTRIBUTOR
# =========================================

admin_bp.route(
    "/delete-distributor/<int:id>",
    methods=["DELETE"]
)(delete_distributor)
# =========================================
# VIEW FEEDBACKS
# =========================================

@admin_bp.route(
    "/view-feedbacks",
    methods=["GET"]
)
def feedbacks():
    return view_feedbacks()
# =========================================
# ADMIN DASHBOARD STATS
# =========================================

@admin_bp.route(
    "/dashboard-stats",
    methods=["GET"]
)
def dashboard_stats():
    return admin_dashboard_stats()

# =========================================
# VIEW CUSTOMERS
# =========================================

@admin_bp.route(
    "/view-customers",
    methods=["GET"]
)
def customers():

    return get_customers()