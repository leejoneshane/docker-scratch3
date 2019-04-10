module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "./src/ADPCMSoundDecoder.js":
/*!**********************************!*\
  !*** ./src/ADPCMSoundDecoder.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrayBufferStream = __webpack_require__(/*! ./ArrayBufferStream */ "./src/ArrayBufferStream.js");
var log = __webpack_require__(/*! ./log */ "./src/log.js");

/**
 * Data used by the decompression algorithm
 * @type {Array}
 */
var STEP_TABLE = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767];

/**
 * Data used by the decompression algorithm
 * @type {Array}
 */
var INDEX_TABLE = [-1, -1, -1, -1, 2, 4, 6, 8, -1, -1, -1, -1, 2, 4, 6, 8];

var _deltaTable = null;

/**
 * Build a table of deltas from the 89 possible steps and 16 codes.
 * @return {Array<number>} computed delta values
 */
var deltaTable = function deltaTable() {
    if (_deltaTable === null) {
        var NUM_STEPS = STEP_TABLE.length;
        var NUM_INDICES = INDEX_TABLE.length;
        _deltaTable = new Array(NUM_STEPS * NUM_INDICES).fill(0);
        var i = 0;

        for (var index = 0; index < NUM_STEPS; index++) {
            for (var code = 0; code < NUM_INDICES; code++) {
                var step = STEP_TABLE[index];

                var delta = 0;
                if (code & 4) delta += step;
                if (code & 2) delta += step >> 1;
                if (code & 1) delta += step >> 2;
                delta += step >> 3;
                _deltaTable[i++] = code & 8 ? -delta : delta;
            }
        }
    }

    return _deltaTable;
};

/**
 * Decode wav audio files that have been compressed with the ADPCM format.
 * This is necessary because, while web browsers have native decoders for many audio
 * formats, ADPCM is a non-standard format used by Scratch since its early days.
 * This decoder is based on code from Scratch-Flash:
 * https://github.com/LLK/scratch-flash/blob/master/src/sound/WAVFile.as
 */

var ADPCMSoundDecoder = function () {
    /**
     * @param {AudioContext} audioContext - a webAudio context
     * @constructor
     */
    function ADPCMSoundDecoder(audioContext) {
        _classCallCheck(this, ADPCMSoundDecoder);

        this.audioContext = audioContext;
    }

    /**
     * Data used by the decompression algorithm
     * @type {Array}
     */


    _createClass(ADPCMSoundDecoder, [{
        key: 'decode',


        /**
         * Decode an ADPCM sound stored in an ArrayBuffer and return a promise
         * with the decoded audio buffer.
         * @param  {ArrayBuffer} audioData - containing ADPCM encoded wav audio
         * @return {AudioBuffer} the decoded audio buffer
         */
        value: function decode(audioData) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var stream = new ArrayBufferStream(audioData);

                var riffStr = stream.readUint8String(4);
                if (riffStr !== 'RIFF') {
                    log.warn('incorrect adpcm wav header');
                    reject();
                }

                var lengthInHeader = stream.readInt32();
                if (lengthInHeader + 8 !== audioData.byteLength) {
                    log.warn('adpcm wav length in header: ' + lengthInHeader + ' is incorrect');
                }

                var wavStr = stream.readUint8String(4);
                if (wavStr !== 'WAVE') {
                    log.warn('incorrect adpcm wav header');
                    reject();
                }

                var formatChunk = _this.extractChunk('fmt ', stream);
                _this.encoding = formatChunk.readUint16();
                _this.channels = formatChunk.readUint16();
                _this.samplesPerSecond = formatChunk.readUint32();
                _this.bytesPerSecond = formatChunk.readUint32();
                _this.blockAlignment = formatChunk.readUint16();
                _this.bitsPerSample = formatChunk.readUint16();
                formatChunk.position += 2; // skip extra header byte count
                _this.samplesPerBlock = formatChunk.readUint16();
                _this.adpcmBlockSize = (_this.samplesPerBlock - 1) / 2 + 4; // block size in bytes

                var compressedData = _this.extractChunk('data', stream);
                var sampleCount = _this.numberOfSamples(compressedData, _this.adpcmBlockSize);

                var buffer = _this.audioContext.createBuffer(1, sampleCount, _this.samplesPerSecond);
                _this.imaDecompress(compressedData, _this.adpcmBlockSize, buffer.getChannelData(0));

                resolve(buffer);
            });
        }

        /**
         * Extract a chunk of audio data from the stream, consisting of a set of audio data bytes
         * @param  {string} chunkType - the type of chunk to extract. 'data' or 'fmt' (format)
         * @param  {ArrayBufferStream} stream - an stream containing the audio data
         * @return {ArrayBufferStream} a stream containing the desired chunk
         */

    }, {
        key: 'extractChunk',
        value: function extractChunk(chunkType, stream) {
            stream.position = 12;
            while (stream.position < stream.getLength() - 8) {
                var typeStr = stream.readUint8String(4);
                var chunkSize = stream.readInt32();
                if (typeStr === chunkType) {
                    var chunk = stream.extract(chunkSize);
                    return chunk;
                }
                stream.position += chunkSize;
            }
        }

        /**
         * Count the exact number of samples in the compressed data.
         * @param {ArrayBufferStream} compressedData - the compressed data
         * @param {number} blockSize - size of each block in the data in bytes
         * @return {number} number of samples in the compressed data
         */

    }, {
        key: 'numberOfSamples',
        value: function numberOfSamples(compressedData, blockSize) {
            if (!compressedData) return 0;

            compressedData.position = 0;

            var available = compressedData.getBytesAvailable();
            var blocks = available / blockSize | 0;
            // Number of samples in full blocks.
            var fullBlocks = blocks * (2 * (blockSize - 4)) + 1;
            // Number of samples in the last incomplete block. 0 if the last block
            // is full.
            var subBlock = Math.max(available % blockSize - 4, 0) * 2;
            // 1 if the last block is incomplete. 0 if it is complete.
            var incompleteBlock = Math.min(available % blockSize, 1);
            return fullBlocks + subBlock + incompleteBlock;
        }

        /**
         * Decompress sample data using the IMA ADPCM algorithm.
         * Note: Handles only one channel, 4-bits per sample.
         * @param  {ArrayBufferStream} compressedData - a stream of compressed audio samples
         * @param  {number} blockSize - the number of bytes in the stream
         * @param  {Float32Array} out - the uncompressed audio samples
         */

    }, {
        key: 'imaDecompress',
        value: function imaDecompress(compressedData, blockSize, out) {
            var sample = void 0;
            var code = void 0;
            var delta = void 0;
            var index = 0;
            var lastByte = -1; // -1 indicates that there is no saved lastByte

            // Bail and return no samples if we have no data
            if (!compressedData) return;

            compressedData.position = 0;

            var size = out.length;
            var samplesAfterBlockHeader = (blockSize - 4) * 2;

            var DELTA_TABLE = deltaTable();

            var i = 0;
            while (i < size) {
                // read block header
                sample = compressedData.readInt16();
                index = compressedData.readUint8();
                compressedData.position++; // skip extra header byte
                if (index > 88) index = 88;
                out[i++] = sample / 32768;

                var blockLength = Math.min(samplesAfterBlockHeader, size - i);
                var blockStart = i;
                while (i - blockStart < blockLength) {
                    // read 4-bit code and compute delta from previous sample
                    lastByte = compressedData.readUint8();
                    code = lastByte & 0xF;
                    delta = DELTA_TABLE[index * 16 + code];
                    // compute next index
                    index += INDEX_TABLE[code];
                    if (index > 88) index = 88;else if (index < 0) index = 0;
                    // compute and output sample
                    sample += delta;
                    if (sample > 32767) sample = 32767;else if (sample < -32768) sample = -32768;
                    out[i++] = sample / 32768;

                    // use 4-bit code from lastByte and compute delta from previous
                    // sample
                    code = lastByte >> 4 & 0xF;
                    delta = DELTA_TABLE[index * 16 + code];
                    // compute next index
                    index += INDEX_TABLE[code];
                    if (index > 88) index = 88;else if (index < 0) index = 0;
                    // compute and output sample
                    sample += delta;
                    if (sample > 32767) sample = 32767;else if (sample < -32768) sample = -32768;
                    out[i++] = sample / 32768;
                }
            }
        }
    }], [{
        key: 'STEP_TABLE',
        get: function get() {
            return STEP_TABLE;
        }

        /**
         * Data used by the decompression algorithm
         * @type {Array}
         */

    }, {
        key: 'INDEX_TABLE',
        get: function get() {
            return INDEX_TABLE;
        }
    }]);

    return ADPCMSoundDecoder;
}();

