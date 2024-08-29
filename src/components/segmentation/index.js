import React, { useState, useEffect } from 'react';
import eng_data from './segments/eng';
import englishAssamese from './segments/english-Assamese.json';
import englishBengali from './segments/english-Bengali.json';
import englishBodo from './segments/english-Bodo.json';
import englishDogri from './segments/english-Dogri.json';
import englishGujarati from './segments/english-Gujarati.json';
import englishHindi from './segments/english-Hindi.json';
import englishKannada from './segments/english-Kannada.json';
import englishKashmiri_arab from './segments/english-Kashmiri_arab.json';
import englishKashmiri_deva from './segments/english-Kashmiri_deva.json';
import englishKonkani from './segments/english-Konkani.json';
import englishMaithili from './segments/english-Maithili.json';
import englishMalayalam from './segments/english-Malayalam.json';
import englishManipuri from './segments/english-Manipuri.json';
import englishMarathi from './segments/english-Marathi.json';
import englishOriya from './segments/english-Oriya.json';
import englishPunjab from './segments/english-Punjabi.json';
import englishTamil from './segments/english-Tamil.json';
import englishTelugu from './segments/english-Telugu.json';
import englishUrdu from './segments/english-Urdu.json';
import englishSanskrit from './segments/english-Sanskrit.json';
import englishSindhi_arab from './segments/english-Sindhi_arab.json';
import englishSindhi_deva from './segments/english-Sindhi_deva.json';
import { scriptDetection, languageDetection, getSegmentations } from "./segmentationApi/apiModule/index.mjs"

import 'bootstrap/dist/css/bootstrap.min.css';

