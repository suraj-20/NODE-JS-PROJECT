const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    country_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const City = mongoose.model("city", citySchema);

module.exports = City;
