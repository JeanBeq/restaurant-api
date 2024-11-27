const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const Restaurant = require("./Restaurant");

class Dish extends Model {
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      restaurantId: this.restaurantId,
    };
  }
}

Dish.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: "Dish",
    tableName: "dishes",
  }
);

Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

module.exports = Dish;