/**
 * @typedef {function} PacketConstructor
 */

/**
 * A packet of bytes represented with getter/setter properties for decoding and
 * encoding values mapped to names, located at known offsets.
 *
 * ```js
 * // Defining a subclass:
 * import {Packet} from '../coders/byte-packets';
 * import {Uint8, Uint16LE} from '../coders/byte-primitives';
 *
 * class MyIdentifiedUint16 extends Packet.extend({
 *     binaryType: Uint8,
 *     value: Uint16LE
 * }) {}
 *
 * Packet.initConstructor(MyIdentifiedUint16);
 *
 * // One way to use it:
 * const indentifiedUint16 = new MyIdentifiedUint16(uint8a, position);
 * indentifiedUint16.binaryType = IDENTIFIED_UINT_16;
 * indentifiedUint16.value = value;
 * ```
 */
class Packet {
    /**
     * @param {Uint8Array=} [uint8a=new Uint8Array(this.size)] - byte array to
     * encode to and decode from
     * @param {number=} offset - offset in addition to the member offsets to
     * encode to and decode from
     */
    constructor (uint8a = new Uint8Array(this.size), offset = 0) {
        /**
         * Byte array to encode to and decode from.
         * @type {Uint8Array}
         */
        this.uint8a = uint8a;

        /**
         * Offset in addition to the member offsets to encode to and decode
         * from.
         * @type {number}
         */
        this.offset = offset;
    }

    /**
     * Check that the decoded values of this Packet match the values in other.
     * @param {object} other - object to match against
     * @returns {boolean} true if all keys in other match values in this packet
     */
    equals (other) {
        for (const key in other) {
            if (this[key] !== other[key]) {
                return false;
            }
        }
        return true;
    }

    view () {
        const className = this.constructor.name;
        const obj = {
            toString () {
                return className;
            }
        };
        for (const key in this.shape) {
            obj[key] = this[key];
        }
        return obj;
    }

    /**
     * Initialize the Packet subclass constructor for easy access to static
     * members like size.
     * @param {function} PacketConstructor - constuctor function for the Packet
     * subclass
     * @returns {function} initialized constructor
     */
    static initConstructor (PacketConstructor) {
        PacketConstructor.size = PacketConstructor.prototype.size;
        return PacketConstructor;
    }

    /**
     * Extend a subclass of Packet with given BytePrimitive members.
     * @param {object} shape - shape of the packet defined with BytePrimitives
     * @returns {function} Packet subclass constructor
     */
    static extend (shape) {
        const DefinedPacket = class extends Packet {
            get shape () {
                return shape;
            }
        };

        let position = 0;
        Object.keys(shape).forEach(key => {
            Object.defineProperty(DefinedPacket.prototype, key, shape[key].asPropertyObject(position));
            if (shape[key].size === 0) {
                throw new Error('Packet cannot be defined with variable sized members.');
            }
            position += shape[key].size;
        });

        DefinedPacket.prototype.size = position;
        DefinedPacket.size = position;

        return DefinedPacket;
    }
}

export {Packet};
