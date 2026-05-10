from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.config.db import db
from app.config.settings import Config

from app.routes.admin.admin_routes import admin_bp
from app.routes.distributor.distributor_routes import distributor_bp
from app.routes.customer.customer_routes import customer_bp

jwt = JWTManager()


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    jwt.init_app(app)

    # =========================================
    # ADMIN ROUTES
    # =========================================

    app.register_blueprint(
        admin_bp,
        url_prefix="/api/admin"
    )

    # =========================================
    # DISTRIBUTOR ROUTES
    # =========================================

    app.register_blueprint(
        distributor_bp,
        url_prefix="/api/distributor"
    )
    # =========================================
    # CUSTOMER ROUTES
    # =========================================

    app.register_blueprint(
        customer_bp,
        url_prefix="/api/customer"
    )

    @app.route("/")
    def home():
        return {
            "message": "Fuel Distribution Backend Running Successfully"
        }

    return app