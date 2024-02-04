const express = require("express");
const mealType = require("../models/mealType");
const Restaurants = require("../models/restaurant.js");
const City = require("../models/City.json");

const router = express.Router();

router.get("/", async (req, res) => {
  const allMeals = await mealType.find({});
  return res.render("home", {
    user: req.user,
    mealTypes: allMeals,
  });
});

router.get("/user/signup", (req, res) => {
  return res.render("signup");
});

router.get("/user/login", (req, res) => {
  return res.render("login");
});

// router.get("/api/restaurant/search", async (req, res) => {
//   const restaurantLocation = req.query.restaurantLocation;
//   const restaurantName = req.query.restaurantName;
//   const filteredRestaurants = await Restaurants.find({
//     restaurantName: { $regex: new RegExp(restaurantName, "i") },
//     restaurantLocation: { $regex: new RegExp(restaurantLocation, "i") },
//   });

//   let page = Number(req.query.page) || 1;
//   let limit = Number(req.query.limit) || 2;
//   let startIndex = (page - 1) * limit;
//   let endIndex = page * limit;

//   const resultRestaurants = filteredRestaurants.slice(startIndex, endIndex);
//   res.render("restaurant", { restaurant: resultRestaurants });
// });

module.exports = router;
