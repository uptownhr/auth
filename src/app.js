const logger = require('./lib/logger')
const db = require('./config/db')


module.exports = {
  async init () {
    await db.init()

    logger.info('initializing app')
    const app = require('express')()
    const morgan = require('morgan')(process.env.HTTP_LOGGER_FORMAT, {stream: logger.stream})
    const controllers = require('./controllers')

    app.use(morgan)
    app.use(controllers)

    logger.info('app initialized')

    return app
  }
}
