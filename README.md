[![wercker status](https://app.wercker.com/status/445b091cc8c834b5b3820d52420b82e7/s "wercker status")](https://app.wercker.com/project/bykey/445b091cc8c834b5b3820d52420b82e7)

# tickbin

A great time tracking tool.

Use natural language and simple text based interfaces to track time on projects.

## Installation

Tickbin requires [Node.js v4.2](https://nodejs.org/en/) or greater.

1. `npm install -g tickbin`
2. `tick --help`

## Usage

### `tick log` 

logs time entries

```shell
tick log "8am-12pm fixed a bunch of bugs" # logs time entry for today
tick log -d yesterday "9pm-11pm late night code jamming" # log time entry for yesterday
tick log -d "Jan 1" "12am-1am partied!" # log time for Jan 1
tick log "12pm-1pm great #lunch at Mervo's" # add #tags anywhere
```

### `tick list` 

display time entries

```shell
tick list # shows you all your time entries for the past week
tick list -d "jan1-31" # shows you time entries for Jan 1-31
tick list -d2 # shows you time entries for the past 2 days (not including today - so 3 days)
tick list -d0 # shows you time entries for today
tick list -t lunch # list entries tagged with #lunch
tick list -t dev design # list entries tagged with #dev AND #design
```

### `tick rm` 

remove a time entry

```shell
tick rm 4yKrumkjl # remove time entry with id 4yKrumkjl
```

### `tick register` 

register for a tickbin.com account

```shell
tick register # asks you for username, email, password then creates an account with a couchdb for you
```

### `tick login` 

login to tickbin, sets up syncing

```shell
tick login # asks you for username and password and sets remote in .tickbinrc
```

### `tick sync` 

sync local db with the remote

```shell
tick sync # syncs your local db with the remote db
```

### `tick upgrade` 

upgrades entries between releases

```shell
tick upgrade # upgrades your tickbin database when new tickbin is released
```

## Goals
tickbin is a simple time tracking application with an emphasis on minimizing
disruption to the user. It accomplishes this by:

* natural language input (no need to fill out forms or click buttons)
* quick in and out interfaces (text based interfaces wherever users work: cli, slack, alfred)
* offline priority (internet should not be a requirement)

tickbin emphasizes user data ownership:

* open source client with local data storage
* optional self hosted data replication (via couchdb)
* premium integrations via hosted service for portability

## Local database

Local database path will default to `~/.tickbin`. If you would like to specify a custom location, add the following to `~/.tickbinrc`:

```
local=~/custom/path
```

## Remote sync

To sync with a remote database, add the following to `~/.tickbinrc`:

```
remote=http://user:pass@host:port/dbname
```

Run `tick sync` in order to sync your database with your remote server.

## Building

To build the application:

```bash
# Using node v4.2 or greater
$ npm install
$ npm run build
$ ./build/tick --help

Copyright (C) 2016 MemoryLeaf Media Inc.
```
