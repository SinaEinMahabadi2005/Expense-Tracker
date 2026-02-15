import { body, param, query } from "express-validator";
import mongoose from "mongoose";

//
// 🔹 Get All (optional query filters)
//
export const getAllValidator = [
  query("month")
    .optional()
    .isString()
    .withMessage("Month must be string"),

  query("year")
    .optional()
    .isString()
    .withMessage("Year must be string"),
];

//
// 🔹 Get One
//
export const getOneValidator = [
  param("id")
    .notEmpty()
    .withMessage("Budget id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid budget id"),
];

//
// 🔹 Create Budget
//
export const createValidator = [
  body("categoryId")
    .notEmpty()
    .withMessage("Category is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),

  body("month")
    .notEmpty()
    .withMessage("Month is required")
    .isIn([
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ])
    .withMessage("Invalid month"),

  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .matches(/^\d{4}$/)
    .withMessage("Year must be 4 digits"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];

//
// 🔹 Update Budget
//
export const updateValidator = [
  param("id")
    .notEmpty()
    .withMessage("Budget id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid budget id"),

  body("categoryId")
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),

  body("month")
    .optional()
    .isIn([
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ])
    .withMessage("Invalid month"),

  body("year")
    .optional()
    .matches(/^\d{4}$/)
    .withMessage("Year must be 4 digits"),

  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];

//
// 🔹 Remove Budget
//
export const removeValidator = [
  param("id")
    .notEmpty()
    .withMessage("Budget id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid budget id"),
];
