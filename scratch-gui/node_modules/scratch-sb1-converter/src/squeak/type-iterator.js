import {FieldObjectHeader, Header} from './fields';
import {FieldObject} from './field-object';
import {FIELD_OBJECT_CONTRUCTORS} from './types';

class TypeIterator {
    constructor (valueIterator) {
        this.valueIterator = valueIterator;
    }

    [Symbol.iterator] () {
        return this;
    }

    next () {
        const nextHeader = this.valueIterator.next();
        if (nextHeader.done) {
            return nextHeader;
        }

        const header = nextHeader.value;
        const {classId} = header;

        let value = header;

        if (header instanceof Header) {
            value = [];

            for (let i = 0; i < header.size; i++) {
                value.push(this.next().value);
            }
        }

        if (
            FIELD_OBJECT_CONTRUCTORS[classId] !== null ||
            header instanceof FieldObjectHeader
        ) {
            const constructor = FIELD_OBJECT_CONTRUCTORS[header.classId] || FieldObject;

            value = new constructor({
                classId: header.classId,
                version: header.version,
                fields: value
            });
        }

        return {
            value,
            done: false
        };
    }
}

export {TypeIterator};
