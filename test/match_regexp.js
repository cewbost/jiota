const { TestCaptureMatcher } = require('./common.js')
const { matchRegExp } = require('../match_regexp.js')
const assert = require('node:assert')

describe("matchRegExp", () => {
  it("should match", () => {
    assert.equal(null, matchRegExp("^ab+c$").match("abbc"))
  })
  it("should match captures", () => {
    assert.equal(null, matchRegExp("^a(b+)(c+)d$", "bb", "cc").match("abbccd"))
  })
  it("should match nested matchers", () => {
    assert.equal(null, matchRegExp("^a([bc]*)d$", matchRegExp("^bc+b$")).match("abccbd"))
  })
  it("should ignore captures without corresponding captures", () => {
    assert.equal(null, matchRegExp("^a(b+)(c+)d$", "bb").match("abbcd"))
  })
  it("should fail", () => {
    assert.notEqual(null, matchRegExp("^ab+c$").match("ac"))
  })
  it("should fail matching captures", () => {
    assert.notEqual(null, matchRegExp("^a(b+)c$", "bb").match("abbbc"))
  })
  it("should fail for non-string", () => {
    assert.notEqual(null, matchRegExp("^ab+c$").match({}))
  })
  it("should fail when submatch is missing", () => {
    assert.notEqual(null, matchRegExp("^a(b+)c$", "bb", "cc").match("abbc"))
  })
  it("should propagate captures from submatcher", () => {
    assert.deepEqual(
      matchRegExp("^(a+)(b+)(c+)$",
      new TestCaptureMatcher([]),
      new TestCaptureMatcher([1]),
      new TestCaptureMatcher([2, 3])
      ).captures(),
      [1, 2, 3]
    )
  })
})
