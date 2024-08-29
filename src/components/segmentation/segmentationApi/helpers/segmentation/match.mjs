import Helper from "../main/main.mjs"
import Base from "./base.mjs"
import * as cheerio from 'cheerio'


class Match extends Base {
    constructor(scripts, lang) {
        super()


        this._helper = new Helper()
        this._script = scripts
        this._lang = lang
        this._stopwords = []
        this._abbreviations = []
        this._fileExtensions = []
        this._tlds = []
        this._init = () => {
            this.set()
            // console.log("is abbd Mr.:::", this._abbreviations.includes("Mr"))
        }
        this._init()

        // this._helper.on("update", () => {
        //     // @ts-ignore
        //     this._update()
        // })
    }

    set() {
        try {


            if (this._script === null || this._lang === null) {
                throw new Error("Please provide valid inputs")
            }


            //setting abbr,stopwords 
            this._stopwords = [...this._stopwords, ...this._helper.get("stopwords", this._lang)]
            this._abbreviations = [...this._abbreviations, ...this._helper.get("abbreviations", this._lang)]
            // this._lang.forEach((lang) => {
            //     this._stopwords = [...this._stopwords, ...this._helper.get("stopwords", lang)]
            //     this._abbreviations = [...this._abbreviations, ...this._helper.get("abbreviations", lang)]
            // })
            //setting fileExtensions
            this._fileExtensions = Object.keys(this._helper.get("fileExtensionsWithMimeTypes"));
            this._tlds = this._helper.get("tlds")
            // console.log("abbr Mt:::",this._abbreviations.includes("Mt".toLocaleLowerCase()))

        } catch (error) {
            console.error(error)
        }
    }
    get() {

    }
    clear() {
        throw new Error("function not overridden")
    }
    update() {
        try {
            this.set();
            return
        } catch (error) {
            console.error(error)
        }
    }

    isCapitalized = function (str) {
        if (/([a-z]|[A-Z])+/gm.test(str) === true) {
            return /^[A-Z]{1,}.*/.test(str) || this.isNumber(str)
        }
        return false;
    };
    // KDK - Added Check for Comma, Brackets etc.
    isSentenceStarter = function (str) {

        str = this.cleanBrackets(str)
        // Hint - Cleaning Tags and Punctuations
        var cleanedString = str.replace(/(<[^>]*>)|(\p{gc=Punctuation})/gmu, "");

        return (this.isNumber(cleanedString) || /^[A-Z]{1,}/.test(cleanedString));
    };

    escapeCharactersInRegExp = function (str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };


    // KDK - Added returnBoolean flag for clarity
    // Added as fallback to check against actual word as abbervations
    // MG - regex /(?!(\w+(?!([^<]+)?>)))./ changed to /(?!(\w+(?!([^<]+)?>)))\./
    isCommonAbbreviation = function (str, returnBoolean = false) {
        try {
            var cleanedString = str.replace(/(<[^>]*>)|(\p{gc=Punctuation})/gmu, "");
            cleanedString = this.cleanBrackets(cleanedString)
            // console.log("abbr::",cleanedString)

            if (returnBoolean === true) {


                return (this._abbreviations.includes(cleanedString) || this._abbreviations.includes(cleanedString.toLowerCase()));
            }
            return ~this._abbreviations.indexOf(cleanedString);
        } catch (error) {
            console.error(error)
        }
    };
    // KDK - Added all possible combinations of time abbreviations
    isTimeAbbreviation = function (word, next, strictWordCheck = false) {
        var timeAbbreviations = [ /*"A.M.",*/ "a.m.", /*"P.M.",*/ "p.m."];

        if (strictWordCheck === true) {
            return timeAbbreviations.indexOf(word) > -1;
        }

        if (timeAbbreviations.indexOf(word) > -1) {
            var tmp = next.replace(/\W+/g, "")
                .slice(-3)
                .toLowerCase();
            if (tmp === "day") {
                return true
            }
        }
        return false
    };
    // KDK - Added Function for Handling Geo Coordinates
    isGeoCoordinates = function (word, next) {

        // Cheking againts ['N°.', '1026.253.553']

        if (word.indexOf("°") > -1) {
            if (next.indexOf(".") > -1) {
                var parts = next.split(".");
                //old check
                // if (isNaN(Number(parts[0])) === false) {
                //     return true;
                // }
                //new Check
                let flag = true
                parts.forEach((part) => {
                    if (this.isNumber(part) === false) {
                        flag = false
                    }
                })
                return flag;
            }

        }

        return false;

    }
    isDottedAbbreviation = function (word) {
        try {
            // let char = word.split(".").filter((x) => {
            //     return x !== ""
            // }).length;
            // let charNum = word.split("").filter((x) => {
            //     return /\p{Letter}{1}/u.test(x)
            // }).length;
            if (this.isURL(word.slice(0, word.length - 1)) === true) {

                return false;
            }

            return /^\p{Alpha}+\.\p{Alpha}+\./gmu.test(word.replace(/[\(\)\[\]\{\}]/g, ""))
        } catch (error) {
            return false
        }
    }



