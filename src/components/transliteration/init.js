// import * as path from "path"
// const path = require('path')
import { numerals } from "./numerals.js"
// const numerals = require()
import { vocab } from "./vocab.js"
// const vocab = require("H:/GoTranslateApi/transliterationApi/vocab.json");

import { Transliteration } from "./transliterations.js"
// const { Transliteration } = require("./transliterations");

const segmenter = new Intl.Segmenter("en", { granularity: 'word' });
const supportedLangNames = ["arb", "asm", "ben", "hin", "guj", "kan", "mar", "mal", "ori", "pan", "tam", "tel"]

const maxLength = 50

let model = null


// console.log(vocab)
const english_lower_script = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97))
    .concat(['é', 'è', 'á']);




const devanagari_script = [
    String.fromCharCode(0x200c),  // ZeroWidth-NonJoiner U+200c
    String.fromCharCode(0x200d),  // ZeroWidthJoiner U+200d
    "ऀ", "ँ", "ं", "ः", "ऄ", "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ऌ", "ऍ", "ऎ", "ए", "ऐ", "ऑ",
    "ऒ", "ओ", "औ", "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण",
    "त", "थ", "द", "ध", "न", "ऩ", "प", "फ", "ब", "भ", "म", "य", "र", "ऱ", "ल", "ळ", "ऴ", "व",
    "श", "ष", "स", "ह", "ऺ", "ऻ", "़", "ऽ", "ा", "ि", "ी", "ु", "ू", "ृ", "ॄ", "ॅ", "ॆ", "े",
    "ै", "ॉ", "ॊ", "ो", "ौ", "्", "ॎ", "ॏ", "ॐ", "॑", "॒", "॓", "॔", "ॕ", "ॖ", "ॗ", "क़", "ख़",
    "ग़", "ज़", "ड़", "ढ़", "फ़", "य़", "ॠ", "ॡ", "ॢ", "ॣ", "।", "॥", "०", "१", "२", "३", "४", "५",
    "६", "७", "८", "९", "॰", "ॱ", "ॲ", "ॳ", "ॴ", "ॵ", "ॶ", "ॷ", "ॸ", "ॹ", "ॺ", "ॻ", "ॼ", "ॽ",
    "ॾ", "ॿ"
];
const arabic_script = [
    "ث",
    "۶",
    "ه",
    "ط",
    "\u0601",
    "ٌ",
    "ڇ",
    "٠",
    "ڌ",
    "ً",
    "ڑ",
    "ڏ",
    "ش",
    "پ",
    "ل",
    "ح",
    "ٻ",
    "ّ",
    "ٓ",
    "،",
    "خ",
    "ب",
    "ژ",
    "ؑ",
    "ڀ",
    "ۂ",
    "َ",
    "ۍ",
    "ا",
    "ڍ",
    "ں",
    "ن",
    "ٚ",
    "ڙ",
    "ٮ",
    "٤",
    "ذ",
    "٧",
    "ص",
    "ڄ",
    "ڪ",
    "ـ",
    "ؤ",
    "ٴ",
    "م",
    "١",
    "ُ",
    "ٕ",
    "گ",
    "ے",
    "ٔ",
    "ِ",
    "غ",
    "د",
    "ٺ",
    "ی",
    "ٹ",
    "ت",
    "٦",
    "ء",
    "۪",
    "ٿ",
    "س",
    "ج",
    "ٖ",
    "چ",
    "ڻ",
    "و",
    "ض",
    "آ",
    "ٰ",
    "ة",
    "ر",
    "٥",
    "ڦ",
    "ۓ",
    "٘",
    "ۄ",
    "ق",
    "ف",
    "ۃ",
    "٩",
    "ک",
    "ي",
    "ڃ",
    "ك",
    "۾",
    "٢",
    "ٽ",
    "ھ",
    "ظ",
    "٣",
    "ٲ",
    "ڈ",
    "ئ",
    "ٛ",
    "ؓ",
    "ڳ",
    "ٗ",
    "ڊ",
    "ڱ",
    "ہ",
    "ۭ",
    "٨",
    "ز",
    "ؐ",
    "ع"
]



