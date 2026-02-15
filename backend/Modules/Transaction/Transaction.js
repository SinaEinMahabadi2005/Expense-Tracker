import Router from "express"
import isLogin from "../../Middlewares/isLogin.js"
import { create, getAll, getOne, remove } from "./TransactioCn.js"
const transactionRouter=Router()
transactionRouter.route("/").get(isLogin,getAll).post(isLogin,create)
transactionRouter.route("/:id").get(isLogin,getOne).patch(isLogin,create).delete(isLogin,remove)
export default transactionRouter