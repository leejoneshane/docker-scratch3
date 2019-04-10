/**
 * A numeric identifier for each possible class of {@link Field} that can be in
 * a `.sb` file.
 * @enum {number}
 */
const TYPES = {
    /** A `null` {@link Value}. No data is stored after the class id. */
    NULL: 1,

    /** A `true` {@link Value}. No data is stored after the class id. */
    TRUE: 2,

    /** A `false` {@link Value}. No data is stored after the class id. */
    FALSE: 3,

    /** A small integer {@link Value}. The next 4 bytes represent an integer. */
    SMALL_INT: 4,

    /** A small integer {@link Value}. The next 2 bytes represent an integer. */
    SMALL_INT_16: 5,

    /** A large integer {@link Value}. The value is a variable number of bytes.
     * The next byte defines the number of bytes after that represent the
     * integer. The integer's bytes are stored least value first (little
     * endian). */
    LARGE_INT_POSITIVE: 6,

    /** A large integer {@link Value}. The value is a variable number of bytes.
     * The next byte defines the number of bytes after that represent the
     * integer. The integer's bytes are stored least value first (little
     * endian). */
    LARGE_INT_NEGATIVE: 7,

    /** A floating point {@link Value}. The next 8 bytes are stored as a double
     * precision floating point value. */
    FLOATING: 8,

    /** A ascii string {@link Value}. The next 4 bytes defines the number of
     * following bytes that make up the string. */
    STRING: 9,

    /** A ascii string {@link Value}. The next 4 bytes defines the number of
     * following bytes that make up the string. */
    SYMBOL: 10,

    /** A sequence of bytes ({@link Value}). The next 4 bytes defines the
     * number of bytes in the sequence. */
    BYTES: 11,

    /** A sequence of 16 bit samples ({@link Value}). The next 4 bytes defines
     * the number of samples in the sequence. */
    SOUND: 12,

    /** A sequence of 32 bit color integers ({@link Value}). The next 4 bytes
     * defines the number of colors in the bitmap. */
    BITMAP: 13,

    /** A utf8 string {@link Value}. The next 4 bytes defines the number of
     * bytes used by the string. */
    UTF8: 14,

    /** An array {@link Header}. The next 4 bytes defines the following number
     * of fields in the array. */
    ARRAY: 20,

    /** An array {@link Header}. The next 4 bytes defines the following number
     * of fields in the array. */
    ORDERED_COLLECTION: 21,

    /** An array {@link Header}. The next 4 bytes defines the following number
     * of fields in the array. */
    SET: 22,

    /** An array {@link Header}. The next 4 bytes defines the following number
     * of fields in the array. */
    IDENTITY_SET: 23,

    /** A dictionary {@link Header}. The next 4 bytes defines the following
     * number of key/value field pairs in the dictionary. */
    DICTIONARY: 24,

    /** A dictionary {@link Header}. The next 4 bytes defines the following
     * number of key/value field pairs in the dictionary. */
    IDENTITY_DICTIONARY: 25,

    /** A color {@link Value}. The next 4 bytes represents the color. */
    COLOR: 30,

    /** A color {@link Value}. The next 4 bytes represents the red, green, and
     * blue subpixels. The following byte represents the alpha. */
    TRANSLUCENT_COLOR: 31,

    /** A 2 field point {@link Header}. The next 2 fields are the x and y
     * values of this point. */
    POINT: 32,

    /** A 4 field rectangle {@link Header}. The next 4 fields are the x, y, x2,
     * y2 values of this rectangle. */
    RECTANGLE: 33,

    /** A 5 field image {@link Header}. The next 5 fields are the width,
     * height, bit depth, unused, and bytes. */
    FORM: 34,

    /** A 6 field image {@link Header}. The next 6 fields are the width,
     * height, bit depth, unsued, bytes and colormap. */
    SQUEAK: 35,

    /** An object {@link Reference} to a position in the top level array of fields in a
     * block. */
    OBJECT_REF: 99,

    /** A variable {@link FieldObjectHeader}. */
    MORPH: 100,

    /** A variable {@link FieldObjectHeader}. */
    ALIGNMENT: 104,

    /** A variable {@link FieldObjectHeader}.
     *
     * In Scratch 2 this is called String. To reduce confusion in the set of
     * types, this is called STATIC_STRING in this converter. */
    STATIC_STRING: 105,

    /** A variable {@link FieldObjectHeader}. */
    UPDATING_STRING: 106,

    /** A variable {@link FieldObjectHeader}. */
    SAMPLED_SOUND: 109,

    /** A variable {@link FieldObjectHeader}. */
    IMAGE_MORPH: 110,

    /** A variable {@link FieldObjectHeader}. */
    SPRITE: 124,

    /** A variable {@link FieldObjectHeader}. */
    STAGE: 125,

    /** A variable {@link FieldObjectHeader}. */
    WATCHER: 155,

    /** A variable {@link FieldObjectHeader}. */
    IMAGE_MEDIA: 162,

    /** A variable {@link FieldObjectHeader}. */
    SOUND_MEDIA: 164,

    /** A variable {@link FieldObjectHeader}. */
    MULTILINE_STRING: 171,

    /** A variable {@link FieldObjectHeader}. */
    WATCHER_READOUT_FRAME: 173,

    /** A variable {@link FieldObjectHeader}. */
    WATCHER_SLIDER: 174,

    /** A variable {@link FieldObjectHeader}. */
    LIST_WATCHER: 175
};

/**
 * A inverted map of TYPES. Map id numbers to their string names.
 * @type {object.<number, string>}
 */
const TYPE_NAMES = Object.entries(TYPES)
    .reduce((carry, [key, value]) => {
        carry[value] = key;
        return carry;
    }, {});

export {TYPES, TYPE_NAMES};
