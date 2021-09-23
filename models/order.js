'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
    }
  };
  Order.init({
    total: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{msg:'total cannot be empty'}
      }
    },
    UserId: DataTypes.INTEGER,
    isPaid: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(instance){
        instance.isPaid = "Unpaid"
      }
    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};