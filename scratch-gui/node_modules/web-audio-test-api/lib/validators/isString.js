"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "string",
  typeName: "string",
  test: function test(value) {
    return typeof value === "string";
  }
};