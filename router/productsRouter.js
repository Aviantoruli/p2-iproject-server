const router = require('express').Router()
const ProductController = require('../controllers/productController')
const errorHandler = require('../middleware/errorHandler')

router.get('/products', ProductController.productList)

router.post('/products', ProductController.postProduct)

router.use(errorHandler)

module.exports = router