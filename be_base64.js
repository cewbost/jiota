const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')
const { Buffer } = require('node:buffer')

class Base64Matcher extends Matcher {
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
    if (typeof obj !== "string") {
      return {errors: "expected string"}
    } else if (!obj.match(new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"))) {
      return {errors: "expected base64 encoded string"}
    }
    const buf = Buffer.from(obj, "base64")
    if (this.#matcher == null) return null
    const val = buf.toString()
    const match = this.#matcher.match(val)
    if (match != null) {
      match.object = val
      return match
    }
    return null
  }
}

function beBase64() {
  if (arguments.length > 0) return new Base64Matcher(arguments[0])
  else return new Base64Matcher(null)
}

module.exports = {
  beBase64: beBase64,
}
