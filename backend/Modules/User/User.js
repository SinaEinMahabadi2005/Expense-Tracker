import Router from "express";
import isAdmin from "../../Middlewares/isAdmin.js";
import isLogin from "../../Middlewares/isLogin.js";
import { changePassword, getall, getOne, update } from "./UserCn.js";
import {
  getOneValidator,
  updateValidator,
  changePasswordValidator,
} from "./UserValidator.js";

const userRouter = Router();

userRouter.route("/").get(isAdmin, getall);

userRouter
  .route("/:id")
  .get(isLogin, getOneValidator, getOne)
  .patch(isLogin, updateValidator, update);

userRouter
  .route("/:id/change-password")
  .post(isLogin, changePasswordValidator, changePassword);

export default userRouter;
