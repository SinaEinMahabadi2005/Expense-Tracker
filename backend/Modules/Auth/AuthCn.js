import bcryptjs from "bcryptjs";
import { catchAsync, HandleERROR } from "vanta-api";
import User from "../User/UserMd.js";
import jwt from "jsonwebtoken";
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
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch) {
    return next(new HandleERROR("Email or Password is incorrect"));
  }
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  return res.status(200).json({
    success: true,
    message: "login successfully",
    data: user,
    token,
  });
});
