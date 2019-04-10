import {TYPE_NAMES} from './ids';

const toTitleCase = str => (
    str.toLowerCase().replace(/_(\w)/g, ([, letter]) => letter.toUpperCase())
);

/**
 * A object representation of a {@link Header} collecting the given {@link
 * Header#size} in fields.
 */
class FieldObject {
    /**
     * @param {TYPES} classId - {@link TYPES} id that informs what the shape of
     * this object is.
     * @param {number} version - Version number of this object. Some items in
     * the same class may have different content and so will be different
     * versions.
     * @param {Array.<Field>} fields - An array of fields in this FieldObject.
     */
    constructor ({classId, version, fields}) {
        /** @type {number} */
        this.classId = classId;

        /** @type {number} */
        this.version = version;

        /** @type {Array.<Field>} */
        this.fields = fields;
    }

    /**
     * @type {object}
     */
    get FIELDS () {
        return [];
    }

    /**
     * @type {Array.<Field>}
     */
    get RAW_FIELDS () {
        return this.fields;
    }

    string (field) {
        return String(this.fields[field]);
    }

    number (field) {
        return +this.fields[field];
    }

    boolean (field) {
        return !!this.fields[field];
    }

    toString () {
        if (this.constructor === FieldObject) {
            return `${this.constructor.name} ${this.classId} ${TYPE_NAMES[this.classId]}`;
        }
        return this.constructor.name;
    }

    /**
     * Define a FieldObject subclass by mapping field names to indices in
     * {@link FieldObject#fields}.
     * @param {object} FIELDS - Mapping of ALL_CAPS keys to index in {@link
     * FieldObject#fields}.
     * @param {function} [Super] - Parent class of the returned subclass.
     * @returns {function} - FieldObject subclass constructor.
     */
    static define (FIELDS, Super = FieldObject) {
        class DefinedObject extends Super {
            get FIELDS () {
                return FIELDS;
            }

            static get FIELDS () {
                return FIELDS;
            }
        }

        Object.keys(FIELDS).forEach(key => {
            const index = FIELDS[key];
            Object.defineProperty(DefinedObject.prototype, toTitleCase(key), {
                get () {
                    return this.fields[index];
                }
            });
        });

        return DefinedObject;
    }
}

export {FieldObject};
