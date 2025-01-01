module.exports = function (app, router) {
  require("./UserController")(app, router);
  require("./AuthenticationController")(app, router);
  require("./DishController")(app, router);
  require("./RestaurantController")(app, router);
  require("./OrderController")(app, router);
};
