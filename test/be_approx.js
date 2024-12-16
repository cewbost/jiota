const { match, no_match } = require('./common.js')
const { beApprox } = require("../be_approx.js")

describe("beApprox", () => {
  it("should match exactly", () => {
    match(beApprox(5, 0.000001).match(5))
  })
  it("should match approximately", () => {
    match(beApprox(5, 0.000001).match(5.0000009))
    match(beApprox(5, 0.000001).match(4.9999991))
  })
  it("should fail when values more than delta away", () => {
    no_match(beApprox(5, 0.000001).match(5.0000011))
    no_match(beApprox(5, 0.000001).match(4.9999989))
  })
})
