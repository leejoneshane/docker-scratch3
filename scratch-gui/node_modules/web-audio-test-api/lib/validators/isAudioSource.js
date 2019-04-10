"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "AudioNode or an AudioParam",
  typeName: "AudioNode|AudioParam",
  test: function test(value) {
    return value instanceof global.AudioNode || value instanceof global.AudioParam;
  }
};