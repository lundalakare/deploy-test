import http from 'http'
import express from 'express'
import cors from 'cors'
import createError, { HttpError } from 'http-errors'

function createServer () {
  const app = express()

  app.use(cors())

  app.get('/', (req, res, next) => {
    res.json({
      data: {
        foo: 'bar'
      }
    })
  })

  /**
   * Catch all if no route was matched. Just throw 404
   */
  app.use((req, res, next) => {
    throw createError(404)
  })
  
  /**
   * Error handler. Handles all errors thrown inside middleware and route
   * handlers/controllers.
   */
  app.use((err: Error|HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // If the error is an HttpError, use it. If not, treat is as a 500-error.
    let error: HttpError
    if (err instanceof HttpError) {
      error = err
    } else {
      error = createError(500)
    }

    // If this is a severe error, log it.
    if (error.statusCode >= 500) {
      // TODO: You'd probably want to switch this out for a proper logging
      // solution.
      console.error(err)
    }
  
    // Send the error with the appropriate status code and body.
    res
      .status(error.statusCode)
      .json({
        error: {
          name: error.name,
          message: error.message
        }
      })
  })

  const server = http.createServer(app)

  return server
}

export {
  createServer
}
