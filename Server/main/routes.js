//All our routes
var express = require('express')
var router = express.Router()

router.get('/api/hello', (req, res) => {
  // test route for our Client
  res.json('hello world')
})

module.exports = router
