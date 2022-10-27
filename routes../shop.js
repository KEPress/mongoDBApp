const express = require('express'), router = express.Router()
const shopController = require('../controllers/shop')


// GET => Requests
router.get('/', shopController.getHomePage)

.get('/products', shopController.getProductsPage)

.get('/products/:productID', shopController.getProductPage)

.get('/cart', shopController.getCartPage)

//.get('/orders', shopController.getOrdersPage)

//.get('/checkout', shopController.getCheckoutPage)


//POST => Requests
router.post('/cart', shopController.postCartInfo)

.post('/cart-delete-item', shopController.postDeleteCartInfo)

.post('/place-order', shopController.postPlaceOrderPage)

module.exports = router
