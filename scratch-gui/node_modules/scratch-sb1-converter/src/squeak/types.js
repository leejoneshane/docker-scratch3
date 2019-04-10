import {CRC32} from '../coders/crc32';
import {SqueakImage} from '../coders/squeak-image';
import {SqueakSound} from '../coders/squeak-sound';
import {WAVFile} from '../coders/wav-file';

import {FieldObject} from './field-object';
import {value as valueOf} from './fields';
import {TYPES} from './ids';

import md5 from 'js-md5';

/**
 * @extends FieldObject
 */
class PointData extends FieldObject.define({
    /**
     * @memberof PointData#
     * @type {Value}
     */
    X: 0,

    /**
     * @memberof PointData#
     * @type {Value}
     */
    Y: 1
}) {}

export {PointData};

class RectangleData extends FieldObject.define({
    X: 0,
    Y: 1,
    X2: 2,
    Y2: 3
}) {
    get width () {
        return this.x2 - this.x;
    }

    get height () {
        return this.y2 - this.y;
    }
}

export {RectangleData};

const _bgra2rgbaInPlace = uint8a => {
    for (let i = 0; i < uint8a.length; i += 4) {
        const r = uint8a[i + 2];
        const b = uint8a[i + 0];
        uint8a[i + 2] = b;
        uint8a[i + 0] = r;
    }
    return uint8a;
};

/**
 * @extends FieldObject
 */
class ImageData extends FieldObject.define({
    /**
     * @memberof ImageData#
     * @type {Value}
     */
    WIDTH: 0,

    /**
     * @memberof ImageData#
     * @type {Value}
     */
    HEIGHT: 1,

    /**
     * @memberof ImageData#
     * @type {Value}
     */
    DEPTH: 2,

    /**
     * @memberof ImageData#
     * @type {Value}
     */
    BYTES: 4,

    /**
     * @memberof ImageData#
     * @type {Value}
     */
    COLORMAP: 5
}) {
    /**
     * @type {Uint8Array}
     */
    get decoded () {
        if (!this._decoded) {
            this._decoded = _bgra2rgbaInPlace(new Uint8Array(
                new SqueakImage().decode(
                    this.width.value,
                    this.height.value,
                    this.depth.value,
                    this.bytes.value,
                    this.colormap && this.colormap.map(color => color.valueOf())
                ).buffer
            ));
        }
        return this._decoded;
    }

    /**
     * @type {string}
     */
    get extension () {
        return 'uncompressed';
    }
}

export {ImageData};

class StageData extends FieldObject.define({
    STAGE_CONTENTS: 2,
    OBJ_NAME: 6,
    VARS: 7,
    BLOCKS_BIN: 8,
    IS_CLONE: 9,
    MEDIA: 10,
    CURRENT_COSTUME: 11,
    ZOOM: 12,
    H_PAN: 13,
    V_PAN: 14,
    OBSOLETE_SAVED_STATE: 15,
    SPRITE_ORDER_IN_LIBRARY: 16,
    VOLUME: 17,
    TEMPO_BPM: 18,
    SCENE_STATES: 19,
    LISTS: 20
}) {
    get spriteOrderInLibrary () {
        return this.fields[this.FIELDS.SPRITE_ORDER_IN_LIBRARY] || null;
    }

    get tempoBPM () {
        return this.fields[this.FIELDS.TEMPO_BPM] || 0;
    }

    get lists () {
        return this.fields[this.FIELDS.LISTS] || [];
    }
}

export {StageData};

class SpriteData extends FieldObject.define({
    BOX: 0,
    PARENT: 1,
    COLOR: 3,
    VISIBLE: 4,
    OBJ_NAME: 6,
    VARS: 7,
    BLOCKS_BIN: 8,
    IS_CLONE: 9,
    MEDIA: 10,
    CURRENT_COSTUME: 11,
    VISIBILITY: 12,
    SCALE_POINT: 13,
    ROTATION_DEGREES: 14,
    ROTATION_STYLE: 15,
    VOLUME: 16,
    TEMPO_BPM: 17,
    DRAGGABLE: 18,
    SCENE_STATES: 19,
    LISTS: 20
}) {
    get scratchX () {
        return this.box.x + this.currentCostume.rotationCenter.x - 240;
    }

    get scratchY () {
        return 180 - (this.box.y + this.currentCostume.rotationCenter.y);
    }

    get visible () {
        return (this.fields[this.FIELDS.VISIBLE] & 1) === 0;
    }

    get tempoBPM () {
        return this.fields[this.FIELDS.TEMPO_BPM] || 0;
    }

    get lists () {
        return this.fields[this.FIELDS.LISTS] || [];
    }
}

