'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:'name cannot be empty'}
      }
    },
    img: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:'img cannot be empty'}
      }
    },
    size: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{msg:'size cannot be empty'}
      }
    },
    type: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:'type cannot be empty'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{msg:'price cannot be empty'}
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{msg:'stock cannot be empty'}
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};