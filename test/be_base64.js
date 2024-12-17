const { TestCaptureMatcher, match, no_match } = require('./common.js')
const { beBase64 } = require('../be_base64.js')
const assert = require('node:assert')

describe("beBase64", () => {
  it("should match", () => {
    match(beBase64("test\n").match("dGVzdAo="))
  })
  it("should match nested", () => {
    match(beBase64(beBase64("test\n")).match("ZEdWemRBbz0="))
  })
  it("should match base64 format", () => {
    match(beBase64().match("dGVzdAo="))
  })
  it("should fail when content does not match", () => {
    no_match(beBase64("test2\n").match("dGVzdAo="))
  })
  it("should fail for non-base64 format", () => {
    no_match(beBase64().match("----"))
  })
  it("should propagate capture from submatcher", () => {
    assert.deepEqual(beBase64(new TestCaptureMatcher([1, 2])).captures(), [1, 2])
  })
})
