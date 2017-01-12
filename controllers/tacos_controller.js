var express = require('express')
var router = express.Router()
var Taco = require('../models/taco')

router.get('/', function (req, res) {
  Taco.find({}, function (err, tacos) {
    if (err) res.status(500).json({msg: 'error finding tacos'})
    res.json(tacos)
  })
})

router.get('/:id', function (req, res) {
  Taco.findById(req.params.id, function (err, taco) {
    if (err) res.status(404).json({msg: 'not found'})
    res.json(taco)
  })
})

router.put('/:id', function (req, res) {
  Taco.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, taco) {
    if (err) res.status(422).json({msg: 'error updating taco'})
    res.json({msg: 'success', taco: taco})
  })
})

router.delete('/:id', function (req, res) {
  Taco.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) res.status(500).send({msg: 'error deleting taco'})
    res.send({msg: 'success'})
  })
})

router.post('/', function (req, res) {
  Taco.create(req.body, function (err, taco) {
    if (err) return res.status(500).render('error')
    res.redirect('/tacos')
  })
})

module.exports = router
