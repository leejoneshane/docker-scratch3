import {Packet} from './byte-packets';
import {Uint16LE, Uint32LE, FixedAsciiString} from './byte-primitives';

class WAVESignature extends Packet.extend({
    riff: new FixedAsciiString(4),
    length: Uint32LE,
    wave: new FixedAsciiString(4)
}) {}

Packet.initConstructor(WAVESignature);

export {WAVESignature};

class WAVEChunkStart extends Packet.extend({
    chunkType: new FixedAsciiString(4),
    length: Uint32LE
}) {}

Packet.initConstructor(WAVEChunkStart);

export {WAVEChunkStart};

class WAVEFMTChunkBody extends Packet.extend({
    format: Uint16LE,
    channels: Uint16LE,
    sampleRate: Uint32LE,
    bytesPerSec: Uint32LE,
    blockAlignment: Uint16LE,
    bitsPerSample: Uint16LE
}) {}

Packet.initConstructor(WAVEFMTChunkBody);

export {WAVEFMTChunkBody};
