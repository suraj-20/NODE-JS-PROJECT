const express = require("express");
const {
  mealTypes,
  handleDeleteMealType,
  addRestaurantList,
  addCityList,
  getCityList,
} = require("../controllers/restaurant");
const router = express.Router();
const Restaurants = require("../models/restaurant");

router.post("/mealType", mealTypes);
router.delete("/mealType/:id", handleDeleteMealType);

router.post("/addRestaurantList", addRestaurantList);
router.post("/addCityList", addCityList);
router.get("/getCityList", getCityList);

module.exports = router;




router.get("/getRestarantByLocationAndRestName/:key", async (req, res) => {
  // console.log(req.params.key);
  const restaurants = await Restaurants.find({
    $or: [
      { restaurantName: { $regex: req.params.key, $options: "i" } },
      { restaurantLocation: { $regex: req.params.key, $options: "i" } },
    ],
  });

  // console.log(result);
  return res.render("home", {
    restaurants,
  });
  // return res.json({ resultRestaurants });
});

router.post("/getRestarantByLocationAndRestName", async (req, res) => {
  const payload = req.body.payload.trim();
  // console.log(payload);

  // const restaurants = await Restaurants.find({
  //   $or: [
  //     { restaurantName: { $regex: new RegExp("^" + payload + ".*", "i") } },
  //     { restaurantLocation: { $regex: new RegExp("^" + payload + ".*", "i") } },
  //   ],
  // }).exec();

  const restaurants = await Restaurants.find({
    restaurantLocation: { $regex: new RegExp("^" + payload + ".*", "i") },
  }).exec();

  // restaurants = restaurants.slice(0, 10);
  return res.send({ payload: restaurants });
});


// router.get("/getCityList", getCityList);
// router.get("/getRestaurantByCityName/:cityname", getRestaurantByCityName);

// registering all the routes - API endpoints
// router.get('/cityList', cityController.getCityList);
// router.get('/getRestaurantsbycity/:cityId', restaurantController.getRestaurantByCity);
// router.get('/mealtype', mealTypeController.getMealType);
// router.get('/getResById/:resId', restaurantController.getRestaurantById);
// router.get('/getItemsbyrestaurant/:resId', restaurantController.getItemsByRestaurant);
// router.get('/login', userController.login);
// router.post('/restaurantfilter', restaurantController.filterSearch);
// router.post('/signup', userController.signUp);
// router.post('/payment', paymentGatewayController.payment);
// router.post('/callback', paymentGatewayController.callback);

// router.post('/addcityList', cityController.addCityList);
// router.post('/addmealtype', mealTypeController.addMealType);
// router.post('/addRestaurantList', restaurantController.addRestaurantList);
