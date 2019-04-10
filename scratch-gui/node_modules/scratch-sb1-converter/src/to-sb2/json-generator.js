/* eslint no-use-before-define:1 */

import {ImageMediaData, SoundMediaData, SpriteData} from '../squeak/types';
import md5 from 'js-md5';

// https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L292-L308
const fixMouseEdgeRef = block => {
    const oldVal = String(block[block.length - 1]);
    const last = block.length - 1;
    if (oldVal === 'mouse') {
        block[last] = '_mouse_';
    } else if (oldVal === 'edge') {
        block[last] = '_edge_';
    } else if (oldVal === 'StageData') {
        block[last] = '_stage_';
    }
    return block;
};

const sb1SpecMap = {
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L197-L199
    'getParam': ([a, b, c, d]) => [a, b, c, d || 'r'],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L200-L212
    'changeVariable': block => [block[2], block[1], block[3]],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L213-L219
    'EventHatMorph': block => {
        if (String(block[1]) === 'Scratch-StartClicked') {
            return ['whenGreenFlag'];
        }
        return ['whenIReceive', block[1]];
    },
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L220-L222
    'MouseClickEventHatMorph': () => ['whenClicked'],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L223-L226
    'KeyEventHatMorph': block => ['whenKeyPressed', block[1]],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L227-L235
    'stopScripts': block => {
        if (String(block[1]) === 'other scripts') {
            return [block[0], 'other scripts in sprite'];
        }
        return block;
    },
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L249-L253
    'abs': block => ['computeFunction:of:', 'abs', block[1]],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L254-L258
    'sqrt': block => ['computeFunction:of:', 'sqrt', block[1]],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L137
    '\\\\': block => ['%', ...block.slice(1)],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L259-L262
    'doReturn': () => ['stopScripts', 'this script'],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L263-L266
    'stopAll': () => ['stopScripts', 'all'],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L267-L270
    'showBackground:': block => ['startScene', block[1]],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L271-L273
    'nextBackground': () => ['nextScene'],
    // https://github.com/LLK/scratch-flash/blob/cb5f42f039ef633710faf9c63b69e8368b280372/src/blocks/BlockIO.as#L274-L282
    'doForeverIf': block => ['doForever', [['doIf', block[1], block[2]]]],
    'getAttribute:of:': fixMouseEdgeRef,
    'gotoSpriteOrMouse:': fixMouseEdgeRef,
    'distanceTo:': fixMouseEdgeRef,
    'pointTowards:': fixMouseEdgeRef,
    'touching:': fixMouseEdgeRef
};

const valueOf = obj => {
    if (typeof obj === 'object' && obj) return obj.valueOf();
    return obj;
};

