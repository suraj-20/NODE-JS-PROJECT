const City = require("../models/city");

module.exports.addCityList = async (req, res) => {
  const { cityName, country_name } = req.body;

  const city = await City.create({
    cityName,
    country_name,
  });

  return res.status(200).json({ msg: "City Added Successfully.", city });
};

module.exports.getCityList = async (req, res) => {
  const city = await City.find({});
  return res.status(200).json({
    msg: "City list loaded successfully",
    city,
  });
};
