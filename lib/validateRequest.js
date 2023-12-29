import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../lib/response.js";
const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(StatusCodes.BAD_REQUEST, err.errors));
  }
};

export default validate;
