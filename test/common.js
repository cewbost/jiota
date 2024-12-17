function match(res) {
  if (res != null) {
    throw Error('does not match')
  }
}

function no_match(res) {
  if (res == null) throw Error('does match')
}

module.exports = {
  match:    match,
  no_match: no_match,
}
