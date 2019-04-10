import {assert} from '../util/assert';

const notImplemented = () => {
    throw new Error('Not implemented');
};

/**
 * Is the host computer little or big endian.
 * @const IS_HOST_LITTLE_ENDIAN
 * @type {boolean}
 */
const IS_HOST_LITTLE_ENDIAN = (() => {
    const ab16 = new Uint16Array(1);
    const ab8 = new Uint8Array(ab16.buffer);
    ab16[0] = 0xaabb;
    return ab8[0] === 0xbb;
})();

/**
 * @callback BytePrimitive~sizeOfCallback
 * @param {Uint8Array} uint8a
 * @param {number} position
 * @returns {number}
 */

/**
 * @callback BytePrimitive~writeSizeOfCallback
 * @param {Uint8Array} uint8a
 * @param {number} position
 * @param {*} value
 * @returns {number}
 */

/**
 * @callback BytePrimitive~writeCallback
 * @param {Uint8Array} uint8a
 * @param {number} position
 * @param {*} value
 */

/**
 * An interface for reading and writing binary values to typed arrays.
 *
 * Combined with {@link Packet Packet} this makes reading and writing packets
 * of binary values easy.
 */
class BytePrimitive {
    /**
     * @constructor
     * @param {object} options - Options to initialize BytePrimitive instance
     * with.
     * @param {number} [options.size=0] - Fixed size of the BytePrimitive.
     * Should be 0 if the primitive has a variable size.
     * @param {BytePrimitive~sizeOfCallback} [options.sizeOf=() => size] -
     * Variable size of the primitive depending on its value stored in the
     * array.
     * @param {BytePrimitive~writeSizeOfCallback} [options.writeSizeOf] -
     * Variable size of the primitive depending on the value being written.
     * @param {TypedArray} [options.toBytes=new Uint8Array(1)] - Temporary
     * space to copy bytes to/from to translate between a value and its
     * representative byte set.
     * @param {BytePrimitive#read} options.read - How is a value read
     * at the given position of the array.
     * @param {BytePrimitive~writeCallback} [options.write] - How to write a
     * value to the array at the given position.
     */
    constructor ({
        size = 0,
        sizeOf = () => size,
        writeSizeOf = notImplemented,
        toBytes = new Uint8Array(1),
        read,
        write = notImplemented
    }) {
        this.size = size;
        this.sizeOf = sizeOf;
        this.writeSizeOf = writeSizeOf;

        this.toBytes = toBytes;
        this.bytes = new Uint8Array(toBytes.buffer);

        this.read = read;
        this.write = write;
    }

    /**
     * Create an object that can be used with `Object.defineProperty` to read
     * and write values offset by `position` and the object's `this.offset`
     * from `this.uint8a` by getting or setting the property.
     * @param {number} position - Additional offset with `this.offset` to read
     * from or write to.
     * @returns {object} - A object that can be passed as the third argument to
     * `Object.defineProperty`.
     */
    asPropertyObject (position) {
        const _this = this;

        return {
            get () {
                return _this.read(this.uint8a, position + this.offset);
            },

            set (value) {
                return _this.write(this.uint8a, position + this.offset, value);
            },

            enumerable: true
        };
    }

    /**
     * Read a value from `position` in `uint8a`.
     * @param {Uint8Array} uint8a - Array to read from.
     * @param {number} position - Position in `uint8a` to read from.
     * @returns {*} - Value read from `uint8a` at `position`.
     */
    read () {
        return null;
    }
}

/**
 * @const Uint8
 * @type {BytePrimitive}
 */
const Uint8 = new BytePrimitive({
    size: 1,
    read (uint8a, position) {
        return uint8a[position];
    },
    write (uint8a, position, value) {
        uint8a[position] = value;
        return value;
    }
});

const HOSTLE_BE16 = {
    size: 2,
    // toBytes: Defined by instance.
    read (uint8a, position) {
        this.bytes[1] = uint8a[position + 0];
        this.bytes[0] = uint8a[position + 1];
        return this.toBytes[0];
    },
    write (uint8a, position, value) {
        this.toBytes[0] = value;
        uint8a[position + 0] = this.bytes[1];
        uint8a[position + 1] = this.bytes[0];
        return value;
    }
};
const HOSTBE_BE16 = {
    size: 2,
    // toBytes: Defined by instance.
    read (uint8a, position) {
        this.bytes[0] = uint8a[position + 0];
        this.bytes[1] = uint8a[position + 1];
        return this.toBytes[0];
    },
    write (uint8a, position, value) {
        this.toBytes[0] = value;
        uint8a[position + 0] = this.bytes[0];
        uint8a[position + 1] = this.bytes[1];
        return value;
    }
};

let BE16;
if (IS_HOST_LITTLE_ENDIAN) {
    BE16 = HOSTLE_BE16;
} else {
    BE16 = HOSTBE_BE16;
}

/**
 * @const Uint16BE
 * @type {BytePrimitive}
 */
const Uint16BE = new BytePrimitive(Object.assign({}, BE16, {
    toBytes: new Uint16Array(1)
}));

/**
 * @const Int16BE
 * @type {BytePrimitive}
 */
const Int16BE = new BytePrimitive(Object.assign({}, BE16, {
    toBytes: new Int16Array(1)
}));

