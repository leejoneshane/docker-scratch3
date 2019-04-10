import {assert} from '../util/assert';

import {Packet} from './byte-packets';
import {Uint8, Uint32BE, FixedAsciiString} from './byte-primitives';

class PNGSignature extends Packet.extend({
    support8Bit: Uint8,
    png: new FixedAsciiString(3),
    dosLineEnding: new FixedAsciiString(2),
    dosEndOfFile: new FixedAsciiString(1),
    unixLineEnding: new FixedAsciiString(1)
}) {
    static validate () {
        assert(this.equals({
            support8Bit: 0x89,
            png: 'PNG',
            dosLineEnding: '\r\n',
            dosEndOfFile: '\x1a',
            unixLineEnding: '\n'
        }), 'PNGSignature does not match the expected values');
    }
}

Packet.initConstructor(PNGSignature);

export {PNGSignature};

class PNGChunkStart extends Packet.extend({
    length: Uint32BE,
    chunkType: new FixedAsciiString(4)
}) {}

Packet.initConstructor(PNGChunkStart);

export {PNGChunkStart};

class PNGChunkEnd extends Packet.extend({
    checksum: Uint32BE
}) {}

Packet.initConstructor(PNGChunkEnd);

export {PNGChunkEnd};

class PNGIHDRChunkBody extends Packet.extend({
    width: Uint32BE,
    height: Uint32BE,
    bitDepth: Uint8,
    colorType: Uint8,
    compressionMethod: Uint8,
    filterMethod: Uint8,
    interlaceMethod: Uint8
}) {}

Packet.initConstructor(PNGIHDRChunkBody);

export {PNGIHDRChunkBody};

class PNGFilterMethodByte extends Packet.extend({
    method: Uint8
}) {}

Packet.initConstructor(PNGFilterMethodByte);

export {PNGFilterMethodByte};
