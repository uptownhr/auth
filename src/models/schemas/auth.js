const moment = require('moment')
const { Schema } = require('mongoose')

const authSchema = new Schema({
  email: {type: String, trim: true, lowercase: true, required: true },


  request: {
    token: {type: String, required: true},
    expires_at: {type: Date, required: true},
    created_at: {type: Date, required: true}
  },

  accessed_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  created_at: {type: Date, default: Date.now}
})


authSchema.methods.generate_request_token = function (minutes = 15) {
  console.log('moment', moment())
  console.log('moment.toDate', moment().toDate())
  console.log('date.now', Date.now())
  console.log('date', new Date())


  this.auth_request = {
    token: 'asdf',
    expires_at: moment().add(minutes, 'm'),
    created_at: Date.now()
  }

  return this.auth_request
}

module.exports = authSchema