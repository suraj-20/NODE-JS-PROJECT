const express = require("express");
const {
  addRestaurantList,
  getRestaurantByLocationAndName,
} = require("../controllers/restaurant");
const { addCityList, getCityList } = require("../controllers/city");
const { mealTypes, handleDeleteMealType } = require("../controllers/mealtype");
const Restaurants = require("../models/restaurant");

const router = express.Router();

// POST routes..
router.post("/addMealType", mealTypes);
router.post("/addRestaurantList", addRestaurantList);
router.post("/addCityList", addCityList);

// GET routes..
router.get("/getCityList", getCityList);
router.get("/search", getRestaurantByLocationAndName);

// DELETE routes..
router.delete("/mealType/:id", handleDeleteMealType);

module.exports = router;
