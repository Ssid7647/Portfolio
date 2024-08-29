import React, { useState, useEffect } from 'react';
import { transliterateSentence, init } from './init.js';
const Transliteration = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [targetLanguage, setTargetLanguage] = useState('hin');
    const supportedLanguages = ["arb", "asm", "ben", "hin", "guj", "tam", "mar", "mal", "pan"];

    useEffect(() => {
        (async () => {
          try {
            await init();
            console.log("Models loaded successfully");
          } catch (error) {
            console.error("Failed to initialize models", error);
          }
        })();
      }, []);
    useEffect(() => {
        countWords(inputText);
    }, [inputText]);

    const countWords = (text) => {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setTargetLanguage(e.target.value);
    };

    const transliterate = async () => {
        if (inputText === "") {
            alert("Empty text");
            return;
        }

        try {
            // const response = await fetch('/api/transliteration', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ content: inputText, targetLanguage }),
            // });

            // const data = await response.json();
            const transliterationSentence = transliterateSentence(inputText, targetLanguage)
            setOutputText(transliterationSentence);
            return
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const clearFields = () => {
        setInputText('');
        setOutputText('');
        setWordCount(0);
    };

    return (
        <div className="container m-5">
            <h1 className="mb-4">Transliteration from English to Indian Languages (UNIFIED MODEL)</h1>
            <form id="transliterationForm" className="m-2">
                <div className="form-group">
                    <label htmlFor="inputText">Enter text in English:</label>
                    <textarea
                        placeholder="Type here..."
                        className="form-control"
                        id="inputText"
                        rows="5"
                        value={inputText}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group radios d-flex p-2 m-2" style={{ justifyContent: 'space-around' }}>
                    <label>Choose target language:</label>
                    {supportedLanguages.map(language => (
                        <div className="form-check" key={language}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="targetLanguage"
                                id={language}
                                value={language}
                                checked={targetLanguage === language}
                                onChange={handleLanguageChange}
                            />
                            <label className="form-check-label" htmlFor={language}>{language}</label>
                        </div>
                    ))}
                </div>

                <button type="button" className="btn btn-primary" onClick={transliterate}>Transliterate</button>
                <button type="button" className="btn btn-secondary btn-clear" onClick={clearFields}>Clear</button>
            </form>

            <div className="counter m-5" id="wordCount">Word Count: {wordCount}</div>

            <div className="mt-4">
                <label htmlFor="outputText">Transliterated text:</label>
                <textarea dir="auto" className="form-control" id="outputText" rows="10" value={outputText} readOnly />
            </div>
        </div>
    );
};


export default Transliteration;
