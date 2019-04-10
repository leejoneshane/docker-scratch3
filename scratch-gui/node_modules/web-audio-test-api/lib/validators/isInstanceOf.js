"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInstanceOf;
function isInstanceOf(klass) {
  return {
    description: klass.name,
    typeName: klass.name,
    test: function test(value) {
      return value instanceof klass;
    }
  };
}