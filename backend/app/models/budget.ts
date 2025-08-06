import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Budget extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare month: string

  @column()
  declare year: string

  @column()
  declare amount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
