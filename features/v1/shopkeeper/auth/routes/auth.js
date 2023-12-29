import express from "express";
import validate from "../../../../../lib/validateRequest.js";
import ShopKeeperSchema from "../Schema/shopkeeper.schema.js";
import * as AuthController from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post(
  "/register",
  validate(ShopKeeperSchema),
  AuthController.register
);

export default authRouter;
