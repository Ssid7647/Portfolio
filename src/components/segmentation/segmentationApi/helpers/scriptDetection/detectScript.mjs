
import data from "./helper.mjs"
const output = {
    "languageDetected": null,
    "score": {}
}


const { unicode, unicodeTags, stopwords } = data

function maxFrequecy(counter, wordLength) {
    try {


        // console.log(counter)
        let maxScriptObj = {}
        for (let key of Object.keys(counter)) {

            if (typeof counter[key] === "number") {

                let score = Math.ceil((counter[key] / wordLength) * 100)
                if (score > 50) {
                    output.languageDetected = key
                    output.score[key] = score
                    return output
                }
                else {
                    maxScriptObj[key] = (counter[key] / wordLength) * 100
                }


            }
            else {
                // let max = Object.keys(counter[key]).reduce((a, b) => counter[key][a] > counter[key][b] ? a : b)


                // maxScriptObj[max] = (counter[key][max] / wordLength) * 100
                Object.keys(counter[key]).forEach((x) => {
                    maxScriptObj[x] = (counter[key][x] / wordLength) * 100
                })
            }
        }



        // console.log(maxScriptObj)

        let frequencyStats = {}
        Object.keys(maxScriptObj).sort((a, b) => maxScriptObj[b] - maxScriptObj[a]).forEach((x) => { frequencyStats[x] = maxScriptObj[x] })
        output.languageDetected = Object.keys(maxScriptObj).reduce((a, b) => maxScriptObj[a] > maxScriptObj[b] ? a : b)
        output.score = frequencyStats
        return output

    } catch (error) {
        console.error(error)
        return null
    }

}

function scriptsFrequency(keys, data) {
    try {


        let counter = keys
        // Object.keys(keys).forEach(key => {
        //     counter[key] = keys[key]
        // });

        // console.log(counter)


        data = data.split(/\s/gm).filter((x) => { return x.length !== 0 && /\p{P}/gu.test(x) === false })

        for (let key of Object.keys(keys)) {
            let stopwordsArray = []
            if (typeof stopwords[key] === 'object') {

                Object.keys(stopwords[key]).forEach((x) => {
                    // console.log(parseInt(x),typeof parseInt(x))
                    // @ts-ignore
                    if (/\p{Number}/ug.test(parseInt(x)) === false) {
                        if (typeof counter[key] === "object") {

                            counter[key][x] = 0
                        } else {

                            counter[key] = new Object()
                            counter[key][x] = 0
                        }
                    }
                })
            }
            else {

                stopwordsArray = stopwords[key]
            }


            for (let word of data) {
                try {
                    if (typeof counter[key] === "number") {
                        if (stopwords[key].includes(word) === true) {
                            counter[key]++
                        }
                    }
                    else {
                        for (let script of Object.keys(counter[key])) {
                            try {
                                // console.log(script)
                                if (stopwords[key][script].includes(word) === true) {
                                    counter[key][script]++
                                }
                            } catch (error) {
                                continue
                            }
                        }
                    }
                } catch (error) {
                    continue
                }

            }

        }


        return maxFrequecy(counter, data.length);

        //calculating script 



    } catch (error) {
        console.error(error)
    }
}

//detecting text language
function detectLanguage(data) {
    try {
        if (data !== "") {
            let scripts = detectScript(data)
            if (scripts.length !== 0) {
                return scriptsFrequency(scripts, data)
            }
            else {
                throw new Error("invalid scripts")
            }
        } else {
            throw new Error("empty data")
        }



    } catch (error) {
        console.error(error)
        return output
    }

}


function detectScript(data) {
    try {
        if (data !== "") {
            //removing numbers and special characters
            // console.log(data)
            data = data.replaceAll(/\p{P}|\p{Number}|/gum, "")

            let totalWords = [...data.matchAll(/\p{Alpha}+/gumi)].map(x => x[0])
            // console.log(totalWords)


            let keys = {};
            for (let scriptTag of Object.keys(unicodeTags)) {
                try {
                    let regex = "\\p{Script=" + scriptTag + "}+"
                    // console.log(regex)
                    regex = new RegExp(regex, "gmui")
                    // console.log(regex.test(data));

                    if (regex.test(data) === true) {

                        // console.log("detected ::::::::::::",scriptTag)
                        let scriptWords = [...data.matchAll(regex)].map(x => x[0])
                        // console.log(scriptWords, totalWords)
                        // console.log(scriptWords.length, totalWords.length)
                        let scriptContentPercentage = (scriptWords.length / totalWords.length) * 100;
                        keys[scriptTag] = scriptContentPercentage
                    }
                } catch (error) {
                    console.log(scriptTag)
                    continue
                }

            }


            return keys;
        }
        else {
            throw new Error("Empty data")
        }

    } catch (error) {
        console.error(error)
        return []
    }
};






export { detectLanguage, detectScript };
