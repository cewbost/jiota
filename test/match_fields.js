const { TestCaptureMatcher } = require('./common.js')
const { matchFields } = require('../match_fields.js')
const assert = require('node:assert')

describe("matchFields", () => {
  describe("match", () => {
    it("should match fields", () => {
      assert.equal(null, matchFields({"foo": 1, "bar": 2}).match({"foo": 1, "bar": 2}))
    })
    it("should ignore extra fields", () => {
      assert.equal(null, matchFields({"foo": 1, "bar": 2}).match({"foo": 1, "bar": 2, "baz": 3}))
    })
    it("should match nested", () => {
      assert.equal(null, matchFields({
        "first": matchFields({"x": 1, "y": 2}),
        "second": matchFields({"x": 3, "y": 4}),
      }).match({"first": {"x": 1, "y": 2}, "second": {"x": 3, "y": 4}}))
    })
    it("should fail if matcher fails", () => {
      assert.notEqual(null, matchFields({"foo": 1, "bar": 2, "baz": 3}).match({"foo": 1, "bar": 1, "baz": 3}))
    })
    it("should fail if nested matcher fails", () => {
      assert.notEqual(null, matchFields({
        "first": matchFields({"x": 1, "y": 2}),
        "second": matchFields({"x": 3, "y": 4}),
      }).match({"first": {"x": 1, "y": 2}, "second": {"x": 3, "y": 3}}))
    })
    it("should fail if expected field does not exist", () => {
      assert.notEqual(null, matchFields({"foo": 1, "bar": 2, "baz": 3}).match({"foo": 1, "baz": 3}))
    })
  })
  describe("captures", () => {
    it("should propagate captures from submatcher", () => {
      assert.deepEqual(
        matchFields({
          "a": new TestCaptureMatcher([]),
          "b": new TestCaptureMatcher([1]),
          "c": new TestCaptureMatcher([2, 3]),
        }).captures(),
        [1, 2, 3]
      )
    })
  })
})
