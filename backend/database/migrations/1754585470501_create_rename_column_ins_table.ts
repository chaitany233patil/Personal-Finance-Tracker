import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenameProfileImgUrlColumnInUsers extends BaseSchema {
  protected tableName = 'expenses'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('userId', 'user_id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('user_id', 'userId')
    })
  }
}
