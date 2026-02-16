import Router from "express"
import isLogin from "../../Middlewares/isLogin.js"
import { create, getAll, getOne, remove, update } from "./TransactioCn.js"
import { createValidator, getAllValidator, getOneValidator, removeValidator, updateValidator } from "./TransactionValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
const transactionRouter=Router()
transactionRouter
  .route("/")
  .get( getAllValidator, handleValidationErrors, getAll)
  .post(isLogin, createValidator, handleValidationErrors, create);

transactionRouter
  .route("/:id")
  .get(isLogin, getOneValidator, handleValidationErrors, getOne)
  .patch(isLogin, updateValidator, handleValidationErrors, update)
  .delete(isLogin, removeValidator, handleValidationErrors, remove);
export default transactionRouter