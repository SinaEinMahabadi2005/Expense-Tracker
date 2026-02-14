import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Category from "./CategoryMd.js";
import Product from "../Product/ProductMd.js";
import { __dirname } from "../../app.js";
import fs from "fs";
import Transaction from "../Transaction/TransactionMd.js";
// get all category
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters({
      ...(req.query?.search
        ? { name: { $regex: req.query.search, $options: "i" } }
        : {}),
      ...(req.role == "admin" ? {} : { isPublished: true }),
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "userId" });
  const result = await features.execute();
  return res.status(200).json(result);
});
// get one category
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query, req.role)
    .addManualFilters(
      req.role == "admin"
        ? { _id: req.params.id }
        : { $and: [{ _id: req.params.id }, { isPublished: true }] },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: "userId" });
  const result = await features.execute();
  return res.status(200).json(result);
});
// create category
export const create = catchAsync(async (req, res, next) => {
  const category = await Category.create({ ...req.body, userId: req.userId });
  return res.status(201).json({
    success: true,
    message: "category created successfully",
    data: category,
  });
});
// update category
export const update = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { ...req.body, userId: req.userId },
    {
      runValidator: true,
      new: true,
    },
  );
  return res.status(201).json({
    success: true,
    message: "category updated successfully",
    data: category,
  });
});
// remove category
export const remove = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.find({ categoryId: req.params.id });
  if (transaction.length > 0) {
    return next(
      new HandleERROR(
        "this Category contain some Transaction you can not deleted",
        400,
      ),
    );
  }
  const category = await Category.findByIdAndDelete(req.params.id);
  if (fs.existsSync(`${__dirname}/Public/${category.icon}`)) {
    fs.unlinkSync(`${__dirname}/Public/${category.icon}`);
  }
  return res.status(201).json({
    success: true,
    message: "category deleted successfully",
    data: category,
  });
});
