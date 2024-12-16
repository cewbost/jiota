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
    if (typeof obj !== "string") return ["expected string"]
    let matches = obj.match(this.#regexp)
    if (matches == null) return [
      ["matching regexp against", JSON.stringify(obj)],
      ["no match for:", this.#regexp.toString()],
    ]
    let messages = []
    for (const [matcher, idx] of this.#matchers.map((matcher, idx) => [matcher, idx])) {
      if (matches.length <= idx + 1) messages.push(["no submatch for matcher ", `${idx + 1}`])
      else {
        const res = matcher.match(matches[idx + 1])
        if (res.length != 0) messages.push([`on submatch ${idx + 1}`, res])
      }
    }
    if (messages.length > 0) return [
      ["expected", JSON.stringify(obj)],
      ["split by regex", this.#regexp.toString()],
      ["into", matches],
      ["to match", this.#matchers.map(m => [m.description()])],
    ].concat(messages)
    return []
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
