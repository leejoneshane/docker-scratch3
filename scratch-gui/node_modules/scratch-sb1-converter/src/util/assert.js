/**
 * A `scratch-sb1-converter` assertion.
 */
class AssertionError extends Error {}

/**
 * A `scratch-sb1-converter` validation error.
 */
class ValidationError extends AssertionError {}

const assert = function (test, message) {
    if (!test) throw new AssertionError(message);
};

assert.validate = function (test, message) {
    if (!test) throw new ValidationError(message);
};

export {
    assert,
    AssertionError,
    ValidationError
};
