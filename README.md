# Jiota

A matcher library for Javascript, inspired by [Gomega](https://onsi.github.io/gomega/).

Not currently available on npm, may never be.

## Usage

```js
const { expect, equal } = require("jiota")

expect(1).to(equal(1))
```

Failed assertions are reported by throwing `Error`.

The method `and` allows the construction of matcher conjunctions, which make multiple assertions on
the same object.

```js
expect([1, 2]).to((contain(1)).and(contain(2)))
```

Some matchers can have submatchers. Those matchers can be replaced with non-matcher values, which
are treated as `equal` matchers.

```js
expect([1, 2]).to(consistOf([1, 2]))
// same as:
expect([1, 2]).to(consistOf([equal(1), equal(2)]))
```

Inputs to submatchers can captured using the `capture` matcher. The captured values are returned
from `expect`.

```js
let [a, b] = expect("key=123").to(matchRegExp("^([a-z]+)=([0-9]+)$", capture(), capture()))
// now a = "val" and b = "123"
```

## Provided matchers

### beApprox

Asserts that a number is within the range `(expected - delta; expected + delta)`.

```js
expect(0.2 + 0.1).to(beApprox(0.3, 0.0001))
```
### beEmpty

Asserts that an array is empty.

```js
expect([]).to(beEmpty())
```

### beInstanceOf

Asserts that an object is an instance of a class.

```js
expect(new Error("error")).to(beInstanceOf(Error))
```

### beNumber

Asserts that a value is a number. If a number is provided it checks that the matched value is equal.
Otherwise only asserts that it is a number. Uses
[bignumber](https://mikemcl.github.io/bignumber.js/) internally.

```js
expect(5).to(beNumber())
expect("700").to(beNumber("0x2bc"))
```

### consistOf

Asserts that an array consists of elements matching a list of matchers. The assertion fails if
there isn't a one-to-one matching between the actual values and the matchers. The matching algorithm
is greedy, so don't rely on it being very smart, it will not be able to find every possible valid
matching. If the provided matchers match on mutually exclusive values it will always work however.

```js
expect([1, 2, 3]).to(consistOf([3, 2, 1]))

expect([[1, 2], [3, 4]]).to(consistOf(
  consistOf([4, 3]),
  consistOf([2, 1]),
))
```

### contain

Asserts that an array includes a value. Matching is done by calling `actual.includes(expected)`.

```js
expect([1, 2, 3]).to(contain(2))
```

### equal

Asserts that two values are deeply equal.

```js
let obj = {}
obj["a"] = [1, 2]
obj["b"] = [3, 4]
expect(obj).to(equal({"a": [1, 2], "b": [3, 4]}))
```

### matchElements

Asserts that the elements of an array matches an array of matchers.

```js
expect([[], [1], [1, 2]]).to(matchElements([beEmpty(), [1], [1, 2]]))
```

### matchFields

Asserts that an object contains properties matching provided matchers. Extra values are ignored.

```js
expect({
  "foo": {"a": 1, "b": 2, "c", 3},
  "bar": {"a": 1, "b": 2},
  "baz": {"a": 1},
}).to(matchFields({
  "foo": matchFields({
    "a": 1,
    "b": 2,
  }),
  "bar": {
    "a": 1,
    "b": 2,
  },
}))
```

### matchRegExp

Asserts that a string matches a regular expression. Extra matchers or values can be provided to
match capture groups in the regular expression.

```js
expect("key=123").to(matchRegexp("^([a-z]+):([1-9][0-9]+)$", "key", beNumber(123)))
```

### decoded

Asserts that a string, when decoded from the given format, matches some matcher. Internally it uses
[buffer.Buffer](https://nodejs.org/api/buffer.html).

```js
expect("dGVzdAo=").to(decoded('base64', equal("test\n")))
```

### throwException

Asserts that a given function throws an exception. A matcher can be provided to make assertions on
the thrown exception.

```js
expect(() => { throw "test" }).to(throwException("test"))
```

### capture

Performs no assertion, but captures the value passed to it, which is then returned from `expect`.

```js
let a = expect("ZEdWemRBbz0=").to(beBase64(capture()))
```

You can make further assertions by passing a matcher to `capture`.

```js
let a = expect("ZEdWemRBbz0=").to(beBase64(capture(equal("test\n"))))
```