module.exports = ADPCMSoundDecoder;

/***/ }),

/***/ "./src/ArrayBufferStream.js":
/*!**********************************!*\
  !*** ./src/ArrayBufferStream.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrayBufferStream = function () {
  /**
   * ArrayBufferStream wraps the built-in javascript ArrayBuffer, adding the ability to access
   * data in it like a stream, tracking its position.
   * You can request to read a value from the front of the array, and it will keep track of the position
   * within the byte array, so that successive reads are consecutive.
   * The available types to read include:
   * Uint8, Uint8String, Int16, Uint16, Int32, Uint32
   * @param {ArrayBuffer} arrayBuffer - array to use as a stream
   * @param {number} start - the start position in the raw buffer. position
   * will be relative to the start value.
   * @param {number} end - the end position in the raw buffer. length and
   * bytes available will be relative to the end value.
   * @param {ArrayBufferStream} parent - if passed reuses the parent's
   * internal objects
   * @constructor
   */
  function ArrayBufferStream(arrayBuffer) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : arrayBuffer.byteLength;

    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$_uint8View = _ref._uint8View,
        _uint8View = _ref$_uint8View === undefined ? new Uint8Array(arrayBuffer) : _ref$_uint8View;

    _classCallCheck(this, ArrayBufferStream);

    /**
     * Raw data buffer for stream to read.
     * @type {ArrayBufferStream}
     */
    this.arrayBuffer = arrayBuffer;

    /**
     * Start position in arrayBuffer. Read values are relative to the start
     * in the arrayBuffer.
     * @type {number}
     */
    this.start = start;

    /**
     * End position in arrayBuffer. Length and bytes available are relative
     * to the start, end, and _position in the arrayBuffer;
     * @type {number};
     */
    this.end = end;

    /**
     * Cached Uint8Array view of the arrayBuffer. Heavily used for reading
     * Uint8 values and Strings from the stream.
     * @type {Uint8Array}
     */
    this._uint8View = _uint8View;

    /**
     * Raw position in the arrayBuffer relative to the beginning of the
     * arrayBuffer.
     * @type {number}
     */
    this._position = start;
  }

  /**
   * Return a new ArrayBufferStream that is a slice of the existing one
   * @param  {number} length - the number of bytes of extract
   * @return {ArrayBufferStream} the extracted stream
   */


  _createClass(ArrayBufferStream, [{
    key: 'extract',
    value: function extract(length) {
      return new ArrayBufferStream(this.arrayBuffer, this._position, this._position + length, this);
    }

    /**
     * @return {number} the length of the stream in bytes
     */

  }, {
    key: 'getLength',
    value: function getLength() {
      return this.end - this.start;
    }

    /**
     * @return {number} the number of bytes available after the current position in the stream
     */

  }, {
    key: 'getBytesAvailable',
    value: function getBytesAvailable() {
      return this.end - this._position;
    }

    /**
     * Position relative to the start value in the arrayBuffer of this
     * ArrayBufferStream.
     * @type {number}
     */

  }, {
    key: 'readUint8',


    /**
     * Read an unsigned 8 bit integer from the stream
     * @return {number} the next 8 bit integer in the stream
     */
    value: function readUint8() {
      var val = this._uint8View[this._position];
      this._position += 1;
      return val;
    }

    /**
     * Read a sequence of bytes of the given length and convert to a string.
     * This is a convenience method for use with short strings.
     * @param {number} length - the number of bytes to convert
     * @return {string} a String made by concatenating the chars in the input
     */

  }, {
    key: 'readUint8String',
    value: function readUint8String(length) {
      var arr = this._uint8View;
      var str = '';
      var end = this._position + length;
      for (var i = this._position; i < end; i++) {
        str += String.fromCharCode(arr[i]);
      }
      this._position += length;
      return str;
    }

    /**
     * Read a 16 bit integer from the stream
     * @return {number} the next 16 bit integer in the stream
     */

  }, {
    key: 'readInt16',
    value: function readInt16() {
      var val = new Int16Array(this.arrayBuffer, this._position, 1)[0];
      this._position += 2; // one 16 bit int is 2 bytes
      return val;
    }

    /**
     * Read an unsigned 16 bit integer from the stream
     * @return {number} the next unsigned 16 bit integer in the stream
     */

  }, {
    key: 'readUint16',
    value: function readUint16() {
      var val = new Uint16Array(this.arrayBuffer, this._position, 1)[0];
      this._position += 2; // one 16 bit int is 2 bytes
      return val;
    }

    /**
     * Read a 32 bit integer from the stream
     * @return {number} the next 32 bit integer in the stream
     */

  }, {
    key: 'readInt32',
    value: function readInt32() {
      var val = new Int32Array(this.arrayBuffer, this._position, 1)[0];
      this._position += 4; // one 32 bit int is 4 bytes
      return val;
    }

    /**
     * Read an unsigned 32 bit integer from the stream
     * @return {number} the next unsigned 32 bit integer in the stream
     */

  }, {
    key: 'readUint32',
    value: function readUint32() {
      var val = new Uint32Array(this.arrayBuffer, this._position, 1)[0];
      this._position += 4; // one 32 bit int is 4 bytes
      return val;
    }
  }, {
    key: 'position',
    get: function get() {
      return this._position - this.start;
    }

    /**
     * Set the position to read from in the arrayBuffer.
     * @type {number}
     * @param {number} value - new value to set position to
     */
    ,
    set: function set(value) {
      this._position = value + this.start;
      return value;
    }
  }]);

  return ArrayBufferStream;
}();

module.exports = ArrayBufferStream;

/***/ }),

/***/ "./src/AudioEngine.js":
/*!****************************!*\
  !*** ./src/AudioEngine.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StartAudioContext = __webpack_require__(/*! ./StartAudioContext */ "./src/StartAudioContext.js");
var AudioContext = __webpack_require__(/*! audio-context */ "audio-context");

var log = __webpack_require__(/*! ./log */ "./src/log.js");
var uid = __webpack_require__(/*! ./uid */ "./src/uid.js");

var ADPCMSoundDecoder = __webpack_require__(/*! ./ADPCMSoundDecoder */ "./src/ADPCMSoundDecoder.js");
var Loudness = __webpack_require__(/*! ./Loudness */ "./src/Loudness.js");
var SoundPlayer = __webpack_require__(/*! ./SoundPlayer */ "./src/SoundPlayer.js");

var EffectChain = __webpack_require__(/*! ./effects/EffectChain */ "./src/effects/EffectChain.js");
var PanEffect = __webpack_require__(/*! ./effects/PanEffect */ "./src/effects/PanEffect.js");
var PitchEffect = __webpack_require__(/*! ./effects/PitchEffect */ "./src/effects/PitchEffect.js");
var VolumeEffect = __webpack_require__(/*! ./effects/VolumeEffect */ "./src/effects/VolumeEffect.js");

var SoundBank = __webpack_require__(/*! ./SoundBank */ "./src/SoundBank.js");

