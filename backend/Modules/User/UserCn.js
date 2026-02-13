//  کار ولیدیتور اپشنال و ریک و ریجکس ویونیک
// بقیه در کنترلرز
//تمام
import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "./UserMd.js";
import bcrypt from "bcryptjs";
// get all user
export const getall = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(User, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await feature.execute();
  return res.status(200).json(result);
});
// get one user
export const getOne = catchAsync(async (req, res, next) => {
  const feature = new ApiFeatures(User, req.query, req.role)
    .addManualFilters(
      req.role == "admin" ? { _id: req.params.id } : { _id: req.userId },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
    if(req.userId != req.params.id){
         return next(
      new HandleERROR("you don't have permission for update this User", 400),
    );
    }
  const result = await feature.execute();
  return res.status(200).json(result);
});
// update user
export const update = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const { fullName = null, email = null, role = null, isActive="null" } = req.body;
  if (req.role == "user" && req.userId != req.params.id) {
    return next(
      new HandleERROR("you don't have permission for update this User", 400),
    );
  }
  if (
    req.role == "admin" &&
    user.role == "admin" &&
    req.userId != req.params.id
  ) {
    return next(
      new HandleERROR("you don't have permission for update this admin", 400),
    );
  }
  if (req.role == "admin") {
    user.role = role || user.role;
    user.isActive = user.isActive=="null" ? user.isActive :isActive;
  }
  user.email = email || user.email;
  user.fullName = fullName || user.fullName;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "user updated successfully",
    data: user,
  });
});
// user change password
export const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.userId);
  const isMatch = bcrypt.compareSync(oldPassword, user.password);
  if (!isMatch) {
    return next(new HandleERROR("old password is incorrect", 400));
  }
  user.password = bcrypt.hashSync(newPassword, 10);
  await user.save();
   return res.status(200).json({
    success: true,
    message: "password updated successfully",
    data: user,
  });
});
