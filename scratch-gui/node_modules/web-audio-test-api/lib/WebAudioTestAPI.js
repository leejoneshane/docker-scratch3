"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _WebAudioAPI = require("./WebAudioAPI");

var _WebAudioAPI2 = _interopRequireDefault(_WebAudioAPI);

var _Element = require("./dom/Element");

var _Element2 = _interopRequireDefault(_Element);

var _Event = require("./dom/Event");

var _Event2 = _interopRequireDefault(_Event);

var _EventTarget = require("./dom/EventTarget");

var _EventTarget2 = _interopRequireDefault(_EventTarget);

var _HTMLElement = require("./dom/HTMLElement");

var _HTMLElement2 = _interopRequireDefault(_HTMLElement);

var _HTMLMediaElement = require("./dom/HTMLMediaElement");

var _HTMLMediaElement2 = _interopRequireDefault(_HTMLMediaElement);

var _MediaStream = require("./dom/MediaStream");

var _MediaStream2 = _interopRequireDefault(_MediaStream);

var _AnalyserNode = require("./AnalyserNode");

var _AnalyserNode2 = _interopRequireDefault(_AnalyserNode);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AudioBufferSourceNode = require("./AudioBufferSourceNode");

var _AudioBufferSourceNode2 = _interopRequireDefault(_AudioBufferSourceNode);

var _AudioContext = require("./AudioContext");

var _AudioContext2 = _interopRequireDefault(_AudioContext);

var _AudioDestinationNode = require("./AudioDestinationNode");

var _AudioDestinationNode2 = _interopRequireDefault(_AudioDestinationNode);

var _AudioListener = require("./AudioListener");

var _AudioListener2 = _interopRequireDefault(_AudioListener);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var _AudioProcessingEvent = require("./AudioProcessingEvent");

var _AudioProcessingEvent2 = _interopRequireDefault(_AudioProcessingEvent);

var _BiquadFilterNode = require("./BiquadFilterNode");

var _BiquadFilterNode2 = _interopRequireDefault(_BiquadFilterNode);

var _ChannelMergerNode = require("./ChannelMergerNode");

var _ChannelMergerNode2 = _interopRequireDefault(_ChannelMergerNode);

var _ChannelSplitterNode = require("./ChannelSplitterNode");

var _ChannelSplitterNode2 = _interopRequireDefault(_ChannelSplitterNode);

var _ConvolverNode = require("./ConvolverNode");

var _ConvolverNode2 = _interopRequireDefault(_ConvolverNode);

var _DelayNode = require("./DelayNode");

var _DelayNode2 = _interopRequireDefault(_DelayNode);

var _DynamicsCompressorNode = require("./DynamicsCompressorNode");

var _DynamicsCompressorNode2 = _interopRequireDefault(_DynamicsCompressorNode);

var _GainNode = require("./GainNode");

var _GainNode2 = _interopRequireDefault(_GainNode);

var _MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");

var _MediaElementAudioSourceNode2 = _interopRequireDefault(_MediaElementAudioSourceNode);

var _MediaStreamAudioDestinationNode = require("./MediaStreamAudioDestinationNode");

var _MediaStreamAudioDestinationNode2 = _interopRequireDefault(_MediaStreamAudioDestinationNode);

var _MediaStreamAudioSourceNode = require("./MediaStreamAudioSourceNode");

var _MediaStreamAudioSourceNode2 = _interopRequireDefault(_MediaStreamAudioSourceNode);

var _OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

var _OfflineAudioCompletionEvent2 = _interopRequireDefault(_OfflineAudioCompletionEvent);

var _OfflineAudioContext = require("./OfflineAudioContext");

var _OfflineAudioContext2 = _interopRequireDefault(_OfflineAudioContext);

var _OscillatorNode = require("./OscillatorNode");

var _OscillatorNode2 = _interopRequireDefault(_OscillatorNode);

var _PannerNode = require("./PannerNode");

var _PannerNode2 = _interopRequireDefault(_PannerNode);

var _PeriodicWave = require("./PeriodicWave");

