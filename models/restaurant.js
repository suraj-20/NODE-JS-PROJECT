const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantImageURL: {
      type: String,
      default: "",
    },
    restaurantLocation: {
      type: String,
      required: true,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
    },
    mealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mealtypes",
    },
    cuisine: {
      type: Array,
    },
    costForTwo: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Restaurants = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurants;
