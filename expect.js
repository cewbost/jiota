const { Matcher         } = require("./matcher.js")
const { AssertionFailed } = require("./assertion_failed.js")
const { Buffer          } = require('node:buffer')

class Expectation {
  #obj
  constructor(obj) {
    this.#obj = obj
  }
  to(matcher) {
    if (!(matcher instanceof Matcher)) {
      throw Error("Argument to 'to' must be a matcher")
    }
    let res = matcher.match(this.#obj)
    if (res != null) {
      throw new AssertionFailed(this.#obj, matcher, res)
    } else {
      return matcher.captures()
    }
  }
}

function expect(obj) {
  return new Expectation(obj)
}

module.exports = {
  expect: expect,
}
