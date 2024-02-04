const Restaurants = require("../models/restaurant");

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
    mealId: req.body._id,
    cityId: req.body._id,
  });

  console.log(restaurants);
  return res
    .status(200)
    .json({ msg: "Restaurant Added Successfully.", restaurants });
};

module.exports.getRestaurantByLocationAndName = async (req, res) => {
  const restaurantLocation = req.query.restaurantLocation;
  const restaurantName = req.query.restaurantName;

  try {
    const filteredRestaurants = await Restaurants.find({
      restaurantName: { $regex: new RegExp(restaurantName, "i") },
      restaurantLocation: { $regex: new RegExp(restaurantLocation, "i") },
    });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const totalPages = Math.floor(filteredRestaurants / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // console.log("totalPages", endIndex);

    const resultRestaurants = filteredRestaurants.slice(startIndex, endIndex);
    return res.render("restaurant", {
      restaurant: resultRestaurants,
      currentPage: page,
      endIndex,
    });
  } catch (error) {
    console.error("Error retrieving restaurats frpm mongodb", error);
    res.status(500).json({ error: "internal server error" });
  }
};
