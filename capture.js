const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')

class CaptureMatcher extends Matcher {
  #captured
  #matcher

  constructor(matcher) {
    super()
    if (matcher instanceof Matcher) {
      this.#matcher = matcher
    } else if (matcher == null) {
      this.#matcher = null
    } else {
      this.#matcher = equal(matcher)
    }
  }

  match(obj) {
    this.#captured = obj
    if (this.#matcher != null) return this.#matcher.match(obj)
    else return null
  }

  description() {
    if (this.#matcher != null) return this.#matcher.description()
    else return "pass"
  }

  captures() {
    if (this.#matcher == null) return [this.#captured]
    else return [this.#captured].concat(this.#matcher.captures())
  }
}

function capture() {
  if (arguments.length >= 1) return new CaptureMatcher(arguments[0])
  else return new CaptureMatcher(null)
}

module.exports = {
  capture: capture,
}
