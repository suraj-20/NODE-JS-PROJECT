const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantCity: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    restaurantImageURL: {
      type: String,
      default: "",
    },
    aggregate_rating: {
      type: Number,
    },
    cuisine: {
      type: Array,
    },
    costForOne: {
      type: Number,
    },
    meal_type: {
      type: Array,
      required: true,
    },
    phone_number: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Restaurants = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurants;
