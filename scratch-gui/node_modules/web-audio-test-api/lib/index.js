"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global.WEB_AUDIO_TEST_API_IGNORE) {
  _WebAudioTestAPI2.default.use();
}

exports.default = _WebAudioTestAPI2.default;