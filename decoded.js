const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')
const { Buffer } = require('node:buffer')

class DecodedMatcher extends Matcher {
  #encoding
  #matcher

  constructor(encoding, matcher) {
    super()
    this.#encoding = encoding
    if (matcher instanceof Matcher) {
      this.#matcher = matcher
    } else  {
      this.#matcher = equal(matcher)
    }
  }

  match(obj) {
    if (typeof obj !== "string") {
      return {errors: "expected string"}
    }
    const buf = Buffer.from(obj, this.#encoding)
    const val = buf.toString()
    const match = this.#matcher.match(val)
    return match != null? {object: val, sub: match} : null
  }

  description() {
    return `decoded from ${encoding} ` + this.#matcher.description()
  }

  captures() {
    return this.#matcher.captures()
  }
}

function decoded(encoding, matcher) {
  return new DecodedMatcher(encoding, matcher)
}

module.exports = {
  decoded: decoded,
}
