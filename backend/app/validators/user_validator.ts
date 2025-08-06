import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine.string().email().unique({ table: 'Users', column: 'email' }),
    password: vine.string(),
    profileImageUrl: vine.string(),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
