var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");
var admin = require("../middlewares/admin");

var Dishes = require("../models/dish");

router.get("/", async function (req, res, next) {
  let dishes = await Dishes.find();
  let dishesList = dishes.map((dish) => dish);
  res.send(dishesList);
});

router.get("/dishlist", async function (req, res, next) {
  let dishes = await Dishes.find();
  let dishesList = dishes.map((dish) => dish);
  res.send(dishesList);
});

router.get("/:id", async function (req, res, next) {
  let dish = await Dishes.findById(req.params.id);
  res.send(dish);
});

router.post("/add", async function (req, res, next) {
  console.log(req.body);
  let dish = new Dishes(req.body);
  dish.image = "/assets/images/" + req.body.image;
  await dish.save();
  res.redirect("http://localhost:3000/menu");
});

router.post("/edit/:id", async function (req, res, next) {
  let dish = await Dishes.findById(req.params.id);
  dish.name = req.body.name;
  dish.image = "/assets/images/" + req.body.image;
  dish.category = req.body.category;
  dish.label = "";
  dish.price = req.body.price;
  dish.featured = req.body.featured;
  dish.description = req.body.description;
  await dish.save();
  res.redirect("localhost:3000/menu");
});

router.get("/delete/:id", async function (req, res, next) {
  console.log(req.params.id);
  let dish = await Dishes.findByIdAndDelete(req.params.id);
  res.send(dish);
});

router.get("/name/:name", auth, async function (req, res, next) {
  let dish = await Dishes.findOne({ name: req.params.name });
  res.send(dish._id);
});

module.exports = router;
