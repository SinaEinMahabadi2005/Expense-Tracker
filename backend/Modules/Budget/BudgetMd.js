import mongoose from "mongoose";
const budgetSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    month: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "title is unique"],
    },
    year: {
      type: String,
      required: [true, "note is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
     isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
