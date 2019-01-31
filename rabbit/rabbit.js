const open = require('amqplib').connect('amqp://localhost:5672')
const logger = require('../logger/logger')

module.exports = () => {
  open
    .then((conn) => conn.createChannel())
    .then(ch => ch.assertQueue('go-to-node')
      .then(function(ok) {
        logger.info(`Channel assertion: ${JSON.stringify(ok)}`, {traceId: '1'})
        return ch.consume('go-to-node', msg => {
          if (msg !== null) {
            logger.info(`Message: ${JSON.stringify(msg.content.toString())}`, {traceId: '1'})
            ch.ack(msg)
          }
        })
      })
    ).catch(e => {
      logger.error(`Error with the consumer ${e}`, '1')
    })
}

