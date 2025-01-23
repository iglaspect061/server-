const mongoose = require("mongoose");

const carBookingSchema = new mongoose.Schema(
  {
    Email: { type: String,  },
    Name: { type: String, },
    car: {
      make: { type: String, required: true },
      model: { type: String, required: true },
      year: { type: Number, required: true },
      licensePlate: { type: String, required: true },
    },
    rentalStart: { type: Date, required: true },
    rentalEnd: { type: Date, required: true },
    pricePerDay: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarBooking", carBookingSchema);