var _PeriodicWave2 = _interopRequireDefault(_PeriodicWave);

var _ScriptProcessorNode = require("./ScriptProcessorNode");

var _ScriptProcessorNode2 = _interopRequireDefault(_ScriptProcessorNode);

var _StereoPannerNode = require("./StereoPannerNode");

var _StereoPannerNode2 = _interopRequireDefault(_StereoPannerNode);

var _WaveShaperNode = require("./WaveShaperNode");

var _WaveShaperNode2 = _interopRequireDefault(_WaveShaperNode);

var _getAPIVersion = require("./utils/getAPIVersion");

var _getAPIVersion2 = _interopRequireDefault(_getAPIVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleRate = 44100;
var configuration = _Configuration2.default.getInstance();

var WebAudioTestAPI = {
  VERSION: (0, _getAPIVersion2.default)(),
  utils: { Configuration: _Configuration2.default, Immigration: _Immigration2.default },
  sampleRate: sampleRate,
  AnalyserNode: _AnalyserNode2.default,
  AudioBuffer: _AudioBuffer2.default,
  AudioBufferSourceNode: _AudioBufferSourceNode2.default,
  AudioContext: _AudioContext2.default,
  AudioDestinationNode: _AudioDestinationNode2.default,
  AudioListener: _AudioListener2.default,
  AudioNode: _AudioNode2.default,
  AudioParam: _AudioParam2.default,
  AudioProcessingEvent: _AudioProcessingEvent2.default,
  BiquadFilterNode: _BiquadFilterNode2.default,
  ChannelMergerNode: _ChannelMergerNode2.default,
  ChannelSplitterNode: _ChannelSplitterNode2.default,
  ConvolverNode: _ConvolverNode2.default,
  DelayNode: _DelayNode2.default,
  DynamicsCompressorNode: _DynamicsCompressorNode2.default,
  Element: _Element2.default,
  Event: _Event2.default,
  EventTarget: _EventTarget2.default,
  GainNode: _GainNode2.default,
  HTMLElement: _HTMLElement2.default,
  HTMLMediaElement: _HTMLMediaElement2.default,
  MediaElementAudioSourceNode: _MediaElementAudioSourceNode2.default,
  MediaStream: _MediaStream2.default,
  MediaStreamAudioDestinationNode: _MediaStreamAudioDestinationNode2.default,
  MediaStreamAudioSourceNode: _MediaStreamAudioSourceNode2.default,
  OfflineAudioCompletionEvent: _OfflineAudioCompletionEvent2.default,
  OfflineAudioContext: _OfflineAudioContext2.default,
  OscillatorNode: _OscillatorNode2.default,
  PannerNode: _PannerNode2.default,
  PeriodicWave: _PeriodicWave2.default,
  ScriptProcessorNode: _ScriptProcessorNode2.default,
  StereoPannerNode: _StereoPannerNode2.default,
  WaveShaperNode: _WaveShaperNode2.default,
  getState: function getState(name) {
    return configuration.getState(name);
  },
  setState: function setState(name, value) {
    configuration.setState(name, value);
  },
  use: function use() {
    global.AnalyserNode = WebAudioTestAPI.AnalyserNode;
    global.AudioBuffer = WebAudioTestAPI.AudioBuffer;
    global.AudioBufferSourceNode = WebAudioTestAPI.AudioBufferSourceNode;
    global.AudioContext = WebAudioTestAPI.AudioContext;
    global.AudioDestinationNode = WebAudioTestAPI.AudioDestinationNode;
    global.AudioListener = WebAudioTestAPI.AudioListener;
    global.AudioNode = WebAudioTestAPI.AudioNode;
    global.AudioParam = WebAudioTestAPI.AudioParam;
    global.AudioProcessingEvent = WebAudioTestAPI.AudioProcessingEvent;
    global.BiquadFilterNode = WebAudioTestAPI.BiquadFilterNode;
    global.ChannelMergerNode = WebAudioTestAPI.ChannelMergerNode;
    global.ChannelSplitterNode = WebAudioTestAPI.ChannelSplitterNode;
    global.ConvolverNode = WebAudioTestAPI.ConvolverNode;
    global.DelayNode = WebAudioTestAPI.DelayNode;
    global.DynamicsCompressorNode = WebAudioTestAPI.DynamicsCompressorNode;
    global.GainNode = WebAudioTestAPI.GainNode;
    global.MediaElementAudioSourceNode = WebAudioTestAPI.MediaElementAudioSourceNode;
    global.MediaStreamAudioDestinationNode = WebAudioTestAPI.MediaStreamAudioDestinationNode;
    global.MediaStreamAudioSourceNode = WebAudioTestAPI.MediaStreamAudioSourceNode;
    global.OfflineAudioCompletionEvent = WebAudioTestAPI.OfflineAudioCompletionEvent;
    global.OfflineAudioContext = WebAudioTestAPI.OfflineAudioContext;
    global.OscillatorNode = WebAudioTestAPI.OscillatorNode;
    global.PannerNode = WebAudioTestAPI.PannerNode;
    global.PeriodicWave = WebAudioTestAPI.PeriodicWave;
    global.ScriptProcessorNode = WebAudioTestAPI.ScriptProcessorNode;
    global.StereoPannerNode = WebAudioTestAPI.StereoPannerNode;
    global.WaveShaperNode = WebAudioTestAPI.WaveShaperNode;
    global.WebAudioTestAPI = WebAudioTestAPI;
  },
  unuse: function unuse() {
    global.AnalyserNode = _WebAudioAPI2.default.AnalyserNode;
    global.AudioBuffer = _WebAudioAPI2.default.AudioBuffer;
    global.AudioBufferSourceNode = _WebAudioAPI2.default.AudioBufferSourceNode;
    global.AudioContext = _WebAudioAPI2.default.AudioContext;
    global.AudioDestinationNode = _WebAudioAPI2.default.AudioDestinationNode;
    global.AudioListener = _WebAudioAPI2.default.AudioListener;
    global.AudioNode = _WebAudioAPI2.default.AudioNode;
    global.AudioParam = _WebAudioAPI2.default.AudioParam;
    global.AudioProcessingEvent = _WebAudioAPI2.default.AudioProcessingEvent;
    global.BiquadFilterNode = _WebAudioAPI2.default.BiquadFilterNode;
    global.ChannelMergerNode = _WebAudioAPI2.default.ChannelMergerNode;
    global.ChannelSplitterNode = _WebAudioAPI2.default.ChannelSplitterNode;
    global.ConvolverNode = _WebAudioAPI2.default.ConvolverNode;
    global.DelayNode = _WebAudioAPI2.default.DelayNode;
    global.DynamicsCompressorNode = _WebAudioAPI2.default.DynamicsCompressorNode;
    global.GainNode = _WebAudioAPI2.default.GainNode;
    global.MediaElementAudioSourceNode = _WebAudioAPI2.default.MediaElementAudioSourceNode;
    global.MediaStreamAudioDestinationNode = _WebAudioAPI2.default.MediaStreamAudioDestinationNode;
    global.MediaStreamAudioSourceNode = _WebAudioAPI2.default.MediaStreamAudioSourceNode;
    global.OfflineAudioCompletionEvent = _WebAudioAPI2.default.OfflineAudioCompletionEvent;
    global.OfflineAudioContext = _WebAudioAPI2.default.OfflineAudioContext;
    global.OscillatorNode = _WebAudioAPI2.default.OscillatorNode;
    global.PannerNode = _WebAudioAPI2.default.PannerNode;
    global.PeriodicWave = _WebAudioAPI2.default.PeriodicWave;
    global.ScriptProcessorNode = _WebAudioAPI2.default.ScriptProcessorNode;
    global.StereoPannerNode = _WebAudioAPI2.default.StereoPannerNode;
    global.WaveShaperNode = _WebAudioAPI2.default.WaveShaperNode;
  }
};

exports.default = WebAudioTestAPI;