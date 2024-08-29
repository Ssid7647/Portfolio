import { detectLanguage, detectScript } from "../helpers/scriptDetection/detectScript.mjs"
import { segmentation } from "../helpers/segmentation/segmentations.mjs"



function scriptDetection(content) {
    try {
        return detectScript(content)
    } catch (error) {
        console.error(error)
    }

}

function languageDetection(content) {
    try {
        return detectLanguage(content)
    } catch (error) {
        console.error(error)
    }

}

function getSegmentations(content, options = { script: "latin", language: "eng" }) {
    try {
        return segmentation(content, options)


    } catch (error) {
        console.error(error)
    }
}




export { scriptDetection, languageDetection, getSegmentations }