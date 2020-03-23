//create and start server
var express = require('express')
var bodyParser = require('body-parser')
var api_routes = require('./routes/api.js')

//App configuration
var app = express()
app.use(bodyParser.json())
var Sequelize = require('sequelize')

//database config
sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3'
})

//verify connection
sequelize.authenticate()
    .then( () =>console.log('connect to sqlite'))
    .catch(err => console.log('error connecting', err))

    //initialize student model
let student = require('./model/student.js')(sequelize, Sequelize)

//App configuration
var app = express()
app.use(bodyParser.json())

app.use('/api', api_routes(student))

//start the server running
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('app running on port', server.address().port)
})