const { match, no_match } = require('./common.js')
const { matchFields } = require('../match_fields.js')

describe("matchFields", () => {
  it("should match fields", () => {
    match(matchFields({"foo": 1, "bar": 2}).match({"foo": 1, "bar": 2}))
  })
  it("should ignore extra fields", () => {
    match(matchFields({"foo": 1, "bar": 2}).match({"foo": 1, "bar": 2, "baz": 3}))
  })
  it("should match nested", () => {
    match(matchFields({
      "first": matchFields({"x": 1, "y": 2}),
      "second": matchFields({"x": 3, "y": 4}),
    }).match({"first": {"x": 1, "y": 2}, "second": {"x": 3, "y": 4}}))
  })
  it("should fail if matcher fails", () => {
    no_match(matchFields({"foo": 1, "bar": 2, "baz": 3}).match({"foo": 1, "bar": 1, "baz": 3}))
  })
  it("should fail if nested matcher fails", () => {
    no_match(matchFields({
      "first": matchFields({"x": 1, "y": 2}),
      "second": matchFields({"x": 3, "y": 4}),
    }).match({"first": {"x": 1, "y": 2}, "second": {"x": 3, "y": 3}}))
  })
  it("should fail if expected field does not exist", () => {
    no_match(matchFields({"foo": 1, "bar": 2, "baz": 3}).match({"foo": 1, "baz": 3}))
  })
})
