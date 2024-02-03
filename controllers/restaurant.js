const City = require("../models/city");
const MealType = require("../models/mealType");
const Restaurants = require("../models/restaurant");
// const Restaurants = require("../models/restaurant.json");
// const City = require("../models/City.json");

module.exports.mealTypes = async (req, res) => {
  const { mealName, mealImageURL } = req.body;

  if (!mealName || !mealImageURL) {
    return res.status(404).json({ msg: "All Fields are required.." });
  }

  const result = await MealType.create({
    mealName,
    mealImageURL,
  });

  return res.status(200).json({ msg: "Meal Tpye added succesfull.", result });
};

module.exports.handleDeleteMealType = async (req, res) => {
  const deletedMealType = await MealType.findByIdAndDelete(req.params.id);

  return res.json({ msg: "Deleted Successfully", deletedMealType });
};

module.exports.addRestaurantList = async (req, res) => {
  const {
    restaurantName,
    restaurantImageURL,
    restaurantLocation,
    cuisine,
    costForTwo,
  } = req.body;

  const restaurants = await Restaurants.create({
    restaurantName,
    restaurantImageURL,
    restaurantLocation,
    cuisine,
    costForTwo,
  });

  console.log(restaurants);
  return res
    .status(200)
    .json({ msg: "Restaurant Added Successfully.", restaurants });
};

module.exports.addCityList = async (req, res) => {
  const { cityName, country_name } = req.body;

  const city = await City.create({
    cityName,
    country_name,
  });

  return res.status(200).json({ msg: "City Added Successfully.", city });
};

module.exports.getCityList = async (req, res) => {
  const city = await City.find({});
  return res.status(200).json({
    msg: "City list loaded successfully",
    city,
  });
};
