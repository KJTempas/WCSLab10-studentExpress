//create and start server
let express = require('express')
//bodyParser converts data sent in a request to JSON
let bodyParser = require('body-parser')
let api_routes = require('./routes/api.js')

//App configuration
let app = express()

app.use(bodyParser.json())

app.use('/api', api_routes)

//start the server running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})