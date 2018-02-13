import * as supertest from 'supertest'
import app from './App'

describe('API', () => {
  it('returns json response', () =>
    supertest(app)
      .get('/signed_urls')
      .expect('Content-Type', /json/)
      .expect(200)
  )
})
