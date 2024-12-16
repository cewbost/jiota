const { match, no_match } = require('./common.js')
const { beEmpty } = require("../be_empty.js")

describe("beEmpty", () => {
  it("should match empty arrays", () => {
    match(beEmpty().match([]))
  })
  it("should match empty strings", () => {
    match(beEmpty().match(""))
  })
  it("should not match non-empty arrays", () => {
    no_match(beEmpty().match([1]))
  })
  it("should not match non-empty strings", () => {
    no_match(beEmpty().match("asd"))
  })
})
