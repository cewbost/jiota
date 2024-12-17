const { TestMatcher, TestCaptureMatcher } = require('./common.js')
const { throwException } = require('../throw.js')
const assert = require('node:assert')

describe("throwException", () => {
  describe("match", () => {
    it("should match when exception is thrown", () => {
      assert.equal(null, throwException().match(() => { throw "test error" }))
    })
    it("should fail when function doesn't throw", () => {
      assert.notEqual(null, throwException().match(() => {}))
    })
    it("should match thrown value", () => {
      assert.equal(null, throwException("test error").match(() => { throw "test error" }))
      assert.notEqual(null, throwException("test error").match(() => { throw "test error 2" }))
    })
    it("should match thrown value using matcher", () => {
      assert.equal(null, throwException(new TestMatcher(null)).match(() => { throw "test error" }))
      assert.notEqual(null, throwException(new TestMatcher({errors: "failed"}))
        .match(() => { throw "test error" }))
    })
  })
  describe("captures", () => {
    it("should propagate captures from submatcher", () => {
      assert.deepEqual(throwException(new TestCaptureMatcher([1, 2])).captures(), [1, 2])
    })
  })
})
