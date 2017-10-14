const logger = require('../lib/logger')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = {
  init () {
    logger.info('initializing mongo connection to', process.env.MONGO_CONNECTION_URI)
    return mongoose
      .connect(process.env.MONGO_CONNECTION_URI, { useMongoClient: true })
      .then(res => {
        logger.info('mongo connected')
        return true
      })
      .catch(err => {
        logger.error(err)
        throw new Error('Db Connection Failed')
      })
  }
}
