import express from "express";
import validate from "../../../../../lib/validateRequest.js";
import UserSchema from "../Schema/user.schema.js";
import * as AuthController from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", validate(UserSchema), AuthController.register);

export default authRouter;
