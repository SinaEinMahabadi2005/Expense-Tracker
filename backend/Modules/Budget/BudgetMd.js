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
    title: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "title is unique"],
    },
    note: {
      type: String,
      required: [true, "note is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "type is required "],
    },
     isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
