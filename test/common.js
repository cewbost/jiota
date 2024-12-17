const { Matcher } = require('../matcher.js')

function match(res) {
  if (res != null) {
    throw Error('does not match')
  }
}

function no_match(res) {
  if (res == null) throw Error('does match')
}

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
  match:              match,
  no_match:           no_match,
  TestMatcher:        TestMatcher,
  TestCaptureMatcher: TestCaptureMatcher,
}