/**
 * Wrapper to ensure that audioContext.decodeAudioData is a promise
 * @param {object} audioContext The current AudioContext
 * @param {ArrayBuffer} buffer Audio data buffer to decode
 * @return {Promise} A promise that resolves to the decoded audio
 */
var decodeAudioData = function decodeAudioData(audioContext, buffer) {
    // Check for newer promise-based API
    if (audioContext.decodeAudioData.length === 1) {
        return audioContext.decodeAudioData(buffer);
    }
    // Fall back to callback API
    return new Promise(function (resolve, reject) {
        audioContext.decodeAudioData(buffer, function (decodedAudio) {
            return resolve(decodedAudio);
        }, function (error) {
            return reject(error);
        });
    });
};

/**
 * There is a single instance of the AudioEngine. It handles global audio
 * properties and effects, loads all the audio buffers for sounds belonging to
 * sprites.
 */

var AudioEngine = function () {
    function AudioEngine() {
        var audioContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new AudioContext();

        _classCallCheck(this, AudioEngine);

        /**
         * AudioContext to play and manipulate sounds with a graph of source
         * and effect nodes.
         * @type {AudioContext}
         */
        this.audioContext = audioContext;
        StartAudioContext(this.audioContext);

        /**
         * Master GainNode that all sounds plays through. Changing this node
         * will change the volume for all sounds.
         * @type {GainNode}
         */
        this.inputNode = this.audioContext.createGain();
        this.inputNode.connect(this.audioContext.destination);

        /**
         * a map of soundIds to audio buffers, holding sounds for all sprites
         * @type {Object<String, ArrayBuffer>}
         */
        this.audioBuffers = {};

        /**
         * A Loudness detector.
         * @type {Loudness}
         */
        this.loudness = null;

        /**
         * Array of effects applied in order, left to right,
         * Left is closest to input, Right is closest to output
         */
        this.effects = [PanEffect, PitchEffect, VolumeEffect];
    }

    /**
     * Current time in the AudioEngine.
     * @type {number}
     */


    _createClass(AudioEngine, [{
        key: 'getInputNode',


        /**
         * Get the input node.
         * @return {AudioNode} - audio node that is the input for this effect
         */
        value: function getInputNode() {
            return this.inputNode;
        }

        /**
         * Decode a sound, decompressing it into audio samples.
         * @param {object} sound - an object containing audio data and metadata for
         *     a sound
         * @param {Buffer} sound.data - sound data loaded from scratch-storage
         * @returns {?Promise} - a promise which will resolve to the sound id and
         *     buffer if decoded
         */

    }, {
        key: '_decodeSound',
        value: function _decodeSound(sound) {
            var _this = this;

            // Make a copy of the buffer because decoding detaches the original
            // buffer
            var bufferCopy1 = sound.data.buffer.slice(0);

            // todo: multiple decodings of the same buffer create duplicate decoded
            // copies in audioBuffers. Create a hash id of the buffer or deprecate
            // audioBuffers to avoid memory issues for large audio buffers.
            var soundId = uid();

            // Attempt to decode the sound using the browser's native audio data
            // decoder If that fails, attempt to decode as ADPCM
            var decoding = decodeAudioData(this.audioContext, bufferCopy1).catch(function () {
                // The audio context failed to parse the sound data
                // we gave it, so try to decode as 'adpcm'

                // First we need to create another copy of our original data
                var bufferCopy2 = sound.data.buffer.slice(0);
                // Try decoding as adpcm
                return new ADPCMSoundDecoder(_this.audioContext).decode(bufferCopy2);
            }).then(function (buffer) {
                return [soundId, buffer];
            }, function (error) {
                log.warn('audio data could not be decoded', error);
            });

            return decoding;
        }

        /**
         * Decode a sound, decompressing it into audio samples.
         *
         * Store a reference to it the sound in the audioBuffers dictionary,
         * indexed by soundId.
         *
         * @param {object} sound - an object containing audio data and metadata for
         *     a sound
         * @param {Buffer} sound.data - sound data loaded from scratch-storage
         * @returns {?Promise} - a promise which will resolve to the sound id
         */

    }, {
        key: 'decodeSound',
        value: function decodeSound(sound) {
            var _this2 = this;

            return this._decodeSound(sound).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    id = _ref2[0],
                    buffer = _ref2[1];

                _this2.audioBuffers[id] = buffer;
                return id;
            });
        }

        /**
         * Decode a sound, decompressing it into audio samples.
         *
         * Create a SoundPlayer instance that can be used to play the sound and
         * stop and fade out playback.
         *
         * @param {object} sound - an object containing audio data and metadata for
         *     a sound
         * @param {Buffer} sound.data - sound data loaded from scratch-storage
         * @returns {?Promise} - a promise which will resolve to the buffer
         */

    }, {
        key: 'decodeSoundPlayer',
        value: function decodeSoundPlayer(sound) {
            var _this3 = this;

            return this._decodeSound(sound).then(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    id = _ref4[0],
                    buffer = _ref4[1];

                return new SoundPlayer(_this3, { id: id, buffer: buffer });
            });
        }

        /**
         * Get the current loudness of sound received by the microphone.
         * Sound is measured in RMS and smoothed.
         * @return {number} loudness scaled 0 to 100
         */

    }, {
        key: 'getLoudness',
        value: function getLoudness() {
            // The microphone has not been set up, so try to connect to it
            if (!this.loudness) {
                this.loudness = new Loudness(this.audioContext);
            }

            return this.loudness.getLoudness();
        }

        /**
         * Create an effect chain.
         * @returns {EffectChain} chain of effects defined by this AudioEngine
         */

    }, {
        key: 'createEffectChain',
        value: function createEffectChain() {
            var effects = new EffectChain(this, this.effects);
            effects.connect(this);
            return effects;
        }

        /**
         * Create a sound bank and effect chain.
         * @returns {SoundBank} a sound bank configured with an effect chain
         *     defined by this AudioEngine
         */

    }, {
        key: 'createBank',
        value: function createBank() {
            return new SoundBank(this, this.createEffectChain());
        }
    }, {
        key: 'currentTime',
        get: function get() {
            return this.audioContext.currentTime;
        }

        /**
         * Names of the audio effects.
         * @enum {string}
         */

    }, {
        key: 'EFFECT_NAMES',
        get: function get() {
            return {
                pitch: 'pitch',
                pan: 'pan'
            };
        }

        /**
         * A short duration to transition audio prarameters.
         *
         * Used as a time constant for exponential transitions. A general value
         * must be large enough that it does not cute off lower frequency, or bass,
         * sounds. Human hearing lower limit is ~20Hz making a safe value 25
         * milliseconds or 0.025 seconds, where half of a 20Hz wave will play along
         * with the DECAY. Higher frequencies will play multiple waves during the
         * same amount of time and avoid clipping.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setTargetAtTime}
         * @const {number}
         */

    }, {
        key: 'DECAY_DURATION',
        get: function get() {
            return 0.025;
        }

        /**
         * Some environments cannot smoothly change parameters immediately, provide
         * a small delay before decaying.
         *
         * @see {@link https://bugzilla.mozilla.org/show_bug.cgi?id=1228207}
         * @const {number}
         */

    }, {
        key: 'DECAY_WAIT',
        get: function get() {
            return 0.05;
        }
    }]);

    return AudioEngine;
}();

module.exports = AudioEngine;

/***/ }),

/***/ "./src/Loudness.js":
/*!*************************!*\
  !*** ./src/Loudness.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = __webpack_require__(/*! ./log */ "./src/log.js");

