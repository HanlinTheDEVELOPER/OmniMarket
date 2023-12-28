import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import User from "../models/user.js";
import { successResponse, errorResponse } from "../../../../../lib/response.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
      role,
    });
    return res
      .status(StatusCodes.CREATED)
      .json(
        successResponse(StatusCodes.CREATED, "User created successfully", user)
      );
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(StatusCodes.BAD_REQUEST, error.message));
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse(StatusCodes.NOT_FOUND, "User not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          errorResponse(
            StatusCodes.UNAUTHORIZED,
            "Incorrect email and password"
          )
        );
    }
    const token = jwt.sign(
      { user_id: user._id, email: user.email, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    return res.status(StatusCodes.OK).json(
      successResponse(StatusCodes.OK, "User logged in successfully", {
        token,
        user: user._id,
        role: user.role,
      })
    );
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(StatusCodes.BAD_REQUEST, error.message));
  }
};
