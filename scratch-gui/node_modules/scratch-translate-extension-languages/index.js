const async = require('async');
const Translate = require('@google-cloud/translate');
const client = new Translate({
    credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL
    }
});

const SUPPORTED_LOCALES = ['ab', 'ar', 'an', 'as', 'id', 'ms', 'be', 'bg',
    'ca', 'cs', 'cy', 'da', 'de', 'yu', 'et', 'el', 'en', 'eo', 'es', 'eu',
    'fa', 'fr', 'fu', 'ga', 'gd', 'gl', 'ko', 'hy', 'he', 'hi', 'hr', 'zu',
    'is', 'it', 'kn', 'rw', 'ht', 'ku', 'la', 'lv', 'lt', 'mk', 'hu', 'ml',
    'mt', 'ca', 'mr', 'mn', 'my', 'nl', 'ja', 'nb', 'nn', 'uz', 'th', 'pl',
    'pt', 'pt', 'ro', 'ru', 'sc', 'sq', 'sk', 'sl', 'sr', 'fi', 'sv', 'te',
    'vi', 'tr', 'uk', 'zh', 'zh-cn', 'zh-tw'];

/**
 * Builds a map from translated language name to language code. e.g.
 * {espanol: es, spanish: es, japanese: ja, aleman: de, ... etc.}
 * This is used by the language menu in the translate block to decide whether to
 * accept a language name dropped on top of the menu.
 * @param {object} languageMap mapping language code to a list of langauge code, name pairs we can translate to.
 * @return {object} Object mapping from a language name to language code.
 */
var buildNameToCodeMap = function (languageMap) {
    var nameMap = {};
    let codes = Object.keys(languageMap);
    for (let i = 0; i < codes.length; ++i) {
        for (let j = 0; j < languageMap[codes[i]].length; ++j) {
            // Lowercase all the language codes for ease of comparison later.
            nameMap[languageMap[codes[i]][j].name.toLowerCase()] = languageMap[codes[i]][j].code.toLowerCase();
        }
    }
    // Add the Hiragana version of Japanese in Japanese (nihongo) by hand since Google Translate
    // only gives us the kanji version.
    nameMap['にほんご'] = 'ja';
    return nameMap;
};

/**
 * Gets an individual language's language list from Google Translate and adds the result to the
 * accumulator object.
 * @param {object} acc Accumulates results from the set of transform calls to get supported languages.
 * @param {string} langCode The language code to look up.
 * @param {number} index The index into the list of langauges we're looking up.
 * @param {function} callback The function which is called after all the iteratee functions have finished.
 */
var getLanguageList = function (acc, langCode, index, callback) {
    client.getLanguages(langCode, function (err, translateObj) {
        if (err) {
            // Invalid languages happen since Scratch supports some that Google
            // translate does not.
            if (err.code === 400 && err.message.indexOf('language is invalid')) {
                acc[langCode] = [];
                return callback();
            }
            // Avoid unhandled rejection, and allow exiting with error status
            return async.nextTick(callback, err);
        }
        const result = [];
        // Only include langauges that are supported by Scratch.
        for (let i in translateObj) {
            if (SUPPORTED_LOCALES.indexOf(translateObj[i].code.toLowerCase()) !== -1) {
                // Lowercase all the language codes for ease of comparison later.
                translateObj[i].code = translateObj[i].code.toLowerCase();
                result.push(translateObj[i]);
            }
        }
        acc[langCode] = result;
        return callback();
    });
};

async.transform(SUPPORTED_LOCALES, {}, getLanguageList,
    function (err, result) {
        if (err) {
            throw new Error(err);
        }
        // Result is a single element list containing a map from langauge code
        // to the lang code/name pairs we can translate to. e.g.
        const nameToLanguageCode = buildNameToCodeMap(result);
        const finalObject = {menuMap: result, nameMap: nameToLanguageCode};
        process.stdout.write(JSON.stringify(finalObject));
    });
