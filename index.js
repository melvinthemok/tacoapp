var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var tacosController = require('./controllers/tacos_controller')
var app = express()

mongoose.connect('mongodb://localhost/taco-api')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.send('hello')
})

app.use('/tacos', tacosController)

// if process.env.PORT is not found, default to 3000
// PORT refers to an environment variable
// we need to use environment variable for config
// on the production server, they will decide the port
var server = app.listen(process.env.PORT || 3000)
console.log('Server UP')

// we export the running server so we can use it in testing
module.exports = server
