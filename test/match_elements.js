const { match, no_match } = require('./common.js')
const { matchElements } = require("../match_elements.js")
const { Matcher } = require("../matcher.js")

class matchAnything extends Matcher {
  match(obj) {
    return []
  }
}

describe("matchElements", () => {
  it("should match arrays", () => {
    match(matchElements([1, 2, 3]).match([1, 2, 3]))
  })
  it("should match with submatchers", () => {
    match(matchElements([1, new matchAnything(), 3]).match([1, 2, 3]))
  })
  it("should match nested", () => {
    match(matchElements([
      matchElements([1]),
      matchElements([1, new matchAnything()]),
      matchElements([new matchAnything(), 2, new matchAnything()]),
    ]).match([[1], [1, 2], [1, 2, 3]]))
  })
  it("should fail for wrong elements", () => {
    no_match(matchElements([1, 2, 3]).match([1, 3, 3]))
  })
  it("should fail for unmatched elements", () => {
    no_match(matchElements([1, 2, 3]).match([1, 2, 3, 4]))
  })
  it("should fail for missing elements", () => {
    no_match(matchElements([1, 2, 3]).match([1, 2]))
  })
  it("should fail with nested matchers", () => {
    no_match(matchElements([
      matchElements([1, 2]),
      matchElements([3, 4]),
    ]).match([[1, 2], [3]]))
  })
})
