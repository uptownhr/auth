require('dotenv').config({path: __dirname + '/../.env'})
import test from 'ava'
import {Auth} from '../../src/models'

function wait (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

test('this will pass', t => {
  t.pass()
})

test('Auth model exists', async t => {
  t.truthy(Auth)
})

test('Auth model instance can be created', t => {
  const auth = new Auth({email: 'test@test.com'})

  t.truthy(auth)
  t.is(auth.email, 'test@test.com')
})

test('Auth instance can generate a auth request', t => {
  const auth = new Auth({email: 'test@test.com'})

  const token = auth.generate_request_token()

  t.truthy(auth.request.token)
  t.truthy(auth.request.created_at)
  t.truthy(auth.request.expires_at)

  t.not(auth.request.created_at, auth.request.expires_at)
})

test('Auth verify request token', t => {
  const auth = new Auth({email: 'test@test.com'})
  const token = auth.generate_request_token()

  const valid = auth.verify_request_token(token)

  t.true(valid)
})

test('Auth verify throws error when token does not match', t => {
  const auth = new Auth({email: 'test@test.com'})
  const token = auth.generate_request_token()

  t.throws( () => auth.verify_request_token('x') )
})

test('Auth verify throws error when token is expired', async t => {
  const auth = new Auth({email: 'test@test.com'})
  const token = auth.generate_request_token(1)

  await wait(1)

  t.throws( () => {
    auth.verify_request_token(token)
  })
})

test('Auth generates access token from request token', async t => {
  const auth = new Auth({email: 'test@test.com'})
  const token = auth.generate_request_token()

  const access_token = auth.request_to_access_token(token)

  t.truthy(access_token)
})


test('Auth verify access token', t => {
  const auth = new Auth({email: 'test@test.com'})
  const token = auth.generate_request_token()
  const access_token = auth.request_to_access_token(token)

  const valid = auth.verify_access_token(access_token)

  t.true(valid)
})

test('Auth verify access throws error when token does not match', t => {
  const auth = new Auth({email: 'test@test.com'})
  const token = auth.generate_request_token()
  const access_token = auth.request_to_access_token(token)

  t.throws( () => auth.verify_access_token('x') )
})

test('Auth verify access throws error when token is expired', async t => {
  const auth = new Auth({email: 'test@test.com'})
  const token = auth.generate_request_token()
  const access_token = auth.request_to_access_token(token, 1)

  await wait(1)

  t.throws( () => {
    auth.verify_access_token(token)
  })
})