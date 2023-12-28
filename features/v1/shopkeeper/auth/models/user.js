import { Schema, model } from "mongoose";

const UserSchema = new Schema(
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
    role: {
      type: String,
      enum: ["customer", "shopkeeper", "admin"],
      default: "customer",
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

const User = model("User", UserSchema);

export default User;
