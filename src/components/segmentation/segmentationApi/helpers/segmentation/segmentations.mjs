import sanitizeHtml from "./sanitizeHtml.mjs"
import { endsWith, endsWithChar } from "./String.mjs"
import match from "./match.mjs"


let Match = null

// @ts-ignore
const Punctuations = {
    "asm": ["।", "?", "!"],
    "ben": ["।", "?", "!"],
    "dgx": ["।", "?", "!"],
    "eng": [".", "?", "!"],
    "hin": ["।", "?", "!"],
    "kon": ["।", "?", "!"],//to be verify
    "mar": [".", "?", "!"],
    "mai": ["।", "?", "!"],
    "nep": ["।", "?", "!"],
    "guj": [".", "?", "!"],
    "kan": [".", "?", "!"],
    "mal": [".", "?", "!"],
    "ori": ["।", "?", "!"],
    "tam": [".", "?", "!"],
    "pan": ["।", "?", "!"],
    "tel": [".", "?", "!"]
    //RTL languages to be included

}
function sentenceStrings(sentences) {

    var strings = [];
    var sentence = "";
    for (var i = 0; i < sentences.length; i++) {

        sentence = sentences[i].join(" ");

        if (sentences[i].length === 1 && sentences[i][0].length < 4 && sentences[i][0].indexOf(".") > -1) {
            if (sentences[i + 1] && sentences[i + 1][0].indexOf(".") < 0) {

                if (sentences[i][0] === ".") {
                    sentence += sentences[i + 1].join(" ");
                } else {
                    sentence += " " + sentences[i + 1].join(" ");
                }

                i++

            }
        }

        strings.push(sentence)

    }



    return strings
};
var sentenceWords = function (sentences) {

    var words = [];
    var sentence = "";
    for (var i = 0; i < sentences.length; i++) {

        sentence = sentences[i];

        if (sentences[i].length === 1 && sentences[i][0].length < 4 && sentences[i][0].indexOf(".") > -1) {
            if (sentences[i + 1] && sentences[i + 1][0].indexOf(".") < 0) {

                sentence = sentences[i].concat(sentences[i + 1]);
                i++

            }
        }

        words.push(sentence)

    }

    return words


};