export async function init() {

    try {

        // let encoderPath = "./src/components/transliteration/model/bhartiya.encoder.quant.onnx"
        // let decoderPath = "./src/components/transliteration/model/bhartiya.decoder.quant.onnx";


        //path to onnx models in public direcotry of the react project
        let encoderPath = "bhartiya_encoder.onnx"
        let decoderPath = "bhartiya_decoder.onnx";
        // let encoderPath = "bhartiya.encoder.quant.onnx"
        // let decoderPath = "bhartiya.decoder.quant.onnx";
        // let encoderPath = 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/Ssid7647/Portfolio/main/public/model/bhartiya.encoder.quant.onnx';
        // let decoderPath = 'https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/Ssid7647/Portfolio/main/public/model/bhartiya.decoder.quant.onnx';

        let srcVocab = english_lower_script
        let tgtVocab = vocab["global"]


        // // Fetch model files
        // const encoderResponse = await fetch(encoderPath);
        // if (!encoderResponse.ok) {
        //     throw new Error(`Failed to fetch encoder model: ${encoderResponse.statusText}`);
        // }
        // const encoderArrayBuffer = await encoderResponse.arrayBuffer();

        // const decoderResponse = await fetch(decoderPath);
        // if (!decoderResponse.ok) {
        //     throw new Error(`Failed to fetch decoder model: ${decoderResponse.statusText}`);
        // }
        // const decoderArrayBuffer = await decoderResponse.arrayBuffer();

        model = new Transliteration(srcVocab, tgtVocab, encoderPath, decoderPath);
        await model.initialize();



        // console.log(models)
        console.log("::::transliteration model loaded::::")
    } catch (error) {
        console.error("Failed to initialize models", error);
        throw error
    }

}


const scriptClass = {
    "ori": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Oriya}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "Common": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Common}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "eng": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Latin}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|[`<>|!~]/gu,
    "guj": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Gujarati}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "ara": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Arabic}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,

    "hin": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Devanagari}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<([^>]+)>{1}){1}|[`<>|!~]/gu,
    "mar": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Devanagari}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "kon": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Devanagari}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,


    "tam": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Tamil}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "asm": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Bengali}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,

    "ben": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Bengali}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "pan": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Gurmukhi}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "tel": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Telugu}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "kan": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Kannada}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
    "mal": /(?:https?:\/\/[^\s,]+)|(?:www\.[^\s,]+)|(?:\S+@\S+\.\S+)|(?:\d+(?:\.\d+)?)|(?:[\p{Script=Malayalam}'-]+)|\p{P}+|\p{Sc}+|(?:[\p{Script=Latin}'-]+)|(<\/?[^>]+(>|$)){1}|`/gu,
}

const entityMap = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",
    "&apos;": "'",
    "&nbsp;": " ",
    "&copy;": "©",
    "&reg;": "®",
    "&trade;": "™",
    "&euro;": "€",
    "&pound;": "£",
    "&yen;": "¥",
    "&cent;": "¢",
    "&sect;": "§",
    "&deg;": "°",
    "&plusmn;": "±",
    "&times;": "×",
    "&divide;": "÷"
}

function containsSpecialCharacters(word) {
    // Regular expression to match special characters
    // const regex = /[\[\]!@#$%^&*(),.?":{}|<>]/;
    const regex = /[\p{P}|\||`|<|>|^|~|$|+]/gum

    // Test if the word contains any special characters
    return regex.test(word);
}
function wordTokenization(sentence, lang = "eng") {

    // handling html entities
    let modifiedText = sentence.replace(new RegExp(Object.keys(entityMap).join('|'), 'gm'), match => entityMap[match]);

    const emailPattern = /(\S+@\S+\.\S+)(\p{P}+)/gu;
    modifiedText = modifiedText.replace(emailPattern, (_, email, punctuation) => `${email} ${punctuation}`);

    const currency = /(\p{Sc})(\d+(?:\.\d+)?)/gu;
    modifiedText = modifiedText.replace(currency, (_, currencySymbol, amount) => `${currencySymbol} ${amount} `);

    // console.log("modifiedText:::::", modifiedText);
    // Regular expression to tokenize text while preserving URLs, domain names, and contraction words
    let words = modifiedText.match(scriptClass[lang]);
    // console.log("words:::::", words)
    words = words.map((x) => { return x.replaceAll(/\s+/gm, "") })
    words = words.filter((y) => {
        return (y !== "" && y !== undefined && y !== "undefined")
    })
    // console.log("words final:::::", words)
    return words


}

// function wordTokenization(text, locale = 'en') {
//     let segments = [...segmenter.segment(text)];
//     // console.log(segments)
//     segments = segments.filter((x) => { return x.segment !== ' ' }).map((x) => { return x.segment })
//     // const words = [];
//     // for (const segment of segments) {
//     //     if (segment.isWordLike) {
//     //         words.push(segment.segment);
//     //     }
//     // }

//     return segments;
// }


