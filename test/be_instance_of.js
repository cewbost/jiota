const { beInstanceOf } = require('../be_instance_of.js')
const assert = require('node:assert')

class Foo {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
}

class Bar {
  constructor(a, b, c) {
    this.a = a
    this.b = b
    this.c = c
  }
}

describe("beInstanceOf", () => {
  it("should match types", () => {
    assert.equal(null, beInstanceOf(Foo).match(new Foo(1, 2)))
  })
  it("should fail when types are not the same", () => {
    assert.notEqual(null, beInstanceOf(Bar).match(new Foo(1, 2)))
  })
})
