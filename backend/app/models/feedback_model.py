from app.config.db import db


class Feedback(db.Model):

    __tablename__ = "feedbacks"

    id = db.Column(db.Integer, primary_key=True)

    booking_id = db.Column(
        db.Integer,
        db.ForeignKey("bookings.id"),
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

    rating = db.Column(
        db.Integer,
        nullable=False
    )

    feedback_message = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )