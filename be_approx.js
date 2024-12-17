const { Matcher } = require('./matcher.js')

class BeApproxMatcher extends Matcher {
  #value
  #delta

  constructor(num, delta) {
    super()
    this.#value = num
    this.#delta = delta
  }

  match(obj) {
    if (Math.abs(obj - this.#value) < this.#delta) return null
    else return {
      errors: "expected " + JSON.stringify(obj) + ` to be approximately ${this.#value} +- ${this.#delta}`,
    }
  }

  description() {
    return `be approximately ${this.#value} +- ${this.#delta}`
  }
}

function beApprox(num, delta) {
  return new BeApproxMatcher(num, delta)
}

module.exports = {
  beApprox: beApprox,
}
