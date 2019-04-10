"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "integer",
  typeName: "number",
  test: function test(value) {
    return value === (value | 0);
  }
};