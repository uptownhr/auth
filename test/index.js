require('dotenv').config({path: __dirname + '/.env'})
import test from 'ava'

test('this will pass', t => {
  t.pass()
})

test('app can be initialized', async t => {
  const app = require('../src/app')

  t.truthy(app)

  const init = await app.init()


  t.truthy(init)
})