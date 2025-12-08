import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    phone: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    email: String,
    address: String,
  },
  { timestamps: true }
);

const DealsSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    imageURL: String,
  },
  { timestamps: true }
);

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: String,
    imageURL: String,
    status: String,
  },
  { timestamps: true }
);

const PaymentSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amountPaid: Number,
    pendingAmount: Number,
  },
  { timestamps: true }
);

export const userModel = model("User", UserSchema);
export const dealsModel = model("Deals", DealsSchema);
export const orderModel = model("Order", OrderSchema);
export const paymentModel = model("Payment", PaymentSchema);
