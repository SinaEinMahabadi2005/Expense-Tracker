import { body, param, query } from "express-validator";
import mongoose from "mongoose";

//
// 🔹 Get All (query)
//
export const getAllValidator = [
  query("search")
    .optional()
    .isString()
    .withMessage("Search must be string")
    .isLength({ min: 1 })
    .withMessage("Search cannot be empty"),
];

//
// 🔹 Get One
//
export const getOneValidator = [
  param("id")
    .notEmpty()
    .withMessage("Transaction id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid transaction id"),
];

//
// 🔹 Create
//
export const createValidator = [
  body("categoryId")
    .notEmpty()
    .withMessage("Category is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters"),

  body("note")
    .notEmpty()
    .withMessage("Note is required")
    .isLength({ min: 3 })
    .withMessage("Note must be at least 3 characters"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];

//
// 🔹 Update
//
export const updateValidator = [
  param("id")
    .notEmpty()
    .withMessage("Transaction id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid transaction id"),

  body("categoryId")
    .optional()
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),

  body("title")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters"),

  body("note")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Note must be at least 3 characters"),

  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];

//
// 🔹 Remove
//
export const removeValidator = [
  param("id")
    .notEmpty()
    .withMessage("Transaction id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid transaction id"),
];