var Loudness = function () {
    /**
     * Instrument and detect a loudness value from a local microphone.
     * @param {AudioContext} audioContext - context to create nodes from for
     *     detecting loudness
     * @constructor
     */
    function Loudness(audioContext) {
        _classCallCheck(this, Loudness);

        /**
         * AudioContext the mic will connect to and provide analysis of
         * @type {AudioContext}
         */
        this.audioContext = audioContext;

        /**
         * Are we connecting to the mic yet?
         * @type {Boolean}
         */
        this.connectingToMic = false;

        /**
         * microphone, for measuring loudness, with a level meter analyzer
         * @type {MediaStreamSourceNode}
         */
        this.mic = null;
    }

    /**
     * Get the current loudness of sound received by the microphone.
     * Sound is measured in RMS and smoothed.
     * Some code adapted from Tone.js: https://github.com/Tonejs/Tone.js
     * @return {number} loudness scaled 0 to 100
     */


    _createClass(Loudness, [{
        key: 'getLoudness',
        value: function getLoudness() {
            var _this = this;

            // The microphone has not been set up, so try to connect to it
            if (!this.mic && !this.connectingToMic) {
                this.connectingToMic = true; // prevent multiple connection attempts
                navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
                    _this.audioStream = stream;
                    _this.mic = _this.audioContext.createMediaStreamSource(stream);
                    _this.analyser = _this.audioContext.createAnalyser();
                    _this.mic.connect(_this.analyser);
                    _this.micDataArray = new Float32Array(_this.analyser.fftSize);
                }).catch(function (err) {
                    log.warn(err);
                });
            }

            // If the microphone is set up and active, measure the loudness
            if (this.mic && this.audioStream.active) {
                this.analyser.getFloatTimeDomainData(this.micDataArray);
                var sum = 0;
                // compute the RMS of the sound
                for (var i = 0; i < this.micDataArray.length; i++) {
                    sum += Math.pow(this.micDataArray[i], 2);
                }
                var rms = Math.sqrt(sum / this.micDataArray.length);
                // smooth the value, if it is descending
                if (this._lastValue) {
                    rms = Math.max(rms, this._lastValue * 0.6);
                }
                this._lastValue = rms;

                // Scale the measurement so it's more sensitive to quieter sounds
                rms *= 1.63;
                rms = Math.sqrt(rms);
                // Scale it up to 0-100 and round
                rms = Math.round(rms * 100);
                // Prevent it from going above 100
                rms = Math.min(rms, 100);
                return rms;
            }

            // if there is no microphone input, return -1
            return -1;
        }
    }]);

    return Loudness;
}();

module.exports = Loudness;

/***/ }),

/***/ "./src/SoundBank.js":
/*!**************************!*\
  !*** ./src/SoundBank.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var log = __webpack_require__(/*! ./log */ "./src/log.js");

/**
 * A symbol indicating all targets are to be effected.
 * @const {string}
 */
var ALL_TARGETS = '*';

