require('dotenv').config({path: __dirname + '/.env'})
import test from 'ava'
import {Auth} from '../../src/models'

test('this will pass', t => {
  t.pass()
})

test('Auth model exists', async t => {
  t.truthy(Auth)
})

test('Auth model instance can be created', async t => {
  const auth = new Auth({email: 'test@test.com'})

  t.truthy(auth)
  t.is(auth.email, 'test@test.com')
})

test('Auth instance can generate a auth request', async t => {
  const auth = new Auth({email: 'test@test.com'})

  const request = auth.generate_request_token()

  t.truthy(request.token)
  t.truthy(request.created_at)
  t.truthy(request.expires_at)

  t.not(request.created_at, request.expires_at)
})

test('Auth verify request token', async t => {
  const auth = new Auth({email: 'test@test.com'})
  const request = auth.generate_request_token()

  const valid = auth.verify_request_token(request.token)

  t.true(valid)
})
