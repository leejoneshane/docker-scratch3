"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toNodeName;
function toNodeName(obj) {
  if (obj.hasOwnProperty("$id")) {
    return obj.$name + "#" + obj.$id;
  }
  return obj.$name;
}