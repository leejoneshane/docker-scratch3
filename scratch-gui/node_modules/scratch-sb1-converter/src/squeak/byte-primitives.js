import {TextDecoder as JSTextDecoder} from 'text-encoding';

import {assert} from '../util/assert';

import {IS_HOST_LITTLE_ENDIAN, Int16BE, BytePrimitive, Uint8, Uint32BE} from '../coders/byte-primitives';

const BUFFER_TOO_BIG = 10 * 1024 * 1024;

/**
 * @const ReferenceBE
 * @type BytePrimitive
 */
let ReferenceBE;
if (IS_HOST_LITTLE_ENDIAN) {
    ReferenceBE = new BytePrimitive({
        size: 3,
        read (uint8a, position) {
            return (
                (uint8a[position + 0] << 16) |
                (uint8a[position + 1] << 8) |
                uint8a[position + 2]
            );
        }
    });
} else {
    ReferenceBE = new BytePrimitive({
        size: 3,
        read (uint8a, position) {
            return (
                (uint8a[position + 2] << 16) |
                (uint8a[position + 1] << 8) |
                uint8a[position + 0]
            );
        }
    });
}

/**
 * @const LargeInt
 * @type BytePrimitive
 */
const LargeInt = new BytePrimitive({
    sizeOf (uint8a, position) {
        const count = Int16BE.read(uint8a, position);
        return Int16BE.size + count;
    },
    read (uint8a, position) {
        let num = 0;
        let multiplier = 0;
        const count = Int16BE.read(uint8a, position);
        for (let i = 0; i < count; i++) {
            num = num + (multiplier * Uint8.read(uint8a, position++));
            multiplier *= 256;
        }
        return num;
    }
});

/**
 * @const AsciiString
 * @type BytePrimitive
 */
const AsciiString = new BytePrimitive({
    sizeOf (uint8a, position) {
        const count = Uint32BE.read(uint8a, position);
        return Uint32BE.size + count;
    },
    read (uint8a, position) {
        const count = Uint32BE.read(uint8a, position);
        assert(count < BUFFER_TOO_BIG, 'asciiString too big');
        position += 4;
        let str = '';
        for (let i = 0; i < count; i++) {
            str += String.fromCharCode(uint8a[position++]);
        }
        return str;
    }
});

/**
 * @const Bytes
 * @type BytePrimitive
 */
const Bytes = new BytePrimitive({
    sizeOf (uint8a, position) {
        return Uint32BE.size + Uint32BE.read(uint8a, position);
    },
    read (uint8a, position) {
        const count = Uint32BE.read(uint8a, position);
        assert(count < BUFFER_TOO_BIG, 'bytes too big');
        position += Uint32BE.size;

        assert(count < BUFFER_TOO_BIG, 'uint8a array too big');
        return new Uint8Array(uint8a.buffer, position, count);
    }
});

/**
 * @const SoundBytes
 * @type BytePrimitive
 */
const SoundBytes = new BytePrimitive({
    sizeOf (uint8a, position) {
        return Uint32BE.size + (Uint32BE.read(uint8a, position) * 2);
    },
    read (uint8a, position) {
        const samples = Uint32BE.read(uint8a, position);
        assert(samples < BUFFER_TOO_BIG, 'sound too big');
        position += Uint32BE.size;

        const count = samples * 2;
        assert(count < BUFFER_TOO_BIG, 'uint8a array too big');
        return new Uint8Array(uint8a.buffer, position, count);
    }
});

/**
 * @const Bitmap32BE
 * @type BytePrimitive
 */
const Bitmap32BE = new BytePrimitive({
    sizeOf (uint8a, position) {
        return Uint32BE.size + (Uint32BE.read(uint8a, position) * Uint32BE.size);
    },
    read (uint8a, position) {
        const count = Uint32BE.read(uint8a, position);
        assert(count < BUFFER_TOO_BIG, 'bitmap too big');
        position += Uint32BE.size;

        assert(count < BUFFER_TOO_BIG, 'uint8a array too big');
        const value = new Uint32Array(count);
        for (let i = 0; i < count; i++) {
            value[i] = Uint32BE.read(uint8a, position);
            position += Uint32BE.size;
        }
        return value;
    }
});

let decoder;
/* global TextDecoder:true */
if (typeof TextDecoder === 'undefined') {
    decoder = new JSTextDecoder();
} else {
    decoder = new TextDecoder();
}

/**
 * @const UTF8
 * @type BytePrimitive
 */
const UTF8 = new BytePrimitive({
    sizeOf (uint8a, position) {
        return Uint32BE.size + Uint32BE.read(uint8a, position);
    },
    read (uint8a, position) {
        const count = Uint32BE.read(uint8a, position);
        assert(count < BUFFER_TOO_BIG, 'utf8 too big');
        position += Uint32BE.size;

        assert(count < BUFFER_TOO_BIG, 'uint8a array too big');
        return decoder.decode(new Uint8Array(uint8a.buffer, position, count));
    }
});

/**
 * @const OpaqueColor
 * @type BytePrimitive
 */
const OpaqueColor = new BytePrimitive({
    size: 4,
    read (uint8a, position) {
        const rgb = Uint32BE.read(uint8a, position);
        const a = 0xff;
        const r = (rgb >> 22) & 0xff;
        const g = (rgb >> 12) & 0xff;
        const b = (rgb >> 2) & 0xff;
        return ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
    }
});

/**
 * @const TranslucentColor
 * @type BytePrimitive
 */
const TranslucentColor = new BytePrimitive({
    size: 5,
    read (uint8a, position) {
        const rgb = Uint32BE.read(uint8a, position);
        const a = Uint8.read(uint8a, position);
        const r = (rgb >> 22) & 0xff;
        const g = (rgb >> 12) & 0xff;
        const b = (rgb >> 2) & 0xff;
        return ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
    }
});

export {
    BUFFER_TOO_BIG,
    ReferenceBE,
    LargeInt,
    AsciiString,
    Bytes,
    SoundBytes,
    Bitmap32BE,
    UTF8,
    OpaqueColor,
    TranslucentColor
};
