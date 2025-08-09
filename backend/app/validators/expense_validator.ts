import vine from '@vinejs/vine'

export const ExpesneValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    title: vine.string(),
    amount: vine.number(),
    category: vine.string(),
    receipt_url: vine.string(),
  })
)
