class CRC32 {
    constructor () {
        this.bit = new Uint32Array(1);
        this.crc = 0;
        this.c = 0;

        this.table = [];
        let c;
        for (let i = 0; i < 256; i++) {
            c = i;
            for (let j = 0; j < 8; j++) {
                c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
            }
            this.table[i] = c >>> 0;
        }
    }

    update (uint8a, position = 0, length = uint8a.length) {
        let crc = (~this.crc) >>> 0;
        for (let i = 0; i < length; i++) {
            crc = (crc >>> 8) ^ this.table[(crc ^ uint8a[position + i]) & 0xff];
        }
        this.crc = (~crc) >>> 0;
        return this;
    }

    get digest () {
        return this.crc;
    }
}

export {CRC32};
