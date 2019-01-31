const express = require('express')
const router = express.Router()
const logger = require('../logger/logger')
const sendMessage = require('../handlers/sendMessage')
router.post('/send', async function(req, res, next) {
  const traceId = req.headers.id
  logger.info('Received request', {traceId})
  const { title, message } = req.body    
  await sendMessage({title, message}, {traceId})
  res.status(200).send({ok: 'OK'})
})

module.exports = router
