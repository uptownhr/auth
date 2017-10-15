const moment = require('moment')
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  jwt = require('jsonwebtoken')

const tokenSchema = new Schema({
  token: {type: String, trim: true, default: null},
  expires_at: {type: Date, default: null},
  created_at: {type: Date, default: null}
})

tokenSchema.methods.generateJWT = function (payload, secret, expires) {
  if (!expires) throw new Error('generateJWT: requires expires')
  //let token = jwt.sign(payload, this._id.toString() + secret + JWT_SECRET);
  let token = jwt.sign(payload, secret);

  this.token = token
  this.created_at = Date.now()
  this.expires_at = moment(this.created_at).add(expires, 's')

  return token
}

tokenSchema.methods.verifyJWT = function (token, secret) {
  if (this.token != token) throw new Error('verifyJWT: token mismatch')
  if (moment(this.expires_at).valueOf() <= moment().valueOf()) throw new Error (`verifyJWT: token expired: ${this.expires_at.valueOf()} <= ${moment().valueOf()}`)

  const decoded = jwt.verify(token, secret)

  return decoded
}

module.exports = tokenSchema