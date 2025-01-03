const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");

module.exports = function (app, router) {
  router.post(
    "/restaurants/new",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      try {
        const restaurant = await Restaurant.create({
          name: req.body.name,
          address: req.body.address,
          userId: req.body.userId,
        });
        res.status(201).send(restaurant);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  );

  router.get("/restaurants", [requireAuth], async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll();
      res.send(restaurants);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.get("/restaurants/:restaurant_id", [requireAuth], async (req, res) => {
    try {
      const restaurant = await Restaurant.findOne({
        where: {
          id: req.params.restaurant_id,
        },
      });
      if (!restaurant) {
        return res.status(404).send({ message: "Restaurant not found" });
      }
      res.send(restaurant);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.delete("/restaurants/:restaurant_id", [requireAuth, requireRoles(["ADMIN"])], async (req, res) => {
    try {
      const restaurant = await Restaurant.findOne({
        where: {
          id: req.params.restaurant_id,
        },
      });
      if (!restaurant) {
        return res.status(404).send({ message: "Restaurant not found" });
      }
      await restaurant.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
};