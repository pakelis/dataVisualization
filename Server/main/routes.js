//All our routes
var express = require('express')
var router = express.Router()
var pool = require('./db')

/*
  TEST ROUTE
*/

router.get('/api/hello', (req, res) => {
  // test route for our Client
  res.json('hello world')
})

/*
   ROUTES SECTION
*/

router.get('/api/get/tableone', (req, res, next) => {
  pool.query(`SELECT * FROM finance`, (q_err, q_res) => {
    console.log(res.json(q_res.rows))
    res.json(q_res.rows)
  })
})

router.get('/api/get/allusers', (req, res, next) => {
  pool.query(`SELECT * FROM users`, (q_err, q_res) => {
    res.json(q_res)
  })
})

module.exports = router
