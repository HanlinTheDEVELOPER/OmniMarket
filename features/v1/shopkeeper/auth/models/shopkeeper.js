import { Schema, model } from "mongoose";

const ShopKeeperSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    reset_password_token: String,
    reset_password_expires: Date,
  },
  {
    timestamps: true,
  }
);

const ShopKeeper = model("ShopKeeper", ShopKeeperSchema);

export default ShopKeeper;
