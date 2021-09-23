const router = require('express').Router()
const UserController = require('../controllers/userController')
const orderRouter = require('./orderRouter')
const productRouter = require('./productsRouter')
const errorHandler = require('../middleware/errorHandler')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/authGoogle', UserController.googleAuth)

router.use(errorHandler)
router.use('/users', orderRouter)
router.use('/users', productRouter)
module.exports = router