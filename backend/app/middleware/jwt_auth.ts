// app/middleware/jwt_auth.ts
import type { HttpContext } from '@adonisjs/core/http'
import { verifyJWT } from '../utils/jwt.js'
import User from '#models/user'
import { JwtPayload } from 'jsonwebtoken'

export default class JwtAuthMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const authHeader = ctx.request.header('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.response.unauthorized({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyJWT(token)

    if (!decoded) {
      return ctx.response.unauthorized({ message: 'Invalid or expired token' })
    }

    const res = await User.findBy('email', (decoded as JwtPayload).email)
    if (res?.$original) {
      //@ts-ignore
      ctx.User = res?.$original
      await next()
    }
    return {
      success: false,
      message: 'unauthorized',
    }
  }
}
