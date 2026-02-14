import { Router } from "express";
import isLogin from "../../Middlewares/isLogin.js";
import { create, getAll, getOne, remove, update } from "./CategoryCn.js";
const categoryRouter=Router()
categoryRouter.route("/").get(isLogin,getAll).post(isLogin,create)
categoryRouter.route("/:id").get(isLogin,getOne).patch(isLogin,update).delete(isLogin,remove)
export default categoryRouter