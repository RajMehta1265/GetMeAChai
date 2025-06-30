import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define the Payment schema
const PaymentSchema = new Schema({
  name: { type: String, required: true },
  to_user: { type: String, required: true },
  oid: { type: String, required: true }, // order ID
  message: { type: String },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },  // Use Date type
  updatedAt: { type: Date, default: Date.now },  // Use Date type
  done: { type: Boolean, default: false },
});

// Only create model if not already created (avoids overwrite issues during hot reloads)
const Payment = mongoose.models.Payment || model("Payment", PaymentSchema);

export default Payment;
