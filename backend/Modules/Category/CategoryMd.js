import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User"
    } ,
    name: {
      type: String,
      required: [true, " name is required "],
      unique: [true, "name is unique"],
    },
    icon: {
      type: String,
      default:""
    },
    color: {
      type: String,
      default:""
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
const Category = mongoose.model("Category", categorySchema);
export default Category;
