const { AssertionFailed } = require('./error.js')

let __andWrapper = null

class Matcher {
  match(obj) {
    throw new Error("match method not implemented")
  }

  description() {
    return "base matcher"
  }

  and(other) {
    return __andWrapper(this, other)
  }
}

class AndMatcher extends Matcher {
  #first
  #second

  constructor(first, second) {
    super()
    this.#first = first
    this.#second = second
  }

  description() {
    return this.#first.description() + " and " + this.#second.description()
  }

  match(obj) {
    let first = this.#first.match(obj)
    if (first.length > 0) return first
    else return this.#second.match(obj)
  }
}

__andWrapper = (first, second) => new AndMatcher(first, second)

module.exports = {
  Matcher: Matcher,
}
