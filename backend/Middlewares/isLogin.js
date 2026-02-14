import { catchAsync, HandleERROR } from "vanta-api";

const isLogin = catchAsync(
  async(req, res, next) => {
    if (!req.role) {
      return next(new HandleERROR("You Don't have permission Please Login First"));
    }
    return next();
  })

export default isLogin