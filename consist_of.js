const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')

class ConsistOfMatcher extends Matcher {
  #matchers

  constructor(matchers) {
    super()
    let matchs = []
    for (const matcher of matchers) {
      if (matcher instanceof Matcher) matchs.push(matcher)
      else matchs.push(equal(matcher))
    }
    this.#matchers = matchs
  }

  match(obj) {
    let matchers = this.#matchers.slice()
    let unmatched = []
    for (const elem of obj) {
      let matched = false
      for (const idx in matchers) {
        if (matchers[idx].match(elem) == null) {
          matched = true
          matchers.splice(idx, 1)
          break
        }
      }
      if (!matched) unmatched.push(elem)
    }
    let errors = []
    for (const elem of unmatched) errors.push("no match for " + JSON.stringify(elem))
    for (const matcher of matchers) errors.push("no element matching " + matcher.description())
    return errors.length > 0? {errors: errors} : null
  }

  description() {
    return "consist of [" + this.#matchers.map(m => m.description()).join(", ") + "]"
  }

  captures() {
    return this.#matchers.map((m) => m.captures()).flat()
  }
}

function consistOf(matchers) {
  return new ConsistOfMatcher(matchers)
}

module.exports = {
  consistOf: consistOf,
}
