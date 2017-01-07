'use strict'

const Schema = use('Schema')

class UsernameCommentTableSchema extends Schema {

  up () {
    this.table('comments', (table) => {
      table.string('username')
    })
  }

  down () {
    this.table('comments', (table) => {
      table.dropColumn('username')
    })
  } 

}

module.exports = UsernameCommentTableSchema
