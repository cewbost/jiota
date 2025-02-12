const { eventually } = require('../eventually.js')
const { TestMatcher, TestCaptureMatcher, TestSequenceMatcher } = require('./common.js')
const assert = require('node:assert')

describe("eventually", () => {

  testErrorMessage = async (err, msg) => {
    let ex
    try {
      await eventually(async () => 1).within({retries: 3, delay_ms: 10}).should(new TestMatcher(err))
    } catch (e) {
      ex = e
    }
    assert.equal(ex.message, "\nexpected value to eventually match test\ngot 1\n" + msg)
  }

  it("should do nothing when matcher returns null", async () => {
    await eventually(async () => 1).should(new TestMatcher(null))
  })
  it("should report simple error", async () => {
    await testErrorMessage(
      {errors: "test error"},
      "error: test error"
    )
  })
  it("should report a collection of errors", async () => {
    await testErrorMessage(
      {errors: ["error1", "error2"]},
      "errors:\n" +
      "  - error1\n" +
      "  - error2"
    )
  })
  it("should report errors from arms", async () => {
    await testErrorMessage(
      {".a": {errors: "test error 1"}, ".b": {errors: "test error 2"}, "errors": "test error 3"},
      ".a:\n" +
      "  error: test error 1\n" +
      ".b:\n" +
      "  error: test error 2\n" +
      "error: test error 3"
    )
  })
  it("should report errors from arms nested", async () => {
    await testErrorMessage(
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
  it("should report object field before branches and errors", async () => {
    await testErrorMessage(
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
  it("should report sub match failure on same indentation level", async () => {
    await testErrorMessage(
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
  it("should report and matcher correctly", async () => {
    let ex
    try {
      await eventually(async () => 1)
        .within({retries: 3, delay_ms: 10})
        .should((new TestMatcher({errors: "test error 1"})).and(new TestMatcher({errors: "test error 2"})))
    } catch (e) {
      ex = e
    }
    assert.equal(
      ex.message,
      "\nexpected value to eventually match test and match test\ngot 1\nerror: test error 1",
    )
  })
  it("should return captured values", async () => {
    let [a, b] = await eventually(async () => 1).should(new TestCaptureMatcher([1, 2]))
    assert.equal(a, 1)
    assert.equal(b, 2)
  })
  it("should do nothing when matcher eventually returns null", async () => {
    await eventually(async () => 1).should(new TestSequenceMatcher([
      {errors: "test error 1"},
      {errors: "test error 1"},
      null,
    ]))
  })
})
