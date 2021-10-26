import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Overs extends BaseSchema {
  protected tableName = 'overs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('bowler_id').notNullable()

     
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
