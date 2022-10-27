const mongoDB = require('mongodb')
const getDatabase = require('../util/database').getDatabase

class ProductModel {

    //NOTE: id has to be last element due to mongoDB encoding encryption being lengthy
    constructor(title, price, details, imageURL, id, userID) {
        this.title = title
        this.price = price
        this.details = details
        this.imageURL = imageURL
        this._id = id ? new mongoDB.ObjectId(id) : null
        this.userID = userID
    }  

    commit() {
        const db = getDatabase()
        if (this._id) {
            //update existing product via product id
            return db.collection('products')
            .updateOne({_id: this._id}, {$set: this})
            .catch((error) => console.log(error))
        } else {
            //create new product
            return db.collection('products')
            .insertOne(this)
            .catch((error) => console.log(error))
        }
    }

    static fetchALL() {
        const db = getDatabase()
        return db.collection('products')
        .find()
        .toArray().then((products) => {
            //console.log(products)
            return products
        }).catch((error) => console.log(error))
    }

    static findID(productID) {
        const db = getDatabase()
        return db.collection('products')
        .find({_id: new mongoDB.ObjectId(productID)})
        .next().then((product) => {
            //console.log(product)
            return product
        }).catch((error) => console.log(error))
    }

    static deleteID(productID) {
        const db = getDatabase()
        return db.collection('products')
        .deleteOne({_id: new mongoDB.ObjectId(productID)})
        .catch((error) => console.log(error))
    }



} //End ProductModel Class


module.exports = ProductModel
