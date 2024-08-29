import { scriptDetection, languageDetection, getSegmentations } from "./segmentationApi/apiModule/index.mjs"



let content = "What is your name?"
let script = scriptDetection(content);
let language = languageDetection(content);
let options = { script, language }
console.log({ content, script, language})
let sentences = getSegmentations(content, options);
console.log({ content, script, language, sentences })

