const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const loggerMiddleware = require('morgan')
const uuid = require('uuid')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/sendMessage')
const startConsumer = require('./rabbit/rabbit')
const cors = require('cors')
const traceMiddleware = (req, res, next) => {
  if (!req.headers.id) {
    req.headers.id = uuid()
    next()
  }
}

function start() {
  const app = express()
  app.use(cors())
  app.use(loggerMiddleware('dev'))
  app.use(traceMiddleware)
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  
  app.use('/', indexRouter)
  app.use('/messages', usersRouter)
  startConsumer()
  return app
}



module.exports = start()
