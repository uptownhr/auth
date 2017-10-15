const mongoose = require('mongoose')
const authSchema = require('./schemas/auth')

module.exports = mongoose.model('auth', authSchema)