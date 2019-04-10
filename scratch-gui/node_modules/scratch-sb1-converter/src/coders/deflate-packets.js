import {Packet} from './byte-packets';
import {Uint8, Uint16LE, Uint32LE} from './byte-primitives';

const DEFLATE_BLOCK_SIZE_MAX = 0xffff;

export {DEFLATE_BLOCK_SIZE_MAX};

class DeflateHeader extends Packet.extend({
    cmf: Uint8,
    flag: Uint8
}) {}

Packet.initConstructor(DeflateHeader);

export {DeflateHeader};

class DeflateChunkStart extends Packet.extend({
    lastPacket: Uint8,
    length: Uint16LE,
    lengthCheck: Uint16LE
}) {}

Packet.initConstructor(DeflateChunkStart);

export {DeflateChunkStart};

class DeflateEnd extends Packet.extend({
    checksum: Uint32LE
}) {}

Packet.initConstructor(DeflateEnd);

export {DeflateEnd};
