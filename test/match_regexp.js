const { match, no_match } = require('./common.js')
const { matchRegExp } = require("../match_regexp.js")

describe("matchRegExp", () => {
  it("should match", () => {
    match(matchRegExp("^ab+c$").match("abbc"))
  })
  it("should match captures", () => {
    match(matchRegExp("^a(b+)(c+)d$", "bb", "cc").match("abbccd"))
  })
  it("should match nested matchers", () => {
    match(matchRegExp("^a([bc]*)d$", matchRegExp("^bc+b$")).match("abccbd"))
  })
  it("should ignore captures without corresponding captures", () => {
    match(matchRegExp("^a(b+)(c+)d$", "bb").match("abbcd"))
  })
  it("should fail", () => {
    no_match(matchRegExp("^ab+c$").match("ac"))
  })
  it("should fail matching captures", () => {
    no_match(matchRegExp("^a(b+)c$", "bb").match("abbbc"))
  })
  it("should fail for non-string", () => {
    no_match(matchRegExp("^ab+c$").match({}))
  })
  it("should fail when submatch is missing", () => {
    no_match(matchRegExp("^a(b+)c$", "bb", "cc").match("abbc"))
  })
})
