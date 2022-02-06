import mongoose from "mongoose";


const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Category = mongoose.model('Category', categorySchema);

export default Category;

