const { Matcher } = require('../matcher.js')

class TestMatcher extends Matcher {
  #res

  constructor(res) {
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

class TestSequenceMatcher extends Matcher {
  #res
  #idx

  constructor(res) {
    super()
    this.#res = res
  }

  match(obj) {
    let res = this.#res[this.#idx]
    this.#idx++
    return res
  }

  description() {
    return "match test"
  }
}

module.exports = {
  TestMatcher:         TestMatcher,
  TestCaptureMatcher:  TestCaptureMatcher,
  TestSequenceMatcher: TestSequenceMatcher,
}
