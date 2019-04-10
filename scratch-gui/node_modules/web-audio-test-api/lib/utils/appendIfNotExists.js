"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendIfNotExists;
function appendIfNotExists(list, value) {
  var index = list.indexOf(value);

  if (index === -1) {
    list.push(value);
  }
}