var SoundBank = function () {
    /**
     * A bank of sounds that can be played.
     * @constructor
     * @param {AudioEngine} audioEngine - related AudioEngine
     * @param {EffectChain} effectChainPrime - original EffectChain cloned for
     *     playing sounds
     */
    function SoundBank(audioEngine, effectChainPrime) {
        _classCallCheck(this, SoundBank);

        /**
         * AudioEngine this SoundBank is related to.
         * @type {AudioEngine}
         */
        this.audioEngine = audioEngine;

        /**
         * Map of ids to soundPlayers.
         * @type {object<SoundPlayer>}
         */
        this.soundPlayers = {};

        /**
         * Map of targets by sound id.
         * @type {Map<string, Target>}
         */
        this.playerTargets = new Map();

        /**
         * Map of effect chains by sound id.
         * @type {Map<string, EffectChain}
         */
        this.soundEffects = new Map();

        /**
         * Original EffectChain cloned for every playing sound.
         * @type {EffectChain}
         */
        this.effectChainPrime = effectChainPrime;
    }

    /**
     * Add a sound player instance likely from AudioEngine.decodeSoundPlayer
     * @param {SoundPlayer} soundPlayer - SoundPlayer to add
     */


    _createClass(SoundBank, [{
        key: 'addSoundPlayer',
        value: function addSoundPlayer(soundPlayer) {
            this.soundPlayers[soundPlayer.id] = soundPlayer;
        }

        /**
         * Get a sound player by id.
         * @param {string} soundId - sound to look for
         * @returns {SoundPlayer} instance of sound player for the id
         */

    }, {
        key: 'getSoundPlayer',
        value: function getSoundPlayer(soundId) {
            if (!this.soundPlayers[soundId]) {
                log.error('SoundBank.getSoundPlayer(' + soundId + '): called missing sound in bank');
            }

            return this.soundPlayers[soundId];
        }

        /**
         * Get a sound EffectChain by id.
         * @param {string} sound - sound to look for an EffectChain
         * @returns {EffectChain} available EffectChain for this id
         */

    }, {
        key: 'getSoundEffects',
        value: function getSoundEffects(sound) {
            if (!this.soundEffects.has(sound)) {
                this.soundEffects.set(sound, this.effectChainPrime.clone());
            }

            return this.soundEffects.get(sound);
        }

        /**
         * Play a sound.
         * @param {Target} target - Target to play for
         * @param {string} soundId - id of sound to play
         * @returns {Promise} promise that resolves when the sound finishes playback
         */

    }, {
        key: 'playSound',
        value: function playSound(target, soundId) {
            var effects = this.getSoundEffects(soundId);
            var player = this.getSoundPlayer(soundId);

            if (this.playerTargets.get(soundId) !== target) {
                // make sure to stop the old sound, effectively "forking" the output
                // when the target switches before we adjust it's effects
                player.stop();
            }

            this.playerTargets.set(soundId, target);
            effects.addSoundPlayer(player);
            effects.setEffectsFromTarget(target);
            player.connect(effects);

            player.play();

            return player.finished();
        }

        /**
         * Set the effects (pan, pitch, and volume) from values on the given target.
         * @param {Target} target - target to set values from
         */

    }, {
        key: 'setEffects',
        value: function setEffects(target) {
            var _this = this;

            this.playerTargets.forEach(function (playerTarget, key) {
                if (playerTarget === target) {
                    _this.getSoundEffects(key).setEffectsFromTarget(target);
                }
            });
        }

        /**
         * Stop playback of sound by id if was lasted played by the target.
         * @param {Target} target - target to check if it last played the sound
         * @param {string} soundId - id of the sound to stop
         */

    }, {
        key: 'stop',
        value: function stop(target, soundId) {
            if (this.playerTargets.get(soundId) === target) {
                this.soundPlayers[soundId].stop();
            }
        }

        /**
         * Stop all sounds for all targets or a specific target.
         * @param {Target|string} target - a symbol for all targets or the target
         *     to stop sounds for
         */

    }, {
        key: 'stopAllSounds',
        value: function stopAllSounds() {
            var _this2 = this;

            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ALL_TARGETS;

            this.playerTargets.forEach(function (playerTarget, key) {
                if (target === ALL_TARGETS || playerTarget === target) {
                    _this2.getSoundPlayer(key).stop();
                }
            });
        }

        /**
         * Dispose of all EffectChains and SoundPlayers.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            this.playerTargets.clear();
            this.soundEffects.forEach(function (effects) {
                return effects.dispose();
            });
            this.soundEffects.clear();
            for (var soundId in this.soundPlayers) {
                if (this.soundPlayers.hasOwnProperty(soundId)) {
                    this.soundPlayers[soundId].dispose();
                }
            }
            this.soundPlayers = {};
        }
    }]);

    return SoundBank;
}();

module.exports = SoundBank;

/***/ }),

/***/ "./src/SoundPlayer.js":
/*!****************************!*\
  !*** ./src/SoundPlayer.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = __webpack_require__(/*! events */ "./node_modules/events/events.js"),
    EventEmitter = _require.EventEmitter;

var VolumeEffect = __webpack_require__(/*! ./effects/VolumeEffect */ "./src/effects/VolumeEffect.js");

/**
 * Name of event that indicates playback has ended.
 * @const {string}
 */
var ON_ENDED = 'ended';

var SoundPlayer = function (_EventEmitter) {
    _inherits(SoundPlayer, _EventEmitter);

    /**
     * Play sounds that stop without audible clipping.
     *
     * @param {AudioEngine} audioEngine - engine to play sounds on
     * @param {object} data - required data for sound playback
     * @param {string} data.id - a unique id for this sound
     * @param {ArrayBuffer} data.buffer - buffer of the sound's waveform to play
     * @constructor
     */
    function SoundPlayer(audioEngine, _ref) {
        var id = _ref.id,
            buffer = _ref.buffer;

        _classCallCheck(this, SoundPlayer);

        /**
         * Unique sound identifier set by AudioEngine.
         * @type {string}
         */
        var _this = _possibleConstructorReturn(this, (SoundPlayer.__proto__ || Object.getPrototypeOf(SoundPlayer)).call(this));

        _this.id = id;

        /**
         * AudioEngine creating this sound player.
         * @type {AudioEngine}
         */
        _this.audioEngine = audioEngine;

        /**
         * Decoded audio buffer from audio engine for playback.
         * @type {AudioBuffer}
         */
        _this.buffer = buffer;

        /**
         * Output audio node.
         * @type {AudioNode}
         */
        _this.outputNode = null;

        /**
         * VolumeEffect used to fade out playing sounds when stopping them.
         * @type {VolumeEffect}
         */
        _this.volumeEffect = null;

        /**
         * Target engine, effect, or chain this player directly connects to.
         * @type {AudioEngine|Effect|EffectChain}
         */
        _this.target = null;

        /**
         * Internally is the SoundPlayer initialized with at least its buffer
         * source node and output node.
         * @type {boolean}
         */
        _this.initialized = false;

        /**
         * Is the sound playing or starting to play?
         * @type {boolean}
         */
        _this.isPlaying = false;

        /**
         * Timestamp sound is expected to be starting playback until. Once the
         * future timestamp is reached the sound is considered to be playing
         * through the audio hardware and stopping should fade out instead of
         * cutting off playback.
         * @type {number}
         */
        _this.startingUntil = 0;

        /**
         * Rate to play back the audio at.
         * @type {number}
         */
        _this.playbackRate = 1;

        // handleEvent is a EventTarget api for the DOM, however the
        // web-audio-test-api we use uses an addEventListener that isn't
        // compatable with object and requires us to pass this bound function
        // instead
        _this.handleEvent = _this.handleEvent.bind(_this);
        return _this;
    }

    /**
     * Is plaback currently starting?
     * @type {boolean}
     */


    _createClass(SoundPlayer, [{
        key: 'handleEvent',


        /**
         * Handle any event we have told the output node to listen for.
         * @param {Event} event - dom event to handle
         */
        value: function handleEvent(event) {
            if (event.type === ON_ENDED) {
                this.onEnded();
            }
        }

        /**
         * Event listener for when playback ends.
         */

    }, {
        key: 'onEnded',
        value: function onEnded() {
            this.emit('stop');

            this.isPlaying = false;
        }

        /**
         * Create the buffer source node during initialization or secondary
         * playback.
         */

    }, {
        key: '_createSource',
        value: function _createSource() {
            if (this.outputNode !== null) {
                this.outputNode.removeEventListener(ON_ENDED, this.handleEvent);
                this.outputNode.disconnect();
            }

            this.outputNode = this.audioEngine.audioContext.createBufferSource();
            this.outputNode.playbackRate.value = this.playbackRate;
            this.outputNode.buffer = this.buffer;

            this.outputNode.addEventListener(ON_ENDED, this.handleEvent);

            if (this.target !== null) {
                this.connect(this.target);
            }
        }

        /**
         * Initialize the player for first playback.
         */

    }, {
        key: 'initialize',
        value: function initialize() {
            this.initialized = true;

            this._createSource();
        }

        /**
         * Connect the player to the engine or an effect chain.
         * @param {object} target - object to connect to
         * @returns {object} - return this sound player
         */

    }, {
        key: 'connect',
        value: function connect(target) {
            if (target === this.volumeEffect) {
                this.outputNode.disconnect();
                this.outputNode.connect(this.volumeEffect.getInputNode());
                return;
            }

            this.target = target;

            if (!this.initialized) {
                return;
            }

            if (this.volumeEffect === null) {
                this.outputNode.disconnect();
                this.outputNode.connect(target.getInputNode());
            } else {
                this.volumeEffect.connect(target);
            }

            return this;
        }

        /**
         * Teardown the player.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            if (!this.initialized) {
                return;
            }

            this.stopImmediately();

            if (this.volumeEffect !== null) {
                this.volumeEffect.dispose();
                this.volumeEffect = null;
            }

            this.outputNode.disconnect();
            this.outputNode = null;

            this.target = null;

            this.initialized = false;
        }

        /**
         * Take the internal state of this player and create a new player from
         * that. Restore the state of this player to that before its first playback.
         *
         * The returned player can be used to stop the original playback or
         * continue it without manipulation from the original player.
         *
         * @returns {SoundPlayer} - new SoundPlayer with old state
         */

    }, {
        key: 'take',
        value: function take() {
            if (this.outputNode) {
                this.outputNode.removeEventListener(ON_ENDED, this.handleEvent);
            }

            var taken = new SoundPlayer(this.audioEngine, this);
            taken.playbackRate = this.playbackRate;
            if (this.isPlaying) {
                taken.startingUntil = this.startingUntil;
                taken.isPlaying = this.isPlaying;
                taken.initialized = this.initialized;
                taken.outputNode = this.outputNode;
                taken.outputNode.addEventListener(ON_ENDED, taken.handleEvent);
                taken.volumeEffect = this.volumeEffect;
                if (taken.volumeEffect) {
                    taken.volumeEffect.audioPlayer = taken;
                }
                if (this.target !== null) {
                    taken.connect(this.target);
                }

                this.emit('stop');
                taken.emit('play');
            }

            this.outputNode = null;
            this.volumeEffect = null;
            this.initialized = false;
            this.startingUntil = 0;
            this.isPlaying = false;

            return taken;
        }

        /**
         * Start playback for this sound.
         *
         * If the sound is already playing it will stop playback with a quick fade
         * out.
         */

    }, {
        key: 'play',
        value: function play() {
            if (this.isStarting) {
                this.emit('stop');
                this.emit('play');
                return;
            }

            if (this.isPlaying) {
                this.stop();
            }

            if (this.initialized) {
                this._createSource();
            } else {
                this.initialize();
            }

            this.outputNode.start();

            this.isPlaying = true;

            var _audioEngine = this.audioEngine,
                currentTime = _audioEngine.currentTime,
                DECAY_DURATION = _audioEngine.DECAY_DURATION;

            this.startingUntil = currentTime + DECAY_DURATION;

            this.emit('play');
        }

        /**
         * Stop playback after quickly fading out.
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (!this.isPlaying) {
                return;
            }

            // always do a manual stop on a taken / volume effect fade out sound
            // player take will emit "stop" as well as reset all of our playing
            // statuses / remove our nodes / etc
            var taken = this.take();
            taken.volumeEffect = new VolumeEffect(taken.audioEngine, taken, null);

            taken.volumeEffect.connect(taken.target);
            // volumeEffect will recursively connect to us if it needs to, so this
            // happens too:
            // taken.connect(taken.volumeEffect);

            taken.finished().then(function () {
                return taken.dispose();
            });

            taken.volumeEffect.set(0);
            var _audioEngine2 = this.audioEngine,
                currentTime = _audioEngine2.currentTime,
                DECAY_WAIT = _audioEngine2.DECAY_WAIT,
                DECAY_DURATION = _audioEngine2.DECAY_DURATION;

            taken.outputNode.stop(currentTime + DECAY_WAIT + DECAY_DURATION);
        }

        /**
         * Stop immediately without fading out. May cause audible clipping.
         */

    }, {
        key: 'stopImmediately',
        value: function stopImmediately() {
            if (!this.isPlaying) {
                return;
            }

            this.outputNode.stop();

            this.isPlaying = false;
            this.startingUntil = 0;

            this.emit('stop');
        }

        /**
         * Return a promise that resolves when the sound next finishes.
         * @returns {Promise} - resolves when the sound finishes
         */

    }, {
        key: 'finished',
        value: function finished() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.once('stop', resolve);
            });
        }

        /**
         * Set the sound's playback rate.
         * @param {number} value - playback rate. Default is 1.
         */

    }, {
        key: 'setPlaybackRate',
        value: function setPlaybackRate(value) {
            this.playbackRate = value;

            if (this.initialized) {
                this.outputNode.playbackRate.value = value;
            }
        }
    }, {
        key: 'isStarting',
        get: function get() {
            return this.isPlaying && this.startingUntil > this.audioEngine.currentTime;
        }
    }]);

    return SoundPlayer;
}(EventEmitter);

