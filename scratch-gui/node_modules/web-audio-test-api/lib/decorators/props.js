"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audioparam = audioparam;
exports.enums = enums;
exports.on = on;
exports.readonly = readonly;
exports.typed = typed;

var _Immigration = require("../utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _format = require("../utils/format");

var _format2 = _interopRequireDefault(_format);

var _toS = require("../utils/toS");

var _toS2 = _interopRequireDefault(_toS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var immigration = _Immigration2.default.getInstance();

function createSetterError(klassName, propName, message) {
  return new TypeError((0, _format2.default)("\n    Failed to set the '" + propName + "' property on '" + klassName + "'\n    " + message + "\n  ") + "\n");
}

function audioparam(defaultValue) {
  return function (target, propName, descriptor) {
    descriptor.get = function get() {
      var _this = this;

      if (!this._.hasOwnProperty(propName)) {
        this._[propName] = immigration.apply(function (admission) {
          return new global.WebAudioTestAPI.AudioParam(admission, _this, propName, defaultValue);
        });
      }
      return this._[propName];
    };

    descriptor.set = function set(value) {
      throw createSetterError(this.constructor.name, propName, "\n        \tAttempt to assign to readonly property. Do you mean this?\n\n        \t\t\t" + propName + ".value = " + (0, _toS2.default)(value) + ";\n      ");
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function enums(values) {
  return function (target, propName, descriptor) {
    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (!this._.hasOwnProperty(propName)) {
          this._[propName] = values[0];
        }
        return this._[propName];
      };
    }

    descriptor.set = function set(value) {
      if (values.indexOf(value) === -1) {
        throw createSetterError(this.constructor.name, propName, "\n          \tThis property should be one of [ " + values.map(_toS2.default).join(", ") + " ], but got " + (0, _toS2.default)(value) + ".\n        ");
      }
      this._[propName] = value;
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function on() {
  return function (target, propName, descriptor) {
    descriptor.get = function get() {
      if (!this._.hasOwnProperty(propName)) {
        this._[propName] = null;
      }
      return this._[propName];
    };
    descriptor.set = function set(value) {
      if (value !== null && typeof value !== "function") {
        throw createSetterError(this.constructor.name, propName, "\n          \tA callback should be a function or null, but got " + (0, _toS2.default)(value) + ".\n        ");
      }
      this._[propName] = value;
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function readonly(value) {
  return function (target, propName, descriptor) {
    var getter = descriptor.get || descriptor.value;

    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (typeof value !== "undefined") {
          return value;
        }
        if (typeof getter === "function") {
          return getter.call(this);
        }
      };
    }

    descriptor.set = function set() {
      throw createSetterError(this.constructor.name, propName, "\n        \tAttempt to assign to readonly property.\n      ");
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function typed(validator, defaultValue) {
  return function (target, propName, descriptor) {
    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (!this._.hasOwnProperty(propName)) {
          this._[propName] = defaultValue;
        }
        return this._[propName];
      };
    }

    if (typeof descriptor.set !== "function") {
      descriptor.set = function set(value) {
        if (!validator.test(value)) {
          throw createSetterError(this.constructor.name, propName, "\n            \tThis property should be $a " + validator.description + ", but got " + (0, _toS2.default)(value) + ".\n          ");
        }
        this._[propName] = value;
      };
    }

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}