// @ts-ignore
function cleanSentences(sentences, newLine_placeHolder_t = null, isRTL = false) {


    try {
        let filteredSentences = []
        if (isRTL === false) {

            if (sentences.length === 0) {
                return []
            }

            for (let sentence of sentences) {
                // @ts-ignore
                filteredSentences = [...filteredSentences, ...sentence.split(/\\n|\\r|\\r\\n|\\t|\\n\\r|\\\\n/gm).filter((x) => { return x !== "" | " " })]
            }

        } else {



            // let filteredSentences = []
            // if (sentences.length === 0) {
            //     return []
            // }

            // for (let sentence of sentences) {
            //     filteredSentences = [...filteredSentences, ...sentence.split(/\\n|\\r|\\r\\n|\\n|\\t|\\r|\\\\n/gm).filter((x) => { return x !== "" | " " })]

            // }
            // console.log(filteredSentences)


        }

        // @ts-ignore
        return filteredSentences.filter((x) => { return x !== "" | " " })



    } catch (error) {
        console.error(error)
    }
}
function isContinued(wordMeta) {

    try {
        // @ts-ignore
        const { prev, current, next } = wordMeta


        // handling words ending with period
        if (endsWithChar(current.word, ".")) {

            //checking if next word exists
            if (next !== null) {

                //handling . ., . ? , . ! 
                if (next.isDot || next.isBoundaryChar) {
                    return true
                }
                // handling A. P. J. 
                if (current.word.length === 2 && current.isNumber === false) {
                    //Conflicting case
                    // KDK - Added Check for Next Word Not Stop Word
                    if (next.isStopWord === false) {
                        return true
                    }

                    if (current.isCapitalized === false && next.isStopWord === true) {
                        return true
                    }
                }

                //to handle geo coordinates
                if (current.isGeoCoordinates) {
                    return true
                }


                if (current.isCommonAbbreviation && next.isSentenceStarter && next.isNumber === false && next.isStopWord === false) {
                    return true
                }

                // tohandle Nov. 29.
                if ((current.isCommonAbbreviation || current.isCustomAbbreviation) && next.isNumber && endsWithChar(next.word, ".?!।॥")) {
                    return true
                }

                //regex to check for English and is sentence starter
                //to be tested for number
                if (/[a-z|A-Z|0-9]+/gm.test(next.word) === true && next.isSentenceStarter) {

                    if (current.isTimeAbbreviation) {
                        return true
                    }
                    if (current.isCustomAbbreviation && next.isNumber) {
                        return true
                    }

                    // if ((next.isCustomAbbreviation === false  next.isCommonAbbreviation === false) && next.isStopWord === false && (current.isDottedAbbreviation || next.isDottedAbbreviation)) {
                    //     return true
                    // }
                    if ((next.isCustomAbbreviation === false && next.isCommonAbbreviation === false) && next.isStopWord === false && ((current.isDottedAbbreviation || next.isDottedAbbreviation)) === true) {
                        return true
                    }
                    if (current.isCommonAbbreviation && (next.isCommonAbbreviation || next.isCustomAbbreviation)) {
                        return true
                    }
                    // to handle Rs. 50 lakh
                    if (current.isCommonAbbreviation && current.word.toLocaleLowerCase() === "rs.") {
                        return true
                    }



                }


                else {

                    // if (String.endsWith(current.word, "..")) {
                    //     return true
                    // }

                    if (next.isBoundaryChar) {
                        return true
                    }

                    if (current.isCommonAbbreviation && (next.isCommonAbbreviation || next.isCustomAbbreviation)) {
                        return true
                    }
                    if (current.isCommonAbbreviation) {
                        return true
                    }

                    if (current.isDottedAbbreviation) {
                        return true
                    }

                    //to put check for named abbreviation


                    if (current.word.toLocaleLowerCase().includes("href") || current.word.toLocaleLowerCase().includes("title") || current.word.toLocaleLowerCase().includes("src")) {
                        return true
                    }

                    // KDK - Added for checking next word with lower case letter
                    // KDK - Added check for next word is not HashTag

                    if (next.isHashTag === false) {
                        // KDK  - Added for handling Purn Viram (।) character in current word to stop continue (false -- true) modified.
                        // KDK  - Addeed for handling Hindi Sentences with Period/Dot Ending instead of Purn Viram character.

                        if ((current.isCommonAbbreviation || current.isCustomAbbreviation) === true && endsWithChar(current.word, ".?!।॥") === true && next.isStopWord === false) {
                            return true
                        }

                        // KDK - Added check for next word is stop word but in lowercase letter

                        if ((current.word.indexOf("।") > -1 === false || current.word.indexOf("॥") > -1 === false) && next.isStopWord && /([a-z|A-Z])+/gm.test(next.word) === true && next.isCapitalized === false) {
                            return true
                        }

                    }

                }

            }

        }


        return false
    }
    catch (error) {
        console.error(error)
    }
}


