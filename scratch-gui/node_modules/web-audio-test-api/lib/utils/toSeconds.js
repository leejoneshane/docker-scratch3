"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toSeconds;

var _toMicroseconds = require("./toMicroseconds");

var _toMicroseconds2 = _interopRequireDefault(_toMicroseconds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toSeconds(time) {
  return (0, _toMicroseconds2.default)(time) / (1000 * 1000);
}