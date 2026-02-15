import Router from "express"
import isLogin from "../../Middlewares/isLogin.js"
import { create, getAll, getOne, remove, update } from "./BudgetCn.js"
import { createValidator, getAllValidator, getOneValidator, removeValidator, updateValidator } from "./BudgetValidator.js";
import { handleValidationErrors } from "../../Utils/handleValidationError.js";
const budgetRouter=Router()
budgetRouter
  .route("/")
  .get(isLogin, getAllValidator, handleValidationErrors, getAll)
  .post(isLogin, createValidator, handleValidationErrors, create);

budgetRouter
  .route("/:id")
  .get(isLogin, getOneValidator, handleValidationErrors, getOne)
  .patch(isLogin, updateValidator, handleValidationErrors, update)
  .delete(isLogin, removeValidator, handleValidationErrors, remove);
export default budgetRouter