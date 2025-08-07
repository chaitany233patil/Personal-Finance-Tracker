import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenameProfileImgUrlColumnInUsers extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('profileImgUrl', 'profile_img_url')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('profile_img_url', 'profileImgUrl')
    })
  }
}
