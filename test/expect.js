const { Matcher } = require('../matcher.js')
const { expect } = require('../expect.js')
const assert = require('node:assert')

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

describe("expect", () => {

  testErrorMessage = (err, msg) => {
    let ex
    try {
      expect(1).to(new TestMatcher(err))
    } catch (e) {
      ex = e
    }
    assert.equal(ex.message, "expected 1\nto match test\n" + msg)
  }

  it("should do nothing when matcher returns null", () => {
    expect(1).to(new TestMatcher(null))
  })
  it("should report simple error", () => {
    testErrorMessage(
      {errors: "test error"},
      "error: test error"
    )
  })
  it("should report a collection of errors", () => {
    testErrorMessage(
      {errors: ["error1", "error2"]},
      "errors:\n" +
      "  - error1\n" +
      "  - error2"
    )
  })
  it("should report errors from arms", () => {
    testErrorMessage(
      {".a": {errors: "test error 1"}, ".b": {errors: "test error 2"}, "errors": "test error 3"},
      ".a:\n" +
      "  error: test error 1\n" +
      ".b:\n" +
      "  error: test error 2\n" +
      "error: test error 3"
    )
  })
  it("should report errors from arms nested", () => {
    testErrorMessage(
      {
        ".a": {
          ".a": {errors: ["error 1", "error 2"]},
          ".b": {errors: ["error 3", "error 4"]},
        },
        ".b": {
          ".a": {errors: ["error 5", "error 6"]},
          ".b": {errors: ["error 7", "error 8"]},
        }
      },
      ".a:\n" +
      "  .a:\n" +
      "    errors:\n" +
      "      - error 1\n" +
      "      - error 2\n" +
      "  .b:\n" +
      "    errors:\n" +
      "      - error 3\n" +
      "      - error 4\n" +
      ".b:\n" +
      "  .a:\n" +
      "    errors:\n" +
      "      - error 5\n" +
      "      - error 6\n" +
      "  .b:\n" +
      "    errors:\n" +
      "      - error 7\n" +
      "      - error 8"
    )
  })
  it("should report object field before branches and errors", () => {
    testErrorMessage(
      {
        "object": "123",
        ".a": {"errors": "test error 1"},
        "errors": "test error 2"
      },
      "matching: \"123\"\n" +
      ".a:\n" +
      "  error: test error 1\n" +
      "error: test error 2"
    )
  })
  it("should report sub match failure on same indentation level", () => {
    testErrorMessage(
      {
        "object": "123",
        "sub": {
          "object": "234",
          "sub": {
            "errors": "test error"
          }
        }
      },
      "matching: \"123\"\n" +
      "matching: \"234\"\n" +
      "error: test error"
    )
  })
})
