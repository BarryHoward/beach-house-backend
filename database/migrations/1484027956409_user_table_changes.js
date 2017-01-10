'use strict'

const Schema = use('Schema')

class UserTableChangesTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.dropColumn('email')
      table.dropColumn('info')
      table.integer('interval_1')
      table.integer('interval_2')
      table.integer('interval_3')
    })
  }

  down () {
    this.table('users', (table) => {
      table.string('email', 254).notNullable().unique()
      table.text('info')
      table.dropColumn('interval_1')
      table.dropColumn('interval_2')
      table.dropColumn('interval_3')      
    })
  }

}

module.exports = UserTableChangesTableSchema
