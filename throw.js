const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')

class ThrowMatcher extends Matcher {
  #matcher

  constructor(matcher) {
    super()
    if (matcher instanceof Matcher) {
      this.#matcher = matcher
    } else if (matcher == null) {
      this.#matcher = null
    } else  {
      this.#matcher = equal(matcher)
    }
  }

  match(obj) {
    if (typeof obj !== "function") return {errors: "expected function"}
    try {
      obj()
    } catch (ex) {
      if (this.#matcher != null) return this.#matcher.match(ex)
      else return null
    }
    return {errors: "did not throw"}
  }

  description() {
    if (this.#matcher == null) return "throw exception"
    else {
      let desc = this.#matcher.description()
      return `throw exception ${desc}`
    }
  }

  captures() {
    return this.#matcher == null? [] : this.#matcher.captures()
  }
}

function beApprox(num, delta) {
  return new BeApproxMatcher(num, delta)
}
function throwException() {
  if (arguments.length > 0) return new ThrowMatcher(arguments[0])
  else return new ThrowMatcher(null)
}

module.exports = {
  throwException: throwException,
}
