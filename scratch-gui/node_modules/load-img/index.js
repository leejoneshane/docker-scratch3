module.exports = loadImage;
function loadImage (src, opt, callback) {
  if (typeof opt === 'function') {
    callback = opt;
    opt = null;
  }

  var el = document.createElement('img');
  var locked;

  el.onload = function onLoaded () {
    if (locked) return;
    locked = true;

    if (callback) callback(undefined, el);
  };

  el.onerror = function onError () {
    if (locked) return;
    locked = true;

    if (callback) callback(new Error('Unable to load "' + src + '"'), el);
  };

  if (opt && opt.crossOrigin) {
    el.crossOrigin = opt.crossOrigin;
  }

  el.src = src;

  return el;
}
