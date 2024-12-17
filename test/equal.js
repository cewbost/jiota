const { equal } = require('../equal.js')
const assert = require('node:assert')

describe("equal", () => {
  describe("match", () => {
    it("should match when values are equal", () => {
      for (let x = 0; x < 10; x++) {
        assert.equal(null, equal(x).match(x))
      }
    })
    it("should not match when values are not equal", () => {
      for (let x = 0; x < 10; x++) {
        assert.notEqual(null, equal(x).match(x + 1))
      }
    })
  })
})
