require('dotenv').config()
const logger = require('./lib/logger')
const app = require('./app')

app.listen(process.env.port || 3000, () => {
  logger.info('http listening on', process.env.PORT)
})
