const { beEmpty } = require('../be_empty.js')
const assert = require('node:assert')

describe("beEmpty", () => {
  describe("match", () => {
    it("should match empty arrays", () => {
      assert.equal(null, beEmpty().match([]))
    })
    it("should match empty strings", () => {
      assert.equal(null, beEmpty().match(""))
    })
    it("should not match non-empty arrays", () => {
      assert.notEqual(null, beEmpty().match([1]))
    })
    it("should not match non-empty strings", () => {
      assert.notEqual(null, beEmpty().match("asd"))
    })
  })
})
