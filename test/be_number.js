const { beNumber } = require('../be_number.js')
const { BigNumber } = require('bignumber.js')
const assert = require('node:assert')

describe("beNumber", () => {
  describe("match", () => {
    it("should match numbers", () => {
      assert.equal(null, beNumber(123).match(123))
      assert.equal(null, beNumber(2.5).match(2.5))
    })
    it("should match strings", () => {
      assert.equal(null, beNumber("0x2bc").match(700))
      assert.equal(null, beNumber("0x2bc").match("0x2bc"))
      assert.equal(null, beNumber("0x2bc").match("700"))
      assert.equal(null, beNumber("700").match(700))
      assert.equal(null, beNumber("700").match("0x2bc"))
      assert.equal(null, beNumber("700").match("700"))
    })
    it("should match BigNumber", () => {
      assert.equal(null, beNumber("123").match(BigNumber(123)))
    })
    it("should match any integer", () => {
      for (let i = 0; i < 10; i++) {
        assert.equal(null, beNumber().match(i))
      }
    })
    it("should match any float", () => {
      for (let i = 0; i < 10; i++) {
        assert.equal(null, beNumber().match(i / (i + 1)))
      }
    })
    it("should match any number string", () => {
      for (const n of ["123", "456", "789", "0x1a", "0x2b", "0x3c"]) {
        assert.equal(null, beNumber().match(n))
      }
    })
    it("should fail if numbers are not the same", () => {
      assert.notEqual(null, beNumber(123).match(124))
      assert.notEqual(null, beNumber(2.5).match(2.6))
    })
    it("should fail if value is not number", () => {
      assert.notEqual(null, beNumber().match(true))
      assert.notEqual(null, beNumber().match("abc"))
    })
  })
})
