var mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = mongoose
    .connect(process.env.MONGO_CONNECTION_URI, { useMongoClient: true })
