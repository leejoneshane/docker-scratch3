"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeIfExists;
function removeIfExists(list, value) {
  var index = list.indexOf(value);

  if (index !== -1) {
    return list.splice(index, 1)[0];
  }

  return null;
}