const path = require('path')
const express = require('express'), app = express()
const mongoDB = require('./util/database').mongoConnect
const bodyParser = require('body-parser')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const User = require('./models/user_model')
const error = require('./controllers/error')


//NOTE: Order of code matters as Express is run from Top to Bottom

//This view engine is for ejs platform
app.set('view engine', 'ejs').set('views', 'views')


//parse url code in url address
app.use(bodyParser.urlencoded({ extended: false }))

//Access to public folder where css and other stuff are stored
app.use(express.static(path.join(__dirname, 'public')))

//Add User Model as part of the request 
app.use((request, response, next) => {
 User.getUserID('6356e7e0635a154ae0c8ec6e').then((user) => {
       request.user = new User(user.name, user.email, user.cart, user._id)
       next()
    }).catch((error) => console.log(error))
})


//Load html pages
app.use('/admin', adminRoutes).use(shopRoutes)

//Can also use this: app.use('/', error.getErrorPage)

app.use(error.getErrorPage)

mongoDB((client) => {
    console.log(client)
    app.listen(3000)
})



