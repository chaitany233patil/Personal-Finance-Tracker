import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { registerUserValidator, loginUserValidator } from '#validators/user_validator'

export default class AuthController {
  async registerUser({ request }: HttpContext) {
    const data = request.body()
    const payload = await registerUserValidator.validate(data)
    const hashPass = await hash.make(payload.password)
    payload.password = hashPass
    await User.create(payload)
    return { success: true, message: 'Signup Successful', payload }
  }

  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    await loginUserValidator.validate({ email, password })
    const res = await User.findBy('email', email)
    if (await hash.verify(res?.$original.password, password)) {
      if (res?.$original) {
        return {
          success: true,
          message: 'login successful',
        }
      }
    }

    return {
      success: false,
      message: 'username and email is incorrect',
    }
  }
}