const Segmentation = () => {
    const [content, setContent] = useState('');
    const [multipleSamples, setMultipleSamples] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [output, setOutput] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState('');

    useEffect(() => {
        if (selectedLanguage) {
            if (selectedLanguage === 'English') {
                setContent(eng_data);
            } else {
                let data;
                switch (selectedLanguage) {
                    case 'Assamese':
                        data = englishAssamese;
                        break;
                    case 'Bengali':
                        data = englishBengali;
                        break;
                    case 'Bodo':
                        data = englishBodo;
                        break;
                    case 'Dogri':
                        data = englishDogri;
                        break;
                    case 'Gujarati':
                        data = englishGujarati;
                        break;
                    case 'Hindi':
                        data = englishHindi;
                        break;
                    case 'Kannada':
                        data = englishKannada;
                        break;
                    case 'Kashmiri_arab':
                        data = englishKashmiri_arab;
                        break;
                    case 'Kashmiri_deva':
                        data = englishKashmiri_deva;
                        break;
                    case 'Konkani':
                        data = englishKonkani;
                        break;
                    case 'Maithili':
                        data = englishMaithili;
                        break;
                    case 'Malayalam':
                        data = englishMalayalam;
                        break;
                    case 'Manipuri':
                        data = englishManipuri;
                        break;
                    case 'Marathi':
                        data = englishMarathi;
                        break;
                    case 'Oriya':
                        data = englishOriya;
                        break;
                    case 'Punjabi':
                        data = englishPunjab;
                        break;
                    case 'Tamil':
                        data = englishTamil;
                        break;
                    case 'Telugu':
                        data = englishTelugu;
                        break;
                    case 'Urdu':
                        data = englishUrdu;
                        break;
                    case 'Sanskrit':
                        data = englishSanskrit;
                        break;
                    case 'Sindhi_arab':
                        data = englishSindhi_arab;
                        break;
                    case 'Sindhi_deva':
                        data = englishSindhi_deva;
                        break;
                    default:
                        data = null;
                }

                if (data) {
                    let augmentedData = [];
                    Object.values(data).forEach((x) => {
                        augmentedData = [...augmentedData, ...Object.keys(x)];
                    });
                    setContent(augmentedData.join('\n'));
                }
            }
        }
    }, [selectedLanguage]);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.id);
    };

    const handleMultipleSamplesChange = (e) => {
        setMultipleSamples(e.target.checked);
    };

    const handleSegmentation = () => {
        if (!content) {
            alert('Please provide content for segmentation');
            return;
        }

        setOutput('');  // Reset output

        let script = null;
        let language = null;

        if (!multipleSamples) {
            // Single Sample for Segmentation
            script = scriptDetection(content);
            language = languageDetection(content);

            if (script && language) {
                setDetectedLanguage(`Language detected: ${language.languageDetected}`);
            }

            const sentences = getSegmentations(content, { script, language });
            // console.log(script,language,sentences)

            if (sentences !== undefined) {
                displaySentences({ sentences, script, language, content: null }, false);
            }
        } else {
            // Multiple Samples for Segmentation
            const wholeContentScript = scriptDetection(content);
            const wholeContentLanguage = languageDetection(content);

            if (wholeContentScript && wholeContentLanguage) {
                setDetectedLanguage(`Language detected: ${wholeContentLanguage.languageDetected}`);
            }

            const contents = content.split("\n").filter((line) => line.length > 0);

            for (let singleContent of contents) {
                if (singleContent !== "") {
                    script = scriptDetection(singleContent);
                    language = languageDetection(singleContent);

                    if (script.length === 0) {
                        continue;
                    }

                    const sentences = getSegmentations(singleContent, { script, language });
                    // console.log(script,language,sentences)
                    const segmentationObj = {
                        content: singleContent,
                        script,
                        language,
                        sentences
                    };

                    displaySentences(segmentationObj, true);
                }
            }
        }
    };

    const handleClearSentences = () => {
        setContent('');
        setOutput('');
        setDetectedLanguage('');
    };

    const displaySentences = (segmentationObj, append) => {
        const newCard = (
            <div className={`card mt-3 ${["urd", "kas_arab", "kas_deva", "snd_arab", "snd_deva"].includes(segmentationObj.language.languageDetected.toLowerCase()) ? "text-right" : "text-left"}`}>
                <div className="card-header d-flex align-items-center gap-3">
                    {multipleSamples && (
                        <>
                            <span className="badge text-bg-primary">{segmentationObj.language.languageDetected.toUpperCase()}</span>
                            <p className="fw-bold mt-3">{segmentationObj.content}</p>
                        </>
                    )}
                </div>
                <ul className="bg-secondary mt-3">
                    {segmentationObj.sentences.map((sentence, index) => (
                        <li key={index} className="text-white">{sentence}</li>
                    ))}
                </ul>
            </div>
        );

        setOutput((prevOutput) => append ? [...prevOutput, newCard] : [newCard]);
    };

    return (
        <div className="container bg-secondary border border-secondary">
            <div className="mb-3 bg-secondary border border-light">
                <h1 className="display-5">Sentence Splitter</h1>
            </div>
            <div>
                <div className="border border-light-subtle bg-secondary">
                    <label htmlFor="content" className="form-label text-md-center">
                        - select desired language
                    </label>
                    <div id="checkbox">
                        {[
                            'Assamese',
                            'Bengali',
                            'Bodo',
                            'Dogri',
                            'English',
                            'Gujarati',
                            'Hindi',
                            'Kannada',
                            'Kashmiri_arab',
                            'Kashmiri_deva',
                            'Konkani',
                            'Maithili',
                            'Malayalam',
                            'Manipuri',
                            'Marathi',
                            'Oriya',
                            'Punjabi',
                            'Tamil',
                            'Telugu',
                            'Urdu',
                            'Sanskrit',
                            'Sindhi_arab',
                            'Sindhi_deva'
                        ].map((language) => (
                            <div key={language} className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id={language}
                                    value={language}
                                    checked={selectedLanguage === language}
                                    onChange={handleLanguageChange}
                                />
                                <label className="form-check-label" htmlFor={language}>
                                    {language}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                <p className="text-center">or</p>
                <hr />
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Enter your content for Segmentation
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        cols="30"
                        rows="10"
                        dir="auto"
                        className="form-control"
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>

                <div className="mb-3 form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="multipleSamples"
                        checked={multipleSamples}
                        onChange={handleMultipleSamplesChange}
                    />
                    <label className="form-check-label" htmlFor="multipleSamples">
                        Multiple Samples
                    </label>
                </div>

                <div className="mb-3">
                    <button className="bg-secondary" type="button" id="btnGetSentences" onClick={handleSegmentation}>
                        Get Segmentation
                    </button>
                    <button className="bg-secondary" type="button" id="btnClearSentences" onClick={handleClearSentences}>
                        Clear Sentences
                    </button>
                </div>

                <div id="detectedLanguage">{detectedLanguage}</div>

                <hr />

                <div className="mb-3">
                    <div id="output">{output}</div>
                </div>
            </div>
        </div>
    );
};

export default Segmentation;
