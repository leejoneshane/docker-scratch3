"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "number",
  typeName: "number",
  test: function test(value) {
    return value === +value;
  }
};