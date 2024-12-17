const { TestMatcher, TestCaptureMatcher } = require('./common.js')
const { capture } = require('../capture.js')
const assert = require('node:assert')

describe("capture", () => {
  it("should always match when no submatcher provided", () => {
    assert.equal(null, capture().match(1))
  })
  it("should match when submatcher matches", () => {
    assert.equal(null, capture(new TestMatcher(null)).match(1))
  })
  it("should fail when submatcher fails", () => {
    assert.notEqual(null, capture(new TestMatcher({errors: "test error"})).match(1))
  })
  it("should capture the value", () => {
    const matcher = capture()
    assert.equal(null, matcher.match(1))
    let cap = matcher.captures()
    assert.equal(cap, 1)
  })
  it("should propagate captures from submatchers", () => {
    const matcher = capture(new TestCaptureMatcher([2]))
    assert.equal(null, matcher.match(1))
    let [cap1, cap2] = matcher.captures()
    assert.equal(cap1, 1)
    assert.equal(cap2, 2)
  })
})
