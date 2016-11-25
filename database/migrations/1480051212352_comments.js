'use strict'

const Schema = use('Schema')

class CommentsTableSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.timestamps()
      table.increments()    

      table.integer('users_id')
      table.foreign('users_id').references('users.id')

      table.date('week_of')

      table.boolean('clean')
      table.boolean('repair')
      table.boolean('beds')
      table.boolean('towels')
      table.boolean('windows')
      table.boolean('supplies')

      table.text('content')
    })
  }

  down () {
    this.drop('comments', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = CommentsTableSchema
