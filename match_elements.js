const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')

class MatchElementsMatcher extends Matcher {
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
    if (!Array.isArray(obj)) {
      return {error: "expected array"}
    } else if (obj.length != this.#matchers.length) {
      return {error: `expected ${this.#matchers.length} elements, found ${obj.length}`}
    }
    let ret = {}
    for (const idx in obj) {
      const match = this.#matchers[idx].match(obj[idx])
      if (match != null) ret[`[${idx}]`] = match
    }
    return Object.keys(ret).length != 0 ? ret : null
  }

  description() {
    return "match elements [" + this.#matchers.map(m => m.description()).join(", ") + "]"
  }
}

function matchElements(matchers) {
  return new MatchElementsMatcher(matchers)
}

module.exports = {
  matchElements: matchElements,
}
