import {TYPES} from './ids';

/**
 * An abstract value contained in a `.sb` file.
 *
 * `.sb` files are made up of two blocks of Fields. Each field in the binary
 * file defines its "class" and is possibly followed by some binary data
 * depending on the class. Each class explicitly defines what follows. Knowing
 * all the possible classes each block can be broken up into a series of Field
 * objects.
 */
class Field {
    /**
     * @param {TYPES} classId - The class identifier of this Field.
     * @param {number} position - Byte position in the `.sb` file.
     */
    constructor (classId, position) {
        /**
         * The class identifier of this Field.
         * @type {TYPES}
         */
        this.classId = classId;

        /**
         * Byte position in the `.sb` file.
         * @type {number}
         */
        this.position = position;
    }
}

const valueOf = obj => {
    if (typeof obj === 'object' && obj) return obj.valueOf();
    return obj;
};

/**
 * A concrete value contained in a `.sb` file.
 * @extends Field
 */
class Value extends Field {
    /**
     * @param {TYPES} classId - The class identifier of this Field.
     * @param {number} position - Byte position in the `.sb` file.
     * @param {*} value - A value decoded according to `classId` from an `.sb`
     * file.
     */
    constructor (classId, position, value) {
        super(classId, position);

        /**
         * A value decoded according to `classId` from an `.sb` file.
         * @type {*}
         */
        this.value = value;
    }

    valueOf () {
        return this.value;
    }

    toJSON () {
        if (
            this.classId === TYPES.TRANSLUCENT_COLOR ||
            this.classId === TYPES.COLOR
        ) {
            // TODO: Can colors be 32 bit in scratch-packets?
            return this.value & 0xffffff;
        }
        return this.value;
    }

    toString () {
        return this.value;
    }
}

/**
 * A header for a FieldObject representing its class and how many fields are in
 * the object.
 *
 * The `size` of a header is the number of Fields that appear in the byte
 * stream after the header that are related to the header. That set of `size`
 * length Fields make up a FieldObject of `classId` passed to this header.
 * @extends Field
 */
class Header extends Field {
    /**
     * @param {TYPES} classId - The class identifier of this Field.
     * @param {number} position - Byte position in the `.sb` file.
     * @param {number} size - The number of fields to collect.
     */
    constructor (classId, position, size) {
        super(classId, position);

        /**
         * The number of fields to collect.
         * @type {number}
         */
        this.size = size;
    }
}

/**
 * A integer reference of an object in an array produced by TypeIterator of
 * Values and FieldObjects.
 * @extends Field
 */
class Reference extends Field {
    /**
     * @param {TYPES} classId - The class identifier of this Field.
     * @param {number} position - Byte position in the `.sb` file.
     * @param {number} index - The index this Reference refers to.
     */
    constructor (classId, position, index) {
        super(classId, position);

        /**
         * The index this Reference refers to.
         * @type {number}
         */
        this.index = index;
    }

    valueOf () {
        return `Ref(${this.index})`;
    }
}

/**
 * An object header of 0 size.
 * @extends Header
 */
class BuiltinObjectHeader extends Header {
    constructor (classId, position) {
        super(classId, position, 0);
    }
}


/**
 * An object header with an id more than 99, a version, and a size. The version
 * and size appear in the `sb` file as one byte for version followed by another
 * byte for the size.
 * @extends Header
 */
class FieldObjectHeader extends Header {
    /**
     * @param {TYPES} classId - The class identifier of this Field.
     * @param {number} position - Byte position in the `.sb` file.
     * @param {number} version - The version of this instance of a certain
     * value.
     * @param {number} size - The number of fields in this object.
     */
    constructor (classId, position, version, size) {
        super(classId, position, size);

        /**
         * The version of this instance of a certain value.
         * @type {number}
         */
        this.version = version;
    }
}

export {
    Field,
    valueOf as value,
    Value,
    Header,
    Reference,
    BuiltinObjectHeader,
    FieldObjectHeader
};
