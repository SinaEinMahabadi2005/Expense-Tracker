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
      required: [true, "month is required"],
    },
    year: {
      type: String,
      required: [true, "year is required"],
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
