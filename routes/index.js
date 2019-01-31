const express = require('express')
const router = express.Router()
const logger = require('../logger/logger')
const uuid = require('uuid/v4')
/* GET home page. */
router.get('/', function(req, res, next) {
	logger.info('Request received', { traceId: req.headers.id })
	res.send({holi: 'Holli'})
})

module.exports = router
