var assert = require('node:assert')

function match(res) {
  if (res.length != 0) {
    throw Error('does not match')
  }
}

function no_match(res) {
  if (res.length == 0) throw Error('does match')
}

module.exports = {
  match:    match,
  no_match: no_match,
}
