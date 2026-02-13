import bcryptjs from "bcryptjs";
import { catchAsync, HandleERROR } from "vanta-api";
import User from "../User/UserMd.js";
// register
export const register = catchAsync(async (req, res, next) => {
  const { fullName, password, email } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const user = await User.create({ fullName, email, password: hashPassword });
  return res.status(200).json({
    success: true,
    message: "Register user successfully please login",
    data: user,
  });
});
// login
export const login=catchAsync(async (req,res,next) => {
    const {email , password}=req.body
    
})