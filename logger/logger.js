const winston = require('winston')
 
const format = winston.format.printf(({ level, message, traceId }) => {
	const timestamp = new Date()
	return `${timestamp.toISOString()} level:${level.toUpperCase()}. MESSAGE: ${message}. traceId:${traceId}`
})
 

const logger = winston.createLogger({
	level: 'info',
  format,
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.Console({
      
		})
	]
})

module.exports = logger