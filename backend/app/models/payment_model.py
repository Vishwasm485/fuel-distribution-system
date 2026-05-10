from app.config.db import db


class Payment(db.Model):

    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)

    booking_id = db.Column(
        db.Integer,
        db.ForeignKey("bookings.id"),
        nullable=False
    )

    payment_mode = db.Column(
        db.Enum("UPI", "CARD"),
        nullable=False
    )

    amount = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    payment_status = db.Column(
        db.Enum(
            "Pending",
            "Success",
            "Failed"
        ),
        default="Success"
    )

    transaction_date = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )