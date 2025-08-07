import vine from '@vinejs/vine'

export const ExpesneValidator = vine.compile(
  vine.object({
    user_id: vine.string(),
    title: vine.string(),
    amount: vine.number(),
    type: vine.string(),
    category: vine.string(),
    date: vine.string(),
    imageUrl: vine.string(),
  })
)
