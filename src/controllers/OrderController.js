const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const { Order, OrderItem } = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const Dish = require("../models/Dish");

module.exports = function (app, router) {
  router.post(
    "/orders/new",
    [requireAuth, requireRoles(["RESTAURANT", "ADMIN"])],
    async (req, res) => {
      try {
        const order = await Order.create({
          restaurantId: req.body.restaurantId,
        });

        const orderItems = req.body.items.map(item => ({
          orderId: order.id,
          dishId: item.dishId,
          quantity: item.quantity,
        }));

        await OrderItem.bulkCreate(orderItems);

        res.status(201).send(order);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
  );

  router.get("/orders", [requireAuth, requireRoles(["RESTAURANT", "ADMIN"])], async (req, res) => {
    try {
      const restaurant = await Restaurant.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!restaurant) {
        return res.status(404).send({ message: "Restaurant not found" });
      }

      const orders = await Order.findAll({
        where: {
          restaurantId: restaurant.id,
        },
        include: [OrderItem],
      });

      res.send(orders);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.get("/orders/restaurant/:restaurantId", [requireAuth, requireRoles(["RESTAURANT", "ADMIN"])], async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.restaurantId);

      if (!restaurant) {
        return res.status(404).send({ message: "Restaurant not found" });
      }

      const orders = await Order.findAll({
        where: {
          restaurantId: restaurant.id,
        },
        include: [OrderItem],
      });

      res.send(orders);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.delete("/orders/:id", [requireAuth, requireRoles(["RESTAURANT", "ADMIN"])], async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }
      await order.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
};