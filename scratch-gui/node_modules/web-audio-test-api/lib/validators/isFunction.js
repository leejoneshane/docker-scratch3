"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "function",
  typeName: "function",
  test: function test(value) {
    return typeof value === "function";
  }
};