const { TestCaptureMatcher, TestMatcher } = require('./common.js')
const { not } = require('../not.js')
const assert = require('node:assert')

describe("not", () => {
  describe("match", () => {
    it("should match when not equal", () => {
      assert.equal(null, not(1).match(2))
    })
    it("should fail when equal", () => {
      assert.notEqual(null, not(1).match(1))
    })
    it("should match when submatcher fails", () => {
      assert.equal(null, not(new TestMatcher({errors: "test error"})).match(1))
    })
    it("should fail when submatcher matches", () => {
      assert.notEqual(null, not(new TestMatcher(null)).match(1))
    })
  })
  describe("captures", () => {
    it("should propagate captures from submatcher", () => {
      assert.deepEqual(not(new TestCaptureMatcher([1, 2])).captures(), [1, 2])
    })
  })
})
