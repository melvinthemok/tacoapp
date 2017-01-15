/* global describe it */

var expect = require('chai').expect
var mongoose = require('mongoose')
var request = require('supertest')
var app = require('../index')

describe('GET /', function () {
  // mocha lets us add hooks which will apply before each test, in this case this will drop the database
  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done)
  })
  // tests will be written inside this function
  it('should return a 200 response', function (done) {
    // each test is a callback function
    // this is what 'done' is for
    request(app).get('/')
    .expect(200, done)
  })
})

describe('GET /tacos', function () {
  // if test timeout
  // alternatively, include --15000 after a space at the end of the test script in package.json
  this.timeout(15000)
  it('should return a 200 response', function (done) {
    request(app).get('/tacos')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an array', function (done) {
    request(app).get('/tacos')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(response.body).to.be.an('array')
        done()
      })
  })
})

// this will fail as there are no tacos
describe('POST /tacos', function () {
  it('should create a taco and return it', function (done) {
    request(app).post('/tacos')
    // we are saying that we want JSON data back from this request
    .set('Accept', 'application/json')
    .send({
      name: 'Cheesy Gordita Crunch',
      amount: 6000
    })
    .expect(201, done)
  })
})

describe('GET /tacos', function () {
  it("should return an object that has a field called 'name' ", function (done) {
    request(app).get('/tacos')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(response.body[0]).to.have.property('name')
        done()
      })
  })
})
// 
// describe('DELETE /tacos/:id', function () {
//   it('should return a 200 response on deleting a valid taco', function (done) {
//     request(app).delete('/tacos/1')
//     // .end is a supertest function which we can use to access the response
//     .end(function (err, response) {
//       expect(response.statusCode).to.equal(200)
//       expect(response.body).to.have.property('msg')
//       expect(response.body.msg).to.equal('success')
//       done()
//     })
//   })
// })
