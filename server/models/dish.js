const mongoose = require("mongoose");

const DishSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

var Dishes = mongoose.model("Dish", DishSchema);
module.exports = Dishes;
