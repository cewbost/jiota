const { Matcher } = require('./matcher.js')
const deepEqual = require('deep-equal')

class EqualMatcher extends Matcher {
  #value

  constructor(value) {
    super()
    this.#value = value
  }

  match(obj) {
    if (!deepEqual(this.#value, obj)) {
      return {errors: JSON.stringify(obj) + " != " + JSON.stringify(this.#value)}
    }
    return null
  }

  description() {
    return "= " + this.#value
  }
}

function equal(obj) {
  return new EqualMatcher(obj)
}

module.exports = {
  equal: equal,
}
