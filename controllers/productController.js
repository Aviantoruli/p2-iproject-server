const {Product} = require('../models')
const { Op } = require("sequelize")

class ProductController{

    static async productList(req, res, next){
        try {
            const { name } = req.query
            let obj = {}
            if (name) {
                obj = { name : {
                    [Op.like]: `%${name}%`
                }}
            }
            console.log(obj)
            const Products = await Product.findAll({
                where:obj
            })
            if (Products) {
                res.status(200).json(Products)
            } else {
                throw{
                    name:"POSTNOTFOUND"
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async postProduct(req, res, next){
        try {
            const {name, img, size, type, price, stock} = req.body
            const newProduct = await Product.create({name, img, size, type, price, stock})
            if (newProduct) {
                res.status(201).json(newProduct)
            } else {
                throw{
                    name: "SequelizeValidationError"
                }
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = ProductController