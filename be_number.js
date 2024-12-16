const { Matcher } = require('./matcher.js')
const { BigNumber } = require('bignumber.js')

class NumberMatcher extends Matcher {
  #value

  constructor(number) {
    super()
    this.#value = BigNumber(number)
  }

  description() {
    return "= " + this.#value.toString()
  }

  match(obj) {
    let num = BigNumber(obj)
    if (this.#value.isNaN()) {
      if (!num.isNaN()) return []
      else return [
        ["expected", JSON.stringify(obj)],
        ["to be a number", ""],
      ]
    } else if (this.#value.isEqualTo(num)) {
      return []
    } else {
      return [
        ["expected", "0x" + this.#value.toString(16)],
        ["to equal", "0x" + num.toString(16)],
      ]
    }
  }
}

function beNumber() {
  if (arguments.length >= 1) return new NumberMatcher(arguments[0])
  else return new NumberMatcher(null)
}

module.exports = {
  beNumber: beNumber,
}
