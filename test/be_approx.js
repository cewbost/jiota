const { beApprox } = require('../be_approx.js')
const assert = require('node:assert')

describe("beApprox", () => {
  it("should match exactly", () => {
    assert.equal(null, beApprox(5, 0.000001).match(5))
  })
  it("should match approximately", () => {
    assert.equal(null, beApprox(5, 0.000001).match(5.0000009))
    assert.equal(null, beApprox(5, 0.000001).match(4.9999991))
  })
  it("should fail when values more than delta away", () => {
    assert.notEqual(null, beApprox(5, 0.000001).match(5.0000011))
    assert.notEqual(null, beApprox(5, 0.000001).match(4.9999989))
  })
})