function getMeta(word, next) {
    try {
        let wordMeta = {
            "word": word,
            "isDot": false,
            "isCapitalized": false,
            "isSentenceStarter": false,
            "isCommonAbbreviation": false,
            "isCustomAbbreviation": false,
            "isTimeAbbreviation": false,
            "isGeoCoordinates": false,
            "isDottedAbbreviation": false,
            "isNumber": false,
            "isURL": false,
            // "isTLD": false,
            "isHashTag": false,
            "isStopWord": false,
            "isDotPrefixedWord": false,
            "isConcatenated": false,
            "isSuperScriptBoundary": false,
            "isBoundaryChar": false,
            "endsWithChar": false,
            "isWikiSquareLink": false,
            "isEndsWithChar": false


        };
        // console.log("word:::::::", word)
        wordMeta.isDot = Match.cleanBrackets(word) === "." ? true : false

        wordMeta.isBoundaryChar = Match.isBoundaryChar(Match.cleanBrackets(word))
        if (wordMeta.isBoundaryChar === true) {
            return wordMeta;
        }
        wordMeta.isEndsWithChar = endsWithChar(Match.cleanBrackets(word), ".?!।॥")
        wordMeta.isCapitalized = Match.isCapitalized(word);
        wordMeta.isSentenceStarter = Match.isSentenceStarter(word);
        wordMeta.isCommonAbbreviation = Match.isCommonAbbreviation(word, true);

        if (wordMeta.isCommonAbbreviation === true) {
            return wordMeta
        }
        wordMeta.isCustomAbbreviation = Match.isCustomAbbreviation(word);
        if (wordMeta.isCustomAbbreviation) {
            return wordMeta
        }

        wordMeta.endsWithChar = endsWithChar(word, ".?!")

        wordMeta.isStopWord = Match.isStopWord(word, true);
        wordMeta.isDottedAbbreviation = Match.isDottedAbbreviation(word);
        //  wordMeta.current.isNameAbbreviation = this.isNameAbbreviation(current);
        wordMeta.isNumber = Match.isNumber(word, false);
        // wordMeta.current.isPhoneNr = this.isPhoneNr(current);
        wordMeta.isURL = Match.isURL(word);
        // wordMeta.isTLD = Match.isTLD(word);
        wordMeta.isHashTag = Match.isHashTag(word);

        // wordMeta.isFileExtension = this.isFileExtension(word);
        wordMeta.isDotPrefixedWord = Match.isDotPrefixedWord(word);
        wordMeta.isConcatenated = Match.isConcatenated(word);
        wordMeta.isSuperScriptBoundary = Match.isSuperScriptBoundary(word);

        wordMeta.isConcatenated = Match.isConcatenated(word) ? true : false
        wordMeta.isWikiSquareLink = /([\.|\?|!|॥|।](\[{1}[\p{Number}+|\p{Alpha}+]\]{1}){1,}){1}$/gmu.test(word) === true ? true : false;

        if (next !== null) {
            wordMeta.isTimeAbbreviation = Match.isTimeAbbreviation(word, next, true);
            wordMeta.isGeoCoordinates = Match.isGeoCoordinates(word, next);

        }





        return wordMeta;

    } catch (error) {
        console.log(error)

    }

}

function getWordMeta(prev = null, current = null, next = null) {
    try {
        let wordMeta = {
            "current": null,
            "prev": null,
            "next": null
        };
        //for current word
        wordMeta.current = getMeta(current, next)


        //for prev word
        if (prev !== null && prev !== undefined && prev.length !== 0) {
            wordMeta.prev = getMeta(prev, current)
        }

        //for next word
        if (next !== null && next !== undefined && next.length !== 0) {
            wordMeta.next = getMeta(next, null)
        }
        return wordMeta;

    } catch (error) {
        console.error(error)
        return {}
    }
}

