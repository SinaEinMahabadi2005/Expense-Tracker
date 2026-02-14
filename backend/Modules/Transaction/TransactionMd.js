import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {
    categoryId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Category"
    } ,
 
  },
  { timestamps: true },
);
const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
