const mongoose = require('mongoose')

const tacoSchema = new mongoose.Schema({
  name: { type: String, required: true, min: [5, 'Too short'] },
  description: { type: String },
  completed: { type: Boolean }
})

const Taco = mongoose.model('Taco', tacoSchema)

module.exports = Taco
