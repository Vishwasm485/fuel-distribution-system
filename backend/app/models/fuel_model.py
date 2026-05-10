from app.config.db import db


class FuelPrice(db.Model):

    __tablename__ = "fuel_prices"

    id = db.Column(db.Integer, primary_key=True)

    distributor_id = db.Column(
        db.Integer,
        db.ForeignKey("distributors.id"),
        nullable=False
    )

    fuel_type = db.Column(
        db.String(50),
        nullable=False
    )

    price = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        onupdate=db.func.now()
    )