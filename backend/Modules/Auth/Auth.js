import Router from "express";
import { login, register } from "./AuthCn.js";
import { registerValidator, loginValidator } from "./validators/authValidator.js";

const authRouter = Router();

authRouter.route("/register").post(registerValidator, register);
authRouter.route("/login").post(loginValidator, login);

export default authRouter;
