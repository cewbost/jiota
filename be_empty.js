const { Matcher } = require('./matcher.js')

class EmptyMatcher extends Matcher {

  match(obj) {
    if (obj.length != 0) return {errors: "expected " + JSON.stringify(obj) + " to be empty"}
    return null
  }

  description() {
    return "be empty"
  }
}

function beEmpty() {
  return new EmptyMatcher()
}

module.exports = {
  beEmpty: beEmpty,
}
