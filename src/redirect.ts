import { NextFunction, Request, Response } from 'express'
import { app } from './app'

type StatusCode =
  | 307 // Temporary redirect
  | 308 // Permanent redirect. Be careful with this as it's permanently cached in browsers, making it very difficult to change later

export function redirect(
  hostname: string,
  location: string,
  statusCode: StatusCode = 307
) {
  const handler = (req: Request, res: Response, next: NextFunction) => {
    if (req.hostname === hostname) {
      res.redirect(statusCode, location)
    } else {
      next()
    }
  }
  app.get('*', handler)
}
