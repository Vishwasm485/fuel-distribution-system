from app.config.db import db


class Booking(db.Model):

    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)

    booking_id = db.Column(
        db.String(30),
        unique=True,
        nullable=False
    )

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )

    distributor_id = db.Column(
        db.Integer,
        db.ForeignKey("distributors.id"),
        nullable=False
    )

    fuel_price_id = db.Column(
        db.Integer,
        db.ForeignKey("fuel_prices.id"),
        nullable=False
    )

    booking_date = db.Column(
        db.Date,
        nullable=False
    )

    fuel_type = db.Column(
        db.String(50),
        nullable=False
    )

    quantity = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    price_per_liter = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    total_price = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    delivery_pincode = db.Column(
        db.String(10),
        nullable=False
    )

    delivery_address = db.Column(
        db.Text,
        nullable=False
    )

    landmark = db.Column(
        db.String(255)
    )

    payment_mode = db.Column(
        db.Enum("UPI", "CARD"),
        nullable=False
    )

    payment_status = db.Column(
        db.Enum("Pending", "Paid"),
        default="Paid"
    )

    booking_status = db.Column(
        db.Enum(
            "Pending",
            "Accepted",
            "Delivered",
            "Rejected"
        ),
        default="Pending"
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )