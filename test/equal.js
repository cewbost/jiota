var { match, no_match } = require('./common.js')
var { equal } = require('../equal.js')

describe("equal", () => {
  it("should match when values are equal", () => {
    for (let x = 0; x < 10; x++) {
      match(equal(x).match(x))
    }
  })
  it("should not match when values are not equal", () => {
    for (let x = 0; x < 10; x++) {
      no_match(equal(x).match(x + 1))
    }
  })
})