    isCustomAbbreviation = function (str) {

        // to handle custom words having length more than 2
        let customWords = [
            "ডব্লিউ",
            "এক্স",
            "এইচ",
            "প্রশ্ন",
            "ডব্লিউ",
            "এক্স",
            "ওয়াই",
            "डब्ल्यू",
            "एक्स",
            "હું",
            "ડબલ્યુ",
            "એક્સ",
            "ನಾನು",
            "ಡಬ್ಲ್ಯೂ",
            "എച്ച്",
            "ഡബ്ല്യു",
            "എക്സ്",
            "ਡਬਲਯੂ",
            "ਐਕਸ",
            "எஃப்",
            "நான்",
            "என்",
            "டபிள்யூ", "எக்ஸ்"
        ]


        function getAkhsharCount(word) {

            let wordCharacters = word.split("").filter((char) => {
                //
                //return hindiAkshars.includes(char) || gujAkshars.includes(char);
                return /\p{Letter}/u.test(char) && /\p{Number}/u.test(char) === false;
            }
            )

            return wordCharacters.length;

        }
        //cleaning string
        str = str.replace(/([\(|\[|\{|\"|\'|\`|\)|\]|\}|\"|\'|\`]{1})/g, "")
        //adding check of number
        if (this.isNumber(str) === true) {
            return false
        }
        // console.log(str)
        // console.log(customWords.includes(str.slice(0, str.length - 1)))

        const regexp = /^(\p{Alpha}{1,4}\.\p{Alpha}{1,4}\.)+/gu

        if (str.endsWith(".")) {

            //to check if abbr is in english
            if (/([a-z]|[A-Z])+\./gm.test(str) === true && /^\p{Upper}/gu.test(str) && str.length <= 3) {
                return true
            }

            //checking for stopwords
            if (this._stopwords.includes(str.slice(0, str.length - 1))) {
                return false
            }

            if (str.length <= 3) {

                return true
            }

            if (customWords.includes(str.slice(0, str.length - 1))) {
                return true;
            }


            if (regexp.test(str) === true) {
                //a.b.c.
                if (this.isURL(str.slice(0, str.length - 1)) === false) {
                    return false;
                }

                str.split(".").filter((x) => {
                    return x.length !== 0
                }
                ).forEach((y) => {
                    //to be checked : if the value need to change
                    if (getAkhsharCount(y) >= 3) {
                        return false
                    }
                }
                )
                return true
            }
            if (getAkhsharCount(str) < 3) {
                return true
            }
        }
        return false;
    }



    isNameAbbreviation = function (words, wordCount) {
        if (words.length > 0) {
            /*
            if (wordCount < 5 && words[0].length < 6 && this.isCapitalized(words[0])) {
                return true
            }
            */
            var capitalized = words.filter(function (str) {
                return /[A-Z]/.test(str.charAt(0))
            });
            return capitalized.length >= 3
        }
        return false
    };


    //MG
    isNumber = function (str, dotPos) {
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
    }

    isPhoneNr = function (str) {
        return str.match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/)
    };
    isURL = function (str) {
        return str.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/) !== null ? true : false
    };
    isTLD = function (str) {
        return ~this._tlds.indexOf(str.replace(/(\W+)(<[^>]*>)/g, ""));
    };

    // KDK - Added Hashtag Check
    isHashTag = function (str) {
        // old regex /^(#[a-z\d-]+)/
        //MG
        if (/^(#{1}[\p{Alpha}\p{Number}]+)/gmu.test(str)) {
            return true;
        }
        return false;
    }

    // KDK - Added returnBoolean flag for clarity
    isStopWord = function (str, returnBoolean = false) {
        //to be tested
        str = str.toLocaleLowerCase()
        if (/([a-z]|[A-Z])+/gm.test(str) === true) {
            if (returnBoolean === true) {
                return this._stopwords.indexOf(str.replace(/(\W+)(<[^>]*>)/g, "")) > -1 || this._stopwords.indexOf(str.replace(/(?!(\w+(?!([^<]+)?>)))./g, "")) > -1;
            }
            return ~this._stopwords.indexOf(str.replace(/(\W+)(<[^>]*>)/g, ""));
        }
        else {
            // if (returnBoolean === true) {
            //     return stopwords_hi.indexOf(str.replace(/(<[^>]*>)/g, "")) > -1 || stopwords_guj.indexOf(str.replace(/(<[^>]*>)/g, "")) > -1
            // }
            // return ~stopwords_hi.indexOf(str.replace(/(<[^>]*>)/g, "")) || ~stopwords_guj.indexOf(str.replace(/(<[^>]*>)/g, ""));
            if (returnBoolean === true) {
                return this._stopwords.indexOf(str.replace(/(<[^>]*>)/g, "")) > -1
            }
            return ~this._stopwords.indexOf(str.replace(/(<[^>]*>)/g, ""))
        }

    };



    isFileExtension = function (str) {
        return ~this._fileExtensions.indexOf(str.replace(/(\W+)(<[^>]*>)/g, ""));
    };
    isDotPrefixedWord = function (word) {
        var isStartsWithDot = word.startsWith(".");
        var regexDotSeperatedWordsRegEx = new RegExp(/((\w+\.\w+)|(\.\w+))(?!([^<]+)?>)/, 'g'); //new RegExp(/(\w+\.\w+)(?!([^<]+)?>)/, 'g');
        var matchesOfDotSeperatedWordsRegEx = word.match(regexDotSeperatedWordsRegEx);

        if (isStartsWithDot) {
            return true;
        } else if (matchesOfDotSeperatedWordsRegEx) {

            var splitedWords = matchesOfDotSeperatedWordsRegEx[0].split(".");

            // Checking word after dot is in capital (first letter|number only).
            var isCapitalizedAfterDot = this.isCapitalized(splitedWords[1]);

            if (isCapitalizedAfterDot) {

                // Checking against word before dot.
                var isStartsWithAbbreviation = this.isCommonAbbreviation(splitedWords[0]);
                if (isStartsWithAbbreviation) {
                    return true;
                }

                // Checking against words after dot.							
                var isStopWordMatch = this.isStopWord(splitedWords[1].toLowerCase());
                var isTLDMatch = this.isTLD(splitedWords[1].toLowerCase());
                var isFileExtensionMatch = this.isFileExtension(splitedWords[1].toLowerCase());

                if (isFileExtensionMatch) {
                    return true;
                } else if (isTLDMatch && isStopWordMatch && splitedWords[1].length < 4) {
                    return false;
                } else if (!isTLDMatch && !isStopWordMatch && splitedWords[1].length >= 3) {
                    return false;
                } else if (isTLDMatch && !isStopWordMatch && splitedWords[1].length >= 3) {
                    return true;
                } else if (isStopWordMatch) {
                    return false;
                } else {
                    return true;
                }

            } else {
                var isDotAfterClosingTag = new RegExp(/(<\/[^>]\.*>)\./, 'g');
                return true;
            }

        } else {
            if (word.toLowerCase()
                .includes("href") ||
                word.toLowerCase()
                    .includes("title") ||
                word.toLowerCase()
                    .includes("src")) {
                return true;
            }
        }
        return false;
    };
    isConcatenated = function (word) {
        var i = 0;

        if ((i = word.indexOf(".")) > -1) {

            var indexOfPeriod = -1;
            var match = /(\.)(?!([^<]+)?>)/.exec(word);

            if (match) {
                indexOfPeriod = match.index;
            }

            if (indexOfPeriod === -1) {
                return false;
            } else {
                i = indexOfPeriod;
            }

            var c = word.charAt(i + 1);
            //adding regex for eng as well as hindi char identification
            //old condition : c.match(/[a-zA-Z].*/) || hindiAkshars.includes(c) === true || gujAkshars.includes(c) === true
            if (c.match(/\p{Alpha}.*/gmu)) {
                if (word.slice(0, i).length == 0) {
                    return [word.charAt(i), word.slice(i + 1)]
                } else {
                    return [word.slice(0, i).concat(word.charAt(i)), word.slice(i + 1)]
                }
            }
        } else if ((i = word.indexOf("!")) > -1) {

            var indexOfExclaimationMark = -1;
            var match = /(\!)(?!([^<]+)?>)/.exec(word);

            if (match) {
                indexOfExclaimationMark = match.index;
            }

            if (indexOfExclaimationMark === -1) {
                return false;
            } else {
                i = indexOfExclaimationMark;
            }

            var c = word.charAt(i + 1);
            if (c.match(/\p{Alpha}.*/gmu)) {
                if (word.slice(0, i)
                    .length == 0) {
                    return [word.charAt(i), word.slice(i + 1)]
                } else {
                    return [word.slice(0, i)
                        .concat(word.charAt(i)), word.slice(i + 1)
                    ]
                }

            }

        } else if ((i = word.indexOf("?")) > -1) {

            var indexOfQuestionMark = -1;
            var match = /(\?)(?!([^<]+)?>)/.exec(word);

            if (match) {
                indexOfQuestionMark = match.index;
            }

            if (indexOfQuestionMark === -1) {
                return false;
            } else {
                i = indexOfQuestionMark;
            }

            var c = word.charAt(i + 1);
            if (c.match(/\p{Alpha}.*/gmu)) {
                if (word.slice(0, i)
                    .length == 0) {
                    return [word.charAt(i), word.slice(i + 1)]
                } else {
                    return [word.slice(0, i)
                        .concat(word.charAt(i)), word.slice(i + 1)
                    ]
                }

            }
        } else if ((i = word.indexOf("।")) > -1) {

            var indexOfQuestionMark = -1;
            var match = /(\।)(?!([^<]+)?>)/.exec(word);

            if (match) {
                indexOfQuestionMark = match.index;
            }

            if (indexOfQuestionMark === -1) {
                return false;
            } else {
                i = indexOfQuestionMark;
            }

            var c = word.charAt(i + 1);
            if (c.match(/\p{Alpha}.*/gmu)) {
                if (word.slice(0, i)
                    .length == 0) {
                    return [word.charAt(i), word.slice(i + 1)]
                } else {
                    return [word.slice(0, i)
                        .concat(word.charAt(i)), word.slice(i + 1)
                    ]
                }

            }
        } else if ((i = word.indexOf("॥")) > -1) {

            var indexOfQuestionMark = -1;
            var match = /(\॥)(?!([^<]+)?>)/.exec(word);

            if (match) {
                indexOfQuestionMark = match.index;
            }

            if (indexOfQuestionMark === -1) {
                return false;
            } else {
                i = indexOfQuestionMark;
            }

            var c = word.charAt(i + 1);
            if (c.match(/\p{Alpha}.*/gmu)) {
                if (word.slice(0, i)
                    .length == 0) {
                    return [word.charAt(i), word.slice(i + 1)]
                } else {
                    return [word.slice(0, i)
                        .concat(word.charAt(i)), word.slice(i + 1)
                    ]
                }

            }
        }


        return false;
    };

    isSuperScriptBoundary = function (word, nword) {
        if (word === "@~@" && /<sup/g.test(nword)) {
            return true;
        } else if (word === "@~@" && !this.isCapitalized(nword) && !/<[a-z]{1,}/g.test(nword)) {
            return true;
        } else {
            return false;
        }
    };
    isBoundaryChar = function (word) {

        //MG : purnaviram added as a boundary char
        word = this.cleanBrackets(word)
        return word === "." || word === "!" || word === "?" || word === "।"
    };

    // KDK - Added for handling "[.?!]<sup|sub" tags as "[.?!] <sup|sub"
    fixSentenceWithNextSUPOrSUB = function (str) {
        var regexp = /([\.|\?\!]{1,}<[sup|sub]{3})/g;
        var matches = str.match(regexp);
        if (matches && matches.length > 0) {
            var parts = matches[0].split("");
            parts[0] = parts[0].concat(" ");
            var replacement = parts.join("");
            str = str.replace(regexp, replacement);
        }
        return str;
    };

    // KDK - Added method for cleaning brackets at start or end of a word for further lookup.
    cleanBrackets = function (word) {
        try {
            if (word !== "") {
                var regexpStartsWithBrackets = /(^[\(|\[|\{\"|\'|\`]{1,})/;
                var regexpEndsWithBrackets = /([\)|\]|\}|\"|\'|\`]{1,}$)/;

                if (regexpStartsWithBrackets.test(this.stripTags(word)) === true) {
                    return word.replace(regexpStartsWithBrackets, "");
                } else if (regexpEndsWithBrackets.test(this.stripTags(word)) === true) {
                    return word.replace(regexpEndsWithBrackets, "");
                } else {
                    return word;
                }
            }
            return word


        } catch (error) {
            return word

        }

    }

    // KDK - Added method for cleaning word for performing evaluation against Number, Stopword, Abbreviation etc.
    stripTags = function (str) {
        // console.log("insdie original funrtion")
        try {
            return str.replace(/(<[^>]*>)/g, "");
        } catch (error) {
            throw error
        }


    };

    /*
    var stripTagss = function stripTagss(str) {
        console.log("inside function", str);
        return str.replace(/(<[^>]*>)/g, "");
    };
    */

    getAllChilds = function (node) {
        var childs = [];

        if (node && node.childNodes.length > 0) {
            Array.prototype.push.apply(childs, node.childNodes);
        }

        var nodeChildrens = Array.from(node.querySelectorAll('*'));

        for (var index = 0, length = nodeChildrens.length; index < length; index++) {
            Array.prototype.push.apply(childs, nodeChildrens[index].childNodes);
        }

        return childs;
    };
    // getWords = function (markupString) {
    //     var words = []
    //         , whitespaceDelimeter = "@--@"
    //         , whitespaceFinderRegExp = /\s+/g
    //         , contentType = "text/html";

    //     var doc = new DOMParser()
    //         .parseFromString(markupString, contentType);

    //     if (doc.body.childElementCount > 0) {

    //         var allChilds = this.getAllChilds(doc.body);

    //         for (var index = 0, length = allChilds.length; index < length; index++) {
    //             if (allChilds[index] && allChilds[index].nodeType === 3) {
    //                 allChilds[index].nodeValue = allChilds[index].nodeValue.replace(whitespaceFinderRegExp, whitespaceDelimeter);
    //             }
    //         }

    //         Array.prototype.push.apply(words, doc.body.innerHTML.split(whitespaceDelimeter));

    //     } else {

    //         doc.body.innerHTML = doc.body.innerHTML.replace(whitespaceFinderRegExp, whitespaceDelimeter);
    //         Array.prototype.push.apply(words, doc.body.innerHTML.split(whitespaceDelimeter));

    //         /*
    //         doc.body.textContent = doc.body.textContent.replace(whitespaceFinderRegExp, whitespaceDelimeter);
    //         Array.prototype.push.apply(words, doc.body.textContent.split(whitespaceDelimeter));
    //         */
    //     }

    //     return words;

    // };
    isServer = function () {
        try {
            return !(typeof window != 'undefined' && window.document);

        } catch (error) {
            return false
        }

    }

    getWords = function (markupString) {
        var words = []
            , whitespaceDelimeter = "@--@"
            , whitespaceFinderRegExp = /\s+/g
            , contentType = "text/html";

        // console.log(this.isServer());



        if (this.isServer() !== true) {

            // @ts-ignore
            var doc = new DOMParser().parseFromString(markupString, contentType);

            // console.log(doc)

            if (doc.body.childElementCount > 0) {

                var allChilds = this.getAllChilds(doc.body);

                for (var index = 0, length = allChilds.length; index < length; index++) {
                    if (allChilds[index] && allChilds[index].nodeType === 3) {
                        allChilds[index].nodeValue = allChilds[index].nodeValue.replace(whitespaceFinderRegExp, whitespaceDelimeter);
                    }
                }

                Array.prototype.push.apply(words, doc.body.innerHTML.split(whitespaceDelimeter));

            } else {

                doc.body.innerHTML = doc.body.innerHTML.replace(whitespaceFinderRegExp, whitespaceDelimeter);
                Array.prototype.push.apply(words, doc.body.innerHTML.split(whitespaceDelimeter));

                /*
                doc.body.textContent = doc.body.textContent.replace(whitespaceFinderRegExp, whitespaceDelimeter);
                Array.prototype.push.apply(words, doc.body.textContent.split(whitespaceDelimeter));
                */
            }

            return words



        }
        else {
            // @ts-ignore
            try {
                const $ = cheerio.load(markupString, {
                    xmlMode: true,
                    decodeEntities: true, // Decode HTML entities.
                    withStartIndices: false, // Add a `startIndex` property to nodes.
                    withEndIndices: false, // Add an `endIndex` property to nodes.
                });
                console.log($)
                let text = $.text()
                text = text.replace(whitespaceFinderRegExp, whitespaceDelimeter);
                Array.prototype.push.apply(words, text.split(whitespaceDelimeter));

                return words
            }
            catch (error) {
                console.error(error)
            }


        }
        // return words.filter((x) => { return x !== "" && x.length > 0 && x !== null });




    };


    isEnglishWord = function (str) {
        return /[a-z|A-Z]+/.test(str)
    }

    getMeta = function (word, next = null) {
        try {
            let wordMeta = {
                "word": word,
                "isCapitalized": false,
                "isSentenceStarter": false,
                "isCommonAbbreviation": false,
                "isCustomAbbreviation": false,
                "isTimeAbbreviation": false,
                "isGeoCoordinates": false,
                "isDottedAbbreviation": false,
                "isNumber": false,
                "isURL": false,
                "isTLD": false,
                "isHashTag": false,
                "isStopWord": false,
                "isDotPrefixedWord": false,
                "isConcatenated": false,
                "isSuperScriptBoundary": false,
                "isBoundaryChar": false
            };
            wordMeta.isBoundaryChar = this.isBoundaryChar(word)
            if (wordMeta.isBoundaryChar === true) {
                return wordMeta;
            }
            wordMeta.isCapitalized = this.isCapitalized(word);
            wordMeta.isSentenceStarter = this.isSentenceStarter(word);
            wordMeta.isCommonAbbreviation = this.isCommonAbbreviation(word, true);

            if (wordMeta.isCommonAbbreviation === true) {
                return wordMeta
            }
            wordMeta.isCustomAbbreviation = this.isCustomAbbreviation(word);
            if (wordMeta.isCustomAbbreviation) {
                return wordMeta
            }

            wordMeta.isStopWord = this.isStopWord(word, true);

            if (next !== null) {
                wordMeta.isTimeAbbreviation = this.isTimeAbbreviation(word, next, true);
                wordMeta.isGeoCoordinates = this.isGeoCoordinates(word, next);
            }

            wordMeta.isDottedAbbreviation = this.isDottedAbbreviation(word);
            //  wordMeta.current.isNameAbbreviation = this.isNameAbbreviation(current);
            wordMeta.isNumber = this.isNumber(word, false);
            // wordMeta.current.isPhoneNr = this.isPhoneNr(current);
            wordMeta.isURL = this.isURL(word);
            wordMeta.isTLD = this.isTLD(word);
            wordMeta.isHashTag = this.isHashTag(word);

            // wordMeta.isFileExtension = this.isFileExtension(word);
            wordMeta.isDotPrefixedWord = this.isDotPrefixedWord(word);
            wordMeta.isConcatenated = this.isConcatenated(word);
            wordMeta.isSuperScriptBoundary = this.isSuperScriptBoundary(word);

            return wordMeta;

        } catch (error) {
            console.log(error)

        }


    }
    wordMetaData = function (prev = null, current, next = null) {
        try {
            let wordMeta = {
                "current": null,
                "prev": null,
                "next": null
            };


            //for current word
            wordMeta.current = this.getMeta(current, next)


            //for prev word
            if (prev !== null && prev !== undefined && prev.length !== 0) {
                wordMeta.prev = this.getMeta(prev, current)
            }

            //for next word
            if (next !== null && next !== undefined && next.length !== 0) {
                wordMeta.next = this.getMeta(next, null)
            }
            return wordMeta;

        } catch (error) {
            console.error(error)
        }


    };


}


export default Match