export default list

import Entry from '../entry'
import {getOutputs} from './output'
import moment from 'moment'
import _ from 'lodash'
import chalk from 'chalk'
import format from '../time'
import chrono from 'chrono-node'
import db from '../db'
import { filterTags, hashTags } from '../query'

function list (yargs) {
  let argv = yargs
  .usage('Usage: tick list [options]')
  .option('t', {
    alias: 'tag',
    describe: 'tags to filter as boolean AND (no # symbol - e.g. -t tag1 tag2)',
    type: 'array'
  })
  .option('d', {
    alias: 'date',
    describe: 'date range to filter entries or number of days to list',
    type: 'string'
  })
  .help('h')
  .alias('h', 'help')
  .argv

  let days = parseInt(argv.date)
  days = days >= 0 ? days : 6 // default 6 days

  let dates = chrono.parse(argv.date)[0] || [{}]
  // by default, set the date range then check if chrono parsed anything good
  let start = moment().subtract(days, 'days').startOf('day').toArray()
  let end   = moment().endOf('day').toArray();
  if (dates.start && dates.end) {
    start = moment(dates.start.date()).startOf('day').toArray()
    end   = moment(dates.end.date()).endOf('day').toArray()
  }

  queryEntries(start, end)
  .then(_.partial(groupEntries, hashTags(argv.tag)))
}

function queryEntries (start, end) {
  return db.query('entry_index/by_from', {
    include_docs: true,
    descending: true,
    startkey: end, // decending, so we start at recent dates
    endkey: start
  })
}

function groupEntries (tags = [], results) {
  let dat = _.chain(results.rows)
  .filter(_.partial(filterTags, tags))
  .map(row => { return Entry.fromJSON(row.doc) })
  .groupBy(e => { return moment(e.from).startOf('day').format('YYYY-MM-DD') })
  .map((group, d) => { 
    return { 
      ticks: group, 
      date: moment(d, 'YYYY-MM-DD').toDate(),
      minutes: _.reduce(group, (sum, e) => { return sum + e.duration.minutes }, 0)
    }
  })
  .each(writeEntryGroup)
  .value()

  if (dat.length === 0)
    console.log('You have no recent entries in tickbin. Create some with \'tick log\'')
}

function writeEntryGroup (group) {
  const date = moment(group.date).format('ddd, MMM DD, YYYY')
  const duration = format(group.minutes)
  console.log(`${chalk.yellow(date)} ${chalk.green(duration)}`)
  group.ticks.forEach(t => { console.log(getOutputs(t).simple) })
}
