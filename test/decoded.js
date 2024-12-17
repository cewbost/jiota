const { TestCaptureMatcher } = require('./common.js')
const { decoded } = require('../decoded.js')
const assert = require('node:assert')

describe("decoded", () => {
  describe("match", () => {
    it("should match", () => {
      assert.equal(null, decoded('base64', "test\n").match("dGVzdAo="))
    })
    it("should fail when content does not match", () => {
      assert.notEqual(null, decoded('base64', "test2\n").match("dGVzdAo="))
    })
  })
  describe("captures", () => {
    it("should propagate captures from submatcher", () => {
      assert.deepEqual(decoded('base64', new TestCaptureMatcher([1, 2])).captures(), [1, 2])
    })
  })
})
