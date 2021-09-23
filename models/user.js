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
      User.hasMany(models.Order)
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:'first name cannot be empty'}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:'last name cannot be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:'email cannot be empty'},
        isEmail:{msg:'wrong format'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:'password cannot be empty'}
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{msg:'phone number cannot be empty'}
      }
    },
    address: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(instance){
        instance.imgUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      },
      afterValidate(instance){
        instance.password = hashPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};