const { Matcher } = require('./matcher.js')

class InstanceOfMatcher extends Matcher {
  #type

  constructor(type) {
    super()
    this.#type = type
  }

  match(obj) {
    if (!(obj instanceof this.#type)) {
      return {errors: "expected " + JSON.stringify(obj) + " to be instance of " + JSON.stringify(this.#type)}
    }
    return null
  }

  description() {
    return "be instance of " + JSON.stringify(this.#type)
  }
}

function beInstanceOf(type) {
  return new InstanceOfMatcher(type)
}

module.exports = {
  beInstanceOf: beInstanceOf,
}
