const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Dish = require("../models/Dish");

module.exports = function (app, router) {
  router.post(
    "/dishes",
    [requireAuth, requireRoles(["RESTAURANT"])],
    async (req, res) => {
      try {
        const dish = await Dish.create({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          restaurantId: req.body.restaurantId,
        });
        res.status(201).send(dish);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  );

  router.get("/dishes", [requireAuth], async (req, res) => {
    try {
      const dishes = await Dish.findAll();
      res.send(dishes);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
};