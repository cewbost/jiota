const { contain } = require('../contain.js')
const assert = require('node:assert')

describe("contain", () => {
  describe("match", () => {
    it("should match array containing elements", () => {
      assert.equal(null, contain(2).match([1, 2, 3]))
    })
    it("should fail to match array without element", () => {
      assert.notEqual(null, contain(2).match([1, 3]))
    })
  })
})
