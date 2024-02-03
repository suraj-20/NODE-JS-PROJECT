const mongoose = require("mongoose");

const mealTypeSchema = new mongoose.Schema(
  {
    mealName: {
      type: String,
    },
    mealImageURL: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const mealType = mongoose.model("mealType", mealTypeSchema);

module.exports = mealType;