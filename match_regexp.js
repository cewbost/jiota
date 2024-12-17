const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')

class RegExpMatcher extends Matcher {
  #regexp
  #matchers

  constructor(regexp, matchers) {
    super()
    let matchs = []
    for (const matcher of matchers) {
      if (matcher instanceof Matcher) {
        matchs.push(matcher)
      } else {
        matchs.push(equal(matcher))
      }
    }
    this.#regexp = new RegExp(regexp)
    this.#matchers = matchs
  }

  match(obj) {
    if (typeof obj !== "string") return {errors: "expected string"}
    let matches = obj.match(this.#regexp)
    if (matches == null) return {errors: "no match"}
    let ret = {}
    for (const [matcher, idx] of this.#matchers.map((matcher, idx) => [matcher, idx])) {
      if (matches.length <= idx + 1) ret[`[${idx}]`] = {errors: "no submatch"}
      else {
        const capture = matches[idx + 1]
        const res = matcher.match(capture)
        if (res != null) {
          const key = `[${idx}]`
          ret[key] = res
          ret[key].object = capture
        }
      }
    }
    return Object.keys(ret).length != 0 ? ret : null
  }

  description() {
    if (this.#matchers.length == 0) return "match regexp " + this.#regexp.toString()
    else return "match regexp " +
      this.#regexp.toString() +
      " and submatches matching " +
      this.#matchers.map(m => m.description()).join(", ")
  }
}

function matchRegExp(regexp) {
  return new RegExpMatcher(regexp, Array.from(arguments).slice(1))
}

module.exports = {
  matchRegExp: matchRegExp,
}
