import {assert} from '../util/assert';

/**
 * Read and write a stream of {@link BytePrimitive}s, {@link Packet}s, or byte
 * arrays to an ArrayBuffer.
 */
class ByteStream {
    /**
     * @param {ArrayBuffer} buffer - The ArrayBuffer to read from or write to.
     * @param {number=} [position=0] - The position to start reading or writing
     * from in the ArrayBuffer.
     */
    constructor (buffer, position = 0) {
        /**
         * The ArrayBuffer to read from or write to.
         * @type {ArrayBuffer}
         */
        this.buffer = buffer;

        /**
         * The position to start reading or writing from in the ArrayBuffer.
         * @type {number}
         */
        this.position = position;

        /**
         * The typed array view of the buffer to read and write with.
         * @type {Uint8Array}
         */
        this.uint8a = new Uint8Array(this.buffer);
    }

    /**
     * Read one instance of a given BytePrimitive and increment position based
     * on the size of that value.
     * @param {BytePrimitive} member - BytePrimitive to read and increment size
     * with.
     * @returns {*} Return the value produced by the BytePrimitive.
     */
    read (member) {
        const value = member.read(this.uint8a, this.position);
        if (member.size === 0) {
            this.position += member.sizeOf(this.uint8a, this.position);
        } else {
            this.position += member.size;
        }
        return value;
    }

    /**
     * Read one instance of a given Packet subclass and increment position
     * based on the size of that value.
     * @param {PacketConstructor} StructType - Packet subclass constructor that
     * can read from the current stream position.
     * @returns {Packet} Instance of a Packet pointed at the position of the
     * stream before calling readStruct.
     */
    readStruct (StructType) {
        const obj = new StructType(this.uint8a, this.position);
        this.position += StructType.size;
        return obj;
    }

    /**
     * Resize the internal buffer to allow for the needed amount of space.
     * @param {number} needed - How many bytes need to fit in the buffer.
     * @private
     */
    resize (needed) {
        if (this.buffer.byteLength < needed) {
            const uint8a = this.uint8a;
            const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log(needed) / Math.log(2)));
            this.buffer = new ArrayBuffer(nextPowerOf2);

            this.uint8a = new Uint8Array(this.buffer);
            this.uint8a.set(uint8a);
        }
    }

    /**
     * Write a value to the stream (with a BytePrimitive defining how to do so)
     * and increment the position.
     * @param {BytePrimitive} member - BytePrimitive to define how to write the
     * value.
     * @param {*} value - Value to write.
     * @returns {*} Value passed to the method.
     */
    write (member, value) {
        if (member.size === 0) {
            this.resize(this.position + member.writeSizeOf(value));
        } else {
            this.resize(this.position + member.size);
        }

        member.write(this.uint8a, this.position, value);
        if (member.size === 0) {
            this.position += member.writeSizeOf(this.uint8a, this.position);
        } else {
            this.position += member.size;
        }
        return value;
    }

    /**
     * Write data to the stream structured by a given Packet subclass
     * constructor and increment the position.
     * @param {PacketConstructor} StructType - The Packet subclass constructor
     * defining how to write the data.
     * @param {object} data - Data to write.
     * @returns {Packet} - Constructed packet after writing data.
     */
    writeStruct (StructType, data) {
        this.resize(this.position + StructType.size);

        const st = Object.assign(new StructType(this.uint8a, this.position), data);
        this.position += StructType.size;
        return st;
    }

    /**
     * Write bytes from the given Uint8Array array to the stream and increment
     * the position.
     * @param {Uint8Array} bytes - Bytes to write to the stream.
     * @param {number=} [start=0] - Where in bytes to start writing from.
     * @param {number=} [end=bytes.length] - Where in bytes to stop writing, excluding position at bytes[end].
     * @returns {Uint8Array} Passed bytes Uint8Array.
     */
    writeBytes (bytes, start = 0, end = bytes.length) {
        assert(bytes instanceof Uint8Array, 'writeBytes must be passed an Uint8Array');

        this.resize(this.position + (end - start));

        for (let i = start; i < end; i++) {
            this.uint8a[this.position + i - start] = bytes[i];
        }
        this.position += end - start;
        return bytes;
    }
}

export {ByteStream};