module.exports = SoundPlayer;

/***/ }),

/***/ "./src/StartAudioContext.js":
/*!**********************************!*\
  !*** ./src/StartAudioContext.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// StartAudioContext assumes that we are in a window/document setting and messes with the unit
// tests, this is our own version just checking to see if we have a global document to listen
// to before we even try to "start" it.  Our test api audio context is started by default.
var StartAudioContext = __webpack_require__(/*! startaudiocontext */ "startaudiocontext");

module.exports = function (context) {
    if (typeof document !== 'undefined') {
        return StartAudioContext(context);
    }
};

/***/ }),

/***/ "./src/effects/Effect.js":
/*!*******************************!*\
  !*** ./src/effects/Effect.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An effect on an AudioPlayer and all its SoundPlayers.
 */
var Effect = function () {
    /**
     * @param {AudioEngine} audioEngine - audio engine this runs with
     * @param {AudioPlayer} audioPlayer - audio player this affects
     * @param {Effect} lastEffect - effect in the chain before this one
     * @constructor
     */
    function Effect(audioEngine, audioPlayer, lastEffect) {
        _classCallCheck(this, Effect);

        this.audioEngine = audioEngine;
        this.audioPlayer = audioPlayer;
        this.lastEffect = lastEffect;

        this.value = this.DEFAULT_VALUE;

        this.initialized = false;

        this.inputNode = null;
        this.outputNode = null;

        this.target = null;
    }

    /**
     * Return the name of the effect.
     * @type {string}
     */


    _createClass(Effect, [{
        key: 'getInputNode',


        /**
         * Get the input node.
         * @return {AudioNode} - audio node that is the input for this effect
         */
        value: function getInputNode() {
            if (this._isPatch) {
                return this.inputNode;
            }
            return this.target.getInputNode();
        }

        /**
         * Initialize the Effect.
         * Effects start out uninitialized. Then initialize when they are first set
         * with some value.
         * @throws {Error} throws when left unimplemented
         */

    }, {
        key: 'initialize',
        value: function initialize() {
            throw new Error(this.constructor.name + '.initialize is not implemented.');
        }

        /**
         * Set the effects value.
         * @private
         * @param {number} value - new value to set effect to
         */

    }, {
        key: '_set',
        value: function _set() {
            throw new Error(this.constructor.name + '._set is not implemented.');
        }

        /**
         * Set the effects value.
         * @param {number} value - new value to set effect to
         */

    }, {
        key: 'set',
        value: function set(value) {
            // Initialize the node on first set.
            if (!this.initialized) {
                this.initialize();
            }

            // Store whether the graph should currently affected by this effect.
            var wasPatch = this._isPatch;
            if (wasPatch) {
                this._lastPatch = this.audioEngine.currentTime;
            }

            // Call the internal implementation per this Effect.
            this._set(value);

            // Connect or disconnect from the graph if this now applies or no longer
            // applies an effect.
            if (this._isPatch !== wasPatch && this.target !== null) {
                this.connect(this.target);
            }
        }

        /**
         * Update the effect for changes in the audioPlayer.
         */

    }, {
        key: 'update',
        value: function update() {}

        /**
         * Clear the value back to the default.
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.set(this.DEFAULT_VALUE);
        }

        /**
         * Connnect this effect's output to another audio node
         * @param {object} target - target whose node to should be connected
         */

    }, {
        key: 'connect',
        value: function connect(target) {
            var _this = this;

            if (target === null) {
                throw new Error('target may not be null');
            }

            var checkForCircularReference = function checkForCircularReference(subtarget) {
                if (subtarget) {
                    if (subtarget === _this) {
                        return true;
                    }
                    return checkForCircularReference(subtarget.target);
                }
            };
            if (checkForCircularReference(target)) {
                throw new Error('Effect cannot connect to itself');
            }

            this.target = target;

            if (this.outputNode !== null) {
                this.outputNode.disconnect();
            }

            if (this._isPatch || this._lastPatch + this.audioEngine.DECAY_DURATION < this.audioEngine.currentTime) {
                this.outputNode.connect(target.getInputNode());
            }

            if (this.lastEffect === null) {
                if (this.audioPlayer !== null) {
                    this.audioPlayer.connect(this);
                }
            } else {
                this.lastEffect.connect(this);
            }
        }

        /**
         * Clean up and disconnect audio nodes.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            this.inputNode = null;
            this.outputNode = null;
            this.target = null;

            this.initialized = false;
        }
    }, {
        key: 'name',
        get: function get() {
            throw new Error(this.constructor.name + '.name is not implemented');
        }

        /**
         * Default value to set the Effect to when constructed and when clear'ed.
         * @const {number}
         */

    }, {
        key: 'DEFAULT_VALUE',
        get: function get() {
            return 0;
        }

        /**
         * Should the effect be connected to the audio graph?
         * The pitch effect is an example that does not need to be patched in.
         * Instead of affecting the graph it affects the player directly.
         * @return {boolean} is the effect affecting the graph?
         */

    }, {
        key: '_isPatch',
        get: function get() {
            return this.initialized && (this.value !== this.DEFAULT_VALUE || this.audioPlayer === null);
        }
    }]);

    return Effect;
}();

module.exports = Effect;

/***/ }),