export {SpriteData};

class TextDetailsData extends FieldObject.define({
    RECTANGLE: 0,
    FONT: 8,
    COLOR: 9,
    LINES: 11
}) {}

export {TextDetailsData};

class ImageMediaData extends FieldObject.define({
    COSTUME_NAME: 0,
    BITMAP: 1,
    ROTATION_CENTER: 2,
    TEXT_DETAILS: 3,
    BASE_LAYER_DATA: 4,
    OLD_COMPOSITE: 5
}) {
    get image () {
        if (this.oldComposite instanceof ImageData) {
            return this.oldComposite;
        }
        if (this.baseLayerData.value) {
            return null;
        }
        return this.bitmap;
    }

    get width () {
        if (this.image === null) {
            return -1;
        }
        return this.image.width;
    }

    get height () {
        if (this.image === null) {
            return -1;
        }
        return this.image.height;
    }

    get rawBytes () {
        if (this.image === null) {
            return this.baseLayerData.value.slice();
        }
        return this.image.bytes.value;
    }

    get decoded () {
        if (this.image === null) {
            return this.baseLayerData.value.slice();
        }
        return this.image.decoded;
    }

    get crc () {
        if (!this._crc) {
            const crc = new CRC32()
                .update(new Uint8Array(new Uint32Array([this.bitmap.width]).buffer))
                .update(new Uint8Array(new Uint32Array([this.bitmap.height]).buffer))
                .update(new Uint8Array(new Uint32Array([this.bitmap.depth]).buffer))
                .update(this.rawBytes);
            this._crc = crc.digest;
        }
        return this._crc;
    }

    get extension () {
        if (this.oldComposite instanceof ImageData) return 'uncompressed';
        if (this.baseLayerData.value) return 'jpg';
        return 'uncompressed';
    }

    toString () {
        return `ImageMediaData "${this.costumeName}"`;
    }
}

export {ImageMediaData};

class UncompressedData extends FieldObject.define({
    DATA: 3,
    RATE: 4
}) {}

export {UncompressedData};

const reverseBytes16 = input => {
    const uint8a = new Uint8Array(input);
    for (let i = 0; i < uint8a.length; i += 2) {
        uint8a[i] = input[i + 1];
        uint8a[i + 1] = input[i];
    }
    return uint8a;
};

class SoundMediaData extends FieldObject.define({
    NAME: 0,
    UNCOMPRESSED: 1,
    RATE: 4,
    BITS_PER_SAMPLE: 5,
    DATA: 6
}) {
    get rate () {
        if (this.uncompressed.data.value.length !== 0) {
            return this.uncompressed.rate;
        }
        return this.fields[this.FIELDS.RATE];
    }

    get rawBytes () {
        if (this.data && this.data.value) {
            return this.data.value;
        }
        return this.uncompressed.data.value;
    }

    get decoded () {
        if (!this._decoded) {
            if (this.data && this.data.value) {
                this._decoded = new SqueakSound(this.bitsPerSample.value).decode(
                    this.data.value
                );
            } else {
                this._decoded = new Int16Array(reverseBytes16(this.uncompressed.data.value.slice()).buffer);
            }
        }
        return this._decoded;
    }

    get crc () {
        if (!this._crc) {
            this._crc = new CRC32()
                .update(new Uint32Array([this.rate]))
                .update(this.rawBytes)
                .digest;
        }
        return this._crc;
    }

    get sampleCount () {
        if (this.data && this.data.value) {
            return SqueakSound.samples(this.bitsPerSample.value, this.data.value);
        }
        return this.uncompressed.data.value.length / 2;
    }

    get extension () {
        return 'pcm';
    }

    get wavEncodedData () {
        if (!this._wavEncodedData) {
            this._wavEncodedData = new Uint8Array(WAVFile.encode(this.decoded, {
                sampleRate: this.rate && this.rate.value
            }));
        }
        return this._wavEncodedData;
    }

    get md5 () {
        if (!this._md5) {
            this._md5 = md5(this.wavEncodedData);
        }
        return this._md5;
    }

    toString () {
        return `SoundMediaData "${this.name}"`;
    }
}

