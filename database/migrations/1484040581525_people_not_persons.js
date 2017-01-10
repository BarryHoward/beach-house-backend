'use strict'

const Schema = use('Schema')

class PeopleNotPersonsTableSchema extends Schema {

  up () {
    this.drop('persons')
    this.create('people', table => {
      table.increments()
      table.string('first_name')
      table.string('last_name')
      table.string('middle_name')

      table.string('address')
      table.string('city')
      table.string('state')
      table.integer('zip_code')

      table.string('email')
      table.string('cell_phone')
      table.string('home_phone')
      table.integer('user_id').references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('people')
    this.create('persons', table => {
      table.increments()
      table.string('first_name')
      table.string('last_name')
      table.string('middle_name')

      table.string('address')
      table.string('city')
      table.string('state')
      table.integer('zip_code')

      table.string('email')
      table.string('cell_phone')
      table.string('home_phone')
      table.integer('user_id').references('id').inTable('users')
      table.timestamps()
    })
  }

}

module.exports = PeopleNotPersonsTableSchema
