import { body, param, query } from "express-validator";
import mongoose from "mongoose";

export const getAllValidator = [
  query("search")
    .optional()
    .isString()
    .withMessage("Search must be string")
    .isLength({ min: 1 })
    .withMessage("Search cannot be empty"),
];

export const getOneValidator = [
  param("id")
    .notEmpty()
    .withMessage("Category id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),
];

export const createValidator = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Name must contain only letters and numbers"),

  body("type")
    .notEmpty().withMessage("Type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("icon")
    .optional()
    .isString().withMessage("Icon must be string"),

  body("color")
    .optional() ,
    // .matches(/^#([0-9A-Fa-f]{3}){1,2}$/)
    // .withMessage("Color must be valid HEX"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];

export const updateValidator = [
  param("id")
    .notEmpty().withMessage("Category id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),

  body("name")
    .optional()
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Name must contain only letters and numbers"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("icon")
    .optional()
    .isString().withMessage("Icon must be string"),

  body("color")
    .optional() ,
    // .matches(/^#([0-9A-Fa-f]{3}){1,2}$/)
    // .withMessage("Color must be valid HEX"),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];

export const removeValidator = [
  param("id")
    .notEmpty().withMessage("Category id is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),
];
