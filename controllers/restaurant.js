const Restaurants = require("../models/restaurant");

module.exports.addRestaurantList = async (req, res) => {
  const {
    restaurantName,
    restaurantImageURL,
    restaurantCity,
    locality,
    aggregate_rating,
    cuisine,
    costForOne,
    meal_type,
  } = req.body;

  const restaurants = await Restaurants.create({
    restaurantName,
    restaurantImageURL,
    restaurantCity,
    locality,
    aggregate_rating,
    cuisine,
    costForOne,
    meal_type,
  });

  console.log(restaurants);
  return res
    .status(200)
    .json({ msg: "Restaurant Added Successfully.", restaurants });
};

module.exports.getRestaurantByLocationAndName = async (req, res) => {
  const { restaurantCity, restaurantName, cuisine, sortOrder, maxCost, minCost } =
    req.query;

  const query = {};

  if (restaurantName) {
    query.restaurantName = new RegExp(restaurantName, "i");
  }

  if (restaurantCity) {
    query.restaurantCity = new RegExp(restaurantCity, "i");
  }

  if (cuisine) {
    query.cuisine = cuisine;
  }

  if (maxCost) {
    query.costForOne = { $lte: parseInt(maxCost) };
  }

  if (minCost) {
    query.costForOne = { $gte: parseInt(minCost) };
  }

  let sortOptions;

  if (sortOrder === "lowToHigh") {
    sortOptions = { costForOne: 1 };
  } else if (sortOrder === "highToLow") {
    sortOptions = { costForOne: -1 };
  }

  try {
    const filteredRestaurants = await Restaurants.find(query).sort(sortOptions);

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
      restaurantCity,
      restaurantName,
      cuisine,
      sortOptions,
    });
  } catch (error) {
    console.error("Error retrieving restaurats frpm mongodb", error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports.filterRestaurant = async (req, res) => {
  const { cuisine, maxCost, sortOrder } = req.query;

  const query = {};

  if (cuisine) {
    query.cuisine = cuisine;
  }

  if (maxCost) {
    query.costForOne = { $lte: parseInt(maxCost) };
  }

  let restaurants;

  if (sortOrder === "lowToHigh") {
    restaurants = await Restaurants.find(query).sort({ costForOne: 1 });
  } else if (sortOrder === "highToLow") {
    restaurants = await Restaurants.find(query).sort({ costForOne: -1 });
  } else {
    restaurants = await Restaurants.find(query);
  }

  try {
    // const filterRestaurant = await Restaurants.find(query).sort(sortOptions);
    return res.json({ restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
