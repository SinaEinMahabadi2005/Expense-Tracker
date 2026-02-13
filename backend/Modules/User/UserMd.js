import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name is required "],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required "],
      unique: [true, "email is unique"],
    },
    password: {
      type: String,
      required: [true, "password is required "],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export default User;
