//create and start server
let express = require('express')
//bodyParser converts data sent in a request to JSON
let bodyParser = require('body-parser')
let api_routes = require('./routes/api.js')

//App configuration
let app = express()

app.use(bodyParser.json())

app.use('/api', api_routes)

//error handlers for route not found -to display error codes/messages
app.use(function(req, res, next) {
    res.status(404).send('Not found')
})
//error handler for server errors
app.use(function( err, req, res, next) {
    console.error(err.stack) //show stacktrace to aid in finding bug
    res.status(500).send('Server error')
})



//start the server running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})