import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Balls extends BaseSchema {
  protected tableName = 'balls'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
      .integer('over_id')
      .unsigned()
      .references('overs.id')
      .onDelete('CASCADE') // delete post when over is deleted
      .notNullable()

    table
      .integer('batsman_id') //batsman id
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE') // delete post when user is deleted
      .notNullable()
      
    table
      .integer('bowler_id') //bowler id
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE') // delete post when user is deleted
      .notNullable()

    table.integer('run').notNullable()
    table.integer('extra').notNullable()
    table.float('speed').notNullable()
    table.string('run_type', 191).notNullable()
    table.string('ball_type', 191).notNullable()
    table.integer('boundary').notNullable()
    table.string('out_type', 191).notNullable()
    table
      .integer('halper_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE') // delete post when user is deleted
      .notNullable()
    table
      .integer('out_player_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE') // delete post when user is deleted
      .notNullable()


     
      table.timestamp('created_at', { useTz: true }).nullable ()
      table.timestamp('updated_at', { useTz: true }).nullable ()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
