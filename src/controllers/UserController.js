const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const checkPermission = require("../middlewares/check-access");
const UserVoter = require("../voters/UserVoter");
const loadResource = require("../middlewares/load-ressource");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/users",
    [requireAuth, requireRoles(["ADMIN"])],
    async (req, res) => {
      res.send(await User.findAll());
    }
  );

  router.get("/users/@me", [requireAuth], async (req, res) => {
    res.send(req.user);
  });

  router.get(
    "/users/:user_id",
    [
      requireAuth,
      loadResource(
        (req) =>
          User.findOne({
            where: {
              id: req.params.user_id,
            },
          }) //ce resultat sera stocké dans req.result
      ),
      checkPermission(UserVoter, UserVoter.VIEW),
    ],
    async (req, res) => {
      res.send(req.result);
    }
  );
};
