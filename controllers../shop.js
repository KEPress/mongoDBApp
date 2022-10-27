const ProductModel = require('../models/products_model')


exports.getHomePage = (request, response, next) => {
    ProductModel.fetchALL().then((products) => {
        response.render('shop/home', { 
            prods: products, 
            pageTitle:'Home Page', 
            path:'/'
        })
    }).catch((error) => console.log(error))
}

exports.getProductsPage = (request, response, next) => { 
    ProductModel.fetchALL().then((products) => {
        response.render('shop/products', { 
            prods: products, 
            pageTitle:'All Products', 
            path:'/products'
        })
    }).catch((error) => console.log(error))
}


exports.getProductPage = (request, response, next) => {
    const productID = request.params.productID
    ProductModel.findID(productID).then((product) => {
        response.render('shop/details', { 
            product: product, 
            pageTitle: product.title,
            path: '/products'
        })
    }).catch((error) => console.log(error))
}

exports.getCartPage = (request, response, next) => {
    request.user.getCart().then((products) => {        
            response.render('shop/cart', {
            products: products,
            pageTitle: 'Your Cart',
            path: '/cart' 
        })
    }).catch((error) => console.log(error))
}
       
    
exports.postCartInfo = (request, response, next) => {
    const productID = request.body.productID
    ProductModel.findID(productID).then((product) => {
        return request.user.addToCart(product)
    }).then( function () {
         response.redirect('/cart')
    }).catch((error) => console.log(error))
}

exports.postDeleteCartInfo = (request, response, next) => {
    const productID = request.body.productID
    request.user.removeFromCart(productID).then( function () {
        response.redirect('/cart')
    }).catch((error) => console.log(error))
}


exports.postPlaceOrderPage = (request, response, next) => {
    request.user.placeOrder().then( function () {
        response.redirect('/orders')
    }).catch((error) => console.log(error))
}

/***
 exports.getCheckoutPage = (request, response, next) => {
    response.render('shop/checkout', { 
        pageTitle:'Checkout', 
        path:'/checkout'
    })
}
*
*/


exports.getOrdersPage = (request, response, next) => {
    request.user.getOrders().then((orders) => {
        response.render('shop/orders', {
            orders: orders, 
            pageTitle:'Orders Placed', 
            path:'/orders'
        })
    }).catch((error) => console.log(error))
   
}

