const express = require("express");
const {
  addRestaurantList,
  getRestaurantByLocationAndName,
  filterRestaurant,
  getRestaurantById,
} = require("../controllers/restaurant");
const { addCityList, getCityList } = require("../controllers/city");
const { mealTypes, handleDeleteMealType } = require("../controllers/mealtype");
const { addMenuItme } = require("../controllers/menu");
const Restaurants = require("../models/restaurant");
const MenuItem = require("../models/menuItme");

const router = express.Router();

// POST routes..
router.post("/addMealType", mealTypes);
router.post("/addRestaurantList", addRestaurantList);
router.post("/addCityList", addCityList);
router.post("/addMenuItem", addMenuItme);

// GET routes..
router.get("/getCityList", getCityList);
router.get("/search", getRestaurantByLocationAndName);
router.get("/filter", filterRestaurant);
router.get("/restaurantDetails/:id", getRestaurantById);
router.get("/getMenuItem/:id", async (req, res) => {
  const restaurantId = req.params._id;

  const result = await MenuItem.find({ restaurantId });

  res.json({ result });
});

// DELETE routes..
router.delete("/mealType/:id", handleDeleteMealType);

module.exports = router;
