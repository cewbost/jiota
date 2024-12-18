const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')

class NotMatcher extends Matcher {
  #matcher

  constructor(matcher) {
    super()
    if (matcher instanceof Matcher) {
      this.#matcher = matcher
    } else  {
      this.#matcher = equal(matcher)
    }
  }

  match(obj) {
    const match = this.#matcher.match(obj)
    if (match == null) return {errors: "matched"}
    else return null
  }

  description() {
    return "not " + this.#matcher.description()
  }

  captures() {
    return this.#matcher.captures()
  }
}

function not(matcher) {
  return new NotMatcher(matcher)
}

module.exports = {
  not: not,
}
