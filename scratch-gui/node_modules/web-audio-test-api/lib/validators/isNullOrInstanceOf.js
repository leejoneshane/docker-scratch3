"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNullOrInstanceOf;
function isNullOrInstanceOf(klass) {
  return {
    description: klass.name,
    typeName: klass.name + "|null",
    test: function test(value) {
      return value === null || value instanceof klass;
    }
  };
}