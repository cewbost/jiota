const { Matcher } = require('../matcher.js')

class TestMatcher extends Matcher {
  #res

  constructor (res) {
    super()
    this.#res = res
  }

  match(obj) {
    return this.#res
  }

  description() {
    return "match test"
  }
}

class TestCaptureMatcher extends Matcher {
  #captures

  constructor(captures) {
    super()
    this.#captures = captures
  }

  match(obj) {
    return null
  }

  description() {
    return "match test"
  }

  captures() {
    return this.#captures
  }
}

module.exports = {
  TestMatcher:        TestMatcher,
  TestCaptureMatcher: TestCaptureMatcher,
}
