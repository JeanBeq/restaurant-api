const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
const User = require("./User");
const Dish = require("./Dish");

class Restaurant extends Model {
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      userId: this.userId,
    };
  }
}

Restaurant.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: "Restaurant",
    tableName: "restaurants",
  }
);

Restaurant.belongsTo(User, { foreignKey: 'userId' });

module.exports = Restaurant;