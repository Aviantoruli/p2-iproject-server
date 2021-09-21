'use strict';
const {hashPass} = require('../helper/bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Cart)
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate:{
        notNull:{msg:'first name cannot be null'},
        notEmpty:{msg:'first name cannot be empty'}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate:{
        notNull:{msg:'last name cannot be null'},
        notEmpty:{msg:'last name cannot be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notNull:{msg:'email cannot be null'},
        notEmpty:{msg:'email cannot be empty'},
        isEmail:{msg:'wrong format'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notNull:{msg:'password cannot be null'},
        notEmpty:{msg:'password cannot be empty'}
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate:{
        notNull:{msg:'phone number cannot be null'},
        notEmpty:{msg:'phone number cannot be empty'}
      }
    },
    address: DataTypes.STRING,
    postCode: DataTypes.INTEGER,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    hooks:{
      afterValidate(instance){
        instance.password = hashPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};