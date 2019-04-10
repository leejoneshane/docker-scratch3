import {ByteStream} from './coders/byte-stream';

import {ByteTakeIterator} from './squeak/byte-take-iterator';
import {FieldIterator} from './squeak/field-iterator';
import {TypeIterator} from './squeak/type-iterator';
import {ReferenceFixer} from './squeak/reference-fixer';
import {ImageMediaData, SoundMediaData} from './squeak/types';

import {toSb2FakeZipApi} from './to-sb2/fake-zip';
import {toSb2Json} from './to-sb2/json-generator';

import {SB1Header, SB1Signature} from './sb1-file-packets';

class SB1File {
    constructor (buffer) {
        this.buffer = buffer;
        this.stream = new ByteStream(buffer);

        this.signature = this.stream.readStruct(SB1Signature);
        this.signature.validate();

        this.infoHeader = this.stream.readStruct(SB1Header);
        this.infoHeader.validate();

        this.stream.position += this.signature.infoByteLength - SB1Header.size;

        this.dataHeader = this.stream.readStruct(SB1Header);
        this.dataHeader.validate();
    }

    get json () {
        return toSb2Json({
            info: this.info(),
            stageData: this.data(),
            images: this.images(),
            sounds: this.sounds()
        });
    }

    get zip () {
        return toSb2FakeZipApi({
            // Use of this `zip` getter assumes that `json` will be used to
            // fetch the json and not have it read from the produced "fake" zip.
            images: this.images(),
            sounds: this.sounds()
        });
    }

    view () {
        return {
            signature: this.signature,
            infoHeader: this.infoHeader,
            dataHeader: this.dataHeader,
            toString () {
                return 'SB1File';
            }
        };
    }

    infoRaw () {
        return new ByteTakeIterator(
            new FieldIterator(this.buffer, this.infoHeader.offset + SB1Header.size),
            this.signature.infoByteLength + SB1Signature.size
        );
    }

    infoTable () {
        return new TypeIterator(this.infoRaw());
    }

    info () {
        if (!this._info) {
            this._info = new ReferenceFixer(this.infoTable()).table[0];
        }
        return this._info;
    }

    dataRaw () {
        return new ByteTakeIterator(
            new FieldIterator(this.buffer, this.dataHeader.offset + SB1Header.size),
            this.stream.uint8a.length
        );
    }

    dataTable () {
        return new TypeIterator(this.dataRaw());
    }

    dataFixed () {
        if (!this._data) {
            this._data = new ReferenceFixer(this.dataTable()).table;
        }
        return this._data;
    }

    data () {
        return this.dataFixed()[0];
    }

    images () {
        const unique = new Set();
        return this.dataFixed().filter(obj => {
            if (obj instanceof ImageMediaData) {
                if (unique.has(obj.crc)) return false;
                unique.add(obj.crc);
                return true;
            }
            return false;
        });
    }

    sounds () {
        const unique = new Set();
        return this.dataFixed().filter(obj => {
            if (obj instanceof SoundMediaData) {
                if (unique.has(obj.crc)) return false;
                unique.add(obj.crc);
                return true;
            }
            return false;
        });
    }
}

export {SB1File};
