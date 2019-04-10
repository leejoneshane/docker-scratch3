import {Uint8, Int16BE, Int32BE, DoubleBE} from '../coders/byte-primitives';
import {ByteStream} from '../coders/byte-stream';

import {
    ReferenceBE, LargeInt, AsciiString, UTF8, Bytes, SoundBytes, Bitmap32BE, OpaqueColor, TranslucentColor
} from './byte-primitives';
import {BuiltinObjectHeader, FieldObjectHeader, Header, Reference, Value} from './fields';
import {TYPES} from './ids';

/**
 * Consume values for the byte stream with a iterator-like interface.
 */
class Consumer {
    /**
     * @param {object} options - Define the consumer.
     * @param {function} [options.type=Value] - The {@link Field} type to
     * create.
     * @param {BytePrimitive} options.read - How to read the third Field
     * argument. The third field argument is the value the field represented in
     * the `.sb` file. It is either the Value's value, the Reference's index,
     * or the Header's field size.
     * @param {function} [options.value] - How to produce the third Field
     * argument from a stream. Defaults to `stream =>
     * stream.read(options.read)`.
     */
    constructor ({
        type = Value,
        read,
        value = read ? (stream => stream.read(read)) : null
    }) {
        this.type = type;
        this.value = value;
    }

    /**
     * @param {ByteStream} stream - Stream to read from.
     * @param {TYPES} classId - FieldObject TYPES identifying the value to read.
     * @param {number} position - Position in the stream the classId was read
     * from.
     * @returns {{value: *, done: boolean}} - An iterator.next() return value.
     */
    next (stream, classId, position) {
        return {
            value: new this.type(classId, position, this.value(stream)),
            done: false
        };
    }
}

/**
 * @const CONSUMER_PROTOS
 * @type {Object.<number, {type, read, value}>}
 */
const CONSUMER_PROTOS = {
    [TYPES.NULL]: {value: () => null},
    [TYPES.TRUE]: {value: () => true},
    [TYPES.FALSE]: {value: () => false},
    [TYPES.SMALL_INT]: {read: Int32BE},
    [TYPES.SMALL_INT_16]: {read: Int16BE},
    [TYPES.LARGE_INT_POSITIVE]: {read: LargeInt},
    [TYPES.LARGE_INT_NEGATIVE]: {read: LargeInt},
    [TYPES.FLOATING]: {read: DoubleBE},
    [TYPES.STRING]: {read: AsciiString},
    [TYPES.SYMBOL]: {read: AsciiString},
    [TYPES.BYTES]: {read: Bytes},
    [TYPES.SOUND]: {read: SoundBytes},
    [TYPES.BITMAP]: {read: Bitmap32BE},
    [TYPES.UTF8]: {read: UTF8},
    [TYPES.ARRAY]: {type: Header, read: Int32BE},
    [TYPES.ORDERED_COLLECTION]: {type: Header, read: Int32BE},
    [TYPES.SET]: {type: Header, read: Int32BE},
    [TYPES.IDENTITY_SET]: {type: Header, read: Int32BE},
    [TYPES.DICTIONARY]: {
        type: Header,
        value: stream => stream.read(Int32BE) * 2
    },
    [TYPES.IDENTITY_DICTIONARY]: {
        type: Header,
        value: stream => stream.read(Int32BE) * 2
    },
    [TYPES.COLOR]: {read: OpaqueColor},
    [TYPES.TRANSLUCENT_COLOR]: {read: TranslucentColor},
    [TYPES.POINT]: {type: Header, value: () => 2},
    [TYPES.RECTANGLE]: {type: Header, value: () => 4},
    [TYPES.FORM]: {type: Header, value: () => 5},
    [TYPES.SQUEAK]: {type: Header, value: () => 6},
    [TYPES.OBJECT_REF]: {type: Reference, read: ReferenceBE}
};

/**
 * @const CONSUMERS
 * @type {Array.<Consumer|null>}
 */
const CONSUMERS = Array.from(
    {length: 256},
    (_, i) => {
        if (CONSUMER_PROTOS[i]) return new Consumer(CONSUMER_PROTOS[i]);
        return null;
    }
);

const builtinConsumer = new Consumer({
    type: BuiltinObjectHeader,
    value: () => null
});

/**
 * Field iterator.
 */
class FieldIterator {
    /**
     * @param {ArrayBuffer} buffer - Buffer to read from.
     * @param {number} position - Position in buffer to start at.
     */
    constructor (buffer, position) {
        this.buffer = buffer;
        this.stream = new ByteStream(buffer, position);
    }

    /**
     * @returns {FieldIterator} - Returns this.
     */
    [Symbol.iterator] () {
        return this;
    }

    /**
     * @returns {{value: *, done: boolean}} - An iterator.next() value.
     */
    next () {
        if (this.stream.position >= this.stream.uint8a.length) {
            return {
                value: null,
                done: true
            };
        }

        const position = this.stream.position;
        const classId = this.stream.read(Uint8);

        const consumer = CONSUMERS[classId];

        if (consumer !== null) {
            return consumer.next(this.stream, classId, position);
        } else if (classId < TYPES.OBJECT_REF) {
            // TODO: Does this ever happen?
            return builtinConsumer.next(this.stream, classId, position);
        }
        const classVersion = this.stream.read(Uint8);
        const size = this.stream.read(Uint8);
        return {
            value: new FieldObjectHeader(classId, position, classVersion, size),
            done: false
        };
    }
}

export {FieldIterator};
