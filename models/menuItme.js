const mongoose = require("mongoose");

const menuSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
  },
});

const MenuItem = mongoose.model("menuItme", menuSchmea);

module.exports = MenuItem;
