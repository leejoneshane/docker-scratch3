"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAPIVersion;

var _version__ = require("../__version__");

var _version__2 = _interopRequireDefault(_version__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAPIVersion() {
  return _version__2.default;
}