import * as supertest from 'supertest'
import app from './App'

describe('API', () => {
  it('returns json response', () =>
    supertest(app)
      .get('/signed_urls')
      .expect('Content-Type', /json/)
      .expect(200)
  )

  it('returns 400 response for invalid request type', () =>
  	supertest(app)
	  	.get('/signed_urls?requestType=bad')
	    .expect(400)
  )

  it('returns 400 response for invalid content type', () =>
  	supertest(app)
	  	.get('/signed_urls?contentType=bad')
	    .expect(400)
  )

  it('returns 400 response for invalid timestamp', () =>
  	supertest(app)
	  	.get('/signed_urls?expires=bad')
	    .expect(400)
  )
})
