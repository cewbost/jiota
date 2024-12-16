const { match, no_match } = require('./common.js')
const { contain } = require("../contain.js")

describe("contain", () => {
  it("should match array containing elements", () => {
    match(contain(2).match([1, 2, 3]))
  })
  it("should fail to match array without element", () => {
    no_match(contain(2).match([1, 3]))
  })
})
