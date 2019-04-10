"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;
function format(text) {
  text = text.trim();
  text = text.replace(/\$a (\w)/g, function (_, a) {
    if (/[aiueo]/i.test(a)) {
      return "an " + a;
    }
    return "a " + a;
  });
  text = text.replace(/{{(\w+)}}/g, "$1");
  text = text.replace(/^ +/gm, "");
  return text;
}