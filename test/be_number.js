var { match, no_match } = require('./common.js')
var { beNumber } = require('../be_number.js')
const { BigNumber } = require('bignumber.js')

describe("beNumber", () => {
  it("should match numbers", () => {
    match(beNumber(123).match(123))
    match(beNumber(2.5).match(2.5))
  })
  it("should match strings", () => {
    match(beNumber("0x2bc").match(700))
    match(beNumber("0x2bc").match("0x2bc"))
    match(beNumber("0x2bc").match("700"))
    match(beNumber("700").match(700))
    match(beNumber("700").match("0x2bc"))
    match(beNumber("700").match("700"))
  })
  it("should match BigNumber", () => {
    match(beNumber("123").match(BigNumber(123)))
  })
  it("should match any integer", () => {
    for (let i = 0; i < 10; i++) {
      match(beNumber().match(i))
    }
  })
  it("should match any float", () => {
    for (let i = 0; i < 10; i++) {
      match(beNumber().match(i / (i + 1)))
    }
  })
  it("should match any number string", () => {
    for (const n of ["123", "456", "789", "0x1a", "0x2b", "0x3c"]) {
      match(beNumber().match(n))
    }
  })
  it("should fail if numbers are not the same", () => {
    no_match(beNumber(123).match(124))
    no_match(beNumber(2.5).match(2.6))
  })
  it("should fail if value is not number", () => {
    no_match(beNumber().match(true))
    no_match(beNumber().match("abc"))
  })
})
