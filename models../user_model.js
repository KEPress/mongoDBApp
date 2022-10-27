const mongoDB = require('mongodb')
const getDatabase = require('../util/database').getDatabase

class User_Model {

    constructor(name, email, cart, id) {
        this.name = name
        this.email = email
        this.cart  = cart
        this._id = id
    }

    save() {
       const db = getDatabase()
       return db.collection('users').insertOne(this) 
    }

    addToCart(product) {
       const db = getDatabase()
       let newQuantity = 1
       const cartItems = [...this.cart.items]
      
       const productIndex = this.cart.items.findIndex((cartProduct) => {
           return cartProduct.productID.toString() === product._id.toString()
       })
       
       if (productIndex >= 0) {
            newQuantity = this.cart.items[productIndex].quantity + 1
            cartItems[productIndex].quantity = newQuantity
       } else {
            cartItems.push({ productID: new mongoDB.ObjectId(product._id), quantity: newQuantity})
       }

       const updateCart = { items: cartItems }
       return db.collection('users')
       .updateOne({ _id: new mongoDB.ObjectId(this._id)}, 
       { $set: { cart: updateCart }})
        
    }

    removeFromCart(productID) {
        const db = getDatabase()
        const cartItems =   this.cart.items.filter((item) => {
            return item.productID.toString() !== productID.toString()
        })
        return db.collection('users')
        .updateOne({ _id: new mongoDB.ObjectId(this._id)}, { $set: {cart: { items: cartItems}}})
    }

    getCart() {
        const db = getDatabase()
        const productArray = this.cart.items.map((item) => {
            return item.productID
        })
        return db.collection('products')
        .find({_id:{$in: productArray}}).toArray()
        .then((products) => {
            return products.map((product) => {
                return {...product, quantity: this.cart.items.find((item) => {
                    return item.productID.toString() === product._id.toString()
                }).quantity }
            })
        })
    }

    static getUserID(userID) {
        const db = getDatabase()
        return db.collection('users')
        .findOne({_id: new mongoDB.ObjectId(userID) })
        .then((user) => {
            console.log(user)
            return user
        }).catch((error) => console.log(error))
    }

    placeOrder() {
        const db = getDatabase()
        return this.getCart().then((products) => {
            const order = {
                items: products,
                user: { _id: new mongoDB.ObjectId(this._id), name: this.name }
            }
            return db.collection('orders').insertOne(order)
        }).then( function () {
            this.cart = { items: [] }
            return db.collection('users')
            .updateOne({ _id: new mongoDB.ObjectId(this._id)}, { $set: { cart: { items: []}}})
        })
    }

    getOrders() {
        const db = getDatabase()
        return db.collection('orders')
        .find({'user._id': new mongoDB.ObjectId(this._id)})
        .toArray()
    }

}

module.exports = User_Model
