function indent(spaces, text) {
  const ind = ("  ").repeat(spaces)
  return text.replaceAll("\n", "\n" + ind)
}

function writeError(msg, level, obj) {
  if (obj.object != null) {
    msg += indent(level, "\nmatching: " + JSON.stringify(obj.object))
    if (obj.sub != null) {
      return writeError(msg, level, obj.sub)
    }
  }
  const non_keys = ["errors", "object", "sub"]
  let keys = Object.keys(obj)
  for (const key of keys) {
    if (non_keys.includes(key)) continue
    msg += indent(level, `\n${key}:`)
    msg = writeError(msg, level + 1, obj[key])
  }
  if (obj.errors != null) {
    if (typeof obj.errors == "string") {
      msg += indent(level, "\nerror: " + obj.errors)
    } else {
      msg += indent(level, "\nerrors:")
      for (const err of obj.errors) msg += indent(level + 1, "\n- " + err)
    }
  }
  return msg
}

class AssertionFailed extends Error {
  constructor(msg, matcher, cause) {
    super(writeError(msg, 0, cause))
    this.name = "AssertionFailed"
  }
}

module.exports = {
  AssertionFailed: AssertionFailed,
}