export {SoundMediaData};

class ListWatcherData extends FieldObject.define({
    BOX: 0,
    HIDDEN_WHEN_NULL: 1,
    LIST_NAME: 8,
    CONTENTS: 9,
    TARGET: 10
}) {
    get x () {
        if (valueOf(this.hiddenWhenNull) === null) return 5;
        return this.box.x + 1;
    }

    get y () {
        if (valueOf(this.hiddenWhenNull) === null) return 5;
        return this.box.y + 1;
    }

    get width () {
        return this.box.width - 2;
    }

    get height () {
        return this.box.height - 2;
    }
}

export {ListWatcherData};

class AlignmentData extends FieldObject.define({
    BOX: 0,
    PARENT: 1,
    FRAMES: 2,
    COLOR: 3,
    DIRECTION: 8,
    ALIGNMENT: 9
}) {}

export {AlignmentData};

class MorphData extends FieldObject.define({
    BOX: 0,
    PARENT: 1,
    COLOR: 3
}) {}

export {MorphData};

class StaticStringData extends FieldObject.define({
    BOX: 0,
    COLOR: 3,
    VALUE: 8
}) {}

export {StaticStringData};

class UpdatingStringData extends FieldObject.define({
    BOX: 0,
    READOUT_FRAME: 1,
    COLOR: 3,
    FONT: 6,
    VALUE: 8,
    TARGET: 10,
    CMD: 11,
    PARAM: 13
}) {}

export {UpdatingStringData};

class WatcherReadoutFrameData extends FieldObject.define({
    BOX: 0
}) {}

export {WatcherReadoutFrameData};

const WATCHER_MODES = {
    NORMAL: 1,
    LARGE: 2,
    SLIDER: 3,
    TEXT: 4
};

export {WATCHER_MODES};

class WatcherData extends FieldObject.define({
    BOX: 0,
    TARGET: 1,
    SHAPE: 2,
    READOUT: 14,
    READOUT_FRAME: 15,
    SLIDER: 16,
    ALIGNMENT: 17,
    SLIDER_MIN: 20,
    SLIDER_MAX: 21
}) {
    get x () {
        return this.box.x;
    }

    get y () {
        return this.box.y;
    }

    get mode () {
        if (valueOf(this.slider) === null) {
            if (this.readoutFrame.box.height <= 14) {
                return WATCHER_MODES.NORMAL;
            }
            return WATCHER_MODES.LARGE;
        }
        return WATCHER_MODES.SLIDER;
    }

    get isDiscrete () {
        return (
            Math.floor(this.sliderMin) === this.sliderMin &&
            Math.floor(this.sliderMax) === this.sliderMax &&
            Math.floor(this.readout.value) === this.readout.value
        );
    }
}

export {WatcherData};

const FIELD_OBJECT_CONTRUCTOR_PROTOS = {
    [TYPES.POINT]: PointData,
    [TYPES.RECTANGLE]: RectangleData,
    [TYPES.FORM]: ImageData,
    [TYPES.SQUEAK]: ImageData,
    [TYPES.SAMPLED_SOUND]: UncompressedData,
    [TYPES.SPRITE]: SpriteData,
    [TYPES.STAGE]: StageData,
    [TYPES.IMAGE_MEDIA]: ImageMediaData,
    [TYPES.SOUND_MEDIA]: SoundMediaData,
    [TYPES.ALIGNMENT]: AlignmentData,
    [TYPES.MORPH]: MorphData,
    [TYPES.WATCHER_READOUT_FRAME]: WatcherReadoutFrameData,
    [TYPES.STATIC_STRING]: StaticStringData,
    [TYPES.UPDATING_STRING]: UpdatingStringData,
    [TYPES.WATCHER]: WatcherData,
    [TYPES.LIST_WATCHER]: ListWatcherData
};

const FIELD_OBJECT_CONTRUCTORS = Array.from(
    {length: 256},
    (_, i) => (FIELD_OBJECT_CONTRUCTOR_PROTOS[i] || null)
);

export {FIELD_OBJECT_CONTRUCTORS};
