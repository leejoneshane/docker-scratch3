"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaults;
function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
}