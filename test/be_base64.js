const { TestCaptureMatcher } = require('./common.js')
const { beBase64 } = require('../be_base64.js')
const assert = require('node:assert')

describe("beBase64", () => {
  it("should match", () => {
    assert.equal(null, beBase64("test\n").match("dGVzdAo="))
  })
  it("should match nested", () => {
    assert.equal(null, beBase64(beBase64("test\n")).match("ZEdWemRBbz0="))
  })
  it("should match base64 format", () => {
    assert.equal(null, beBase64().match("dGVzdAo="))
  })
  it("should fail when content does not match", () => {
    assert.notEqual(null, beBase64("test2\n").match("dGVzdAo="))
  })
  it("should fail for non-base64 format", () => {
    assert.notEqual(null, beBase64().match("----"))
  })
  it("should propagate captures from submatcher", () => {
    assert.deepEqual(beBase64(new TestCaptureMatcher([1, 2])).captures(), [1, 2])
  })
})
