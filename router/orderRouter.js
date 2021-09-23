const router = require('express').Router()
const OrderController = require('../controllers/orderController')
const {authe} = require('../middleware/login')
const errorHandler = require('../middleware/errorHandler')

router.post('/orders', authe, OrderController.createOrder)

router.post('/orders/done', OrderController.patchStatusOrder)

router.use(errorHandler)

module.exports = router