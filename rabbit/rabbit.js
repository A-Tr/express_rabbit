const open = require('amqplib').connect('amqp://localhost:5672')
const logger = require('../logger/logger')
const uuid = require('uuid/v4')
module.exports = async () => {
	const traceId = uuid()
  try {
    const conn = await open
    const ch = await conn.createChannel()
	
    const ok = await ch.assertQueue('go-to-node')
    logger.info(`Channel assertion: ${JSON.stringify(ok)}`, {traceId})
	
    return ch.consume('go-to-node', msg => {
      if (msg !== null) {
        logger.info(`Message: ${JSON.stringify(msg.content.toString())}`, {traceId})
        ch.ack(msg)
      }
    })
  } catch (error) {
    logger.error(`Error with the consumer ${error}`, {traceId})
		
  }
}