const HOSTLE_BE32 = {
    size: 4,
    // toBytes: Defined by instance.
    read (uint8a, position) {
        this.bytes[3] = uint8a[position + 0];
        this.bytes[2] = uint8a[position + 1];
        this.bytes[1] = uint8a[position + 2];
        this.bytes[0] = uint8a[position + 3];
        return this.toBytes[0];
    },
    write (uint8a, position, value) {
        this.toBytes[0] = value;
        uint8a[position + 0] = this.bytes[3];
        uint8a[position + 1] = this.bytes[2];
        uint8a[position + 2] = this.bytes[1];
        uint8a[position + 3] = this.bytes[0];
        return value;
    }
};

const HOSTBE_BE32 = {
    size: 4,
    // toBytes: Defined by instance.
    read (uint8a, position) {
        this.bytes[0] = uint8a[position + 0];
        this.bytes[1] = uint8a[position + 1];
        this.bytes[2] = uint8a[position + 2];
        this.bytes[3] = uint8a[position + 3];
        return this.toBytes[0];
    },
    write (uint8a, position, value) {
        this.toBytes[0] = value;
        uint8a[position + 0] = this.bytes[0];
        uint8a[position + 1] = this.bytes[1];
        uint8a[position + 2] = this.bytes[2];
        uint8a[position + 3] = this.bytes[3];
        return value;
    }
};

let BE32;
if (IS_HOST_LITTLE_ENDIAN) {
    BE32 = HOSTLE_BE32;
} else {
    BE32 = HOSTBE_BE32;
}

/**
 * @const Int32BE
 * @type {BytePrimitive}
 */
const Int32BE = new BytePrimitive(Object.assign({}, BE32, {
    toBytes: new Int32Array(1)
}));

/**
 * @const Uint32BE
 * @type {BytePrimitive}
 */
const Uint32BE = new BytePrimitive(Object.assign({}, BE32, {
    toBytes: new Uint32Array(1)
}));

let LE16;
if (IS_HOST_LITTLE_ENDIAN) {
    LE16 = HOSTBE_BE16;
} else {
    LE16 = HOSTLE_BE16;
}

/**
 * @const Uint16LE
 * @type {BytePrimitive}
 */
const Uint16LE = new BytePrimitive(Object.assign({}, LE16, {
    toBytes: new Uint16Array(1)
}));

let LE32;
if (IS_HOST_LITTLE_ENDIAN) {
    LE32 = HOSTBE_BE32;
} else {
    LE32 = HOSTLE_BE32;
}

/**
 * @const Uint32LE
 * @type {BytePrimitive}
 */
const Uint32LE = new BytePrimitive(Object.assign({}, LE32, {
    toBytes: new Uint32Array(1)
}));

const HOSTLE_BEDOUBLE = {
    size: 8,
    read (uint8a, position) {
        this.bytes[7] = uint8a[position + 0];
        this.bytes[6] = uint8a[position + 1];
        this.bytes[5] = uint8a[position + 2];
        this.bytes[4] = uint8a[position + 3];
        this.bytes[3] = uint8a[position + 4];
        this.bytes[2] = uint8a[position + 5];
        this.bytes[1] = uint8a[position + 6];
        this.bytes[0] = uint8a[position + 7];
        return this.toBytes[0];
    }
};

const HOSTBE_BEDOUBLE = {
    size: 8,
    read (uint8a, position) {
        this.bytes[7] = uint8a[position + 0];
        this.bytes[6] = uint8a[position + 1];
        this.bytes[5] = uint8a[position + 2];
        this.bytes[4] = uint8a[position + 3];
        this.bytes[3] = uint8a[position + 4];
        this.bytes[2] = uint8a[position + 5];
        this.bytes[1] = uint8a[position + 6];
        this.bytes[0] = uint8a[position + 7];
        return this.toBytes[0];
    }
};

let BEDOUBLE;
if (IS_HOST_LITTLE_ENDIAN) {
    BEDOUBLE = HOSTLE_BEDOUBLE;
} else {
    BEDOUBLE = HOSTBE_BEDOUBLE;
}

/**
 * @const DoubleBE
 * @type {BytePrimitive}
 */
const DoubleBE = new BytePrimitive(Object.assign({}, BEDOUBLE, {
    toBytes: new Float64Array(1)
}));

/**
 * @extends BytePrimitive
 */
class FixedAsciiString extends BytePrimitive {
    /**
     * @param {number} size - Number of bytes the FixedAsciiString uses.
     */
    constructor (size) {
        super({
            size,
            read (uint8a, position) {
                let str = '';
                for (let i = 0; i < size; i++) {
                    const code = uint8a[position + i];
                    assert(code <= 127, 'Non-ascii character in FixedAsciiString');
                    str += String.fromCharCode(code);
                }
                return str;
            },
            write (uint8a, position, value) {
                for (let i = 0; i < size; i++) {
                    const code = value.charCodeAt(i);
                    assert(code <= 127, 'Non-ascii character in FixedAsciiString');
                    uint8a[position + i] = code;
                }
                return value;
            }
        });
    }
}

export {
    IS_HOST_LITTLE_ENDIAN,
    BytePrimitive,
    Uint8,
    Uint16BE,
    Int16BE,
    Int32BE,
    Uint32BE,
    Uint16LE,
    Uint32LE,
    DoubleBE,
    FixedAsciiString
};
