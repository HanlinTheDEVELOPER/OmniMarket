import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import ShopKeeper from "../models/shopkeeper.js";
import { successResponse, errorResponse } from "../../../../../lib/response.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const shopkeeper = await ShopKeeper.create({
      name,
      email,
      password: encryptedPassword,
      role,
    });
    return res
      .status(StatusCodes.CREATED)
      .json(
        successResponse(
          StatusCodes.CREATED,
          "Shopkeeper created successfully",
          shopkeeper
        )
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
    const shopkeeper = await ShopKeeper.findOne({ email });
    if (!shopkeeper) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse(StatusCodes.NOT_FOUND, "Shopkeeper not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      shopkeeper.password
    );
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
      {
        shopkeeper_id: shopkeeper._id,
        email: shopkeeper.email,
        role: shopkeeper.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    return res.status(StatusCodes.OK).json(
      successResponse(StatusCodes.OK, "Shopkeeper logged in successfully", {
        token,
        shopkeeper: shopkeeper._id,
        role: shopkeeper.role,
      })
    );
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(StatusCodes.BAD_REQUEST, error.message));
  }
};
