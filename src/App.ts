import * as express from 'express'
import * as signedUrlRoute from "./routes/signedUrlRoute"

class App {
  public express

  constructor () {
    this.express = express()
    this.configureRoutes()
  }

  private configureRoutes (): void {
    this.express.use('/signed_urls', signedUrlRoute)

    this.express.use(function(req, res, next) {
      res.status(404)
      res.send({error: "Page not found"})
      return
    })
  }
}

export default new App().express
