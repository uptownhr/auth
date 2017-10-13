const router = require('express').Router()
const logger = require('../lib/logger')

router.use( (req,res,next) => {
    logger.debug('index controller request')
    next()
})


router.use( (req,res,next) => {
    logger.debug('index controller response')
    res.send('response')
})

module.exports = router
