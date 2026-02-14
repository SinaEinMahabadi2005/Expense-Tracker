import { Router } from "express";
import isLogin from "../../Middlewares/isLogin.js";
import { create, getAll, getOne, remove, update } from "./CategoryCn.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
import { createValidator, getAllValidator, getOneValidator, removeValidator, updateValidator } from "./CategoryValidator.js";
const categoryRouter=Router()
categoryRouter
  .route("/")
  .get(isLogin, getAllValidator, handleValidationErrors, getAll)
  .post(isLogin, createValidator, handleValidationErrors, create);

categoryRouter
  .route("/:id")
  .get(isLogin, getOneValidator, handleValidationErrors, getOne)
  .patch(isLogin, updateValidator, handleValidationErrors, update)
  .delete(isLogin, removeValidator, handleValidationErrors, remove);
export default categoryRouter