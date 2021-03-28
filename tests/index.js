var assert = require('assert');
var { classNames } = require('../');

describe('classNames', function () {
	it('keeps object keys with truthy values', function () {
		assert.strictEqual(classNames({
			a: true,
			b: false,
			c: 0,
			d: null,
			e: undefined,
			f: 1
		}), 'a f');
	});

	it('joins arrays of class names and ignore falsy values', function () {
		assert.strictEqual(classNames('a', 0, null, undefined, true, 1, 'b'), 'b 1 a');
	});

	it('supports heterogenous arguments', function () {
		assert.strictEqual(classNames({a: true}, 'b', 0), 'b a');
	});

	it('should be trimmed', function () {
		assert.strictEqual(classNames('', 'b', {}, ''), 'b');
	});

	it('returns an empty string for an empty configuration', function () {
		assert.strictEqual(classNames({}), '');
	});

	it('supports an array of class names', function () {
		assert.strictEqual(classNames(['a', 'b']), 'b a');
	});

	it('joins array arguments with string arguments', function () {
		assert.strictEqual(classNames(['a', 'b'], 'c'), 'c b a');
		assert.strictEqual(classNames('c', ['a', 'b']), 'b a c');
	});

	it('handles multiple array arguments', function () {
		assert.strictEqual(classNames(['a', 'b'], ['c', 'd']), 'd c b a');
	});

	it('handles arrays that include falsy and true values', function () {
		assert.strictEqual(classNames(['a', 0, null, undefined, false, true, 'b']), 'b a');
	});

	it('handles arrays that include arrays', function () {
		assert.strictEqual(classNames(['a', ['b', 'c']]), 'c b a');
	});

	it('handles arrays that include objects', function () {
		assert.strictEqual(classNames(['a', {b: true, c: false}]), 'b a');
	});

	it('handles deep array recursion', function () {
		assert.strictEqual(classNames(['a', ['b', ['c', {d: true}]]]), 'd c b a');
	});

	it('handles arrays that are empty', function () {
		assert.strictEqual(classNames('a', []), 'a');
	});

	it('handles nested arrays that have empty nested arrays', function () {
		assert.strictEqual(classNames('a', [[]]), 'a');
	});

	it('handles all types of truthy and falsy property values as expected', function () {
		assert.strictEqual(classNames({
			// falsy:
			null: null,
			emptyString: "",
			noNumber: NaN,
			zero: 0,
			negativeZero: -0,
			false: false,
			undefined: undefined,

			// truthy (literally anything else):
			nonEmptyString: "foobar",
			whitespace: ' ',
			function: Object.prototype.toString,
			emptyObject: {},
			nonEmptyObject: {a: 1, b: 2},
			emptyList: [],
			nonEmptyList: [1, 2, 3],
			greaterZero: 1
		}), 'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero');
	});
});
