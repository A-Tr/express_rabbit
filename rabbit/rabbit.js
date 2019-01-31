const amqp = require('amqp')
const logger = require('../logger/logger')

module.exports = () => {

	const connection = amqp.createConnection({ host: 'localhost'
		, port: 5672
		, login: 'guest'
		, password: 'guest'
		, connectionTimeout: 10000
		, authMechanism: 'AMQPLAIN'
		, vhost: '/'
		, noDelay: true
		, ssl: { enabled : false
		}
	})

	connection.on('error', e => {
		logger.error(e, {traceId: '1'})
	})

	connection.on('ready', function () {
		logger.info('Connection to Rabbit Ready', {traceId: '1'})
		// Use the default 'amq.topic' exchange
		connection.queue('Cola de eventos', function (q) {
		  logger.info(`Connection to Queue ${q.name}`, {traceId: '1'})
			// Catch all messages
			q.bind('#')
  
			// Receive messages
			q.subscribe(function (message) {
				// Print messages to stdout
				logger.info(`Message received: ${message}`, {traceId: '1'})
			})
		})
	})
	return connection
}