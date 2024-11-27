const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");

module.exports = function (app, router) {
  router.post(
    "/restaurants",
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
        include: [Dish], // Inclure les plats associés
      });
      if (!restaurant) {
        return res.status(404).send({ message: "Restaurant not found" });
      }
      res.send(restaurant);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
};