import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { Transcriber } from "../../hooks/useTranscriber";



function titleCase(str: string) {
    str = str.toLowerCase()
    return (str.match(/\w+.?/g) || [])
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
}

// List of supported languages:
// https://help.openai.com/en/articles/7031512-whisper-api-faq
// https://github.com/openai/whisper/blob/248b6cb124225dd263bb9bd32d060b6517e067f8/whisper/tokenizer.py#L79
const LANGUAGES = {
    "en": "english",
    "zh": "chinese",
    "de": "german",
    "es": "spanish/castilian",
    "ru": "russian",
    "ko": "korean",
    "fr": "french",
    "ja": "japanese",
    "pt": "portuguese",
    "tr": "turkish",
    "pl": "polish",
    "ca": "catalan/valencian",
    "nl": "dutch/flemish",
    "ar": "arabic",
    "sv": "swedish",
    "it": "italian",
    "id": "indonesian",
    "hi": "hindi",
    "fi": "finnish",
    "vi": "vietnamese",
    "he": "hebrew",
    "uk": "ukrainian",
    "el": "greek",
    "ms": "malay",
    "cs": "czech",
    "ro": "romanian/moldavian/moldovan",
    "da": "danish",
    "hu": "hungarian",
    "ta": "tamil",
    "no": "norwegian",
    "th": "thai",
    "ur": "urdu",
    "hr": "croatian",
    "bg": "bulgarian",
    "lt": "lithuanian",
    "la": "latin",
    "mi": "maori",
    "ml": "malayalam",
    "cy": "welsh",
    "sk": "slovak",
    "te": "telugu",
    "fa": "persian",
    "lv": "latvian",
    "bn": "bengali",
    "sr": "serbian",
    "az": "azerbaijani",
    "sl": "slovenian",
    "kn": "kannada",
    "et": "estonian",
    "mk": "macedonian",
    "br": "breton",
    "eu": "basque",
    "is": "icelandic",
    "hy": "armenian",
    "ne": "nepali",
    "mn": "mongolian",
    "bs": "bosnian",
    "kk": "kazakh",
    "sq": "albanian",
    "sw": "swahili",
    "gl": "galician",
    "mr": "marathi",
    "pa": "punjabi/panjabi",
    "si": "sinhala/sinhalese",
    "km": "khmer",
    "sn": "shona",
    "yo": "yoruba",
    "so": "somali",
    "af": "afrikaans",
    "oc": "occitan",
    "ka": "georgian",
    "be": "belarusian",
    "tg": "tajik",
    "sd": "sindhi",
    "gu": "gujarati",
    "am": "amharic",
    "yi": "yiddish",
    "lo": "lao",
    "uz": "uzbek",
    "fo": "faroese",
    "ht": "haitian creole/haitian",
    "ps": "pashto/pushto",
    "tk": "turkmen",
    "nn": "nynorsk",
    "mt": "maltese",
    "sa": "sanskrit",
    "lb": "luxembourgish/letzeburgesch",
    "my": "myanmar/burmese",
    "bo": "tibetan",
    "tl": "tagalog",
    "mg": "malagasy",
    "as": "assamese",
    "tt": "tatar",
    "haw": "hawaiian",
    "ln": "lingala",
    "ha": "hausa",
    "ba": "bashkir",
    "jw": "javanese",
    "su": "sundanese",
}

export function ModelSelect(props: {
    transcriber: Transcriber;
}) {
    const names = Object.values(LANGUAGES).map(titleCase)
    return (
        <>
            <label>Select the model to use.</label>
            <select
                className='mt-1 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                defaultValue={props.transcriber.model}
                onChange={(e) => {
                    props.transcriber.onModelChange(e.target.value);
                }}
            >
                <option value={"whisper-tiny.en"}>whisper-tiny.en (61MB)</option>
                <option value={"whisper-tiny"}>whisper-tiny (61MB)</option>
                <option value={"whisper-base.en"}>whisper-base.en (103MB)</option>
                <option value={"whisper-base"}>whisper-base (103MB)</option>
                <option value={"whisper-small.en"}>whisper-small.en (290MB)</option>
                <option value={"whisper-small"}>whisper-small (290MB)</option>
            </select>
            {
                !props.transcriber.model.endsWith('.en') && (
                    <>
                        <label>Select the source language.</label>
                        <select
                            className='mt-1 mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            defaultValue={props.transcriber.language}
                            onChange={e => {
                                props.transcriber.onLanguageChange(e.target.value);
                            }}
                        >
                            {
                                Object.keys(LANGUAGES)
                                    .map((key, i) => (
                                        <option key={key} value={key}>{names[i]}</option>
                                    ))
                            }
                        </select>
                    </>
                )
            }
        </>
    );
}