export async function transliterations(word, beam_width = 1, langCode) {
    try {
        if (word.length === 0) {
            return [""]; // Return empty string if word is empty
        }
        if (word.length > maxLength) {
            return ["Max length exceeds...!!!"]; // Return error message if word length exceeds maxLength
        }
        if (supportedLangNames.includes(langCode) === false) {
            return new Error(["Language not supported"]) //Return Error Message if language is not supported
        }
        return await model.transliterate(word, beam_width, langCode)

    } catch (error) {
        throw error;
    }
}


const isNumber = function (str, dotPos) {
    try {

        if (str === null || typeof str === "undefined" || str.length === 0) {
            return false
        }
        if (dotPos) {
            str = str.slice(dotPos - 1, dotPos + 2)
        }
        if (typeof str !== "string") {
            str = str.toString()
        }

        if (str.endsWith(".") || str.endsWith("!") || str.endsWith("?")) {
            str = str.slice(0, str.length - 1)
        }
        const regexp = /^[+|-]{0,1}(\p{Number})+(\.(\p{Number})+)*/gum
        if (str.replaceAll(",", "").match(regexp)[0].length === str.replaceAll(",", "").length) {
            return true
        }

        return false
    } catch (error) {

        return false
    }
};


async function invokeService(word, langCode) {
    return new Promise(async (resolve, reject) => {

        try {
            let translitWords = await transliterations(word.toLowerCase(), 1, langCode)
            return resolve(translitWords[0]);
        } catch (err) {
            return reject(null);
        }
    });
}

function getAsyncTask(word, langCode) {
    return function () {
        return new Promise(async (resolve, reject) => {

            try {
                let data = await invokeService(word, langCode);
                return resolve(data)

            } catch (err) {
                return reject(err)
            }
        });
    }
}



async function parallelWordsProcessing(words, langCode) {
    return new Promise((resolve, reject) => {
        let tasks = []
        // console.log("inside SubmitSelectedSites()")
        for (let word of words) {
            // console.log(site);
            tasks.push(getAsyncTask(word, langCode))
        }
        let asyncTasks = tasks.map((task, index) => {
            return task();
        })
        Promise.allSettled(asyncTasks).then((results) => {
            // console.log("result of submitSelectedSites",results);
            // console.log(results)
            return resolve(results.map(x => x.value))
        }).catch((err) => {
            console.error(err);
            return reject(err)
        });


    });
}







export async function transliterateSentence(sentence, langCode) {
    try {
        if (sentence.length === 0) {
            return new Error("Empty content")
        }
        if (supportedLangNames.includes(langCode) === false) {
            return new Error("Language not supported")
        }


        let tokens = wordTokenization(sentence)
        console.log(tokens)
        let output = await parallelWordsProcessing(tokens, langCode)
        // console.log(tokens)
        // for (let token of tokens) {

        //     // console.log(token,isNumber(token))


        //     let translitWords = await transliterations(token.toLowerCase(), 1, langCode)

        //     output.push(translitWords[0])


        // }
        // console.log({ tokens, output })



        if (langCode === "arb") {

            const arabicPunctuations = {
                ".": "۔",
                "?": "؟",
            }

            // console.log(output)
            output = output.map((token) => {
                if (Object.keys(arabicPunctuations).includes(token)) {
                    return arabicPunctuations[token]
                } else {
                    return token
                }
            })
            // output = output.reverse()
            // console.log(output)

        }

        const normalizedInput = sentence.replace(/\s+/g, ' ').trim();

        output = output.join(" ")
        let normalizedOutput = output.replace(/\s+/g, ' ').trim();

        // Find all special characters or punctuation in the input
        const specialChars = normalizedInput.match(/[\[\]@#$?\.,!]/g);

        // If special characters are found, process them
        if (specialChars) {
            specialChars.forEach(char => {
                // Remove spaces around special characters in the output
                const regex = new RegExp(`\\s*\\${char}`, 'g');
                // const regex = new RegExp(`\\s*\\${char}\\s*`, 'g');

                normalizedOutput = normalizedOutput.replace(regex, char);
            });
        }

        return normalizedOutput;
    } catch (error) {
        console.log(error)
        return null
    }
}
export async function transliterateArrayOfSentence(tokens, langCode) {
    try {
        if (tokens.length === 0) {
            return [""]
        }


        let output = []
        // console.log(tokens)
        for (let token of tokens) {

            // console.log(token,isNumber(token))


            let translitWords = await transliterations(token.toLowerCase(), 1, langCode)

            output.push(translitWords[0])


        }


        console.log(langCode)



        return output.join(" ")



    } catch (error) {
        console.log(error)
        return null
    }
}








// module.exports = { transliterations, transliterateSentence };





