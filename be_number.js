const { Matcher } = require('./matcher.js')
const { BigNumber } = require('bignumber.js')

class NumberMatcher extends Matcher {
  #value

  constructor(number) {
    super()
    this.#value = BigNumber(number)
  }

  match(obj) {
    let num = BigNumber(obj)
    if (this.#value.isNaN()) {
      if (!num.isNaN()) return null
      else return {errors: "expected " + JSON.stringify(obj) + "to be a number"}
    } else if (this.#value.isEqualTo(num)) {
      return null
    } else {
      return {errors: "expected " + this.#value.toString() + " to equal " + num.toString()}
    }
  }

  description() {
    if (this.#value.isNaN()) return "be a number"
    else return "equal " + this.#value.toString()
  }
}

function beNumber() {
  if (arguments.length >= 1) return new NumberMatcher(arguments[0])
  else return new NumberMatcher(null)
}

module.exports = {
  beNumber: beNumber,
}
