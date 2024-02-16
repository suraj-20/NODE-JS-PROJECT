const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "menuItme",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const CartItem = mongoose.model("cardItem", cartSchema);

module.exports = CartItem;
