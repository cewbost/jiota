const { Matcher } = require('./matcher.js')
const { equal } = require('./equal.js')

class FieldsMatcher extends Matcher {
  #matchers

  constructor(fields) {
    super()
    let matchers = {}
    for (const [key, matcher] of Object.entries(fields)) {
      if (matcher instanceof Matcher) {
        matchers[key] = matcher
      } else {
        matchers[key] = equal(matcher)
      }
    }
    this.#matchers = matchers
  }

  match(obj) {
    let ret = {}
    for (const [key, matcher] of Object.entries(this.#matchers)) {
      if (!(key in obj)) {
        ret[`.${key}`] = {errors: "missing property"}
      } else {
        const match = matcher.match(obj[key])
        if (match != null) ret[`.${key}`] = match
      }
    }
    return Object.keys(ret).length != 0 ? ret : null
  }

  description() {
    let matchs = []
    for (const [key, match] of Object.entries(this.#matchers)) {
      const desc = match.description()
      matchs.push(`"${key}": ${desc}`)
    }
    return "match fields {" + matchs.join(", ") + "}"
  }
}

function matchFields(obj) {
  return new FieldsMatcher(obj)
}

module.exports = {
  matchFields: matchFields,
}
