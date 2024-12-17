const { Matcher } = require('./matcher.js')

class ContainMatcher extends Matcher {
  #value

  constructor(value) {
    super()
    this.#value = value
  }

  match(obj) {
    if (!obj.includes(this.#value)) {
      return {errors: "array does not contain " + JSON.stringify(this.#value)}
    }
    return null
  }

  description() {
    return "contains " + this.#value
  }
}

function contain(obj) {
  return new ContainMatcher(obj)
}

module.exports = {
  contain: contain,
}
