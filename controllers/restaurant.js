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
  const { restaurantLocation, restaurantName } = req.query;

  const regexName = restaurantName ? new RegExp(restaurantName, "i") : /.*/;
  const regexLocation = restaurantLocation
    ? new RegExp(restaurantLocation, "i")
    : /.*/;

  try {
    const filteredRestaurants = await Restaurants.find({
      restaurantName: regexName,
      restaurantLocation: regexLocation,
    });

    // console.log("filteredRestaurants", filteredRestaurants);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const totalPages = Math.ceil(filteredRestaurants.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // console.log("totalpages", totalPages);

    const resultRestaurants = filteredRestaurants.slice(startIndex, endIndex);
    return res.render("restaurant", {
      restaurant: resultRestaurants,
      currentPage: page,
      totalPages,
      restaurantLocation,
      restaurantName,
    });
  } catch (error) {
    console.error("Error retrieving restaurats frpm mongodb", error);
    res.status(500).json({ error: "internal server error" });
  }
};