/***/ "./src/effects/EffectChain.js":
/*!************************************!*\
  !*** ./src/effects/EffectChain.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EffectChain = function () {
    /**
     * Chain of effects that can be applied to a group of SoundPlayers.
     * @param {AudioEngine} audioEngine - engine whose effects these belong to
     * @param {Array<Effect>} effects - array of Effect classes to construct
     */
    function EffectChain(audioEngine, effects) {
        var _this = this;

        _classCallCheck(this, EffectChain);

        /**
         * AudioEngine whose effects these belong to.
         * @type {AudioEngine}
         */
        this.audioEngine = audioEngine;

        /**
         * Node incoming connections will attach to. This node than connects to
         * the items in the chain which finally connect to some output.
         * @type {AudioNode}
         */
        this.inputNode = this.audioEngine.audioContext.createGain();

        /**
         * List of Effect types to create.
         * @type {Array<Effect>}
         */
        this.effects = effects;

        // Effects are instantiated in reverse so that the first refers to the
        // second, the second refers to the third, etc and the last refers to
        // null.
        var lastEffect = null;
        /**
         * List of instantiated Effects.
         * @type {Array<Effect>}
         */
        this._effects = effects.reverse().map(function (Effect) {
            var effect = new Effect(audioEngine, _this, lastEffect);
            _this[effect.name] = effect;
            lastEffect = effect;
            return effect;
        }).reverse();

        /**
         * First effect of this chain.
         * @type {Effect}
         */
        this.firstEffect = this._effects[0];

        /**
         * Last effect of this chain.
         * @type {Effect}
         */
        this.lastEffect = this._effects[this._effects.length - 1];

        /**
         * A set of players this chain is managing.
         */
        this._soundPlayers = new Set();
    }

    /**
     * Create a clone of the EffectChain.
     * @returns {EffectChain} a clone of this EffectChain
     */


    _createClass(EffectChain, [{
        key: 'clone',
        value: function clone() {
            var chain = new EffectChain(this.audioEngine, this.effects);
            if (this.target) {
                chain.connect(this.target);
            }
            return chain;
        }

        /**
         * Add a sound player.
         * @param {SoundPlayer} soundPlayer - a sound player to manage
         */

    }, {
        key: 'addSoundPlayer',
        value: function addSoundPlayer(soundPlayer) {
            if (!this._soundPlayers.has(soundPlayer)) {
                this._soundPlayers.add(soundPlayer);
                this.update();
            }
        }

        /**
         * Remove a sound player.
         * @param {SoundPlayer} soundPlayer - a sound player to stop managing
         */

    }, {
        key: 'removeSoundPlayer',
        value: function removeSoundPlayer(soundPlayer) {
            this._soundPlayers.remove(soundPlayer);
        }

        /**
         * Get the audio input node.
         * @returns {AudioNode} audio node the upstream can connect to
         */

    }, {
        key: 'getInputNode',
        value: function getInputNode() {
            return this.inputNode;
        }

        /**
         * Connnect this player's output to another audio node.
         * @param {object} target - target whose node to should be connected
         */

    }, {
        key: 'connect',
        value: function connect(target) {
            var firstEffect = this.firstEffect,
                lastEffect = this.lastEffect;


            if (target === lastEffect) {
                this.inputNode.disconnect();
                this.inputNode.connect(lastEffect.getInputNode());

                return;
            } else if (target === firstEffect) {
                return;
            }

            this.target = target;

            firstEffect.connect(target);
        }

        /**
         * Array of SoundPlayers managed by this EffectChain.
         * @returns {Array<SoundPlayer>} sound players managed by this chain
         */

    }, {
        key: 'getSoundPlayers',
        value: function getSoundPlayers() {
            return [].concat(_toConsumableArray(this._soundPlayers));
        }

        /**
         * Set Effect values with named values on target.soundEffects if it exist
         * and then from target itself.
         * @param {Target} target - target to set values from
         */

    }, {
        key: 'setEffectsFromTarget',
        value: function setEffectsFromTarget(target) {
            this._effects.forEach(function (effect) {
                if ('soundEffects' in target && effect.name in target.soundEffects) {
                    effect.set(target.soundEffects[effect.name]);
                } else if (effect.name in target) {
                    effect.set(target[effect.name]);
                }
            });
        }

        /**
         * Set an effect value by its name.
         * @param {string} effect - effect name to change
         * @param {number} value - value to set effect to
         */

    }, {
        key: 'set',
        value: function set(effect, value) {
            if (effect in this) {
                this[effect].set(value);
            }
        }

        /**
         * Update managed sound players with the effects on this chain.
         */

    }, {
        key: 'update',
        value: function update() {
            this._effects.forEach(function (effect) {
                return effect.update();
            });
        }

        /**
         * Clear all effects to their default values.
         */

    }, {
        key: 'clear',
        value: function clear() {
            this._effects.forEach(function (effect) {
                return effect.clear();
            });
        }

        /**
         * Dispose of all effects in this chain. Nothing is done to managed
         * SoundPlayers.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            this._soundPlayers = null;
            this._effects.forEach(function (effect) {
                return effect.dispose();
            });
            this._effects = null;
        }
    }]);

    return EffectChain;
}();

module.exports = EffectChain;

/***/ }),

/***/ "./src/effects/PanEffect.js":
/*!**********************************!*\
  !*** ./src/effects/PanEffect.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Effect = __webpack_require__(/*! ./Effect */ "./src/effects/Effect.js");

/**
 * A pan effect, which moves the sound to the left or right between the speakers
 * Effect value of -100 puts the audio entirely on the left channel,
 * 0 centers it, 100 puts it on the right.
 */

var PanEffect = function (_Effect) {
    _inherits(PanEffect, _Effect);

    /**
     * @param {AudioEngine} audioEngine - audio engine this runs with
     * @param {AudioPlayer} audioPlayer - audio player this affects
     * @param {Effect} lastEffect - effect in the chain before this one
     * @constructor
     */
    function PanEffect(audioEngine, audioPlayer, lastEffect) {
        _classCallCheck(this, PanEffect);

        var _this = _possibleConstructorReturn(this, (PanEffect.__proto__ || Object.getPrototypeOf(PanEffect)).call(this, audioEngine, audioPlayer, lastEffect));

        _this.leftGain = null;
        _this.rightGain = null;
        _this.channelMerger = null;
        return _this;
    }

    /**
     * Return the name of the effect.
     * @type {string}
     */


    _createClass(PanEffect, [{
        key: 'initialize',


        /**
         * Initialize the Effect.
         * Effects start out uninitialized. Then initialize when they are first set
         * with some value.
         * @throws {Error} throws when left unimplemented
         */
        value: function initialize() {
            var audioContext = this.audioEngine.audioContext;

            this.inputNode = audioContext.createGain();
            this.leftGain = audioContext.createGain();
            this.rightGain = audioContext.createGain();
            this.channelMerger = audioContext.createChannelMerger(2);
            this.outputNode = this.channelMerger;

            this.inputNode.connect(this.leftGain);
            this.inputNode.connect(this.rightGain);
            this.leftGain.connect(this.channelMerger, 0, 0);
            this.rightGain.connect(this.channelMerger, 0, 1);

            this.initialized = true;
        }

        /**
         * Set the effect value
         * @param {number} value - the new value to set the effect to
         */

    }, {
        key: '_set',
        value: function _set(value) {
            this.value = value;

            // Map the scratch effect value (-100 to 100) to (0 to 1)
            var p = (value + 100) / 200;

            // Use trig functions for equal-loudness panning
            // See e.g. https://docs.cycling74.com/max7/tutorials/13_panningchapter01
            var leftVal = Math.cos(p * Math.PI / 2);
            var rightVal = Math.sin(p * Math.PI / 2);

            var _audioEngine = this.audioEngine,
                currentTime = _audioEngine.currentTime,
                DECAY_WAIT = _audioEngine.DECAY_WAIT,
                DECAY_DURATION = _audioEngine.DECAY_DURATION;

            this.leftGain.gain.setTargetAtTime(leftVal, currentTime + DECAY_WAIT, DECAY_DURATION);
            this.rightGain.gain.setTargetAtTime(rightVal, currentTime + DECAY_WAIT, DECAY_DURATION);
        }

        /**
         * Clean up and disconnect audio nodes.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            if (!this.initialized) {
                return;
            }

            this.inputNode.disconnect();
            this.leftGain.disconnect();
            this.rightGain.disconnect();
            this.channelMerger.disconnect();

            this.inputNode = null;
            this.leftGain = null;
            this.rightGain = null;
            this.channelMerger = null;
            this.outputNode = null;
            this.target = null;

            this.initialized = false;
        }
    }, {
        key: 'name',
        get: function get() {
            return 'pan';
        }
    }]);

    return PanEffect;
}(Effect);

module.exports = PanEffect;

/***/ }),

/***/ "./src/effects/PitchEffect.js":
/*!************************************!*\
  !*** ./src/effects/PitchEffect.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Effect = __webpack_require__(/*! ./Effect */ "./src/effects/Effect.js");

/**
 * A pitch change effect, which changes the playback rate of the sound in order
 * to change its pitch: reducing the playback rate lowers the pitch, increasing
 * the rate raises the pitch. The duration of the sound is also changed.
 *
 * Changing the value of the pitch effect by 10 causes a change in pitch by 1
 * semitone (i.e. a musical half-step, such as the difference between C and C#)
 * Changing the pitch effect by 120 changes the pitch by one octave (12
 * semitones)
 *
 * The value of this effect is not clamped (i.e. it is typically between -120
 * and 120, but can be set much higher or much lower, with weird and fun
 * results). We should consider what extreme values to use for clamping it.
 *
 * Note that this effect functions differently from the other audio effects. It
 * is not part of a chain of audio nodes. Instead, it provides a way to set the
 * playback on one SoundPlayer or a group of them.
 */

var PitchEffect = function (_Effect) {
    _inherits(PitchEffect, _Effect);

    /**
     * @param {AudioEngine} audioEngine - audio engine this runs with
     * @param {AudioPlayer} audioPlayer - audio player this affects
     * @param {Effect} lastEffect - effect in the chain before this one
     * @constructor
     */
    function PitchEffect(audioEngine, audioPlayer, lastEffect) {
        _classCallCheck(this, PitchEffect);

        /**
         * The playback rate ratio
         * @type {Number}
         */
        var _this = _possibleConstructorReturn(this, (PitchEffect.__proto__ || Object.getPrototypeOf(PitchEffect)).call(this, audioEngine, audioPlayer, lastEffect));

        _this.ratio = 1;
        return _this;
    }

    /**
     * Return the name of the effect.
     * @type {string}
     */


    _createClass(PitchEffect, [{
        key: 'getInputNode',


        /**
         * Get the input node.
         * @return {AudioNode} - audio node that is the input for this effect
         */
        value: function getInputNode() {
            return this.target.getInputNode();
        }

        /**
         * Initialize the Effect.
         * Effects start out uninitialized. Then initialize when they are first set
         * with some value.
         * @throws {Error} throws when left unimplemented
         */

    }, {
        key: 'initialize',
        value: function initialize() {
            this.initialized = true;
        }

        /**
         * Set the effect value.
         * @param {number} value - the new value to set the effect to
         */

    }, {
        key: '_set',
        value: function _set(value) {
            this.value = value;
            this.ratio = this.getRatio(this.value);
            this.updatePlayers(this.audioPlayer.getSoundPlayers());
        }

        /**
         * Update the effect for changes in the audioPlayer.
         */

    }, {
        key: 'update',
        value: function update() {
            this.updatePlayers(this.audioPlayer.getSoundPlayers());
        }

        /**
         * Compute the playback ratio for an effect value.
         * The playback ratio is scaled so that a change of 10 in the effect value
         * gives a change of 1 semitone in the ratio.
         * @param {number} val - an effect value
         * @returns {number} a playback ratio
         */

    }, {
        key: 'getRatio',
        value: function getRatio(val) {
            var interval = val / 10;
            // Convert the musical interval in semitones to a frequency ratio
            return Math.pow(2, interval / 12);
        }

        /**
         * Update a sound player's playback rate using the current ratio for the
         * effect
         * @param {object} player - a SoundPlayer object
         */

    }, {
        key: 'updatePlayer',
        value: function updatePlayer(player) {
            player.setPlaybackRate(this.ratio);
        }

        /**
         * Update a sound player's playback rate using the current ratio for the
         * effect
         * @param {object} players - a dictionary of SoundPlayer objects to update,
         *     indexed by md5
         */

    }, {
        key: 'updatePlayers',
        value: function updatePlayers(players) {
            if (!players) return;

            for (var id in players) {
                if (players.hasOwnProperty(id)) {
                    this.updatePlayer(players[id]);
                }
            }
        }
    }, {
        key: 'name',
        get: function get() {
            return 'pitch';
        }

        /**
         * Should the effect be connected to the audio graph?
         * @return {boolean} is the effect affecting the graph?
         */

    }, {
        key: '_isPatch',
        get: function get() {
            return false;
        }
    }]);

    return PitchEffect;
}(Effect);

module.exports = PitchEffect;

/***/ }),

