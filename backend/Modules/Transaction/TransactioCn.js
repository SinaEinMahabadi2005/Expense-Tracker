import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Transaction from "../Transaction/TransactionMd.js";
// get all transaction
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Transaction, req.query, req.role)
    .addManualFilters({
      ...(req.query?.search
        ? { title: { $regex: req.query.search, $options: "i" } }
        : {}),
      ...(req.role == "admin" ? {} : { isPublished: true }),
    })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{ path: "userId" },{path:"categoryId"}]);
  const result = await features.execute();
  return res.status(200).json(result);
});
// get one transaction
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Transaction, req.query, req.role)
    .addManualFilters(
      req.role == "admin"
        ? { _id: req.params.id }
        : { $and: [{ _id: req.params.id }, { isPublished: true }] },
    )
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate([{ path: "userId" },{path:"categoryId"}]);
  const result = await features.execute();
  return res.status(200).json(result);
});
// create transaction
export const create = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.create({ ...req.body, userId: req.userId });
  return res.status(201).json({
    success: true,
    message: "transaction created successfully",
    data: transaction,
  });
});
// update transaction
export const update = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    { ...req.body, userId: req.userId },
    {
      runValidator: true,
      new: true,
    },
  );
  return res.status(201).json({
    success: true,
    message: "transaction updated successfully",
    data: transaction,
  });
});
// remove transaction
export const remove = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  return res.status(201).json({
    success: true,
    message: "transaction deleted successfully",
    data: transaction,
  });
});
