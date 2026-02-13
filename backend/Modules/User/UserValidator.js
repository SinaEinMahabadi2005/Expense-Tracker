import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

// 🔹 Common error handler middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

//
// ==========================
// 🔹 Get One Validator
// ==========================
//

export const getOneValidator = [
  param("id")
    .notEmpty().withMessage("User id is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid user id format"),

  validate,
];

//
// ==========================
// 🔹 Update User Validator
// ==========================
// optional + regex + enum
//

export const updateValidator = [
  param("id")
    .notEmpty().withMessage("User id is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid user id format"),

  body("fullName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Full name must contain only letters"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format"),

  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Role must be admin or user"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  validate,
];

//
// ==========================
// 🔹 Change Password Validator
// ==========================
// required + strong regex
//

export const changePasswordValidator = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      "Password must contain at least one letter and one number"
    ),

  validate,
];