/***/ "./src/effects/VolumeEffect.js":
/*!*************************************!*\
  !*** ./src/effects/VolumeEffect.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Effect = __webpack_require__(/*! ./Effect */ "./src/effects/Effect.js");

/**
 * Affect the volume of an effect chain.
 */

var VolumeEffect = function (_Effect) {
    _inherits(VolumeEffect, _Effect);

    function VolumeEffect() {
        _classCallCheck(this, VolumeEffect);

        return _possibleConstructorReturn(this, (VolumeEffect.__proto__ || Object.getPrototypeOf(VolumeEffect)).apply(this, arguments));
    }

    _createClass(VolumeEffect, [{
        key: 'initialize',


        /**
         * Initialize the Effect.
         * Effects start out uninitialized. Then initialize when they are first set
         * with some value.
         * @throws {Error} throws when left unimplemented
         */
        value: function initialize() {
            this.inputNode = this.audioEngine.audioContext.createGain();
            this.outputNode = this.inputNode;

            this.initialized = true;
        }

        /**
         * Set the effects value.
         * @private
         * @param {number} value - new value to set effect to
         */

    }, {
        key: '_set',
        value: function _set(value) {
            this.value = value;

            var gain = this.outputNode.gain;
            var _audioEngine = this.audioEngine,
                currentTime = _audioEngine.currentTime,
                DECAY_WAIT = _audioEngine.DECAY_WAIT,
                DECAY_DURATION = _audioEngine.DECAY_DURATION;

            gain.setValueAtTime(gain.value, currentTime + DECAY_WAIT);
            gain.linearRampToValueAtTime(value / 100, currentTime + DECAY_WAIT + DECAY_DURATION);
        }

        /**
         * Clean up and disconnect audio nodes.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            if (!this.initialized) {
                return;
            }

            this.outputNode.disconnect();

            this.inputNode = null;
            this.outputNode = null;
            this.target = null;

            this.initialized = false;
        }
    }, {
        key: 'DEFAULT_VALUE',

        /**
         * Default value to set the Effect to when constructed and when clear'ed.
         * @const {number}
         */
        get: function get() {
            return 100;
        }

        /**
         * Return the name of the effect.
         * @type {string}
         */

    }, {
        key: 'name',
        get: function get() {
            return 'volume';
        }
    }]);

    return VolumeEffect;
}(Effect);

module.exports = VolumeEffect;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileOverview Scratch Audio is divided into a single AudioEngine, that
 * handles global functionality, and AudioPlayers, belonging to individual
 * sprites and clones.
 */

var AudioEngine = __webpack_require__(/*! ./AudioEngine */ "./src/AudioEngine.js");

module.exports = AudioEngine;

/***/ }),

/***/ "./src/log.js":
/*!********************!*\
  !*** ./src/log.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var minilog = __webpack_require__(/*! minilog */ "minilog");
minilog.enable();

module.exports = minilog('scratch-audioengine');

/***/ }),

/***/ "./src/uid.js":
/*!********************!*\
  !*** ./src/uid.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileoverview UID generator, from Blockly.
 */

/**
 * Legal characters for the unique ID.
 * Should be all on a US keyboard.  No XML special characters or control codes.
 * Removed $ due to issue 251.
 * @private
 */
var soup_ = '!#%()*+,-./:;=?@[]^_`{|}~' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generate a unique ID, from Blockly.  This should be globally unique.
 * 87 characters ^ 20 length > 128 bits (better than a UUID).
 * @return {string} A globally unique ID string.
 */
var uid = function uid() {
  var length = 20;
  var soupLength = soup_.length;
  var id = [];
  for (var i = 0; i < length; i++) {
    id[i] = soup_.charAt(Math.random() * soupLength);
  }
  return id.join('');
};

module.exports = uid;

/***/ }),

/***/ "audio-context":
/*!********************************!*\
  !*** external "audio-context" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("audio-context");

/***/ }),

/***/ "minilog":
/*!**************************!*\
  !*** external "minilog" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("minilog");

/***/ }),

/***/ "startaudiocontext":
/*!************************************!*\
  !*** external "startaudiocontext" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("startaudiocontext");

/***/ })

/******/ });
//# sourceMappingURL=dist.js.map