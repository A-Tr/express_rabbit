const logger = require('../logger/logger')
var amqp = require('amqplib')

async function sendMessage ({title, message},{traceId}) {
  var msg = title

  try {
    const conn = await amqp.connect('amqp://localhost:5672')
    const ch = await conn.createChannel()

    let ok = await ch.assertQueue('node-to-go', {durable: false})
    ok = await ch.sendToQueue('node-to-go', Buffer.from(msg))
    if (!ok) {
      throw new Error('Error happened')
    }
    logger.info(`Sent ${JSON.stringify(msg)}`, {traceId})

    return ch.close()
  } catch (error) {
    logger.error(`Error: ${error}`, {traceId})
  }    
}
module.exports =  sendMessage