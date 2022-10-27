const mongoDB = require('mongodb')

const mongoClient = mongoDB.MongoClient
const database = 'your-databaseName', passcode = 'your-passcode'
let db_connect

const url = `mongodb+srv://<ClusterName>:${passcode}@cluster0.lp345ou.mongodb.net/?retryWrites=true&w=majority`

const mongoConnect = function (callback) {
    mongoClient.connect(url).then((client) => {
        console.log('connected')
        db_connect = client.db(database)
        callback()
    }).catch((error) => {
        console.log(error)
        throw error
    })
}

const getDatabase = function () {
    if (db_connect) return db_connect
    throw new Error('No Database found')
}

exports.mongoConnect = mongoConnect
exports.getDatabase = getDatabase



