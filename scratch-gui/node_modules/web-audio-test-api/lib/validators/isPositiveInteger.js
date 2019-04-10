"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "positive integer",
  typeName: "number",
  test: function test(value) {
    return value === (value | 0) && 0 <= value;
  }
};