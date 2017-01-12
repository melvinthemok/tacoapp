var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var tacosController = require('./controllers/tacos_controller')
var app = express()

mongoose.connect('mongodb://localhost/taco-api')

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.send('hello')
})

app.use('/tacos', tacosController)

// we export the server so we can use it in testing
var server = app.listen(process.env.PORT || 3000)
console.log('Server UP')
module.exports = server
