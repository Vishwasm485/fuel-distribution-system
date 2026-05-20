from app.config.db import db


class Feedback(db.Model):

    __tablename__ = "feedbacks"

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )
    booking_id = db.Column(
        db.Integer,
        nullable=True
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

