const { Order } = require('../models')
const midtransClient = require('midtrans-client');
const {send} = require('../nodemailer/server')
const SendMail = require("../nodemailer/server")

class OrderController {

    static async createOrder(req, res, next) {
        try {
            const { total } = req.body
            const newOrder = await Order.create({ UserId: req.user.id, total })
            // order aja jangan lupa insert order detail 
            if (newOrder) {
                SendMail.send(req.user.email, process.env.PassEmail)
                // Create Snap API instance
                let snap = new midtransClient.Snap({
                    // Set to true if you want Production Environment (accept real transaction).
                    isProduction: false,
                    serverKey: process.env.Server_Key
                });

                let parameter = {
                    "transaction_details": {
                        "order_id": newOrder.id,
                        "gross_amount": +total
                    },
                    "credit_card": {
                        "secure": true
                    },
                    "customer_details": {
                        "first_name": req.user.firstName,
                        "last_name": req.user.lastName,
                        "email": req.user.email,
                        "phone": req.user.phoneNumber
                    }
                };

                let trx = await snap.createTransaction(parameter)
                    trx.orderId = newOrder.id
                res.status(200).json(trx)
            }
        } catch (err) {
            console.log(err)
        }
    }

    static async patchStatusOrder(req, res, next) {
        try {
            const id = +req.body.OrderId
            const updateStatus = await Order.update({ isPaid: "paid" }, {
                where: { id }
            })
            if (updateStatus) {
                res.status(201).json(updateStatus)
            } else {
                throw {
                    name: "DATANOTFOUND"
                }
            }
        } catch (err) {
            next(err)
        }
    }

}


module.exports = OrderController