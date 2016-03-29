import prompt from 'prompt'
import chrono from 'chrono-node'
import { writeSaved } from './output'
import createEntry from '../create'
import db from '../db'

export default commit

function commit (yargs) {
  let argv = yargs
  .usage('Usage: tick commit [options] [message]')
  .example('tick commit "8am-12pm fixing bugs #tickbin"', 'record work for current day')
  .example('tick commit "Jan 22 11am-1pm fixing bugs #tickbin"', 'record work for Jan 22')
  .example('tick commit "yesterday 4-5pm learning javascript #dev"', 'record work for yesterday')
  .help('h')
  .alias('h', 'help')
  .argv

  let message

  if (argv._[1]) {
    message = argv._[1]
  }

  if (!message) {
    prompt.message = ''
    prompt.delimiter = ''
    prompt.start()
    prompt.get('message', function(err, res) {
      if (!err){
        createEntry(db, res.message)
        .then(writeSaved)
      }
    })
  } else {
    createEntry(db, message)
    .then(writeSaved)
  }
}
