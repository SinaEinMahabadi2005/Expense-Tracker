import Router from "express"
import isLogin from "../../Middlewares/isLogin.js"
import { create, getAll, getOne, remove, update } from "./BudgetCn.js"
const budgetRouter=Router()
budgetRouter.route("/").get(isLogin,getAll).post(isLogin,create)
budgetRouter.route("/:id").get(isLogin,getOne).patch(isLogin,update).delete(isLogin,remove)
export default budgetRouter