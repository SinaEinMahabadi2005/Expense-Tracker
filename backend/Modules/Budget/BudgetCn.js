import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Budget from "../Budget/BudgetMd.js";
// get all budget
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Budget, req.query, req.role)
    .addManualFilters({
      ...(req.role == "admin" ? {} : { isPublished: true }),
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{ path: "userId" }, { path: "categoryId" }]);
  const result = await features.execute();
  return res.status(200).json(result);
});
// get one budget
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Budget, req.query, req.role)
    .addManualFilters(
      req.role == "admin"
        ? { _id: req.params.id }
        : { $and: [{ _id: req.params.id }, { isPublished: true }] },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{ path: "userId" }, { path: "categoryId" }]);
  const result = await features.execute();
  return res.status(200).json(result);
});
// create budget
export const create = catchAsync(async (req, res, next) => {
  const budget = await Budget.create({ ...req.body, userId: req.userId });
  return res.status(201).json({
    success: true,
    message: "budget created successfully",
    data: budget,
  });
});
// update budget
export const update = catchAsync(async (req, res, next) => {
  const budget = await Budget.findByIdAndUpdate(
    req.params.id,
    { ...req.body, userId: req.userId },
    {
      runValidator: true,
      new: true,
    },
  );
  return res.status(201).json({
    success: true,
    message: "budget updated successfully",
    data: budget,
  });
});
// remove budget
export const remove = catchAsync(async (req, res, next) => {
  const budget = await Budget.findByIdAndDelete(req.params.id);
  return res.status(201).json({
    success: true,
    message: "budget deleted successfully",
    data: budget,
  });
});
