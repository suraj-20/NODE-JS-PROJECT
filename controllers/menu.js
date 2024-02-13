const MenuItem = require("../models/menuItme");
const Restaurants = require("../models/restaurant");

module.exports.addMenuItme = async (req, res) => {
  try {
    const { name, price, image, description, restaurantId } = req.body;

    const restaurant = await Restaurants.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    // console.log(restaurant);

    const menuItems = new MenuItem({
      name,
      image,
      price,
      description,
      restaurant: restaurantId,
    });

    const result = await menuItems.save();
    console.log(result);

    res.json(result);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
};
