const { Matcher         } = require("./matcher.js")
const { AssertionFailed } = require("./assertion_failed.js")
const { Buffer          } = require('node:buffer')

class EventualExpectation {

  static def_retries  = 10
  static def_delay_ms = 100

  #func
  #retries
  #delay_ms

  constructor(func) {
    this.#func     = func
    this.#retries  = EventualExpectation.def_retries
    this.#delay_ms = EventualExpectation.def_delay_ms
  }

  within(from) {
    if ("retries" in from)  this.#retries  = from.retries
    if ("delay_ms" in from) this.#delay_ms = from.delay_ms
    return this
  }

  async should(matcher) {
    if (!(matcher instanceof Matcher)) {
      throw Error("Argument to 'to' must be a matcher")
    }
    let res
    let obj
    for (let n = 0; n < this.#retries; n++) {
      obj = await this.#func()
      res = matcher.match(obj)
      if (res == null) break
      await new Promise(r => setTimeout(r, this.#delay_ms))
    }
    if (res != null) {
      throw new AssertionFailed(obj, matcher, res)
    } else {
      return matcher.captures()
    }
  }
}

function eventually(func) {
  return new EventualExpectation(func)
}

module.exports = {
  eventually: eventually,
}
