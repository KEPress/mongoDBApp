const { request } = require('express')
const mongoDB = require('mongodb')
const ProductModel = require('../models/products_model')

const ObjectID = mongoDB.ObjectId

exports.addProductPage = (request, response, next) => {
    response.render('admin/admin-products', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        edit: false
    })
 }

 exports.postAddProduct = (request, response, next) => {
    const title = request.body.title
    const price = request.body.price
    const details = request.body.details
    const imageURL = request.body.imageURL
    const product = new ProductModel(title, price, details, imageURL, null, request.user._id)
    product.commit().then(function () {
      console.log(product)
      response.redirect('/admin/products')
    }).catch((error) => console.log(error))
 }    

 exports.getProductsPage = (request, response, next) => {
   ProductModel.fetchALL().then((products) => {
      response.render('admin/products', {
         prods: products,
         pageTitle: 'Admin Products',
         path: '/admin/products'
      })
   }).catch((error) => console.log(error))
 }

 exports.editProductPage = (request, response, next) => {
      const editMode = request.query.edit
      if (!editMode) return response.redirect('/')
      const productID = request.params.productID
      ProductModel.findID(productID).then((product) => {
         if (!product) return response.redirect('/')
         response.render('admin/admin-products', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product',
            edit: editMode,
            product: product
         })
      }).catch((error) => console.log(error))
 }

 exports.postEditProduct = (request, response, next) => {
   const productID = request.body.productID
   const updateTitle = request.body.title
   const updateImage = request.body.imageURL
   const updateDetails = request.body.details
   const updatePrice = request.body.price
   const product = new ProductModel(updateTitle, updatePrice, updateDetails, updateImage, productID)
   product.commit().then( function () {
      response.redirect('/admin/products')
   }).catch((error) => console.log(error))
}

exports.postDeleteProduct = (request, response, next) => {
   const productID = request.body.productID
   ProductModel.deleteID(productID).then(function() {
      response.redirect('/admin/products')
   }).catch((error) => console.log(error))


}


    
    


