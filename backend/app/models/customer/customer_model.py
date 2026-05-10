from app.config.db import db


class Customer(db.Model):

    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    phone = db.Column(db.String(15), nullable=False)

    address = db.Column(db.Text, nullable=False)

    password = db.Column(db.String(255), nullable=False)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )