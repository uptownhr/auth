const { Schema } = require('mongoose')
const tokenSchema = require('./token')

const authSchema = new Schema({
  email: {type: String, trim: true, lowercase: true, required: true },


  request: {type: tokenSchema, default: tokenSchema},
  access: {type: tokenSchema, default: tokenSchema},

  accessed_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  created_at: {type: Date, default: Date.now}
})


authSchema.methods.generate_request_token = function (expires = 15 * 60 * 1000) {
  const payload = {
    email: this.email
  }

  return this.request.generateJWT (payload, process.env.TOKEN_SECRET, expires)
}

authSchema.methods.verify_request_token = function (token) {

  if (!this.request.verifyJWT(token, process.env.TOKEN_SECRET)) return false

  return true
}

authSchema.methods.request_to_access_token = function (request_token, expires = 15 * 60 * 1000) {
  this.verify_request_token (request_token)

  const payload = {
    email: this.email
  }

  return this.access.generateJWT (payload, process.env.TOKEN_SECRET, expires)
}

authSchema.methods.verify_access_token = function (token) {
  if (!this.access.verifyJWT(token, process.env.TOKEN_SECRET)) return false

  return true
}

module.exports = authSchema