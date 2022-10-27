const path = require('path'), express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')


// admin/add-product => GET Requests
router.get('/add-product', adminController.addProductPage)

.get('/products', adminController.getProductsPage)

.get('/edit-product/:productID', adminController.editProductPage)

// admin/add-product => POST Requests
router.post('/add-product', adminController.postAddProduct)

.post('/edit-product', adminController.postEditProduct)

.post('/delete-product', adminController.postDeleteProduct)

module.exports = router
