import vine from '@vinejs/vine'

export const ExpesneValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    title: vine.string(),
    amount: vine.number(),
    category: vine.string(),
    recieptUrl: vine.string(),
  })
)
