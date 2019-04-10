# load-img

[![frozen](http://badges.github.io/stability-badges/dist/frozen.svg)](http://github.com/badges/stability-badges)

Creates a new `<img>` element for the browser and provides an error-first callback for load completion.

This module has been adapted from Azer's unpublished [img](https://www.npmjs.com/package/img) module, which was updated with dubious code by another author.

## Install

```sh
npm install load-img --save
```

## Example

```js
const loadImage = require('load-img');

loadImage('images/foo.png', (err, img) => {
  if (err) throw err;
  console.log(img.width, img.height);
});
```

## Usage

[![NPM](https://nodei.co/npm/load-img.png)](https://www.npmjs.com/package/load-img)

#### `img = loadImage(src, [opt], [cb])`

Creates a new `<img>` element with the given `src` property. The other parameters are optional.

You can pass `opt`, an object containing `{ crossOrigin }` string. `cb` is a function receiving the `onload` or `onerror` event.

This function returns the created `img` element.

Example with `crossOrigin`:

```js
const loadImage = require('load-img');

loadImage('images/foo.png', {
  crossOrigin: 'Anonymous'
}, (err, img) => {
  if (err) throw err;
  document.body.appendChild(img);
});
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/load-img/blob/master/LICENSE.md) for details.
