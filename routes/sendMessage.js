let express = require('express')
let router = express.Router()
let sendMessage = require('../handlers/sendMessage')
/* GET users listing. */
router.post('/message', function(req, res, next) {
  let body = req.body
  
	res.send('respond with a resource')
})

module.exports = router
