'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLUSH = exports.CANCEL = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = middleware;

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CANCEL = exports.CANCEL = 'redux-throttle/CANCEL';
var FLUSH = exports.FLUSH = 'redux-throttle/FLUSH';

function map(throttled, action, method) {
  if (action.payload && action.payload.type) {
    var _ret = function () {
      var types = action.payload.type;
      if (!Array.isArray(types)) {
        types = [types];
      }
      Object.keys(throttled).filter(function (t) {
        return types.includes(t);
      }).forEach(function (t) {
        return throttled[t][method]();
      });
      return {
        v: void 0
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  Object.keys(throttled).forEach(function (t) {
    return throttled[t][method]();
  });
  return;
}

function middleware() {
  var defaultWait = arguments.length <= 0 || arguments[0] === undefined ? 300 : arguments[0];
  var defaultThrottleOption = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var throttled = {};
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === CANCEL) {
          map(throttled, action, 'cancel');
          return next(action);
        }

        if (action.type === FLUSH) {
          map(throttled, action, 'flush');
          return next(action);
        }

        var shouldThrottle = (action.meta || {}).throttle;

        // check if we don't need to throttle the action
        if (!shouldThrottle) {
          return next(action);
        }

        if (throttled[action.type]) {
          // if it's a action which was throttled already
          return throttled[action.type](action);
        }

        var wait = defaultWait;
        var options = defaultThrottleOption;

        if (!isNaN(shouldThrottle) && shouldThrottle !== true) {
          wait = shouldThrottle;
        } else if ((typeof shouldThrottle === 'undefined' ? 'undefined' : _typeof(shouldThrottle)) === 'object') {
          wait = shouldThrottle.wait || defaultWait;
          options = _extends({}, defaultThrottleOption, shouldThrottle);
        }

        throttled[action.type] = (0, _lodash2.default)(next, wait, options);

        return throttled[action.type](action);
      };
    };
  };
}