import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenameProfileImgUrlColumnInUsers extends BaseSchema {
  protected tableName = 'expenses'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('reciept_Url', 'receipt_url')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('receipt_url', 'reciept_Url')
    })
  }
}
