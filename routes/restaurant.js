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
const CartItem = require("../models/addToCart");

const router = express.Router();

// POST routes..
router.post("/addMealType", mealTypes);
router.post("/addRestaurantList", addRestaurantList);
router.post("/addCityList", addCityList);
router.post("/addMenuItem", addMenuItme);
router.post("/addToCart", async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    const cartItem = await CartItem.findOne({ menuItem: menuItemId });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
    } else {
      cartItem = new CartItem({
        menuItem: menuItemId,
        quantity: quantity || 1,
      });
    }
    const savedCartItem = await cartItem.save();

    res.json(savedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

router.get("/cart", async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("menuItem");
    console.log("cartItems", cartItems);
    res.render("cart", { cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE routes..
router.delete("/mealType/:id", handleDeleteMealType);

module.exports = router;
