'use strict'

const Schema = use('Schema')

class DateFormatTableSchema extends Schema {

  up () {
    this.table('comments', (table) => {
      table.dropColumn('week_of')
      table.integer('day')
      table.string('month')
      table.integer('year')
    })
  }

  down () {
    this.table('comments', (table) => {
      table.date('week_of')
      table.dropColumn('day')
      table.dropColumn('month')
      table.dropColumn('year')
    })
  } 
  
}

module.exports = DateFormatTableSchema