const toSb2Json = root => {
    const {info, stageData, images, sounds} = root;

    const pairs = array => {
        const _pairs = [];
        for (let i = 0; i < array.length; i += 2) {
            _pairs.push([array[i], array[i + 1]]);
        }
        return _pairs;
    };

    const toSb2JsonVariable = ([name, value]) => ({
        name,
        value,
        isPersistent: false
    });

    const toSb2JsonList = ([, {
        listName, contents, x, y, width, height, hiddenWhenNull
    }]) => ({
        listName: listName,
        contents: contents,
        isPersistent: false,
        x: x,
        y: y,
        width: width,
        height: height,
        visible: valueOf(hiddenWhenNull) !== null
    });

    // TODO: Implement toSb2JsonWatcher
    // const toSb2JsonWatcher = watcher => {
    //
    // };

    // TODO: Implement toSb2JsonListWatcher
    // const toSb2JsonListWatcher = listWatcher => {
    //
    // };

    const toSb2JsonSound = soundMediaData => {
        const soundID = sounds.findIndex(sound => sound.crc === soundMediaData.crc);
        return {
            soundName: soundMediaData.name,
            soundID,
            md5: `${soundMediaData.md5}.wav`,
            sampleCount: soundMediaData.sampleCount,
            rate: soundMediaData.rate,
            format: ''
        };
    };

    const toSb2ImageExtension = imageMedia => {
        if (imageMedia.extension === 'uncompressed') {
            return 'png';
        }
        return 'jpg';
    };

    const toSb2JsonCostume = imageMediaData => {
        const baseLayerID = images.findIndex(image => image.crc === imageMediaData.crc);
        return {
            costumeName: imageMediaData.costumeName,
            baseLayerID,
            baseLayerMD5: `${md5(imageMediaData.rawBytes)}.${toSb2ImageExtension(imageMediaData)}`,
            bitmapResolution: 1,
            rotationCenterX: imageMediaData.rotationCenter.x,
            rotationCenterY: imageMediaData.rotationCenter.y
        };
    };

    const toSb2JsonBlock = blockData => {
        let output = blockData.map(toSb2JsonBlockArg);
        const spec = sb1SpecMap[output[0]];
        if (spec) {
            output = spec(output);
        }
        return output;
    };

    const toSb2JsonStack = stackData => stackData.map(toSb2JsonBlock);

    const toSb2JsonBlockArg = argData => {
        if (argData instanceof SpriteData) {
            return argData.objName;
        } else if (Array.isArray(argData)) {
            if (argData.length === 0 || Array.isArray(argData[0])) {
                return toSb2JsonStack(argData);
            }
            return toSb2JsonBlock(argData);
        }
        return argData;
    };

    const toSb2JsonScript = scriptData => (
        [
            scriptData[0].x,
            scriptData[0].y,
            toSb2JsonStack(scriptData[1])
        ]
    );

    const toSb2JsonSprite = spriteData => {
        const rawCostumes = spriteData.media
            .filter(data => data instanceof ImageMediaData);
        const rawSounds = spriteData.media
            .filter(data => data instanceof SoundMediaData);
        return {
            objName: spriteData.objName,
            variables: pairs(spriteData.vars).map(toSb2JsonVariable),
            lists: pairs(spriteData.lists).map(toSb2JsonList),
            scripts: spriteData.blocksBin.map(toSb2JsonScript),
            costumes: rawCostumes
                .map(toSb2JsonCostume),
            currentCostumeIndex: rawCostumes.findIndex(image => image.crc === spriteData.currentCostume.crc),
            sounds: rawSounds.map(toSb2JsonSound),
            scratchX: spriteData.scratchX,
            scratchY: spriteData.scratchY,
            scale: spriteData.scalePoint.x,
            direction: (Math.round(spriteData.rotationDegrees * 1e6) / 1e6) - 270,
            rotationStyle: spriteData.rotationStyle,
            isDraggable: spriteData.draggable,
            indexInLibrary: stageData.spriteOrderInLibrary.indexOf(spriteData),
            visible: spriteData.visible,
            spriteInfo: {}
        };
    };

    const toSb2JsonChild = child => {
        if (child instanceof SpriteData) {
            return toSb2JsonSprite(child);
        }
        return null;
    };

    const toSb2JsonStage = _stageData => {
        const rawCostumes = _stageData.media
            .filter(data => data instanceof ImageMediaData);
        const rawSounds = _stageData.media
            .filter(data => data instanceof SoundMediaData);
        return {
            objName: _stageData.objName,
            variables: pairs(_stageData.vars).map(toSb2JsonVariable),
            lists: pairs(_stageData.lists).map(toSb2JsonList),
            scripts: _stageData.blocksBin.map(toSb2JsonScript),
            costumes: rawCostumes
                .map(toSb2JsonCostume),
            currentCostumeIndex: rawCostumes.findIndex(image => image.crc === _stageData.currentCostume.crc),
            sounds: rawSounds.map(toSb2JsonSound),
            // TODO: Where does this come from? Is it always the same for SB1?
            penLayerMD5: '5c81a336fab8be57adc039a8a2b33ca9.png',
            penLayerID: 0,
            tempoBPM: _stageData.tempoBPM,
            videoAlpha: 0.5,
            children: _stageData.stageContents
                .map(toSb2JsonChild)
                .filter(Boolean)
                .reverse()
        };
    };

    const toSb2JsonInfo = _info => {
        const obj = {};
        for (let i = 0; i < _info.length; i += 2) {
            if (String(_info[i]) === 'thumbnail') continue;
            obj[String(_info[i])] = String(_info[i + 1]);
        }
        return obj;
    };

    return JSON.parse(JSON.stringify(Object.assign(toSb2JsonStage(stageData), {
        info: toSb2JsonInfo(info)
    })));
};

export {toSb2Json};
