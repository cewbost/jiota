const { TestCaptureMatcher } = require('./common.js')
const { consistOf } = require('../consist_of.js')
const assert = require('node:assert')

describe("consistOf", () => {
  it("should match array consisting of elements", () => {
    assert.equal(null, consistOf([1, 2, 3]).match([3, 1, 2]))
  })
  it("should match nested", () => {
    assert.equal(null, consistOf([
      consistOf([1, 2]),
      consistOf([2, 3]),
      consistOf([3, 4]),
    ]).match([[4, 3], [2, 1], [3, 2]]))
  })
  it("should fail when elements are unmatched", () => {
    assert.notEqual(null, consistOf([1, 2, 3, 4]).match([3, 1, 2]))
    assert.notEqual(null, consistOf([1, 2, 3]).match([3, 1, 2, 4]))
  })
  it("should propagate captures from submatcher", () => {
    assert.deepEqual(
      consistOf([
        new TestCaptureMatcher([]),
        new TestCaptureMatcher([1]),
        new TestCaptureMatcher([2, 3])
      ]).captures(),
      [1, 2, 3]
    )
  })
})