// @ts-ignore
function RTL(text, options) {

    try {
        // Match = new match(options.script, options.language.languageDetected)
        return { "sentences": cleanSentences(text.match(/[^\u06D4\u061F\u06C0]*[\u061F\u06D4\u06C0]+/gmu), null, true), "toBeJoined": false }
    } catch (error) {
        console.error(error)
    }
}
function LTR(text, options) {
    try {

        // console.log(options)
        //creating match class instance
        // Match = new match(options.script, Object.keys(options.language.score))

       
        Match = new match(options.script, options.language.languageDetected)

     

        var newline_placeholder = " @~@ ";
        var newline_placeholder_t = newline_placeholder.trim();

        if (options.newline_boundaries) {
            text = text.replace(/\n+|[-#=_+*]{4,}/g, newline_placeholder)
        }

        if (options.html_boundaries) {
            var html_boundaries_regexp = "(<br\\s*\\/?>|<\\/(" + options.html_boundaries_tags.join("|") + ")>)";
            var re = new RegExp(html_boundaries_regexp, "g");
            text = text.replace(re, "$1" + newline_placeholder)
        }

        if (options.sanitize || options.allowed_tags) {
            if (!options.allowed_tags) {
                options.allowed_tags = [""]
            }
            text = sanitizeHtml(text, {
                allowedTags: options.allowed_tags
            })
        }

        //to handle [12] in wikipedia
        // text = text.replace(/(\[{1}\p{Number}+\]{1}){1}/gmu, ` $1 `)



        // to check if text contains purnaviram "।"\
        // if (text.indexOf("।") > -1) {

        //     return { "sentences": cleanSentences(text.match(/[^\u0964\u003F\u0021]*[\u0964\u003f\u0012]+/gmu), newline_placeholder_t, false), "toBeJoined": false }
        // }

        // console.log(text)
        let words = Match.getWords(text)
        // console.log(words)

        // console.log("Total Words => ", words.length);
        // console.log("Words => ", words);



        if (!words || !words.length) {
            return []
        }

        var wordCount = 0;
        var index = 0;
        var temp = [];
        var sentences = [];
        var current = [];


        for (var i = 0, L = words.length; i < L; i++) {

            wordCount++;

            //general checks
            if (words[i] === "\n" || words[i] === "\r") {
                sentences.push(current);
                sentences.push([words[i]]);
                current = [];
                wordCount = 0;
                continue
            }

            // Handling "\n" within words without space
            if (words[i].indexOf("\\n") > -1) {

                var parts = words[i].split("\\n");

                current.push(parts[0]);
                sentences.push(current);

                current = [];
                wordCount = 0;

                if (parts.length > 2) {
                    // @ts-ignore
                    for (var pi = 1; pi < pi.length - 1; pi++) {
                        var wordFromPart = parts[pi];
                        if (wordFromPart.length !== 0) {
                            // @ts-ignore
                            if (pi === pi.length - 2) {
                                current.push(parts[pi]);
                            } else {
                                sentences.push(parts[pi]);
                            }
                        }
                    }
                } else {
                    if (parts[1].length > 0) {
                        current.push(parts[1]);
                    }
                }

                continue;
            }





            current.push(words[i]);
            // console.log("current:::::",current)

            if (~words[i].indexOf(",")) {
                wordCount = 0
            }

            //mk
            //cleaning the word
            //words[i]=Match.stripTags(words[i])
            if (words[i].length !== 0) {
                let testWord = words[i]
                    .replace(/(<[^>]*>)/g, "")
                    .split(" ")
                    .filter((z) => {
                        return z.length > 0;
                    });

                // console.log(testWord)

                if (testWord.length > 0) {
                    words[i] = testWord[0];
                    if (/([\.|\?|!|॥|।](\[{1}[\p{Number}+|\p{Alpha}+]\]{1}){1,}){1}$/gmu.test(words[i]) === true) {
                        sentences.push(current);
                        wordCount = 0;
                        current = [];
                        continue;
                    }
                    // if (testWord.length > 1) {
                    //   // testWord.shift();
                    //   // words.splice(i + 1, 0, ...testWord);
                    //   L = words.length;
                    // }
                    //   console.log("updated words array:", words);

                    //   console.log(words[i]);
                }
            }



            let wordMeta = getWordMeta((i === 0 ? null : words[i - 1]), words[i], (i === L - 1 ? null : words[i + 1]));

            // console.log(wordMeta.current)
            //if word doesn't have any conflict
            if (Object.values(wordMeta.current).includes(true) === false) {
                continue
            }


            // for sentences  ending with ? | and !
            // @ts-ignore
            if (endsWithChar(wordMeta.current.word, "?!।॥") || current.word === newline_placeholder_t) {

                if (wordMeta.next !== null && (wordMeta.next.isCapitalized === true || wordMeta.next.isHashTag)) {
                    if ((options.newline_boundaries || options.html_boundaries) && wordMeta.current.word === newline_placeholder_t) {
                        current.pop()
                    }
                    //to handle .[45]
                    if (wordMeta.next && wordMeta.next.isWikiSquareLink) {
                        current.push(wordMeta.next.word)
                        i++
                    }
                    sentences.push(current)
                    wordCount = 0
                    current = []
                    continue;

                }
                else {
                    if (wordMeta.next && wordMeta.next.isWikiSquareLink) {
                        current.push(wordMeta.next.word)
                        i++
                    }
                    sentences.push(current)
                    wordCount = 0
                    current = []
                    continue;
                }

            }


            if (endsWithChar(wordMeta.current.word, ".")) {
                if (isContinued(wordMeta) === true) {
                    continue
                } else {
                    if (wordMeta.next !== null && wordMeta.next.isWikiSquareLink) {
                        current.push(wordMeta.next.word)
                        i++
                    }
                    sentences.push(current)
                    wordCount = 0
                    current = []
                    continue;
                }
            }

            //addtitional checks
            if ((index = words[i].indexOf(".")) > -1) {

                if (Match.isNumber(words[i], index)) {
                    continue
                }

                if (Match.isDottedAbbreviation(words[i])) {
                    continue
                }

                if (Match.isURL(words[i]) || Match.isPhoneNr(words[i])) {
                    continue
                }

                if (Match.isDotPrefixedWord(words[i])) {
                    continue
                }

            }

            // @ts-ignore
            if (temp = Match.isConcatenated(words[i])) {
                current.pop();
                current.push(temp[0]);
                sentences.push(current);
                current = [];
                wordCount = 0;
                current.push(temp[1]);
            }


        }


        if (current.length) {
            sentences.push(current)
        }

        sentences = sentences.filter(function (s) {
            return s.length > 0
        });

        return { "sentences": sentences, "toBeJoined": true }



    } catch (error) {
        console.error(error)
    }
}
// @ts-ignore
function isRTL(script, lang) {
    try {
        // console.log("detected lang",lang)
        const rtlLangs = ["kas", "urd", "snd"]
        return rtlLangs.includes(lang.languageDetected) === true;
    } catch (error) {
        console.error(error)
    }
}


var buildSentences = function (text, options) {
    try {

        // console.log(text,options)

        let output = null
        if (isRTL(options.script, options.language) === true) {

            // console.log(":::::::::::::calling RTL ::::::::::")

            output = RTL(text, options)
            // console.log(output)
            // to be made later

        } else {
            output = LTR(text, options)

        }

        return output

    } catch (error) {
        console.error(error)
        return { sentences: [], }
    }
}


const segmentation = (text, user_options) => {
    try {


        if (!text || typeof text !== "string" || !text.length) {
            return []
        }

        var options = {
            parse_type: "strings"
            , newline_boundaries: false
            , html_boundaries: false
            , html_boundaries_tags: ["p", "div", "ul", "ol"]
            , sanitize: false
            , allowed_tags: false
            , abbreviations: null
        };

        if (typeof user_options === "boolean") {
            options.newline_boundaries = true
        } else {
            for (var k in user_options) {
                options[k] = user_options[k]
            }
        }




        // @ts-ignore
        var { sentences, toBeJoined } = buildSentences(text, options);

      


        if (toBeJoined === true) {
            if (options.parse_type === "words") {
                return sentenceWords(sentences)
            } else {
                return sentenceStrings(sentences)

            }
        } else {
            return sentences
        }


    } catch (error) {
        console.error(error)
    }

}


export { segmentation }
