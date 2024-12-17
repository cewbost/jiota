const { TestMatcher, TestCaptureMatcher, match, no_match } = require('./common.js')
const { matchElements } = require('../match_elements.js')
const assert = require('node:assert')

describe("matchElements", () => {
  it("should match arrays", () => {
    match(matchElements([1, 2, 3]).match([1, 2, 3]))
  })
  it("should match with submatchers", () => {
    match(matchElements([1, new TestMatcher(null), 3]).match([1, 2, 3]))
  })
  it("should match nested", () => {
    match(matchElements([
      matchElements([1]),
      matchElements([1, new TestMatcher(null)]),
      matchElements([new TestMatcher(null), 2, new TestMatcher(null)]),
    ]).match([[1], [1, 2], [1, 2, 3]]))
  })
  it("should fail for wrong elements", () => {
    no_match(matchElements([1, 2, 3]).match([1, 3, 3]))
  })
  it("should fail for unmatched elements", () => {
    no_match(matchElements([1, 2, 3]).match([1, 2, 3, 4]))
  })
  it("should fail for missing elements", () => {
    no_match(matchElements([1, 2, 3]).match([1, 2]))
  })
  it("should fail with nested matchers", () => {
    no_match(matchElements([
      matchElements([1, 2]),
      matchElements([3, 4]),
    ]).match([[1, 2], [3]]))
  })
  it("should propagate captures from submatcher", () => {
    assert.deepEqual(
      matchElements([
        new TestCaptureMatcher([]),
        new TestCaptureMatcher([1]),
        new TestCaptureMatcher([2, 3]),
      ]).captures(),
      [1, 2, 3]
    )
  })
})
