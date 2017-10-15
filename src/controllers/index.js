const router = require('express').Router()
const logger = require('../lib/logger')

const {Auth} = require('../models')

router.use( (req,res,next) => {
  logger.debug('index controller request')
  next()
})

router.post('request-token/email', async (req, res, next) => {
  const email = req.body.email

  let auth = await Auth.findOne({email})

  if (!auth) {
    auth = new Auth({email})
    await auth.save()
  }

  const auth_request = auth.generate_auth_request()

})

router.use( (req,res,next) => {
  logger.debug('index controller response')
  res.send('response')
})

module.exports = router
