const express = require("express");
const mealType = require("../models/mealType");
const Restaurants = require("../models/restaurant.js");
const City = require("../models/City.json");

const router = express.Router();

router.get("/", async (req, res) => {
  const { restaurantCity, restaurantName, meal_type } = req.query;

  const regexName = restaurantName ? new RegExp(restaurantName, "i") : /.*/;
  const regexLocation = restaurantCity ? new RegExp(restaurantCity, "i") : /.*/;
  const regexMeal_type = new RegExp(meal_type, "i");

  const allMeals = await mealType.find({});
  const filteredRestaurants = await Restaurants.find({
    restaurantName: regexName,
    restaurantCity: regexLocation,
    meal_type: regexMeal_type,
  });
  return res.render("home", {
    user: req.user,
    mealTypes: allMeals,
    restaurantCity,
    restaurantName,
    meal_type,
    filteredRestaurants
  });
});

router.get("/user/signup", (req, res) => {
  return res.render("signup");
});

router.get("/user/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
