const express = require("express");
const mealType = require("../models/mealType");
const Restaurants = require("../models/restaurant.js");
const City = require("../models/City.json");

const router = express.Router();

router.get("/", async (req, res) => {
  const allMeals = await mealType.find({});
  // const allRestaurants = await Restaurants.find({});
  return res.render("home", {
    user: req.user,
    mealTypes: allMeals,
    // allRestaurants,
  });
});

router.get("/mealPlaces", async (req, res) => {
  const allRestaurants = await Restaurants.find({});

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 2;
  let startIndex = (page - 1) * limit;
  let endIndex = page * limit;

  const resultRestaurants = allRestaurants.slice(startIndex, endIndex);
  return res.render("restaurant", {
    resultRestaurants,
  });
});

router.get("/user/signup", (req, res) => {
  return res.render("signup");
});

router.get("/user/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
