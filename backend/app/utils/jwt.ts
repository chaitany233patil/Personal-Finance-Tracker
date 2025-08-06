import jwt from 'jsonwebtoken'
import env from '#start/env'

export function signJWT(payload: object) {
  //@ts-ignore
  return jwt.sign(payload, env.get('JWT_SECRET') as string, {
    expiresIn: env.get('JWT_EXPIRES_IN') || '1d',
  })
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, env.get('JWT_SECRET') as string)
  } catch {
    return null
  }
}
