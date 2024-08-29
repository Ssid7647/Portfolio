(function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.sbd = f()
    }
})

    (function () {
        var define, module, exports;
        return function e(t, n, r) {
            function s(o, u) {
                if (!n[o]) {
                    if (!t[o]) {
                        var a = typeof require == "function" && require;
                        if (!u && a)
                            return a(o, !0);
                        if (i)
                            return i(o, !0);
                        var f = new Error("Cannot find module '" + o + "'");
                        throw f.code = "MODULE_NOT_FOUND"
                        , f
                    }
                    var l = n[o] = {
                        exports: {}
                    };
                    t[o][0].call(l.exports, function (e) {
                        var n = t[o][1][e];
                        return s(n ? n : e)
                    }, l, l.exports, e, t, n, r)
                }
                return n[o].exports
            }
            var i = typeof require == "function" && require;
            for (var o = 0; o < r.length; o++)
                s(r[o]);
            return s
        }
            ({
                1: [function (require, module, exports) {

                    var abbreviations;

                    // var englishAbbreviations = ["abbr", "abbrv", "abbrev", "al", "adj", "assn", "Ave", "BSc", "MSc", "Cell", "Ch", "Co", "co", "cc", "Corp", "Dem", "Dept", "ed", "eg", "e.g", "e.g.", "eg.", "Eg", "E.g.", "E.g", "Eg.", "Eq", "Eqs", "Est", "est", /*"etc",*/ "Ex", "ext", "Fig", "fig", "Figs", "figs", "i.e.", "i.e", "ie", "Inc", "inc", "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Sept", "Oct", "Nov", "Dec", "jr", "max", "mi", "min", "Miss", "Mrs", "Mr", "Ms", "Smt", "Sh", "Mol", "mt", "mts", "No", "no", "Nos", "PhD", "Ph.D", "MD", "BA", "MA", "MM", "pl", "pop", "pp", "Prof", "Dr", "pt", "Ref", "Refs", "Rep", "repr", "rev", "Sec", "Secs", "Sgt", "Col", "Gen", "Rep", "Sen", "Gov", "Govt", "govt", "Lt", "Maj", "Capt", "St", "st", "Sr", "sr", "Jr", "jr", "Rev", "Sun", "Mon", "Tu", "Tue", "Tues", "Wed", "Th", "Thu", "Thur", "Thurs", "Fri", "Sat", "trans", "Univ", "Viz", "viz", "Vol", "vs", "v", "Hon", "hon", "Tel", "tel", "Ph", "ph", "Add", "dt", "Pvt", "Ltd", "wef", "Bt", "Shri", "ft", "feat", "reg", "opp", "Opp", "Rs", "INR", "hrs", "sqm", "Sqm", "Avg", "avg", "Us", "Act", "seq", "km", "invt", "Kt", "Gr", "ADVT", "Advt", "Tech", /*"a.m.", "p.m.",*/ "Mt"];
                    var englishAbbreviations = [
                        ...["abbr", "abbrv", "abbrev", "al", "adj", "assn", "Ave", "BSc", "MSc", "Cell", "Ch", "Co", "co", "cc", "Corp", "Dem", "Dept", "ed", "eg", "e.g", "e.g.", "eg.", "Eg", "E.g.", "E.g", "Eg.", "Eq", "Eqs", "Est", "est", /*"etc",*/ "Ex", "ext", "Fig", "fig", "Figs", "figs", "i.e.", "i.e", "ie", "Inc", "inc", "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Sept", "Oct", "Nov", "Dec", "jr", "max", "mi", "min", "Miss", "Mrs", "Mr", "Ms", "Smt", "Sh", "Mol", "mt", "mts", "No", "no", "Nos", "PhD", "Ph.D", "MD", "BA", "MA", "MM", "pl", "pop", "pp", "Prof", "Dr", "pt", "Ref", "Refs", "Rep", "repr", "rev", "Sec", "Secs", "Sgt", "Col", "Gen", "Rep", "Sen", "Gov", "Govt", "govt", "Lt", "Maj", "Capt", "St", "st", "Sr", "sr", "Jr", "jr", "Rev", "Sun", "Mon", "Tu", "Tue", "Tues", "Wed", "Th", "Thu", "Thur", "Thurs", "Fri", "Sat", "trans", "Univ", "Viz", "viz", "Vol", "vs", "v", "Hon", "hon", "Tel", "tel", "Ph", "ph", "Add", "dt", "Pvt", "Ltd", "wef", "Bt", "Shri", "ft", "feat", "reg", "opp", "Opp", "Rs", "INR", "hrs", "sqm", "Sqm", "Avg", "avg", "Us", "Act", "seq", "km", "invt", "Kt", "Gr", "ADVT", "Advt", "Tech", /*"a.m.", "p.m.",*/ "Mt"],
                        // MG: added hindi  
                        ...["₹", "नं", "सं", "डॉ"],
                        //gujarati
                        ...["૱", "વળો", "ડૉ", "રૂ", "દાત", "નં", "સ", "પ્રો"],
                        //...marathi
                        ...[]
                    ];

                    /*var stopwords_en = ["a", "a's", "able", "about", "above", "according", "accordingly", "across", "actually", "after", "afterwards", "again", "against", "ain't", "all", "allow", "allows", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "aren't", "around", "as", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "b", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "c", "c'mon", "c's", "came", "can", "can't", "cannot", "cant", "cause", "causes", "certain", "certainly", "changes", "clearly", "co", "com", "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldn't", "course", "currently", "d", "definitely", "described", "despite", "did", "didn't", "different", "do", "does", "doesn't", "doing", "don't", "done", "down", "downwards", "during", "e", "each", "edu", "eg", "eight", "either", "else", "elsewhere", "enough", "entirely", "especially", "et", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "f", "far", "few", "fifth", "first", "five", "followed", "following", "follows", "for", "former", "formerly", "forth", "four", "from", "further", "furthermore", "g", "get", "gets", "getting", "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "h", "had", "hadn't", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "he's", "hello", "help", "hence", "her", "here", "here's", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "hi", "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however", "i", "i'd", "i'll", "i'm", "i've", "ie", "if", "ignored", "immediate", "in", "inasmuch", "inc", "indeed", "indicate", "indicated", "indicates", "inner", "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", "it's", "its", "itself", "j", "just", "k", "keep", "keeps", "kept", "know", "known", "knows", "l", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely", "little", "look", "looking", "looks", "ltd", "m", "mainly", "many", "may", "maybe", "me", "mean", "meanwhile", "merely", "might", "more", "moreover", "most", "mostly", "much", "must", "my", "myself", "n", "name", "namely", "nd", "near", "nearly", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "no", "nobody", "non", "none", "noone", "nor", "normally", "not", "nothing", "novel", "now", "nowhere", "o", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", "only", "onto", "or", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "own", "p", "particular", "particularly", "per", "perhaps", "placed", "please", "plus", "possible", "presumably", "probably", "provides", "q", "que", "quite", "qv", "r", "rather", "rd", "re", "really", "reasonably", "regarding", "regardless", "regards", "relatively", "respectively", "right", "s", "said", "same", "saw", "say", "saying", "says", "second", "secondly", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "shall", "she", "should", "shouldn't", "since", "six", "so", "some", "somebody", "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "t", "t's", "take", "taken", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that's", "thats", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "there's", "thereafter", "thereby", "therefore", "therein", "theres", "thereupon", "these", "they", "they'd", "they'll", "they're", "they've", "think", "third", "this", "thorough", "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "twice", "two", "u", "un", "under", "unfortunately", "unless", "unlikely", "until", "unto", "up", "upon", "us", "use", "used", "useful", "uses", "using", "usually", "uucp", "v", "value", "various", "very", "via", "viz", "vs", "w", "want", "wants", "was", "wasn't", "way", "we", "we'd", "we'll", "we're", "we've", "welcome", "well", "went", "were", "weren't", "what", "what's", "whatever", "when", "whence", "whenever", "where", "where's", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "who's", "whoever", "whole", "whom", "whose", "why", "will", "willing", "wish", "with", "within", "without", "won't", "wonder", "would", "wouldn't", "x", "y", "yes", "yet", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "z", "zero"];*/

                    var stopwords = [
                        ...[
                            "অতএব",
                            "অথচ",
                            "অথবা",
                            "অধঃ",
                            "অন্ততঃ",
                            "অৰ্থাৎ",
                            "অৰ্থে",
                            "আও",
                            "আঃ",
                            "আচ্ছা",
                            "আপাততঃ",
                            "আয়ৈ",
                            "আৰু",
                            "আস্‌",
                            "আহা",
                            "আহাহা",
                            "ইতস্ততঃ",
                            "ইতি",
                            "ইত্যাদি",
                            "ইস্",
                            "ইহ",
                            "উঃ",
                            "উৱা",
                            "উস্‌",
                            "এতেকে",
                            "এথোন",
                            "ঐ",
                            "ওঁ",
                            "ওৰফে",
                            "ঔচ্‌",
                            "কি",
                            "কিম্বা",
                            "কিন্তু",
                            "কিয়নো",
                            "কেলেই",
                            "কাচিত্‍",
                            "চোন",
                            "ছাৰি",
                            "ছিকৌ",
                            "ছেই",
                            "ঠাহ্",
                            "ঢুত্‍",
                            "ঢেঁট্‌",
                            "তত",
                            "ততক",
                            "ততেক",
                            "তেতেক",
                            "তত্ৰাচ",
                            "তথা",
                            "তথৈবচ",
                            "তাতে",
                            "তেও",
                            "তো",
                            "তৌৱা",
                            "দেই",
                            "দেহি",
                            "দ্বাৰা",
                            "ধৰি",
                            "ধিক্",
                            "নচেত্‍",
                            "নতুবা",
                            "নি",
                            "নো",
                            "নৌ",
                            "পৰা",
                            "পৰ্যন্ত",
                            "পশ্চাত্‍",
                            "বৰঞ্চ",
                            "বহিঃ",
                            "বাবে",
                            "বাৰু",
                            "বাহ্‌",
                            "বাহিৰে",
                            "বিনে",
                            "বে",
                            "মতে",
                            "যথা",
                            "যদি",
                            "যদ্যপি",
                            "যে",
                            "যেনিবা",
                            "যেনে",
                            "যোগে",
                            "লৈ",
                            "সত্ত্বে",
                            "সমন্ধি",
                            "সম্প্ৰতি",
                            "সহ",
                            "সু",
                            "সেইদেখি",
                            "সৈতে",
                            "স্বতঃ",
                            "হঞে",
                            "হতুৱা",
                            "হন্তে",
                            "হবলা",
                            "হয়",
                            "হা",
                            "হুঁ",
                            "হুই",
                            "হে",
                            "হেই",
                            "হেঃ",
                            "হেতুকে",
                            "হেনে",
                            "হেনো",
                            "হেৰ",
                            "হেৰি",
                            "হৈ",
                            "হোঁ",
                            "ইঃ",
                            "ইচ্",
                            "চুহ্",
                            "চুঃ",
                            "আঁ"
                        ],
                        ...[
                            "এই",
                            "ও",
                            "থেকে",
                            "করে",
                            "এ",
                            "না",
                            "ওই",
                            "এক্",
                            "নিয়ে",
                            "করা",
                            "বলেন",
                            "সঙ্গে",
                            "যে",
                            "এব",
                            "তা",
                            "আর",
                            "কোনো",
                            "বলে",
                            "সেই",
                            "দিন",
                            "হয়",
                            "কি",
                            "দু",
                            "পরে",
                            "সব",
                            "দেওয়া",
                            "মধ্যে",
                            "এর",
                            "সি",
                            "শুরু",
                            "কাজ",
                            "কিছু",
                            "কাছে",
                            "সে",
                            "তবে",
                            "বা",
                            "বন",
                            "আগে",
                            "জ্নজন",
                            "পি",
                            "পর",
                            "তো",
                            "ছিল",
                            "এখন",
                            "আমরা",
                            "প্রায়",
                            "দুই",
                            "আমাদের",
                            "তাই",
                            "অন্য",
                            "গিয়ে",
                            "প্রযন্ত",
                            "মনে",
                            "নতুন",
                            "মতো",
                            "কেখা",
                            "প্রথম",
                            "আজ",
                            "টি",
                            "ধামার",
                            "অনেক",
                            "বিভিন্ন",
                            "র",
                            "হাজার",
                            "জানা",
                            "নয়",
                            "অবশ্য",
                            "বেশি",
                            "এস",
                            "কে",
                            "হতে",
                            "বি",
                            "কয়েক",
                            "সহ ",
                            "বেশ",
                            "এমন",
                            "এমনি",
                            "কেন",
                            "কেউ",
                            "নেওয়া",
                            "চেষ্টা",
                            "লক্ষ ",
                            "বলা",
                            "কারণ",
                            "আছে",
                            "শুধু",
                            "তখন",
                            "যা",
                            "এসে",
                            "চার",
                            "যদি",
                            "আবার",
                            "কোটি",
                            "উত্তর",
                            "সামনে",
                            "উপর",
                            "বক্তব্য",
                            "এত",
                            "প্রাথমিক",
                            "উপরে",
                            "প্রতি",
                            "কাজে",
                            "যখন",
                            "খুব",
                            "বহু",
                            "গেল",
                            "পেয়্র্",
                            "চালু",
                            "ই",
                            "নাগাদ",
                            "থাকা",
                            "পাচ",
                            "যাওয়া",
                            "রকম",
                            "সাধারণ",
                            "কমনে"
                        ],
                        ...[
                            "I",
                            "'ll",
                            "'tis",
                            "'twas",
                            "'ve",
                            "a",
                            "a's",
                            "able",
                            "ableabout",
                            "about",
                            "above",
                            "abroad",
                            "abst",
                            "accordance",
                            "according",
                            "accordingly",
                            "across",
                            "act",
                            "actually",
                            "ad",
                            "added",
                            "adj",
                            "adopted",
                            "ae",
                            "af",
                            "affected",
                            "affecting",
                            "affects",
                            "after",
                            "afterwards",
                            "ag",
                            "again",
                            "against",
                            "ago",
                            "ah",
                            "ahead",
                            "ai",
                            "ain't",
                            "aint",
                            "al",
                            "all",
                            "allow",
                            "allows",
                            "almost",
                            "alone",
                            "along",
                            "alongside",
                            "already",
                            "also",
                            "although",
                            "always",
                            "am",
                            "amid",
                            "amidst",
                            "among",
                            "amongst",
                            "amoungst",
                            "amount",
                            "an",
                            "and",
                            "announce",
                            "another",
                            "any",
                            "anybody",
                            "anyhow",
                            "anymore",
                            "anyone",
                            "anything",
                            "anyway",
                            "anyways",
                            "anywhere",
                            "ao",
                            "apart",
                            "apparently",
                            "appear",
                            "appreciate",
                            "appropriate",
                            "approximately",
                            "aq",
                            "ar",
                            "are",
                            "area",
                            "areas",
                            "aren",
                            "aren't",
                            "arent",
                            "arise",
                            "around",
                            "arpa",
                            "as",
                            "aside",
                            "ask",
                            "asked",
                            "asking",
                            "asks",
                            "associated",
                            "at",
                            "au",
                            "auth",
                            "available",
                            "aw",
                            "away",
                            "awfully",
                            "az",
                            "b",
                            "ba",
                            "back",
                            "backed",
                            "backing",
                            "backs",
                            "backward",
                            "backwards",
                            "bb",
                            "bd",
                            "be",
                            "became",
                            "because",
                            "become",
                            "becomes",
                            "becoming",
                            "been",
                            "before",
                            "beforehand",
                            "began",
                            "begin",
                            "beginning",
                            "beginnings",
                            "begins",
                            "behind",
                            "being",
                            "beings",
                            "believe",
                            "below",
                            "beside",
                            "besides",
                            "best",
                            "better",
                            "between",
                            "beyond",
                            "bf",
                            "bg",
                            "bh",
                            "bi",
                            "big",
                            "bill",
                            "billion",
                            "biol",
                            "bj",
                            "bm",
                            "bn",
                            "bo",
                            "both",
                            "bottom",
                            "br",
                            "brief",
                            "briefly",
                            "bs",
                            "bt",
                            "but",
                            "buy",
                            "bv",
                            "bw",
                            "by",
                            "bz",
                            "c",
                            "c'mon",
                            "c's",
                            "ca",
                            "call",
                            "came",
                            "can",
                            "can't",
                            "cannot",
                            "cant",
                            "caption",
                            "case",
                            "cases",
                            "cause",
                            "causes",
                            "cc",
                            "cd",
                            "certain",
                            "certainly",
                            "cf",
                            "cg",
                            "ch",
                            "changes",
                            "ci",
                            "ck",
                            "cl",
                            "clear",
                            "clearly",
                            "click",
                            "cm",
                            "cmon",
                            "cn",
                            "com",
                            "come",
                            "comes",
                            "computer",
                            "con",
                            "concerning",
                            "consequently",
                            "consider",
                            "considering",
                            "contain",
                            "containing",
                            "contains",
                            "copy",
                            "corresponding",
                            "could",
                            "could've",
                            "couldn",
                            "couldn't",
                            "couldnt",
                            "course",
                            "cr",
                            "cry",
                            "cs",
                            "cu",
                            "currently",
                            "cv",
                            "cx",
                            "cy",
                            "cz",
                            "d",
                            "dare",
                            "daren't",
                            "darent",
                            "date",
                            "de",
                            "dear",
                            "definitely",
                            "describe",
                            "described",
                            "despite",
                            "detail",
                            "did",
                            "didn",
                            "didn't",
                            "didnt",
                            "differ",
                            "different",
                            "differently",
                            "directly",
                            "dj",
                            "dk",
                            "dm",
                            "do",
                            "does",
                            "doesn",
                            "doesn't",
                            "doesnt",
                            "doing",
                            "don",
                            "don't",
                            "done",
                            "dont",
                            "doubtful",
                            "down",
                            "downed",
                            "downing",
                            "downs",
                            "downwards",
                            "due",
                            "during",
                            "dz",
                            "e",
                            "each",
                            "early",
                            "ec",
                            "ed",
                            "edu",
                            "ee",
                            "effect",
                            "eg",
                            "eh",
                            "eight",
                            "eighty",
                            "either",
                            "eleven",
                            "else",
                            "elsewhere",
                            "empty",
                            "end",
                            "ended",
                            "ending",
                            "ends",
                            "enough",
                            "entirely",
                            "er",
                            "es",
                            "especially",
                            "et",
                            "et-al",
                            "etc",
                            "even",
                            "evenly",
                            "ever",
                            "evermore",
                            "every",
                            "everybody",
                            "everyone",
                            "everything",
                            "everywhere",
                            "ex",
                            "exactly",
                            "example",
                            "except",
                            "f",
                            "face",
                            "faces",
                            "fact",
                            "facts",
                            "fairly",
                            "far",
                            "farther",
                            "felt",
                            "few",
                            "fewer",
                            "ff",
                            "fi",
                            "fifteen",
                            "fifth",
                            "fifty",
                            "fify",
                            "fill",
                            "find",
                            "finds",
                            "fire",
                            "first",
                            "five",
                            "fix",
                            "fj",
                            "fk",
                            "fm",
                            "fo",
                            "followed",
                            "following",
                            "follows",
                            "for",
                            "forever",
                            "former",
                            "formerly",
                            "forth",
                            "forty",
                            "forward",
                            "found",
                            "four",
                            "fr",
                            "free",
                            "from",
                            "front",
                            "full",
                            "fully",
                            "further",
                            "furthered",
                            "furthering",
                            "furthermore",
                            "furthers",
                            "fx",
                            "g",
                            "ga",
                            "gave",
                            "gb",
                            "gd",
                            "ge",
                            "general",
                            "generally",
                            "get",
                            "gets",
                            "getting",
                            "gf",
                            "gg",
                            "gh",
                            "gi",
                            "give",
                            "given",
                            "gives",
                            "giving",
                            "gl",
                            "gm",
                            "gmt",
                            "gn",
                            "go",
                            "goes",
                            "going",
                            "gone",
                            "good",
                            "goods",
                            "got",
                            "gotten",
                            "gov",
                            "gp",
                            "gq",
                            "gr",
                            "great",
                            "greater",
                            "greatest",
                            "greetings",
                            "group",
                            "grouped",
                            "grouping",
                            "groups",
                            "gs",
                            "gt",
                            "gu",
                            "gw",
                            "gy",
                            "h",
                            "had",
                            "hadn't",
                            "hadnt",
                            "half",
                            "happens",
                            "hardly",
                            "has",
                            "hasn",
                            "hasn't",
                            "hasnt",
                            "have",
                            "haven't",
                            "havent",
                            "haventoday",
                            "having",
                            "he",
                            "he'd",
                            "he'll",
                            "he's",
                            "hed",
                            "hell",
                            "hello",
                            "help",
                            "hence",
                            "her",
                            "here",
                            "here's",
                            "hereafter",
                            "hereby",
                            "herein",
                            "heres",
                            "hereupon",
                            "hers",
                            "herself",
                            "herse”",
                            "hes",
                            "hi",
                            "hid",
                            "high",
                            "higher",
                            "highest",
                            "him",
                            "himself",
                            "himse”",
                            "his",
                            "hither",
                            "hk",
                            "hm",
                            "hn",
                            "home",
                            "homepage",
                            "hopefully",
                            "how",
                            "how'd",
                            "how'll",
                            "how's",
                            "howbeit",
                            "however",
                            "hr",
                            "ht",
                            "htm",
                            "html",
                            "http",
                            "hu",
                            "hundred",
                            "i",
                            "i'd",
                            "i'll",
                            "i'm",
                            "i've",
                            "i.e.",
                            "id",
                            "ie",
                            "if",
                            "ignored",
                            "ii",
                            "il",
                            "ill",
                            "im",
                            "immediate",
                            "immediately",
                            "importance",
                            "important",
                            "in",
                            "inasmuch",
                            "inc",
                            "inc.",
                            "indeed",
                            "index",
                            "indicate",
                            "indicated",
                            "indicates",
                            "information",
                            "inner",
                            "inside",
                            "insofar",
                            "instead",
                            "int",
                            "interest",
                            "interested",
                            "interesting",
                            "interests",
                            "into",
                            "invention",
                            "inward",
                            "io",
                            "iq",
                            "ir",
                            "is",
                            "isn",
                            "isn't",
                            "isnt",
                            "it",
                            "it'd",
                            "it'll",
                            "it's",
                            "itd",
                            "itll",
                            "its",
                            "itself",
                            "itse”",
                            "ive",
                            "j",
                            "je",
                            "jm",
                            "jo",
                            "join",
                            "jp",
                            "just",
                            "k",
                            "ke",
                            "keep",
                            "keeps",
                            "kept",
                            "keys",
                            "kg",
                            "kh",
                            "ki",
                            "kind",
                            "km",
                            "kn",
                            "knew",
                            "know",
                            "known",
                            "knows",
                            "kp",
                            "kr",
                            "kw",
                            "ky",
                            "kz",
                            "l",
                            "la",
                            "large",
                            "largely",
                            "last",
                            "lately",
                            "later",
                            "latest",
                            "latter",
                            "latterly",
                            "lb",
                            "lc",
                            "least",
                            "length",
                            "less",
                            "lest",
                            "let",
                            "let's",
                            "lets",
                            "li",
                            "like",
                            "liked",
                            "likely",
                            "likewise",
                            "line",
                            "little",
                            "lk",
                            "ll",
                            "long",
                            "longer",
                            "longest",
                            "look",
                            "looking",
                            "looks",
                            "low",
                            "lower",
                            "lr",
                            "ls",
                            "lt",
                            "ltd",
                            "lu",
                            "lv",
                            "ly",
                            "m",
                            "ma",
                            "made",
                            "mainly",
                            "make",
                            "makes",
                            "making",
                            "man",
                            "many",
                            "may",
                            "maybe",
                            "mayn't",
                            "maynt",
                            "mc",
                            "md",
                            "me",
                            "mean",
                            "means",
                            "meantime",
                            "meanwhile",
                            "member",
                            "members",
                            "men",
                            "merely",
                            "mg",
                            "mh",
                            "microsoft",
                            "might",
                            "might've",
                            "mightn't",
                            "mightnt",
                            "mil",
                            "mill",
                            "million",
                            "mine",
                            "minus",
                            "miss",
                            "mk",
                            "ml",
                            "mm",
                            "mn",
                            "mo",
                            "more",
                            "moreover",
                            "most",
                            "mostly",
                            "move",
                            "mp",
                            "mq",
                            "mr",
                            "mrs",
                            "ms",
                            "msie",
                            "mt",
                            "mu",
                            "much",
                            "mug",
                            "must",
                            "must've",
                            "mustn't",
                            "mustnt",
                            "mv",
                            "mw",
                            "mx",
                            "my",
                            "myself",
                            "myse”",
                            "mz",
                            "n",
                            "na",
                            "name",
                            "namely",
                            "nay",
                            "nc",
                            "nd",
                            "ne",
                            "near",
                            "nearly",
                            "necessarily",
                            "necessary",
                            "need",
                            "needed",
                            "needing",
                            "needn't",
                            "neednt",
                            "needs",
                            "neither",
                            "net",
                            "netscape",
                            "never",
                            "neverf",
                            "neverless",
                            "nevertheless",
                            "new",
                            "newer",
                            "newest",
                            "next",
                            "nf",
                            "ng",
                            "ni",
                            "nine",
                            "ninety",
                            "nl",
                            "no",
                            "no-one",
                            "nobody",
                            "non",
                            "none",
                            "nonetheless",
                            "noone",
                            "nor",
                            "normally",
                            "nos",
                            "not",
                            "noted",
                            "nothing",
                            "notwithstanding",
                            "novel",
                            "now",
                            "nowhere",
                            "np",
                            "nr",
                            "nu",
                            "null",
                            "number",
                            "numbers",
                            "nz",
                            "o",
                            "obtain",
                            "obtained",
                            "obviously",
                            "of",
                            "off",
                            "often",
                            "oh",
                            "ok",
                            "okay",
                            "old",
                            "older",
                            "oldest",
                            "om",
                            "omitted",
                            "on",
                            "once",
                            "one",
                            "one's",
                            "ones",
                            "only",
                            "onto",
                            "open",
                            "opened",
                            "opening",
                            "opens",
                            "opposite",
                            "or",
                            "ord",
                            "order",
                            "ordered",
                            "ordering",
                            "orders",
                            "org",
                            "other",
                            "others",
                            "otherwise",
                            "ought",
                            "oughtn't",
                            "oughtnt",
                            "our",
                            "ours",
                            "ourselves",
                            "out",
                            "outside",
                            "over",
                            "overall",
                            "owing",
                            "own",
                            "p",
                            "pa",
                            "page",
                            "pages",
                            "part",
                            "parted",
                            "particular",
                            "particularly",
                            "parting",
                            "parts",
                            "past",
                            "pe",
                            "per",
                            "perhaps",
                            "pf",
                            "pg",
                            "ph",
                            "pk",
                            "pl",
                            "place",
                            "placed",
                            "places",
                            "please",
                            "plus",
                            "pm",
                            "pmid",
                            "pn",
                            "point",
                            "pointed",
                            "pointing",
                            "points",
                            "poorly",
                            "possible",
                            "possibly",
                            "potentially",
                            "pp",
                            "pr",
                            "predominantly",
                            "present",
                            "presented",
                            "presenting",
                            "presents",
                            "presumably",
                            "previously",
                            "primarily",
                            "probably",
                            "problem",
                            "problems",
                            "promptly",
                            "proud",
                            "provided",
                            "provides",
                            "pt",
                            "put",
                            "puts",
                            "pw",
                            "py",
                            "q",
                            "qa",
                            "que",
                            "quickly",
                            "quite",
                            "qv",
                            "r",
                            "ran",
                            "rather",
                            "rd",
                            "re",
                            "readily",
                            "really",
                            "reasonably",
                            "recent",
                            "recently",
                            "ref",
                            "refs",
                            "regarding",
                            "regardless",
                            "regards",
                            "related",
                            "relatively",
                            "research",
                            "reserved",
                            "respectively",
                            "resulted",
                            "resulting",
                            "results",
                            "right",
                            "ring",
                            "ro",
                            "room",
                            "rooms",
                            "round",
                            "ru",
                            "run",
                            "rw",
                            "s",
                            "sa",
                            "said",
                            "same",
                            "saw",
                            "say",
                            "saying",
                            "says",
                            "sb",
                            "sc",
                            "sd",
                            "se",
                            "sec",
                            "second",
                            "secondly",
                            "seconds",
                            "section",
                            "see",
                            "seeing",
                            "seem",
                            "seemed",
                            "seeming",
                            "seems",
                            "seen",
                            "sees",
                            "self",
                            "selves",
                            "sensible",
                            "sent",
                            "serious",
                            "seriously",
                            "seven",
                            "seventy",
                            "several",
                            "sg",
                            "sh",
                            "shall",
                            "shan't",
                            "shant",
                            "she",
                            "she'd",
                            "she'll",
                            "she's",
                            "shed",
                            "shell",
                            "shes",
                            "should",
                            "should've",
                            "shouldn",
                            "shouldn't",
                            "shouldnt",
                            "show",
                            "showed",
                            "showing",
                            "shown",
                            "showns",
                            "shows",
                            "si",
                            "side",
                            "sides",
                            "significant",
                            "significantly",
                            "similar",
                            "similarly",
                            "since",
                            "sincere",
                            "site",
                            "six",
                            "sixty",
                            "sj",
                            "sk",
                            "sl",
                            "slightly",
                            "sm",
                            "small",
                            "smaller",
                            "smallest",
                            "sn",
                            "so",
                            "some",
                            "somebody",
                            "someday",
                            "somehow",
                            "someone",
                            "somethan",
                            "something",
                            "sometime",
                            "sometimes",
                            "somewhat",
                            "somewhere",
                            "soon",
                            "sorry",
                            "specifically",
                            "specified",
                            "specify",
                            "specifying",
                            "sr",
                            "st",
                            "state",
                            "states",
                            "still",
                            "stop",
                            "strongly",
                            "su",
                            "sub",
                            "substantially",
                            "successfully",
                            "such",
                            "sufficiently",
                            "suggest",
                            "sup",
                            "sure",
                            "sv",
                            "sy",
                            "system",
                            "sz",
                            "t",
                            "t's",
                            "take",
                            "taken",
                            "taking",
                            "tc",
                            "td",
                            "tell",
                            "ten",
                            "tends",
                            "test",
                            "text",
                            "tf",
                            "tg",
                            "th",
                            "than",
                            "thank",
                            "thanks",
                            "thanx",
                            "that",
                            "that'll",
                            "that's",
                            "that've",
                            "thatll",
                            "thats",
                            "thatve",
                            "the",
                            "their",
                            "theirs",
                            "them",
                            "themselves",
                            "then",
                            "thence",
                            "there",
                            "there'd",
                            "there'll",
                            "there're",
                            "there's",
                            "there've",
                            "thereafter",
                            "thereby",
                            "thered",
                            "therefore",
                            "therein",
                            "therell",
                            "thereof",
                            "therere",
                            "theres",
                            "thereto",
                            "thereupon",
                            "thereve",
                            "these",
                            "they",
                            "they'd",
                            "they'll",
                            "they're",
                            "they've",
                            "theyd",
                            "theyll",
                            "theyre",
                            "theyve",
                            "thick",
                            "thin",
                            "thing",
                            "things",
                            "think",
                            "thinks",
                            "third",
                            "thirty",
                            "this",
                            "thorough",
                            "thoroughly",
                            "those",
                            "thou",
                            "though",
                            "thoughh",
                            "thought",
                            "thoughts",
                            "thousand",
                            "three",
                            "throug",
                            "through",
                            "throughout",
                            "thru",
                            "thus",
                            "til",
                            "till",
                            "tip",
                            "tis",
                            "tj",
                            "tk",
                            "tm",
                            "tn",
                            "to",
                            "today",
                            "together",
                            "too",
                            "took",
                            "top",
                            "toward",
                            "towards",
                            "tp",
                            "tr",
                            "tried",
                            "tries",
                            "trillion",
                            "truly",
                            "try",
                            "trying",
                            "ts",
                            "tt",
                            "turn",
                            "turned",
                            "turning",
                            "turns",
                            "tv",
                            "tw",
                            "twas",
                            "twelve",
                            "twenty",
                            "twice",
                            "two",
                            "tz",
                            "u",
                            "ua",
                            "ug",
                            "uk",
                            "um",
                            "un",
                            "under",
                            "underneath",
                            "undoing",
                            "unfortunately",
                            "unless",
                            "unlike",
                            "unlikely",
                            "until",
                            "unto",
                            "up",
                            "upon",
                            "ups",
                            "upwards",
                            "us",
                            "use",
                            "used",
                            "useful",
                            "usefully",
                            "usefulness",
                            "uses",
                            "using",
                            "usually",
                            "uucp",
                            "uy",
                            "uz",
                            "v",
                            "va",
                            "value",
                            "various",
                            "vc",
                            "ve",
                            "versus",
                            "very",
                            "vg",
                            "vi",
                            "via",
                            "viz",
                            "vn",
                            "vol",
                            "vols",
                            "vs",
                            "vu",
                            "w",
                            "want",
                            "wanted",
                            "wanting",
                            "wants",
                            "was",
                            "wasn",
                            "wasn't",
                            "wasnt",
                            "way",
                            "ways",
                            "we",
                            "we'd",
                            "we'll",
                            "we're",
                            "we've",
                            "web",
                            "webpage",
                            "website",
                            "wed",
                            "welcome",
                            "well",
                            "wells",
                            "went",
                            "were",
                            "weren",
                            "weren't",
                            "werent",
                            "weve",
                            "wf",
                            "what",
                            "what'd",
                            "what'll",
                            "what's",
                            "what've",
                            "whatever",
                            "whatll",
                            "whats",
                            "whatve",
                            "when",
                            "when'd",
                            "when'll",
                            "when's",
                            "whence",
                            "whenever",
                            "where",
                            "where'd",
                            "where'll",
                            "where's",
                            "whereafter",
                            "whereas",
                            "whereby",
                            "wherein",
                            "wheres",
                            "whereupon",
                            "wherever",
                            "whether",
                            "which",
                            "whichever",
                            "while",
                            "whilst",
                            "whim",
                            "whither",
                            "who",
                            "who'd",
                            "who'll",
                            "who's",
                            "whod",
                            "whoever",
                            "whole",
                            "wholl",
                            "whom",
                            "whomever",
                            "whos",
                            "whose",
                            "why",
                            "why'd",
                            "why'll",
                            "why's",
                            "widely",
                            "width",
                            "will",
                            "willing",
                            "wish",
                            "with",
                            "within",
                            "without",
                            "won",
                            "won't",
                            "wonder",
                            "wont",
                            "words",
                            "work",
                            "worked",
                            "working",
                            "works",
                            "world",
                            "would",
                            "would've",
                            "wouldn",
                            "wouldn't",
                            "wouldnt",
                            "ws",
                            "www",
                            "x",
                            "y",
                            "ye",
                            "year",
                            "years",
                            "yes",
                            "yet",
                            "you",
                            "you'd",
                            "you'll",
                            "you're",
                            "you've",
                            "youd",
                            "youll",
                            "young",
                            "younger",
                            "youngest",
                            "your",
                            "youre",
                            "yours",
                            "yourself",
                            "yourselves",
                            "youve",
                            "yt",
                            "yu",
                            "z",
                            "za",
                            "zero",
                            "zm",
                            "zr"
                        ],
                        ...["થયા",
                            "જીતી",
                            "હતો",
                            "તેથી",
                            "આપણું",
                            "ખાણ",
                            "આપણો",
                            "હવે",
                            "અંદર",
                            "તમે",
                            "તેમના",
                            "આ",
                            "તેના",
                            "તેને",
                            "તે",
                            "તેમને",
                            "એક",
                            "અને",
                            "આવા",
                            "ઘણા",
                            "કર",
                            "કરવું",
                            "કરો",
                            "કહો",
                            "કહ્યું",
                            "ના",
                            "પૂરતૂ",
                            "કેટલુ",
                            "જે",
                            "કર્યું",
                            "પાત્ર",
                            "ચુંબન",
                            "કોઈપણ",
                            "કેટલાક",
                            "કુલ",
                            "પ્રતિ",
                            "કોઈ",
                            "ગયો",
                            "ઘર",
                            "ક્યારે",
                            "જ્યાં",
                            "જાઓ",
                            "જીન",
                            "જેમને",
                            "જીસ",
                            "જેમ",
                            "કે",
                            "સુધી",
                            "પછી",
                            "દયાળુ",
                            "ત્રણ",
                            "તેર",
                            "હતી",
                            "હતા",
                            "ડબારા",
                            "આપ્યો",
                            "બીજો",
                            "અન્ય",
                            "બે",
                            "દ્વારા",
                            "નથી",
                            "નુકે",
                            "નીચે",
                            "છે",
                            "ચાલુ",
                            "પ્રથમ",
                            "સંપૂર્ણ",
                            "પર",
                            "ફરી",
                            "પુસ્તક",
                            "ખૂબ",
                            "બાલા",
                            "સંપૂર્ણપણે",
                            "પણ",
                            "પરંતુ",
                            "હું",
                            "માં",
                            "જો",
                            "અહીં",
                            "અથવા",
                            "યીહ",
                            "રાખવું",
                            "રહ્યા",
                            "અવસા",
                            "માટે",
                            "વર્ગ",
                            "ત્યાં",
                            "રાશિઓ",
                            "વહુ",
                            "તેઓ",
                            "બધા",
                            "સાથે",
                            "જમા",
                            "થી",
                            "માત્ર",
                            "બન્યું",
                            "હુઈ",
                            "હુ",
                            "હો",
                            "હશે",
                            "કર્યા",
                            "બેઉ",
                            "વી",
                            "એ",
                            "સક્ષમ",
                            "સમર્થ",
                            "વિશે",
                            "ઉપર",
                            "વિદેશમાં",
                            "અનુસાર",
                            "સમગ્ર",
                            "કાર્ય",
                            "ખરેખર",
                            "જાહેરાત",
                            "ઉમેર્યું",
                            "વિશેષણ",
                            "અપનાવ્યું",
                            "એઇ",
                            "એએફ",
                            "અસરગ્રસ્ત",
                            "પછીથી",
                            "સામે",
                            "પહેલાં",
                            "આહ",
                            "આગળ",
                            "અલ",
                            "લગભગ",
                            "એકલા",
                            "જોકે",
                            "હંમેશા",
                            "છું",
                            "વચ્ચે",
                            "રકમ",
                            "કંઈપણ",
                            "એઓઓ",
                            "સિવાય",
                            "કદર",
                            "યોગ્ય",
                            "એઆર",
                            "વિસ્તાર",
                            "ઊગવું",
                            "આસપાસ",
                            "અર્પા",
                            "કોરે",
                            "પુછવું",
                            "પૂછ્યું",
                            "સંકળાયેલ",
                            "ઉપલબ્ધ",
                            "અરે",
                            "દૂર",
                            "બા",
                            "પાછા",
                            "સમર્થિત",
                            "ટેકો",
                            "પીઠ",
                            "પછાત",
                            "બીબી",
                            "બીડી",
                            "હોઈ",
                            "બની",
                            "બને",
                            "પહેલાથી",
                            "શરૂઆત",
                            "પાછળ",
                            "હોવા",
                            "જીવો",
                            "બાજુમાં",
                            "ઉપરાંત",
                            "શ્રેષ્ઠ",
                            "બહાર",
                            "દ્વિ",
                            "મોટું",
                            "બિલ",
                            "અબજ",
                            "બાયોલ",
                            "બો",
                            "બંને",
                            "બીઆર",
                            "સંક્ષિપ્તમાં",
                            "ટૂંકમાં",
                            "બી.એસ.",
                            "બીટી",
                            "ખરીદી",
                            "બીવી",
                            "સી",
                            "કમન",
                            "આવ્યા",
                            "કપ્શન",
                            "કેસ",
                            "કારણ",
                            "કારણો",
                            "સીડી",
                            "ચોક્કસ",
                            "ચોક્કસપણે",
                            "ફેરફાર",
                            "ચોખ્ખુ",
                            "સહ",
                            "કોમ",
                            "આવો",
                            "કમ્પ્યુટર",
                            "કોન",
                            "સંબંધિત",
                            "પરિણામે",
                            "ધ્યાનમાં",
                            "ધરાવતું",
                            "નકલ",
                            "અનુરૂપ",
                            "શકવું",
                            "હોત",
                            "કેન",
                            "કેન્ટ",
                            "કોર્સ",
                            "રુદન",
                            "કયુ",
                            "હાલમાં",
                            "સીવી",
                            "સીએક્સ",
                            "સાયક",
                            "ડી",
                            "હિંમત",
                            "પિતૃ",
                            "તારીખ",
                            "પ્રિય",
                            "વર્ણન",
                            "વર્ણવેલ",
                            "છતાં",
                            "વિગતવાર",
                            "નહોતો",
                            "ભિન્ન",
                            "સીધા",
                            "કરી",
                            "ડોન",
                            "શંકાસ્પદ",
                            "ડાઉન",
                            "કારણે",
                            "દરમિયાન",
                            "દરેક",
                            "વહેલી",
                            "ઇડી",
                            "અસર",
                            "એહ",
                            "આઠ",
                            "એંસી",
                            "અગિયાર",
                            "બીજું",
                            "ખાલી",
                            "અંત",
                            "વગેરે",
                            "સમાનરૂપે",
                            "ક્યારેય",
                            "સદા",
                            "બધાને",
                            "બધું",
                            "ભૂતપૂર્વ",
                            "બરાબર",
                            "ઉદાહરણ",
                            "એફ",
                            "ચહેરો",
                            "ચહેરાઓ",
                            "હકીકત",
                            "તથ્યો",
                            "એકદમ",
                            "લાગ્યું",
                            "થોડા",
                            "ઓછા",
                            "એફએફ",
                            "ફાઈ",
                            "પંદર",
                            "પાંચમો",
                            "પચાસ",
                            "ફિફ",
                            "ભરો",
                            "શોધો",
                            "આગ",
                            "પાંચ",
                            "ફો",
                            "અનુસર્યા",
                            "નીચેના",
                            "અગાઉ",
                            "ચાલીસ",
                            "મળી",
                            "ચાર",
                            "મફત",
                            "માંથી",
                            "ભરેલું",
                            "વધુમાં",
                            "જી",
                            "ગા",
                            "જીઇ",
                            "સામાન્ય",
                            "મેળવો",
                            "મેળવવામાં",
                            "ભૂ",
                            "જીઆઈ",
                            "આપો",
                            "આપેલ",
                            "આપે",
                            "આપવું",
                            "ગ્રામ",
                            "જવું",
                            "સારું",
                            "માલ",
                            "મેળવેલ",
                            "મહાન",
                            "વધારે",
                            "શુભેચ્છાઓ",
                            "જૂથ",
                            "જૂથો",
                            "ગુ",
                            "અડધા",
                            "હેવન",
                            "ઉતાવળ",
                            "સ્વર્ગ",
                            "તેમણે",
                            "હેડ",
                            "નરક",
                            "નમસ્તે",
                            "મદદ",
                            "તેણીના",
                            "ત્યારબાદ",
                            "પોતાને",
                            "હર્સે",
                            "સંકોચ",
                            "હાય",
                            "છુપાવેલ",
                            "ઉચ્ચ",
                            "પોતે",
                            "આસ્થાપૂર્વક",
                            "કલાક",
                            "સો",
                            "આઈડી",
                            "અવગણવામાં",
                            "બીમાર",
                            "તાત્કાલિક",
                            "તરત",
                            "મહત્વ",
                            "મહત્વપૂર્ણ",
                            "અનુક્રમણિકા",
                            "સૂચવો",
                            "સંકેત",
                            "માહિતી",
                            "આંતરિક",
                            "પૂર્ણાંક",
                            "રસ",
                            "રસપ્રદ",
                            "રૂચિ",
                            "શોધ",
                            "જોડાઓ",
                            "કીઓ",
                            "કિલોગ્રામ",
                            "કિ.મી.",
                            "જાણો",
                            "જાણીતું",
                            "લા",
                            "મોટા",
                            "છેલ્લા",
                            "નવીનતમ",
                            "બાદમાં",
                            "લંબાઈ",
                            "ઓછું",
                            "કદાચ",
                            "દો",
                            "ચાલો",
                            "ગમ્યું",
                            "શક્યતા",
                            "લાઇન",
                            "થોડું",
                            "લાંબી",
                            "લાંબા",
                            "જુઓ",
                            "જોઈ",
                            "નીચા",
                            "નીચેનું",
                            "લિ",
                            "લુ",
                            "એલવી",
                            "મી",
                            "મા",
                            "બનાવેલું",
                            "મુખ્યત્વે",
                            "બનાવો",
                            "માણસ",
                            "મે",
                            "મેન્ટ",
                            "એમસી",
                            "એમ.ડી.",
                            "મને",
                            "મીન",
                            "અર્થ",
                            "સભ્ય",
                            "સભ્યો",
                            "પુરુષો",
                            "મિલિગ્રામ",
                            "માઇક્રોસોફ્ટ",
                            "શક્તિશાળી",
                            "મિલ",
                            "મિલિયન",
                            "બાદબાકી",
                            "ચૂકી",
                            "એમકે",
                            "મિલી",
                            "મીમી",
                            "એમન",
                            "મો",
                            "વધુ",
                            "ચાલ",
                            "એમપી",
                            "શ્રીમાન",
                            "શ્રીમતી",
                            "મ્યુ",
                            "ઘણું",
                            "પ્યાલો",
                            "મોસ્ટ",
                            "એમવી",
                            "એમએક્સ",
                            "મારા",
                            "એમઝેડ",
                            "એન",
                            "નામ",
                            "એનસી",
                            "ને",
                            "નજીક",
                            "જરૂરી",
                            "જરૂરિયાતમંદ",
                            "જરૂરિયાતો",
                            "ચોખ્ખી",
                            "નેટસ્કેપ",
                            "નિરર્થક",
                            "નવું",
                            "નવી",
                            "ની",
                            "નવ",
                            "નેવું",
                            "એન.એલ.",
                            "બિન",
                            "મધ્યાહન",
                            "સંખ્યા",
                            "નોંધ્યું",
                            "નવલકથા",
                            "નુ",
                            "નલ",
                            "નંબર",
                            "સંખ્યાઓ",
                            "ઓ",
                            "બંધ",
                            "ઓહ",
                            "વૃદ્ધ",
                            "જૂની",
                            "ઓમ",
                            "એકવાર",
                            "ખુલ્લા",
                            "ખોલ્યું",
                            "ઉદઘાટન",
                            "વિરુદ્ધ",
                            "ઓર્ડર",
                            "અન્યથા",
                            "જોઈએ",
                            "અવિરત",
                            "અમારા",
                            "જાતને",
                            "એકંદરે",
                            "પોતાના",
                            "પી",
                            "પા",
                            "પાનું",
                            "પૃષ્ઠો",
                            "ભાગ",
                            "વિભાજિત",
                            "ખાસ",
                            "વિદાય",
                            "ભાગો",
                            "ભૂતકાળ",
                            "પીઈ",
                            "સ્થળ",
                            "મૂકવામાં",
                            "સ્થાનો",
                            "વત્તા",
                            "બપોરે",
                            "બિંદુ",
                            "પોઇન્ટેડ",
                            "પોઇન્ટિંગ",
                            "પોઇન્ટ",
                            "નબળી",
                            "શક્ય",
                            "સંભવત",
                            "સંભવિત",
                            "પીપી",
                            "પીઆર",
                            "હાજર",
                            "પ્રસ્તુત",
                            "ભેટ",
                            "સંભવત.",
                            "સમસ્યા",
                            "સમસ્યાઓ",
                            "ગર્વ",
                            "પીટી",
                            "મૂકો",
                            "તદ્દન",
                            "દોડ્યું",
                            "બદલે",
                            "સહેલાઇથી",
                            "તાજેતરમાં",
                            "રેફ",
                            "અનુલક્ષીને",
                            "સાદર",
                            "પ્રમાણમાં",
                            "સંશોધન",
                            "અનામત",
                            "અનુક્રમે",
                            "પરિણામ",
                            "પરિણામો",
                            "રિંગ",
                            "રો",
                            "ઓરડો",
                            "ઓરડાઓ",
                            "ગોળ",
                            "રુ",
                            "ચલાવો",
                            "સા",
                            "સમાન",
                            "જોયું",
                            "કહેતા",
                            "સે",
                            "સેકન્ડ",
                            "વિભાગ",
                            "લાગતું",
                            "સ્વ",
                            "સમજુ",
                            "મોકલ્યો",
                            "ગંભીર",
                            "ગંભીરતાથી",
                            "સાત",
                            "સિત્તેર",
                            "સાગ",
                            "કરશે",
                            "શન્ટ",
                            "તેણી",
                            "શેડ",
                            "શેલ",
                            "બતાવો",
                            "બતાવ્યું",
                            "દર્શાવે",
                            "બાજુ",
                            "બાજુઓ",
                            "નોંધપાત્ર",
                            "ત્યારથી",
                            "નિષ્ઠાવાન",
                            "સાઇટ",
                            "છ",
                            "સાઠ",
                            "સ્લે",
                            "સહેજ",
                            "શ્રી",
                            "નાના",
                            "નાનું",
                            "કોઈકને",
                            "સોમેથન",
                            "કંઈક",
                            "કયારેક",
                            "ક્યારેક",
                            "ક્યાંક",
                            "જલ્દી",
                            "સ્પષ્ટ",
                            "ધો",
                            "રાજ્ય",
                            "ભારપૂર્વક",
                            "સુ",
                            "પેટા",
                            "સફળતાપૂર્વક",
                            "સૂચન",
                            "સહાયક",
                            "ટી",
                            "લો",
                            "લેવામાં",
                            "લેતા",
                            "ટીસી",
                            "ટીડી",
                            "દસ",
                            "પરીક્ષણ",
                            "કરતાં",
                            "આભાર",
                            "તેઓનું",
                            "ત્યાંથી",
                            "લાલ",
                            "તેમાં",
                            "જાડા",
                            "પાતળા",
                            "વસ્તુ",
                            "વસ્તુઓ",
                            "વિચારો",
                            "ત્રીજું",
                            "ત્રીસ",
                            "તું",
                            "વિચાર્યું",
                            "હજાર",
                            "થ્રોગ",
                            "થ્રુ",
                            "આમ",
                            "ટીપ",
                            "આજે",
                            "લીધો",
                            "ટોચ",
                            "તરફ",
                            "ટીપી",
                            "ટ્રિલિયન",
                            "ટીટી",
                            "વળો",
                            "વળાંક",
                            "ટીવી",
                            "ટ્વિ",
                            "બાર",
                            "વીસ",
                            "અમ",
                            "અન",
                            "હેઠળ",
                            "પૂર્વવત્",
                            "કમનસીબે",
                            "વિપરીત",
                            "અસંભવિત",
                            "યુપીએસ",
                            "અમને",
                            "વાપરવુ",
                            "વપરાયેલ",
                            "ઉપયોગી",
                            "ઉપયોગિતા",
                            "કિંમત",
                            "વિવિધ",
                            "વીસી",
                            "વે",
                            "વીજી",
                            "ઇચ્છતા",
                            "ઇચ્છા",
                            "નકામું",
                            "માર્ગ",
                            "માર્ગો",
                            "અમે",
                            "વેબ",
                            "વેબસાઇટ",
                            "લગ્ન",
                            "કુવાઓ",
                            "ગયા",
                            "શું",
                            "ક્યાંથી",
                            "જ્યારે",
                            "જેમાં",
                            "ધૂન",
                            "ડૂબવું",
                            "કોણ",
                            "જેનું",
                            "વ્યાપકપણે",
                            "પહોળાઈ",
                            "તૈયાર",
                            "વગર",
                            "જીત્યો",
                            "નહીં",
                            "આશ્ચર્ય",
                            "ટેવ",
                            "શબ્દો",
                            "કામ",
                            "દુનિયા",
                            "યે",
                            "વર્ષ",
                            "વર્ષો",
                            "હા",
                            "યુવાન",
                            "તમારા",
                            "તમારું",
                            "જાતે",
                            "શૂન્ય",
                            "જ",
                            "કરે",
                            "હોય",
                            "તેટલું",
                            "ગમે",
                            "બનાવેલ",
                            "તરીકે",
                            "શકો",
                            "છો",
                            "શકે",
                            "થાય",
                            "મુજબ",
                            "પરવાનગી",
                            "પહેલેથી",
                            "રીતે",
                            "દેખીતી",
                            "દેખાય",
                            "પૂછે",
                            "ભયાનક",
                            "પાછળની",
                            "બાજુએ",
                            "રહી",
                            "શરૂ",
                            "માને",
                            "કલ",
                            "શકતા",
                            "પોકળ",
                            "વાણી",
                            "ક્લિક",
                            "આવે",
                            "સમાવે",
                            "શક્યા",
                            "અલગ",
                            "થઈ",
                            "ગયું",
                            "ક્યાં",
                            "તો",
                            "બીજે",
                            "કરીને",
                            "જગ્યાએ",
                            "શોધે",
                            "ઠીક",
                            "અનુસરે",
                            "કાયમ",
                            "વધેલું",
                            "મળે",
                            "જાય",
                            "થયેલ",
                            "ન",
                            "ભાગ્યે",
                            "કરતો",
                            "સૌથી",
                            "કેવી",
                            "કરશો",
                            "તેમ",
                            "કરીશ",
                            "એટલે",
                            "સૂચવે",
                            "અંદરની",
                            "પડશે",
                            "રાખે",
                            "જાણતા",
                            "જાણે",
                            "હમણાં",
                            "ઓછામાં",
                            "તેવી",
                            "બનાવે",
                            "મોટે",
                            "ભાગે",
                            "હોવું",
                            "જોઇએ",
                            "મારી",
                            "માયસે",
                            "જરૂર",
                            "નહી",
                            "કંઈ",
                            "ક્યાય",
                            "નહિ",
                            "ઘણી",
                            "વાર",
                            "ખુલે",
                            "કૃપા",
                            "પ્રદાન",
                            "કરેલ",
                            "પૂરી",
                            "પાડે",
                            "મૂકે",
                            "વ્યાજબી",
                            "કહે",
                            "લાગે",
                            "જુએ",
                            "શાંત",
                            "બતાવે",
                            "દિવસ",
                            "કોઈક",
                            "અંશે",
                            "માફ",
                            "જણાવે",
                            "હજુ",
                            "પૂરતા",
                            "ખાતરી",
                            "વલણ",
                            "ધરાવે",
                            "પાસે",
                            "વિચારે",
                            "પ્રયાસ",
                            "કર્યો",
                            "વળે",
                            "ઉપયોગ",
                            "માંગે",
                            "કરીશું",
                            "છીએ",
                            "કરેલા",
                            "પેજ",
                            "સ્વાગત",
                            "શા",
                            "કેમ",
                            "શકશો",
                            "નાનો"
                        ],
                        ...[
                            "अंदर",
                            "अत",
                            "अदि",
                            "अप",
                            "अपना",
                            "अपनि",
                            "अपनी",
                            "अपने",
                            "अभि",
                            "अभी",
                            "आदि",
                            "आप",
                            "इंहिं",
                            "इंहें",
                            "इंहों",
                            "इतयादि",
                            "इत्यादि",
                            "इन",
                            "इनका",
                            "इन्हीं",
                            "इन्हें",
                            "इन्हों",
                            "इस",
                            "इसका",
                            "इसकि",
                            "इसकी",
                            "इसके",
                            "इसमें",
                            "इसि",
                            "इसी",
                            "इसे",
                            "उंहिं",
                            "उंहें",
                            "उंहों",
                            "उन",
                            "उनका",
                            "उनकि",
                            "उनकी",
                            "उनके",
                            "उनको",
                            "उन्हीं",
                            "उन्हें",
                            "उन्हों",
                            "उस",
                            "उसके",
                            "उसि",
                            "उसी",
                            "उसे",
                            "एक",
                            "एवं",
                            "एस",
                            "एसे",
                            "ऐसे",
                            "ओर",
                            "और",
                            "कइ",
                            "कई",
                            "कर",
                            "करता",
                            "करते",
                            "करना",
                            "करने",
                            "करें",
                            "कहते",
                            "कहा",
                            "का",
                            "काफि",
                            "काफ़ी",
                            "कि",
                            "किंहें",
                            "किंहों",
                            "कितना",
                            "किन्हें",
                            "किन्हों",
                            "किया",
                            "किर",
                            "किस",
                            "किसि",
                            "किसी",
                            "किसे",
                            "की",
                            "कुछ",
                            "कुल",
                            "के",
                            "को",
                            "कोइ",
                            "कोई",
                            "कोन",
                            "कोनसा",
                            "कौन",
                            "कौनसा",
                            "गया",
                            "घर",
                            "जब",
                            "जहाँ",
                            "जहां",
                            "जा",
                            "जिंहें",
                            "जिंहों",
                            "जितना",
                            "जिधर",
                            "जिन",
                            "जिन्हें",
                            "जिन्हों",
                            "जिस",
                            "जिसे",
                            "जीधर",
                            "जेसा",
                            "जेसे",
                            "जैसा",
                            "जैसे",
                            "जो",
                            "तक",
                            "तब",
                            "तरह",
                            "तिंहें",
                            "तिंहों",
                            "तिन",
                            "तिन्हें",
                            "तिन्हों",
                            "तिस",
                            "तिसे",
                            "तो",
                            "था",
                            "थि",
                            "थी",
                            "थे",
                            "दबारा",
                            "दवारा",
                            "दिया",
                            "दुसरा",
                            "दुसरे",
                            "दूसरे",
                            "दो",
                            "द्वारा",
                            "न",
                            "नहिं",
                            "नहीं",
                            "ना",
                            "निचे",
                            "निहायत",
                            "नीचे",
                            "ने",
                            "पर",
                            "पहले",
                            "पुरा",
                            "पूरा",
                            "पे",
                            "फिर",
                            "बनि",
                            "बनी",
                            "बहि",
                            "बही",
                            "बहुत",
                            "बाद",
                            "बाला",
                            "बिलकुल",
                            "भि",
                            "भितर",
                            "भी",
                            "भीतर",
                            "मगर",
                            "मानो",
                            "मे",
                            "में",
                            "यदि",
                            "यह",
                            "यहाँ",
                            "यहां",
                            "यहि",
                            "यही",
                            "या",
                            "यिह",
                            "ये",
                            "रखें",
                            "रवासा",
                            "रहा",
                            "रहे",
                            "ऱ्वासा",
                            "लिए",
                            "लिये",
                            "लेकिन",
                            "व",
                            "वगेरह",
                            "वरग",
                            "वर्ग",
                            "वह",
                            "वहाँ",
                            "वहां",
                            "वहिं",
                            "वहीं",
                            "वाले",
                            "वुह",
                            "वे",
                            "वग़ैरह",
                            "संग",
                            "सकता",
                            "सकते",
                            "सबसे",
                            "सभि",
                            "सभी",
                            "साथ",
                            "साबुत",
                            "साभ",
                            "सारा",
                            "से",
                            "सो",
                            "हि",
                            "ही",
                            "हुअ",
                            "हुआ",
                            "हुइ",
                            "हुई",
                            "हुए",
                            "हे",
                            "हें",
                            "है",
                            "हैं",
                            "हो",
                            "होता",
                            "होति",
                            "होती",
                            "होते",
                            "होना",
                            "होने",
                            "अर्थात",
                            "तेरी",
                            "हूं",
                            "दे",
                            "देकर",
                            "रह",
                            "कह",
                            "बात",
                            "सब",
                            "उन्ह",
                            "मेरे",
                            "उसका",
                            "गए",
                            "वुह ",
                            "परन्तु",
                            "तुम्हारे",
                            "क्योंकि",
                            "कारण",
                            "तुम",
                            "तू",
                            "उसने",
                            "पास",
                            "मुझ",
                            "मेरी",
                            "तेरे",
                            "क्या",
                            "काफ़ी",
                            "साम्हने",
                            "वग़ैरह",
                            "यिह ",
                            "उन्होंने",
                            "तुझे",
                            "हम",
                            "ऐसा",
                            "अनुसार",
                            "उसकी",
                            "तेरा",
                            "पर  ",
                            "कहता",
                            "उसको",
                            "मैं",
                            "ले",
                            "इसलिये",
                            "वह ",
                            "मुझे",
                            "इन ",
                            "मुझको",
                            "मेरा",
                            "अपने आप को",
                            "हमने",
                            "हमारा",
                            "आपका",
                            "तुम्हारा",
                            "अपने आप",
                            "स्वयं",
                            "खुद को",
                            "कि वह",
                            "खुद ही",
                            "उन्होने",
                            "किसको",
                            "हूँ",
                            "होता है",
                            "किया जा रहा है",
                            "किया है",
                            "पडा",
                            "करता है",
                            "रही",
                            "अगर",
                            "क्यूंकि",
                            "जब तक",
                            "जबकि",
                            "के लिए",
                            "के बारे में",
                            "खिलाफ",
                            "बीच",
                            "के माध्यम से",
                            "दौरान",
                            "से पहले",
                            "के बाद",
                            "ऊपर",
                            "से नीचे",
                            "करने में",
                            "निकल",
                            "बंद",
                            "से अधिक",
                            "तहत",
                            "दुबारा",
                            "आगे",
                            "एक बार",
                            "कब",
                            "कहाँ",
                            "क्यों",
                            "कैसे",
                            "सारे",
                            "दोनो",
                            "प्रत्येक",
                            "ज्यादा",
                            "अधिकांश",
                            "अन्य",
                            "में कुछ",
                            "में कोई",
                            "मात्र",
                            "खुद",
                            "समान",
                            "इसलिए",
                            "जायेंगे",
                            "जरा",
                            "चाहिए",
                            "कर दिया",
                            "तथा",
                            "परंतु",
                            "कम",
                            "दूर",
                            "पूरे",
                            "गये",
                            "मै",
                            "हुये",
                            "कभी",
                            "अथवा",
                            "गयी",
                            "प्रति",
                            "जाता",
                            "गई",
                            "अब",
                            "जिसमें",
                            "लिया",
                            "बड़ा",
                            "जाती",
                            "जाते",
                            "लेकर",
                            "बड़े",
                            "जाने",
                            "बाहर",
                            "स्थान",
                            "जिससे",
                            "समय",
                            "दोनों",
                            "किए",
                            "रहती",
                            "इनके",
                            "इनकी",
                            "सकती",
                            "आज",
                            "कल",
                            "दूसरा",
                            "नके"
                        ],
                        ...[
                            "ಈ",
                            "ಆದರೆ",
                            "ಎಂದು",
                            "ಅವರ",
                            "ಮತ್ತು",
                            "ಎಂಬ",
                            "ಅವರು",
                            "ಒಂದು",
                            "ಬಗ್ಗೆ",
                            "ಆ",
                            "ಇದೆ",
                            "ಇದು",
                            "ನಾನು",
                            "ಮೂಲಕ",
                            "ನನ್ನ",
                            "ಅದು",
                            "ಮೇಲೆ",
                            "ಈಗ",
                            "ಹಾಗೂ",
                            "ಇಲ್ಲ",
                            "ಮೊದಲ",
                            "ನನಗೆ",
                            "ಹೆಚ್ಚು",
                            "ಅವರಿಗೆ",
                            "ತಮ್ಮ",
                            "ಮಾಡಿ",
                            "ನಮ್ಮ",
                            "ಮಾತ್ರ",
                            "ದೊಡ್ಡ",
                            "ಅದೇ",
                            "ಕೂಡ",
                            "ಸಿನಿಮಾ",
                            "ಯಾವುದೇ",
                            "ಯಾವ",
                            "ಆಗ",
                            "ತುಂಬಾ",
                            "ನಾವು",
                            "ದಿನ",
                            "ಬೇರೆ",
                            "ಅವರನ್ನು",
                            "ಎಲ್ಲಾ",
                            "ನೀವು",
                            "ಸಾಕಷ್ಟು",
                            "ಕನ್ನಡ",
                            "ಹೊಸ",
                            "ಮುಂದೆ",
                            "ಹೇಗೆ",
                            "ನಂತರ",
                            "ಇಲ್ಲಿ",
                            "ಕೆಲಸ",
                            "ಅಲ್ಲ",
                            "ಬಳಿಕ",
                            "ಒಳ್ಳೆಯ",
                            "ಹಾಗಾಗಿ",
                            "ಒಂದೇ",
                            "ಜನ",
                            "ಅದನ್ನು",
                            "ಬಂದ",
                            "ಕಾರಣ",
                            "ಅವಕಾಶ",
                            "ವರ್ಷ",
                            "ನಿಮ್ಮ",
                            "ಇತ್ತು",
                            "ಚಿತ್ರ",
                            "ಹೇಳಿ",
                            "ಮಾಡಿದ",
                            "ಅದಕ್ಕೆ",
                            "ಆಗಿ",
                            "ಎಂಬುದು",
                            "ಅಂತ",
                            "2",
                            "ಕೆಲವು",
                            "ಮೊದಲು",
                            "ಬಂದು",
                            "ಇದೇ",
                            "ನೋಡಿ",
                            "ಕೇವಲ",
                            "ಎರಡು",
                            "ಇನ್ನು",
                            "ಅಷ್ಟೇ",
                            "ಎಷ್ಟು",
                            "ಚಿತ್ರದ",
                            "ಮಾಡಬೇಕು",
                            "ಹೀಗೆ",
                            "ಕುರಿತು",
                            "5",
                            "ಉತ್ತರ",
                            "ಎಂದರೆ",
                            "ಇನ್ನೂ",
                            "ಮತ್ತೆ",
                            "ಏನು",
                            "ಪಾತ್ರ",
                            "ಮುಂದಿನ",
                            "ಸಂದರ್ಭದಲ್ಲಿ",
                            "ಮಾಡುವ",
                            "ವೇಳೆ",
                            "ನನ್ನನ್ನು",
                            "ಮೂರು",
                            "ಅಥವಾ",
                            "ಜೊತೆಗೆ",
                            "ಹೆಸರು",
                            "ಚಿತ್ರದಲ್ಲಿ"
                        ],
                        ...[
                            "गेले",
                            "देते",
                            "अशा",
                            "आहे",
                            "या",
                            "आणि",
                            "व",
                            "नाही",
                            "आहेत",
                            "यानी",
                            "हे",
                            "तर",
                            "ते",
                            "असे",
                            "होते",
                            "केली",
                            "हा",
                            "ही",
                            "पण",
                            "करणयात",
                            "काही",
                            "केले",
                            "एक",
                            "केला",
                            "अशी",
                            "मात्र",
                            "त्यानी",
                            "सुरू",
                            "करून",
                            "होती",
                            "असून",
                            "आले",
                            "त्यामुळे",
                            "झाली",
                            "होता",
                            "दोन",
                            "झाले",
                            "मुबी",
                            "होत",
                            "त्या",
                            "आता",
                            "असा",
                            "याच्या",
                            "त्याच्या",
                            "ता",
                            "आली",
                            "की",
                            "पम",
                            "तो",
                            "झाला",
                            "त्री",
                            "तरी",
                            "म्हणून",
                            "त्याना",
                            "अनेक",
                            "काम",
                            "माहिती",
                            "हजार",
                            "सागित्ले",
                            "दिली",
                            "आला",
                            "आज",
                            "ती",
                            "तसेच",
                            "एका",
                            "याची",
                            "येथील",
                            "सर्व",
                            "न",
                            "डॉ",
                            "तीन",
                            "येथे",
                            "पाटील",
                            "असलयाचे",
                            "त्याची",
                            "काय",
                            "आपल्या",
                            "म्हणजे",
                            "याना",
                            "म्हणाले",
                            "त्याचा",
                            "असलेल्या",
                            "मी",
                            "गेल्या",
                            "याचा",
                            "येत",
                            "म",
                            "लाख",
                            "कमी",
                            "जात",
                            "टा",
                            "होणार",
                            "किवा",
                            "का",
                            "अधिक",
                            "घेऊन",
                            "परयतन",
                            "कोटी",
                            "झालेल्या",
                            "निर्ण्य",
                            "येणार",
                            "व्यकत"
                        ],
                        ...[
                            "ଦେଇଛନ୍ତି",
                            "ଲେଖାଏଁ",
                            "ଜଣେ",
                            "ଏହା",
                            "ତେଣୁ",
                            "ମିଳିଥାଏ",
                            "ପାଇଁ",
                            "ନେଉଛନ୍ତି",
                            "ଯୋଗୁଁ",
                            "ଏପର୍ଯ୍ୟନ୍ତ",
                            "ଏଭଳି",
                            "କରୁଛି",
                            "ଓ",
                            "ଯାଏଁ",
                            "ହୋଇଛନ୍ତି",
                            "କି",
                            "କରାଯିବା",
                            "ପରେ",
                            "ଏହି",
                            "ଏବଂ",
                            "ଜଣ",
                            "ଥିବା",
                            "ହୋଇଥିଲା",
                            "ତେବେ",
                            "ଆଜି",
                            "ଜଣଙ୍କ",
                            "ଏଥି",
                            "ଗତ",
                            "ହୋଇଥିଲେ",
                            "ଦିନ ଧରି",
                            "ହେଉଥିବା",
                            "ଦିନ ତଳେ",
                            "ଯୋଗେ",
                            "ବୋଲି",
                            "ଜଣାପଡ଼ିଛି",
                            "ଦ୍ବାରା",
                            "କରି",
                            "ଯାଇ",
                            "ଏ ନେଇ",
                            "ଚାଲୁ",
                            "ରହିଛି",
                            "ତାରିଖ",
                            "ମିଳିଛି",
                            "ବର୍ଷୀୟ",
                            "ସହ",
                            "ଆସିଛନ୍ତି",
                            "ମଧ୍ୟ",
                            "କେଉଁ",
                            "ହୋଇଯାଇଛି",
                            "ନେଇ ଯାଇଛି",
                            "କାମ",
                            "କରିଛି",
                            "ହେବା",
                            "ଏବେ",
                            "ହୋଇଛି",
                            "ରଖି",
                            "ନିଆଯାଇଥିବା",
                            "ପର୍ଯ୍ୟନ୍ତ",
                            "କରିଛନ୍ତି",
                            "ଉପରେ",
                            "ଦେଲେ",
                            "ଥର",
                            "ଆଉ"
                        ],
                        ...[
                            "آئی",
                            "آئے",
                            "آج",
                            "آخر",
                            "آخرکبر",
                            "آدهی",
                            "آًب",
                            "آٹھ",
                            "آیب",
                            "اة",
                            "اخبزت",
                            "اختتبم",
                            "ادھر",
                            "ارد",
                            "اردگرد",
                            "ارکبى",
                            "اش",
                            "اضتعوبل",
                            "اضتعوبلات",
                            "اضطرذ",
                            "اضکب",
                            "اضکی",
                            "اضکے",
                            "اطراف",
                            "اغیب",
                            "افراد",
                            "الگ",
                            "اور",
                            "اوًچب",
                            "اوًچبئی",
                            "اوًچی",
                            "اوًچے",
                            "اى",
                            "اً",
                            "اًذر",
                            "اًہیں",
                            "اٹھبًب",
                            "اپٌب",
                            "اپٌے",
                            "اچھب",
                            "اچھی",
                            "اچھے",
                            "اکثر",
                            "اکٹھب",
                            "اکٹھی",
                            "اکٹھے",
                            "اکیلا",
                            "اکیلی",
                            "اکیلے",
                            "اگرچہ",
                            "اہن",
                            "ایطے",
                            "ایک",
                            "ب",
                            "ت",
                            "تبزٍ",
                            "تت",
                            "تر",
                            "ترتیت",
                            "تریي",
                            "تعذاد",
                            "تن",
                            "تو",
                            "توبم",
                            "توہی",
                            "توہیں",
                            "تٌہب",
                            "تک",
                            "تھب",
                            "تھوڑا",
                            "تھوڑی",
                            "تھوڑے",
                            "تھی",
                            "تھے",
                            "تیي",
                            "ثب",
                            "ثبئیں",
                            "ثبترتیت",
                            "ثبری",
                            "ثبرے",
                            "ثبعث",
                            "ثبلا",
                            "ثبلترتیت",
                            "ثبہر",
                            "ثدبئے",
                            "ثرآں",
                            "ثراں",
                            "ثرش",
                            "ثعذ",
                            "ثغیر",
                            "ثلٌذ",
                            "ثلٌذوثبلا",
                            "ثلکہ",
                            "ثي",
                            "ثٌب",
                            "ثٌبرہب",
                            "ثٌبرہی",
                            "ثٌبرہے",
                            "ثٌبًب",
                            "ثٌذ",
                            "ثٌذکرو",
                            "ثٌذکرًب",
                            "ثٌذی",
                            "ثڑا",
                            "ثڑوں",
                            "ثڑی",
                            "ثڑے",
                            "ثھر",
                            "ثھرا",
                            "ثھراہوا",
                            "ثھرپور",
                            "ثھی",
                            "ثہت",
                            "ثہتر",
                            "ثہتری",
                            "ثہتریي",
                            "ثیچ",
                            "ج",
                            "خب",
                            "خبرہب",
                            "خبرہی",
                            "خبرہے",
                            "خبهوظ",
                            "خبًب",
                            "خبًتب",
                            "خبًتی",
                            "خبًتے",
                            "خبًٌب",
                            "خت",
                            "ختن",
                            "خجکہ",
                            "خص",
                            "خططرذ",
                            "خلذی",
                            "خو",
                            "خواى",
                            "خوًہی",
                            "خوکہ",
                            "خٌبة",
                            "خگہ",
                            "خگہوں",
                            "خگہیں",
                            "خیطب",
                            "خیطبکہ",
                            "در",
                            "درخبت",
                            "درخہ",
                            "درخے",
                            "درزقیقت",
                            "درضت",
                            "دش",
                            "دفعہ",
                            "دلچطپ",
                            "دلچطپی",
                            "دلچطپیبں",
                            "دو",
                            "دور",
                            "دوراى",
                            "دوضرا",
                            "دوضروں",
                            "دوضری",
                            "دوضرے",
                            "دوًوں",
                            "دکھبئیں",
                            "دکھبتب",
                            "دکھبتی",
                            "دکھبتے",
                            "دکھبو",
                            "دکھبًب",
                            "دکھبیب",
                            "دی",
                            "دیب",
                            "دیتب",
                            "دیتی",
                            "دیتے",
                            "دیر",
                            "دیٌب",
                            "دیکھو",
                            "دیکھٌب",
                            "دیکھی",
                            "دیکھیں",
                            "دے",
                            "ر",
                            "راضتوں",
                            "راضتہ",
                            "راضتے",
                            "رریعہ",
                            "رریعے",
                            "رکي",
                            "رکھ",
                            "رکھب",
                            "رکھتب",
                            "رکھتبہوں",
                            "رکھتی",
                            "رکھتے",
                            "رکھی",
                            "رکھے",
                            "رہب",
                            "رہی",
                            "رہے",
                            "ز",
                            "زبصل",
                            "زبضر",
                            "زبل",
                            "زبلات",
                            "زبلیہ",
                            "زصوں",
                            "زصہ",
                            "زصے",
                            "زقبئق",
                            "زقیتیں",
                            "زقیقت",
                            "زکن",
                            "زکویہ",
                            "زیبدٍ",
                            "صبف",
                            "صسیر",
                            "صفر",
                            "صورت",
                            "صورتسبل",
                            "صورتوں",
                            "صورتیں",
                            "ض",
                            "ضبت",
                            "ضبتھ",
                            "ضبدٍ",
                            "ضبرا",
                            "ضبرے",
                            "ضبل",
                            "ضبلوں",
                            "ضت",
                            "ضرور",
                            "ضرورت",
                            "ضروری",
                            "ضلطلہ",
                            "ضوچ",
                            "ضوچب",
                            "ضوچتب",
                            "ضوچتی",
                            "ضوچتے",
                            "ضوچو",
                            "ضوچٌب",
                            "ضوچی",
                            "ضوچیں",
                            "ضکب",
                            "ضکتب",
                            "ضکتی",
                            "ضکتے",
                            "ضکٌب",
                            "ضکی",
                            "ضکے",
                            "ضیذھب",
                            "ضیذھی",
                            "ضیذھے",
                            "ضیکٌڈ",
                            "ضے",
                            "طرف",
                            "طریق",
                            "طریقوں",
                            "طریقہ",
                            "طریقے",
                            "طور",
                            "طورپر",
                            "ظبہر",
                            "ع",
                            "عذد",
                            "عظین",
                            "علاقوں",
                            "علاقہ",
                            "علاقے",
                            "علاوٍ",
                            "عووهی",
                            "غبیذ",
                            "غخص",
                            "غذ",
                            "غروع",
                            "غروعبت",
                            "غے",
                            "فرد",
                            "فی",
                            "ق",
                            "قجل",
                            "قجیلہ",
                            "قطن",
                            "لئے",
                            "لا",
                            "لازهی",
                            "لو",
                            "لوجب",
                            "لوجی",
                            "لوجے",
                            "لوسبت",
                            "لوسہ",
                            "لوگ",
                            "لوگوں",
                            "لڑکپي",
                            "لگتب",
                            "لگتی",
                            "لگتے",
                            "لگٌب",
                            "لگی",
                            "لگیں",
                            "لگے",
                            "لی",
                            "لیب",
                            "لیٌب",
                            "لیں",
                            "لے",
                            "ه",
                            "هتعلق",
                            "هختلف",
                            "هسترم",
                            "هسترهہ",
                            "هسطوش",
                            "هسیذ",
                            "هطئلہ",
                            "هطئلے",
                            "هطبئل",
                            "هطتعول",
                            "هطلق",
                            "هعلوم",
                            "هػتول",
                            "هلا",
                            "هوکي",
                            "هوکٌبت",
                            "هوکٌہ",
                            "هٌبضت",
                            "هڑا",
                            "هڑًب",
                            "هڑے",
                            "هکول",
                            "هگر",
                            "هہرثبى",
                            "هیرا",
                            "هیری",
                            "هیرے",
                            "هیں",
                            "و",
                            "وار",
                            "والے",
                            "وٍ",
                            "ًئی",
                            "ًئے",
                            "ًب",
                            "ًبپطٌذ",
                            "ًبگسیر",
                            "ًطجت",
                            "ًقطہ",
                            "ًو",
                            "ًوخواى",
                            "ًکبلٌب",
                            "ًکتہ",
                            "ًہ",
                            "ًہیں",
                            "ًیب",
                            "ًے",
                            "ٓآش",
                            "ٹھیک",
                            "پبئے",
                            "پبش",
                            "پبًب",
                            "پبًچ",
                            "پر",
                            "پراًب",
                            "پطٌذ",
                            "پل",
                            "پورا",
                            "پوچھب",
                            "پوچھتب",
                            "پوچھتی",
                            "پوچھتے",
                            "پوچھو",
                            "پوچھوں",
                            "پوچھٌب",
                            "پوچھیں",
                            "پچھلا",
                            "پھر",
                            "پہلا",
                            "پہلی",
                            "پہلےضی",
                            "پہلےضے",
                            "پہلےضےہی",
                            "پیع",
                            "چبر",
                            "چبہب",
                            "چبہٌب",
                            "چبہے",
                            "چلا",
                            "چلو",
                            "چلیں",
                            "چلے",
                            "چکب",
                            "چکی",
                            "چکیں",
                            "چکے",
                            "چھوٹب",
                            "چھوٹوں",
                            "چھوٹی",
                            "چھوٹے",
                            "چھہ",
                            "چیسیں",
                            "ڈھوًڈا",
                            "ڈھوًڈلیب",
                            "ڈھوًڈو",
                            "ڈھوًڈًب",
                            "ڈھوًڈی",
                            "ڈھوًڈیں",
                            "ک",
                            "کئی",
                            "کئے",
                            "کب",
                            "کبفی",
                            "کبم",
                            "کت",
                            "کجھی",
                            "کرا",
                            "کرتب",
                            "کرتبہوں",
                            "کرتی",
                            "کرتے",
                            "کرتےہو",
                            "کررہب",
                            "کررہی",
                            "کررہے",
                            "کرو",
                            "کرًب",
                            "کریں",
                            "کرے",
                            "کطی",
                            "کل",
                            "کن",
                            "کوئی",
                            "کوتر",
                            "کورا",
                            "کوروں",
                            "کورٍ",
                            "کورے",
                            "کوطي",
                            "کوى",
                            "کوًطب",
                            "کوًطی",
                            "کوًطے",
                            "کھولا",
                            "کھولو",
                            "کھولٌب",
                            "کھولی",
                            "کھولیں",
                            "کھولے",
                            "کہ",
                            "کہب",
                            "کہتب",
                            "کہتی",
                            "کہتے",
                            "کہو",
                            "کہوں",
                            "کہٌب",
                            "کہی",
                            "کہیں",
                            "کہے",
                            "کی",
                            "کیب",
                            "کیطب",
                            "کیطرف",
                            "کیطے",
                            "کیلئے",
                            "کیوًکہ",
                            "کیوں",
                            "کیے",
                            "کے",
                            "کےثعذ",
                            "کےرریعے",
                            "گئی",
                            "گئے",
                            "گب",
                            "گرد",
                            "گروٍ",
                            "گروپ",
                            "گروہوں",
                            "گٌتی",
                            "گی",
                            "گیب",
                            "گے",
                            "ہر",
                            "ہن",
                            "ہو",
                            "ہوئی",
                            "ہوئے",
                            "ہوا",
                            "ہوبرا",
                            "ہوبری",
                            "ہوبرے",
                            "ہوتب",
                            "ہوتی",
                            "ہوتے",
                            "ہورہب",
                            "ہورہی",
                            "ہورہے",
                            "ہوضکتب",
                            "ہوضکتی",
                            "ہوضکتے",
                            "ہوًب",
                            "ہوًی",
                            "ہوًے",
                            "ہوچکب",
                            "ہوچکی",
                            "ہوچکے",
                            "ہوگئی",
                            "ہوگئے",
                            "ہوگیب",
                            "ہوں",
                            "ہی",
                            "ہیں",
                            "ہے",
                            "ی",
                            "یقیٌی",
                            "یہ",
                            "یہبں"
                        ],
                        ...[
                            "ஒரு",
                            "என்று",
                            "மற்றும்",
                            "இந்த",
                            "இது",
                            "என்ற",
                            "கொண்டு",
                            "என்பது",
                            "பல",
                            "ஆகும்",
                            "அல்லது",
                            "அவர்",
                            "நான்",
                            "உள்ள",
                            "அந்த",
                            "இவர்",
                            "என",
                            "முதல்",
                            "என்ன",
                            "இருந்து",
                            "சில",
                            "என்",
                            "போன்ற",
                            "வேண்டும்",
                            "வந்து",
                            "இதன்",
                            "அது",
                            "அவன்",
                            "தான்",
                            "பலரும்",
                            "என்னும்",
                            "மேலும்",
                            "பின்னர்",
                            "கொண்ட",
                            "இருக்கும்",
                            "தனது",
                            "உள்ளது",
                            "போது",
                            "என்றும்",
                            "அதன்",
                            "தன்",
                            "பிறகு",
                            "அவர்கள்",
                            "வரை",
                            "அவள்",
                            "நீ",
                            "ஆகிய",
                            "இருந்தது",
                            "உள்ளன",
                            "வந்த",
                            "இருந்த",
                            "மிகவும்",
                            "இங்கு",
                            "மீது",
                            "ஓர்",
                            "இவை",
                            "இந்தக்",
                            "பற்றி",
                            "வரும்",
                            "வேறு",
                            "இரு",
                            "இதில்",
                            "போல்",
                            "இப்போது",
                            "அவரது",
                            "மட்டும்",
                            "இந்தப்",
                            "எனும்",
                            "மேல்",
                            "பின்",
                            "சேர்ந்த",
                            "ஆகியோர்",
                            "எனக்கு",
                            "இன்னும்",
                            "அந்தப்",
                            "அன்று",
                            "ஒரே",
                            "மிக",
                            "அங்கு",
                            "பல்வேறு",
                            "விட்டு",
                            "பெரும்",
                            "அதை",
                            "பற்றிய",
                            "உன்",
                            "அதிக",
                            "அந்தக்",
                            "பேர்",
                            "இதனால்",
                            "அவை",
                            "அதே",
                            "ஏன்",
                            "முறை",
                            "யார்",
                            "என்பதை",
                            "எல்லாம்",
                            "மட்டுமே",
                            "இங்கே",
                            "அங்கே",
                            "இடம்",
                            "இடத்தில்",
                            "அதில்",
                            "நாம்",
                            "அதற்கு",
                            "எனவே",
                            "பிற",
                            "சிறு",
                            "மற்ற",
                            "விட",
                            "எந்த",
                            "எனவும்",
                            "எனப்படும்",
                            "எனினும்",
                            "அடுத்த",
                            "இதனை",
                            "இதை",
                            "கொள்ள",
                            "இந்தத்",
                            "இதற்கு",
                            "அதனால்",
                            "தவிர",
                            "போல",
                            "வரையில்",
                            "சற்று",
                            "எனக்"
                        ],
                        ...[
                            "ਦੇ",
                            "ਵਿੱਚ",
                            "ਦਾ",
                            "ਅਤੇ",
                            "ਦੀ",
                            "ਇੱਕ",
                            "ਨੂੰ",
                            "ਹੈ",
                            "ਤੋਂ",
                            "ਇਸ",
                            "ਇਹ",
                            "ਨੇ",
                            "ਤੇ",
                            "ਨਾਲ",
                            "ਲਈ",
                            "ਵੀ",
                            "ਸੀ",
                            "ਵਿਚ",
                            "ਕਿ",
                            "ਜੋ",
                            "ਉਹ",
                            "ਉਸ",
                            "ਹਨ",
                            "ਜਾਂਦਾ",
                            "ਕੀਤਾ",
                            "ਗਿਆ",
                            "ਹੀ",
                            "ਕੇ",
                            "ਜਾਂ",
                            "ਦੀਆਂ",
                            "ਜਿਸ",
                            "ਕਰਨ",
                            "ਹੋ",
                            "ਕਰ",
                            "ਆਪਣੇ",
                            "ਕੀਤੀ",
                            "ਤੌਰ",
                            "ਬਾਅਦ",
                            "ਨਹੀਂ",
                            "ਭਾਰਤੀ",
                            "ਪਿੰਡ",
                            "ਸਿੰਘ",
                            "ਉੱਤੇ",
                            "ਸਾਲ",
                            "।",
                            "ਪੰਜਾਬ",
                            "ਸਭ",
                            "ਭਾਰਤ",
                            "ਉਨ੍ਹਾਂ",
                            "ਹੁੰਦਾ",
                            "ਤੱਕ",
                            "ਇਕ",
                            "ਹੋਇਆ",
                            "ਜਨਮ",
                            "ਬਹੁਤ",
                            "ਪਰ",
                            "ਦੁਆਰਾ",
                            "ਰੂਪ",
                            "ਹੋਰ",
                            "ਕੰਮ",
                            "ਆਪਣੀ",
                            "ਤਾਂ",
                            "ਸਮੇਂ",
                            "ਪੰਜਾਬੀ",
                            "ਗਈ",
                            "ਦਿੱਤਾ",
                            "ਦੋ",
                            "ਕਿਸੇ",
                            "ਕਈ",
                            "ਜਾ",
                            "ਵਾਲੇ",
                            "ਸ਼ੁਰੂ",
                            "ਉਸਨੇ",
                            "ਕਿਹਾ",
                            "ਹੋਣ",
                            "ਲੋਕ",
                            "ਜਾਂਦੀ",
                            "ਵਿੱਚੋਂ",
                            "ਨਾਮ",
                            "ਜਦੋਂ",
                            "ਪਹਿਲਾਂ",
                            "ਕਰਦਾ",
                            "ਹੁੰਦੀ",
                            "ਹੋਏ",
                            "ਸਨ",
                            "ਵਜੋਂ",
                            "ਰਾਜ",
                            "ਮੁੱਖ",
                            "ਕਰਦੇ",
                            "ਕੁਝ",
                            "ਸਾਰੇ",
                            "ਹੁੰਦੇ",
                            "ਸ਼ਹਿਰ",
                            "ਭਾਸ਼ਾ",
                            "ਹੋਈ",
                            "ਅਨੁਸਾਰ",
                            "ਸਕਦਾ",
                            "ਆਮ",
                            "ਵੱਖ",
                            "ਕੋਈ",
                            "ਵਾਰ",
                            "ਗਏ",
                            "ਖੇਤਰ",
                            "ਜੀ",
                            "ਕਾਰਨ",
                            "ਕਰਕੇ",
                            "ਜਿਵੇਂ",
                            "ਜ਼ਿਲ੍ਹੇ",
                            "ਲੋਕਾਂ",
                            "ਚ",
                            "ਸਾਹਿਤ",
                            "ਸਦੀ",
                            "ਬਾਰੇ",
                            "ਜਾਂਦੇ",
                            "ਵਾਲਾ",
                            "ਜਾਣ",
                            "ਪਹਿਲੀ",
                            "ਪ੍ਰਾਪਤ",
                            "ਰਿਹਾ",
                            "ਵਾਲੀ",
                            "ਨਾਂ",
                            "ਦੌਰਾਨ",
                            "ਤਰ੍ਹਾਂ",
                            "ਯੂਨੀਵਰਸਿਟੀ",
                            "ਨਾ",
                            "ਏ",
                            "ਤਿੰਨ",
                            "ਇਨ੍ਹਾਂ",
                            "ਗੁਰੂ",
                            "ਇਸਨੂੰ",
                            "ਇਹਨਾਂ",
                            "ਪਿਤਾ",
                            "ਲਿਆ",
                            "ਸ਼ਾਮਲ",
                            "ਸ਼ਬਦ",
                            "ਅੰਗਰੇਜ਼ੀ",
                            "ਉਸਨੂੰ",
                            "ਉਹਨਾਂ",
                            "ਸਥਿਤ",
                            "ਫਿਰ",
                            "ਜੀਵਨ",
                            "ਸਕੂਲ",
                            "ਹੁਣ",
                            "ਦਿਨ",
                            "ਕੀਤੇ",
                            "ਆਦਿ",
                            "ਵੱਧ",
                            "ਲੈ",
                            "ਘਰ",
                            "ਵੱਲ",
                            "ਦੇਸ਼",
                            "ਵਲੋਂ",
                            "ਬਣ",
                            "ਵੀਂ",
                            "ਫਿਲਮ",
                            "ਉਮਰ",
                            "ਬਲਾਕ",
                            "ਰਹੇ",
                            "ਸਾਹਿਬ",
                            "ਕਰਦੀ",
                            "ਹਰ",
                            "ਪੈਦਾ",
                            "ਘੱਟ",
                            "ਲੇਖਕ",
                            "ਹਿੱਸਾ",
                            "ਫ਼ਿਲਮ",
                            "ਮੌਤ",
                            "ਜਿੱਥੇ",
                            "ਵੱਡਾ",
                            "ਵਿਖੇ",
                            "ਆਪਣਾ",
                            "ਪਹਿਲਾ",
                            "ਵਰਤੋਂ",
                            "ਆਪ",
                            "ਕਰਨਾ",
                            "ਵਿਆਹ",
                            "ਰਹੀ",
                            "ਰਾਹੀਂ",
                            "ਦਿੱਤੀ",
                            "ਉਸਦੇ",
                            "ਪਰਿਵਾਰ",
                            "ਆ",
                            "ਦੂਜੇ",
                            "ਅਮਰੀਕਾ",
                            "ਮੰਨਿਆ",
                            "ਇਸਦੇ",
                            "ਈ",
                            "ਕਾਲਜ",
                            "ਸਰਕਾਰ",
                            "ਇੱਥੇ",
                            "ਪਾਕਿਸਤਾਨ",
                            "ਸ਼ਾਮਿਲ",
                            "ਵਿਗਿਆਨ",
                            "ਉਸਦੀ",
                            "ਪੇਸ਼",
                            "ਕਿਉਂਕਿ",
                            "ਪਹਿਲੇ",
                            "ਧਰਮ",
                            "ਮਸ਼ਹੂਰ",
                            "ਅੰਦਰ",
                            "ਵਿਚੋਂ",
                            "ਜਿਨ੍ਹਾਂ",
                            "ਜਾਣਿਆ",
                            "ਪਾਣੀ",
                            "ਇਲਾਵਾ",
                            "ਅਰਥ",
                            "ਚਾਰ",
                            "ਪ੍ਰਸਿੱਧ",
                            "ਨਾਵਲ",
                            "ਵੱਡੇ",
                            "ਵੱਲੋਂ",
                            "ਕਹਾਣੀ",
                            "ਵਿਸ਼ਵ",
                            "ਮੂਲ",
                            "ਅਮਰੀਕੀ",
                            "ਸਥਾਨ",
                            "ਇਤਿਹਾਸ",
                            "ਕੁੱਝ",
                            "ਵਿਕਾਸ",
                            "ਉੱਤਰ",
                            "ਸਿੱਖਿਆ",
                            "ਹਿੰਦੀ",
                            "ਪ੍ਰਮੁੱਖ",
                            "ਰਚਨਾ",
                            "ਬਣਾਇਆ",
                            "ਵਿਸ਼ੇਸ਼",
                            "ਡਾ",
                            "ਉੱਪਰ",
                            "ਪੱਛਮੀ",
                            "ਦੇਣ",
                            "ਇਸਦਾ",
                            "ਸਕਦੇ",
                            "ਰੱਖਿਆ",
                            "ਕਵੀ",
                            "ਦਿੱਲੀ",
                            "ਵੱਡੀ",
                            "ਭੂਮਿਕਾ",
                            "ਸਮਾਜ",
                            "ਕਾਵਿ",
                            "ਕੀ",
                            "ਕੋਲ",
                            "ਦ",
                            "ਗੱਲ",
                            "ਸੰਸਾਰ",
                            "ਭਾਗ",
                            "ਆਈ",
                            "ਦੱਖਣ",
                            "ਅੱਜ",
                            "ਸਿੱਖ",
                            "ਕਹਿੰਦੇ",
                            "ਸੰਗੀਤ",
                            "ਕਿਲੋਮੀਟਰ",
                            "ਜਿਹਨਾਂ",
                            "ਸਭਾ",
                            "ਜਿਸਦਾ",
                            "ਜਨਵਰੀ",
                            "ਕਵਿਤਾ",
                            "ਮੈਂਬਰ",
                            "ਲਿਖਿਆ",
                            "ਮਾਂ",
                            "ਕਲਾ",
                            "ਪੰਜ",
                            "ਥਾਂ",
                            "ਹੇਠ",
                            "ਜਿਆਦਾ",
                            "ਵਰਤਿਆ",
                            "ਮਾਰਚ",
                            "ਡੀ",
                            "ਅਕਤੂਬਰ",
                            "ਤਕ",
                            "ਨਾਟਕ",
                            "ਬੀ",
                            "ਖਾਸ",
                            "ਇਸੇ",
                            "ਆਧੁਨਿਕ",
                            "ਅਗਸਤ",
                            "ਤਿਆਰ",
                            "ਮਾਤਾ",
                            "ਬਣਾਉਣ",
                            "ਨਵੰਬਰ",
                            "ਵਿਅਕਤੀ",
                            "ਦੱਖਣੀ",
                            "ਦਸੰਬਰ",
                            "ਆਫ",
                            "ਗੀਤ",
                            "ਗਿਣਤੀ",
                            "ਕਾਲ",
                            "ਖੋਜ",
                            "ਸਾਲਾਂ",
                            "ਪੂਰੀ",
                            "ਸਮਾਂ",
                            "ਜ਼ਿਆਦਾ",
                            "ਇਸਦੀ",
                            "ਸਕਦੀ",
                            "ਵਿਚਕਾਰ",
                            "ਰਾਜਧਾਨੀ",
                            "ਉਸਦਾ",
                            "ਜੁਲਾਈ",
                            "ਜੂਨ",
                            "ਅਧੀਨ",
                            "ਸਥਾਪਨਾ",
                            "ਸੇਵਾ",
                            "ਭਾਵ",
                            "ਵਰਗ",
                            "ਛੋਟੇ",
                            "ਦਿੰਦਾ",
                            "ਸਮਾਜਿਕ",
                            "ਹੁੰਦੀਆਂ",
                            "ਟੀਮ",
                            "ਔਰਤਾਂ",
                            "ਅਕਸਰ",
                            "ਪ੍ਰਕਾਸ਼ਿਤ",
                            "ਉਰਦੂ",
                            "ਰੰਗ",
                            "ਪਾਰਟੀ",
                            "ਬਣਾ",
                            "ਪ੍ਰਭਾਵ",
                            "ਸ਼ੁਰੂਆਤ",
                            "ਲਗਭਗ",
                            "ਮਈ",
                            "ਸਿਰਫ",
                            "ਨੇੜੇ",
                            "ਜਿਸਨੂੰ",
                            "ਹਾਲਾਂਕਿ",
                            "ਦੂਰ",
                            "ਸਤੰਬਰ",
                            "ਕਿਤਾਬ",
                            "ਕਦੇ",
                            "ਉੱਤਰੀ",
                            "ਪ੍ਰਕਾਰ",
                            "ਇਸਨੇ",
                            "ਪ੍ਰਦੇਸ਼",
                            "ਅੱਗੇ",
                            "ਸੰਯੁਕਤ",
                            "ਪੜ੍ਹਾਈ",
                            "ਵਧੇਰੇ",
                            "ਨਾਲ਼",
                            "ਮਨੁੱਖ",
                            "ਬਾਕੀ",
                            "ਪ੍ਰਧਾਨ",
                            "ਦੂਜੀ",
                            "ਕੁੱਲ",
                            "ਆਫ਼",
                            "ਅਧਿਐਨ",
                            "ਰਾਸ਼ਟਰੀ",
                            "ਪੁੱਤਰ",
                            "ਅੰਤਰਰਾਸ਼ਟਰੀ",
                            "ਧਰਤੀ",
                            "ਕੇਂਦਰ",
                            "ਦੇਸ਼ਾਂ",
                            "ਮੱਧ",
                            "ਜ਼ਿਲ੍ਹਾ",
                            "ਸਾਰੀਆਂ",
                            "ਪੱਧਰ",
                            "ਹੋਵੇ",
                            "ਜੇ",
                            "ਭਾਈ",
                            "ਰਹਿਣ",
                            "ਪੁਰਸਕਾਰ",
                            "ਸਭਿਆਚਾਰ",
                            "ਪਤਾ",
                            "ਪਾਸੇ",
                            "ਨਵੇਂ",
                            "ਕੰਪਨੀ",
                            "ਬਾਹਰ",
                            "ਵੇਲੇ",
                            "ਸੰਨ",
                            "ਪੂਰਬੀ",
                            "ਵਿਚਾਰ",
                            "ਕਾਰਜ",
                            "ਪੀ",
                            "ਮਹੱਤਵਪੂਰਨ",
                            "ਦੁਨੀਆਂ",
                            "ਧਾਰਮਿਕ",
                            "ਮਨੁੱਖੀ",
                            "ਸਮੂਹ",
                            "ਅਜਿਹੇ",
                            "ਲਾਲ",
                            "ਦੂਜਾ",
                            "ਭਰਾ",
                            "ਸ੍ਰੀ",
                            "ਅੰਤ",
                            "ਜਾਂਦੀਆਂ",
                            "ਸ਼ਾਹ",
                            "ਰਹਿੰਦੇ",
                            "ਮਹਾਨ",
                            "ਚੀਨ",
                            "ਮੀਟਰ",
                            "ਵਰਗੇ",
                            "ਨਾਲੋਂ",
                            "ਹਾਸਲ",
                            "ਕਿਸਮ",
                            "ਅਜਿਹਾ",
                            "ਬਣਿਆ",
                            "ਭਰ",
                            "ਛੱਡ",
                            "ਲੈਣ",
                            "ਹਿੱਸੇ",
                            "ਟੀ",
                            "ਲਿਖੇ",
                            "ਮਿਲ",
                            "ਮੌਜੂਦ",
                            "ਦਿੱਤੇ",
                            "ਵਾਸਤੇ",
                            "ਵਾਲੀਆਂ",
                            "ਵਧੀਆ",
                            "ਰੂਸੀ",
                            "ਜਾਰੀ",
                            "ਸਰਕਾਰੀ",
                            "ਡਿਗਰੀ",
                            "ਪੱਛਮ",
                            "ਲੜਾਈ",
                            "ਭਾਸ਼ਾਵਾਂ",
                            "ਰਾਜਾ",
                            "ਜਲੰਧਰ",
                            "ਹਿੰਦੂ",
                            "ਔਰਤ",
                            "ਜੰਗ",
                            "ਬਾਬਾ",
                            "ਬੱਚਿਆਂ",
                            "ਮੰਤਰੀ",
                            "ਪਟਿਆਲਾ",
                            "ਵਾਂਗ",
                            "ਆਉਣ",
                            "ਭਾਵੇਂ",
                            "ਕੇਵਲ",
                            "ਐਸ",
                            "ਪ੍ਰਾਚੀਨ",
                            "ਰਹਿੰਦਾ",
                            "ਬੋਲੀ",
                            "ਅਵਾਰਡ",
                            "ਨਗਰ",
                            "ਖੇਡਾਂ",
                            "ਫਿਲਮਾਂ",
                            "ਬੱਚੇ",
                            "ਕੌਰ",
                            "ਤੋ",
                            "ਪ੍ਰਤੀ",
                            "ਕੁਆਂਟਮ",
                            "ਅਬਾਦੀ",
                            "ਪੁਸਤਕ",
                            "ਐਮ",
                            "ਰਾਮ",
                            "ਖੇਤਰਾਂ",
                            "ਫਰਵਰੀ",
                            "ਕ੍ਰਿਕਟ",
                            "ਪੈਂਦਾ",
                            "ਇਤਿਹਾਸਕ",
                            "ਲੱਗ",
                            "ਬ੍ਰਿਟਿਸ਼",
                            "ਆਇਆ",
                            "ਮਿਲਦਾ"
                        ],
                        ...[
                            "చేయగలిగింది",
                            "గురించి",
                            "పై",
                            "ప్రకారం",
                            "అనుగుణంగా",
                            "అడ్డంగా",
                            "నిజంగా",
                            "తర్వాత",
                            "మళ్ళీ",
                            "వ్యతిరేకంగా",
                            "కాదు",
                            "అందరూ",
                            "అనుమతించు",
                            "అనుమతిస్తుంది",
                            "దాదాపు",
                            "మాత్రమే",
                            "వెంట",
                            "ఇప్పటికే",
                            "కూడా",
                            "అయితే",
                            "ఎప్పుడు",
                            "వద్ద",
                            "మధ్య",
                            "ఒక",
                            "మరియు",
                            "మరొక",
                            "ఏ",
                            "ఎవరో ఒకరు",
                            "ఏమైనప్పటికి",
                            "ఎవరైనా",
                            "ఏదైనా",
                            "ఎక్కడైనా",
                            "వేరుగా",
                            "కనిపిస్తాయి",
                            "మెచ్చుకో",
                            "తగిన",
                            "ఉన్నారు",
                            "చుట్టూ",
                            "గా",
                            "ఒక ప్రక్కన",
                            "అడగండి",
                            "అడగడం",
                            "సంబంధం",
                            "అందుబాటులో",
                            "దూరంగా"
                        ]
                    ]
                    var stopwords_en = ["'ll", "'tis", "'twas", "'ve", "a", "a's", "able", "ableabout", "about", "above", "abroad", "abst", "accordance", "according", "accordingly", "across", "act", "actually", "ad", "added", "adj", "adopted", "ae", "af", "affected", "affecting", "affects", "after", "afterwards", "ag", "again", "against", "ago", "ah", "ahead", "ai", "ain't", "aint", "al", "all", "allow", "allows", "almost", "alone", "along", "alongside", "already", "also", "although", "always", "am", "amid", "amidst", "among", "amongst", "amoungst", "amount", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "ao", "apart", "apparently", "appear", "appreciate", "appropriate", "approximately", "aq", "ar", "are", "area", "areas", "aren", "aren't", "arent", "arise", "around", "arpa", "as", "aside", "ask", "asked", "asking", "asks", "associated", "at", "au", "auth", "available", "aw", "away", "awfully", "az", "b", "ba", "back", "backed", "backing", "backs", "backward", "backwards", "bb", "bd", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "began", "begin", "beginning", "beginnings", "begins", "behind", "being", "beings", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "bf", "bg", "bh", "bi", "big", "bill", "billion", "biol", "bj", "bm", "bn", "bo", "both", "bottom", "br", "brief", "briefly", "bs", "bt", "but", "buy", "bv", "bw", "by", "bz", "c", "c'mon", "c's", "ca", "call", "came", "can", "can't", "cannot", "cant", "caption", "case", "cases", "cause", "causes", "cc", "cd", "certain", "certainly", "cf", "cg", "ch", "changes", "ci", "ck", "cl", "clear", "clearly", "click", "cm", "cmon", "cn", /* "co", "co.", */ "com", "come", "comes", "computer", "con", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "copy", "corresponding", "could", "could've", "couldn", "couldn't", "couldnt", "course", "cr", "cry", "cs", "cu", "currently", "cv", "cx", "cy", "cz", "d", "dare", "daren't", "darent", "date", "de", "dear", "definitely", "describe", "described", "despite", "detail", "did", "didn", "didn't", "didnt", "differ", "different", "differently", "directly", "dj", "dk", "dm", "do", "does", "doesn", "doesn't", "doesnt", "doing", "don", "don't", "done", "dont", "doubtful", "down", "downed", "downing", "downs", "downwards", "due", "during", "dz", "e", "each", "early", "ec", "ed", "edu", "ee", "effect", "eg", "eh", "eight", "eighty", "either", "eleven", "else", "elsewhere", "empty", "end", "ended", "ending", "ends", "enough", "entirely", "er", "es", "especially", "et", "et-al", "etc", "even", "evenly", "ever", "evermore", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "f", "face", "faces", "fact", "facts", "fairly", "far", "farther", "felt", "few", "fewer", "ff", "fi", "fifteen", "fifth", "fifty", "fify", "fill", "find", "finds", "fire", "first", "five", "fix", "fj", "fk", "fm", "fo", "followed", "following", "follows", "for", "forever", "former", "formerly", "forth", "forty", "forward", "found", "four", "fr", "free", "from", "front", "full", "fully", "further", "furthered", "furthering", "furthermore", "furthers", "fx", "g", "ga", "gave", "gb", "gd", "ge", "general", "generally", "get", "gets", "getting", "gf", "gg", "gh", "gi", "give", "given", "gives", "giving", "gl", "gm", "gmt", "gn", "go", "goes", "going", "gone", "good", "goods", "got", "gotten", "gov", "gp", "gq", "gr", "great", "greater", "greatest", "greetings", "group", "grouped", "grouping", "groups", "gs", "gt", "gu", "gw", "gy", "h", "had", "hadn't", "hadnt", "half", "happens", "hardly", "has", "hasn", "hasn't", "hasnt", "have", "haven't", "havent", "haventoday", "having", "he", "he'd", "he'll", "he's", "hed", "hell", "hello", "help", "hence", "her", "here", "here's", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself", "herse”", "hes", "hi", "hid", "high", "higher", "highest", "him", "himself", "himse”", "his", "hither", "hk", "hm", "hn", "home", "homepage", "hopefully", "how", "how'd", "how'll", "how's", "howbeit", "however", "hr", "ht", "htm", "html", "http", "hu", "hundred", "i", "i'd", "i'll", "i'm", "i've", "i.e.", "id", "ie", "if", "ignored", "ii", "il", "ill", "im", "immediate", "immediately", "importance", "important", "in", "inasmuch", "inc", "inc.", "indeed", "index", "indicate", "indicated", "indicates", "information", "inner", "inside", "insofar", "instead", "int", "interest", "interested", "interesting", "interests", "into", "invention", "inward", "io", "iq", "ir", "is", "isn", "isn't", "isnt", "it", "it'd", "it'll", "it's", "itd", "itll", "its", "itself", "itse”", "ive", "j", "je", "jm", "jo", "join", "jp", "just", "k", "ke", "keep", "keeps", "kept", "keys", "kg", "kh", "ki", "kind", "km", "kn", "knew", "know", "known", "knows", "kp", "kr", "kw", "ky", "kz", "l", "la", "large", "largely", "last", "lately", "later", "latest", "latter", "latterly", "lb", "lc", "least", "length", "less", "lest", "let", "let's", "lets", "li", "like", "liked", "likely", "likewise", "line", "little", "lk", "ll", "long", "longer", "longest", "look", "looking", "looks", "low", "lower", "lr", "ls", "lt", "ltd", "lu", "lv", "ly", "m", "ma", "made", "mainly", "make", "makes", "making", "man", "many", "may", "maybe", "mayn't", "maynt", "mc", "md", "me", "mean", "means", "meantime", "meanwhile", "member", "members", "men", "merely", "mg", "mh", "microsoft", "might", "might've", "mightn't", "mightnt", "mil", "mill", "million", "mine", "minus", "miss", "mk", "ml", "mm", "mn", "mo", "more", "moreover", "most", "mostly", "move", "mp", "mq", "mr", "mrs", "ms", "msie", "mt", "mu", "much", "mug", "must", "must've", "mustn't", "mustnt", "mv", "mw", "mx", "my", "myself", "myse”", "mz", "n", "na", "name", "namely", "nay", "nc", "nd", "ne", "near", "nearly", "necessarily", "necessary", "need", "needed", "needing", "needn't", "neednt", "needs", "neither", "net", "netscape", "never", "neverf", "neverless", "nevertheless", "new", "newer", "newest", "next", "nf", "ng", "ni", "nine", "ninety", "nl", "no", "no-one", "nobody", "non", "none", "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "notwithstanding", "novel", "now", "nowhere", "np", "nr", "nu", "null", "number", "numbers", "nz", "o", "obtain", "obtained", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "older", "oldest", "om", "omitted", "on", "once", "one", "one's", "ones", "only", "onto", "open", "opened", "opening", "opens", "opposite", "or", "ord", "order", "ordered", "ordering", "orders", "org", "other", "others", "otherwise", "ought", "oughtn't", "oughtnt", "our", "ours", "ourselves", "out", "outside", "over", "overall", "owing", "own", "p", "pa", "page", "pages", "part", "parted", "particular", "particularly", "parting", "parts", "past", "pe", "per", "perhaps", "pf", "pg", "ph", "pk", "pl", "place", "placed", "places", "please", "plus", "pm", "pmid", "pn", "point", "pointed", "pointing", "points", "poorly", "possible", "possibly", "potentially", "pp", "pr", "predominantly", "present", "presented", "presenting", "presents", "presumably", "previously", "primarily", "probably", "problem", "problems", "promptly", "proud", "provided", "provides", "pt", "put", "puts", "pw", "py", "q", "qa", "que", "quickly", "quite", "qv", "r", "ran", "rather", "rd", "re", "readily", "really", "reasonably", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "reserved", "respectively", "resulted", "resulting", "results", "right", "ring", "ro", "room", "rooms", "round", "ru", "run", "rw", "s", "sa", "said", "same", "saw", "say", "saying", "says", "sb", "sc", "sd", "se", "sec", "second", "secondly", "seconds", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "sees", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "seventy", "several", "sg", "sh", "shall", "shan't", "shant", "she", "she'd", "she'll", "she's", "shed", "shell", "shes", "should", "should've", "shouldn", "shouldn't", "shouldnt", "show", "showed", "showing", "shown", "showns", "shows", "si", "side", "sides", "significant", "significantly", "similar", "similarly", "since", "sincere", "site", "six", "sixty", "sj", "sk", "sl", "slightly", "sm", "small", "smaller", "smallest", "sn", "so", "some", "somebody", "someday", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "specifying", "sr", "st", "state", "states", "still", "stop", "strongly", "su", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure", "sv", "sy", "system", "sz", "t", "t's", "take", "taken", "taking", "tc", "td", "tell", "ten", "tends", "test", "text", "tf", "tg", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "that's", "that've", "thatll", "thats", "thatve", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "there'd", "there'll", "there're", "there's", "there've", "thereafter", "thereby", "thered", "therefore", "therein", "therell", "thereof", "therere", "theres", "thereto", "thereupon", "thereve", "these", "they", "they'd", "they'll", "they're", "they've", "theyd", "theyll", "theyre", "theyve", "thick", "thin", "thing", "things", "think", "thinks", "third", "thirty", "this", "thorough", "thoroughly", "those", "thou", "though", "thoughh", "thought", "thoughts", "thousand", "three", "throug", "through", "throughout", "thru", "thus", "til", "till", "tip", "tis", "tj", "tk", "tm", "tn", "to", "today", "together", "too", "took", "top", "toward", "towards", "tp", "tr", "tried", "tries", "trillion", "truly", "try", "trying", "ts", "tt", "turn", "turned", "turning", "turns", "tv", "tw", "twas", "twelve", "twenty", "twice", "two", "tz", "u", "ua", "ug", "uk", "um", "un", "under", "underneath", "undoing", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "ups", "upwards", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "uucp", "uy", "uz", "v", "va", "value", "various", "vc", "ve", "versus", "very", "vg", "vi", "via", "viz", "vn", "vol", "vols", "vs", "vu", "w", "want", "wanted", "wanting", "wants", "was", "wasn", "wasn't", "wasnt", "way", "ways", "we", "we'd", "we'll", "we're", "we've", "web", "webpage", "website", "wed", "welcome", "well", "wells", "went", "were", "weren", "weren't", "werent", "weve", "wf", "what", "what'd", "what'll", "what's", "what've", "whatever", "whatll", "whats", "whatve", "when", "when'd", "when'll", "when's", "whence", "whenever", "where", "where'd", "where'll", "where's", "whereafter", "whereas", "whereby", "wherein", "wheres", "whereupon", "wherever", "whether", "which", "whichever", "while", "whilst", "whim", "whither", "who", "who'd", "who'll", "who's", "whod", "whoever", "whole", "wholl", "whom", "whomever", "whos", "whose", "why", "why'd", "why'll", "why's", "widely", "width", "will", "willing", "wish", "with", "within", "without", "won", "won't", "wonder", "wont", "words", "work", "worked", "working", "works", "world", "would", "would've", "wouldn", "wouldn't", "wouldnt", "ws", "www", "x", "y", "ye", "year", "years", "yes", "yet", "you", "you'd", "you'll", "you're", "you've", "youd", "youll", "young", "younger", "youngest", "your", "youre", "yours", "yourself", "yourselves", "youve", "yt", "yu", "z", "za", "zero", "zm", "zr"];

                    var stopwords_hi = ["अंदर", "अत", "अदि", "अप", "अपना", "अपनि", "अपनी", "अपने", "अभि", "अभी", "आदि", "आप", "इंहिं", "इंहें", "इंहों", "इतयादि", "इत्यादि", "इन", "इनका", "इन्हीं", "इन्हें", "इन्हों", "इस", "इसका", "इसकि", "इसकी", "इसके", "इसमें", "इसि", "इसी", "इसे", "उंहिं", "उंहें", "उंहों", "उन", "उनका", "उनकि", "उनकी", "उनके", "उनको", "उन्हीं", "उन्हें", "उन्हों", "उस", "उसके", "उसि", "उसी", "उसे", "एक", "एवं", "एस", "एसे", "ऐसे", "ओर", "और", "कइ", "कई", "कर", "करता", "करते", "करना", "करने", "करें", "कहते", "कहा", "का", "काफि", "काफ़ी", "कि", "किंहें", "किंहों", "कितना", "किन्हें", "किन्हों", "किया", "किर", "किस", "किसि", "किसी", "किसे", "की", "कुछ", "कुल", "के", "को", "कोइ", "कोई", "कोन", "कोनसा", "कौन", "कौनसा", "गया", "घर", "जब", "जहाँ", "जहां", "जा", "जिंहें", "जिंहों", "जितना", "जिधर", "जिन", "जिन्हें", "जिन्हों", "जिस", "जिसे", "जीधर", "जेसा", "जेसे", "जैसा", "जैसे", "जो", "तक", "तब", "तरह", "तिंहें", "तिंहों", "तिन", "तिन्हें", "तिन्हों", "तिस", "तिसे", "तो", "था", "थि", "थी", "थे", "दबारा", "दवारा", "दिया", "दुसरा", "दुसरे", "दूसरे", "दो", "द्वारा", "न", "नहिं", "नहीं", "ना", "निचे", "निहायत", "नीचे", "ने", "पर", "पहले", "पुरा", "पूरा", "पे", "फिर", "बनि", "बनी", "बहि", "बही", "बहुत", "बाद", "बाला", "बिलकुल", "भि", "भितर", "भी", "भीतर", "मगर", "मानो", "मे", "में", "यदि", "यह", "यहाँ", "यहां", "यहि", "यही", "या", "यिह", "ये", "रखें", "रवासा", "रहा", "रहे", "ऱ्वासा", "लिए", "लिये", "लेकिन", "व", "वगेरह", "वरग", "वर्ग", "वह", "वहाँ", "वहां", "वहिं", "वहीं", "वाले", "वुह", "वे", "वग़ैरह", "संग", "सकता", "सकते", "सबसे", "सभि", "सभी", "साथ", "साबुत", "साभ", "सारा", "से", "सो", "हि", "ही", "हुअ", "हुआ", "हुइ", "हुई", "हुए", "हे", "हें", "है", "हैं", "हो", "होता", "होति", "होती", "होते", "होना", "होने", "अर्थात", "तेरी", "हूं", "दे", "देकर", "रह", "कह", "बात", "सब", "उन्ह", "मेरे", "उसका", "गए", "वुह ", "परन्तु", "तुम्हारे", "क्योंकि", "कारण", "तुम", "तू", "उसने", "पास", "मुझ", "मेरी", "तेरे", "क्या", "काफ़ी", "साम्हने", "वग़ैरह", "यिह ", "उन्होंने", "तुझे", "हम", "ऐसा", "अनुसार", "उसकी", "तेरा", "पर  ", "कहता", "उसको", "मैं", "ले", "इसलिये", "वह ", "मुझे", "इन ", "मुझको", "मेरा", "अपने आप को", "हमने", "हमारा", "आपका", "तुम्हारा", "अपने आप", "स्वयं", "खुद को", "कि वह", "खुद ही", "उन्होने", "किसको", "हूँ", "होता है", "किया जा रहा है", "किया है", "पडा", "करता है", "रही", "अगर", "क्यूंकि", "जब तक", "जबकि", "के लिए", "के बारे में", "खिलाफ", "बीच", "के माध्यम से", "दौरान", "से पहले", "के बाद", "ऊपर", "से नीचे", "करने में", "निकल", "बंद", "से अधिक", "तहत", "दुबारा", "आगे", "एक बार", "कब", "कहाँ", "क्यों", "कैसे", "सारे", "दोनो", "प्रत्येक", "ज्यादा", "अधिकांश", "अन्य", "में कुछ", "में कोई", "मात्र", "खुद", "समान", "इसलिए", "जायेंगे", "जरा", "चाहिए", "कर दिया", "तथा", "परंतु", "कम", "दूर", "पूरे", "गये", "मै", "हुये", "कभी", "अथवा", "गयी", "प्रति", "जाता", "गई", "अब", "जिसमें", "लिया", "बड़ा", "जाती", "जाते", "लेकर", "बड़े", "जाने", "बाहर", "स्थान", "जिससे", "समय", "दोनों", "किए", "रहती", "इनके", "इनकी", "सकती", "आज", "कल", "दूसरा", "नके"]

                    var stopwords_guj = [
                        "હતો",
                        "તેથી",
                        "આપણું",
                        "ખાણ",
                        "આપણો",
                        "હવે",
                        "અંદર",
                        "તમે",
                        "તેમના",
                        "આ",
                        "તેના",
                        "તેને",
                        "તે",
                        "તેમને",
                        "એક",
                        "અને",
                        "આવા",
                        "ઘણા",
                        "કર",
                        "કરવું",
                        "કરો",
                        "કહો",
                        "કહ્યું",
                        "ના",
                        "પૂરતૂ",
                        "કેટલુ",
                        "જે",
                        "કર્યું",
                        "પાત્ર",
                        "ચુંબન",
                        "કોઈપણ",
                        "કેટલાક",
                        "કુલ",
                        "પ્રતિ",
                        "કોઈ",
                        "ગયો",
                        "ઘર",
                        "ક્યારે",
                        "જ્યાં",
                        "જાઓ",
                        "જીન",
                        "જેમને",
                        "જીસ",
                        "જેમ",
                        "કે",
                        "સુધી",
                        "પછી",
                        "દયાળુ",
                        "ત્રણ",
                        "તેર",
                        "હતી",
                        "હતા",
                        "ડબારા",
                        "આપ્યો",
                        "બીજો",
                        "અન્ય",
                        "બે",
                        "દ્વારા",
                        "નથી",
                        "નુકે",
                        "નીચે",
                        "છે",
                        "ચાલુ",
                        "પ્રથમ",
                        "સંપૂર્ણ",
                        "પર",
                        "ફરી",
                        "પુસ્તક",
                        "ખૂબ",
                        "બાલા",
                        "સંપૂર્ણપણે",
                        "પણ",
                        "પરંતુ",
                        "હું",
                        "હતું",
                        "માં",
                        "જો",
                        "અહીં",
                        "અથવા",
                        "યીહ",
                        "રાખવું",
                        "રહ્યા",
                        "અવસા",
                        "માટે",
                        "વર્ગ",
                        "ત્યાં",
                        "રાશિઓ",
                        "વહુ",
                        "તેઓ",
                        "બધા",
                        "સાથે",
                        "જમા",
                        "થી",
                        "માત્ર",
                        "બન્યું",
                        "હુઈ",
                        "હુ",
                        "હો",
                        "હશે",
                        "કર્યા",
                        "બેઉ",
                        "વી",
                        "એ",
                        "સક્ષમ",
                        "સમર્થ",
                        "વિશે",
                        "ઉપર",
                        "વિદેશમાં",
                        "અનુસાર",
                        "સમગ્ર",
                        "કાર્ય",
                        "ખરેખર",
                        "જાહેરાત",
                        "ઉમેર્યું",
                        "વિશેષણ",
                        "અપનાવ્યું",
                        "એઇ",
                        "એએફ",
                        "અસરગ્રસ્ત",
                        "પછીથી",
                        "સામે",
                        "પહેલાં",
                        "આહ",
                        "આગળ",
                        "અલ",
                        "લગભગ",
                        "એકલા",
                        "જોકે",
                        "હંમેશા",
                        "છું",
                        "વચ્ચે",
                        "રકમ",
                        "કંઈપણ",
                        "એઓઓ",
                        "સિવાય",
                        "કદર",
                        "યોગ્ય",
                        "એઆર",
                        "વિસ્તાર",
                        "ઊગવું",
                        "આસપાસ",
                        "અર્પા",
                        "કોરે",
                        "પુછવું",
                        "પૂછ્યું",
                        "સંકળાયેલ",
                        "ઉપલબ્ધ",
                        "અરે",
                        "દૂર",
                        "બા",
                        "પાછા",
                        "સમર્થિત",
                        "ટેકો",
                        "પીઠ",
                        "પછાત",
                        "બીબી",
                        "બીડી",
                        "હોઈ",
                        "બની",
                        "બને",
                        "પહેલાથી",
                        "શરૂઆત",
                        "પાછળ",
                        "હોવા",
                        "જીવો",
                        "બાજુમાં",
                        "ઉપરાંત",
                        "શ્રેષ્ઠ",
                        "બહાર",
                        "દ્વિ",
                        "મોટું",
                        "બિલ",
                        "અબજ",
                        "બાયોલ",
                        "બો",
                        "બંને",
                        "બીઆર",
                        "સંક્ષિપ્તમાં",
                        "ટૂંકમાં",
                        "બી.એસ.",
                        "બીટી",
                        "ખરીદી",
                        "બીવી",
                        "સી",
                        "કમન",
                        "આવ્યા",
                        "કપ્શન",
                        "કેસ",
                        "કારણ",
                        "કારણો",
                        "સીડી",
                        "ચોક્કસ",
                        "ચોક્કસપણે",
                        "ફેરફાર",
                        "ચોખ્ખુ",
                        "સહ",
                        "કોમ",
                        "આવો",
                        "કમ્પ્યુટર",
                        "કોન",
                        "સંબંધિત",
                        "પરિણામે",
                        "ધ્યાનમાં",
                        "ધરાવતું",
                        "નકલ",
                        "અનુરૂપ",
                        "શકવું",
                        "હોત",
                        "કેન",
                        "કેન્ટ",
                        "કોર્સ",
                        "રુદન",
                        "કયુ",
                        "હાલમાં",
                        "સીવી",
                        "સીએક્સ",
                        "સાયક",
                        "ડી",
                        "હિંમત",
                        "પિતૃ",
                        "તારીખ",
                        "પ્રિય",
                        "વર્ણન",
                        "વર્ણવેલ",
                        "છતાં",
                        "વિગતવાર",
                        "નહોતો",
                        "ભિન્ન",
                        "સીધા",
                        "કરી",
                        "ડોન",
                        "શંકાસ્પદ",
                        "ડાઉન",
                        "કારણે",
                        "દરમિયાન",
                        "દરેક",
                        "વહેલી",
                        "ઇડી",
                        "અસર",
                        "એહ",
                        "આઠ",
                        "એંસી",
                        "અગિયાર",
                        "બીજું",
                        "ખાલી",
                        "અંત",
                        "વગેરે",
                        "સમાનરૂપે",
                        "ક્યારેય",
                        "સદા",
                        "બધાને",
                        "બધું",
                        "ભૂતપૂર્વ",
                        "બરાબર",
                        "ઉદાહરણ",
                        "એફ",
                        "ચહેરો",
                        "ચહેરાઓ",
                        "હકીકત",
                        "તથ્યો",
                        "એકદમ",
                        "લાગ્યું",
                        "થોડા",
                        "ઓછા",
                        "એફએફ",
                        "ફાઈ",
                        "પંદર",
                        "પાંચમો",
                        "પચાસ",
                        "ફિફ",
                        "ભરો",
                        "શોધો",
                        "આગ",
                        "પાંચ",
                        "ફો",
                        "અનુસર્યા",
                        "નીચેના",
                        "અગાઉ",
                        "ચાલીસ",
                        "મળી",
                        "ચાર",
                        "મફત",
                        "માંથી",
                        "ભરેલું",
                        "વધુમાં",
                        "જી",
                        "ગા",
                        "જીઇ",
                        "સામાન્ય",
                        "મેળવો",
                        "મેળવવામાં",
                        "ભૂ",
                        "જીઆઈ",
                        "આપો",
                        "આપેલ",
                        "આપે",
                        "આપવું",
                        "ગ્રામ",
                        "જવું",
                        "સારું",
                        "માલ",
                        "મેળવેલ",
                        "મહાન",
                        "વધારે",
                        "શુભેચ્છાઓ",
                        "જૂથ",
                        "જૂથો",
                        "ગુ",
                        "અડધા",
                        "હેવન",
                        "ઉતાવળ",
                        "સ્વર્ગ",
                        "તેમણે",
                        "હેડ",
                        "નરક",
                        "નમસ્તે",
                        "મદદ",
                        "તેણીના",
                        "ત્યારબાદ",
                        "પોતાને",
                        "હર્સે",
                        "સંકોચ",
                        "હાય",
                        "છુપાવેલ",
                        "ઉચ્ચ",
                        "પોતે",
                        "આસ્થાપૂર્વક",
                        "કલાક",
                        "સો",
                        "આઈડી",
                        "અવગણવામાં",
                        "બીમાર",
                        "તાત્કાલિક",
                        "તરત",
                        "મહત્વ",
                        "મહત્વપૂર્ણ",
                        "અનુક્રમણિકા",
                        "સૂચવો",
                        "સંકેત",
                        "માહિતી",
                        "આંતરિક",
                        "પૂર્ણાંક",
                        "રસ",
                        "રસપ્રદ",
                        "રૂચિ",
                        "શોધ",
                        "જોડાઓ",
                        "કીઓ",
                        "કિલોગ્રામ",
                        "કિ.મી.",
                        "જાણો",
                        "જાણીતું",
                        "લા",
                        "મોટા",
                        "છેલ્લા",
                        "નવીનતમ",
                        "બાદમાં",
                        "લંબાઈ",
                        "ઓછું",
                        "કદાચ",
                        "દો",
                        "ચાલો",
                        "ગમ્યું",
                        "શક્યતા",
                        "લાઇન",
                        "થોડું",
                        "લાંબી",
                        "લાંબા",
                        "જુઓ",
                        "જોઈ",
                        "નીચા",
                        "નીચેનું",
                        "લિ",
                        "લુ",
                        "એલવી",
                        "મી",
                        "મા",
                        "બનાવેલું",
                        "મુખ્યત્વે",
                        "બનાવો",
                        "માણસ",
                        "મે",
                        "મેન્ટ",
                        "એમસી",
                        "એમ.ડી.",
                        "મને",
                        "મીન",
                        "અર્થ",
                        "સભ્ય",
                        "સભ્યો",
                        "પુરુષો",
                        "મિલિગ્રામ",
                        "માઇક્રોસોફ્ટ",
                        "શક્તિશાળી",
                        "મિલ",
                        "મિલિયન",
                        "બાદબાકી",
                        "ચૂકી",
                        "એમકે",
                        "મિલી",
                        "મીમી",
                        "એમન",
                        "મો",
                        "વધુ",
                        "ચાલ",
                        "એમપી",
                        "શ્રીમાન",
                        "શ્રીમતી",
                        "મ્યુ",
                        "ઘણું",
                        "પ્યાલો",
                        "મોસ્ટ",
                        "એમવી",
                        "એમએક્સ",
                        "મારા",
                        "એમઝેડ",
                        "એન",
                        "નામ",
                        "એનસી",
                        "ને",
                        "નજીક",
                        "જરૂરી",
                        "જરૂરિયાતમંદ",
                        "જરૂરિયાતો",
                        "ચોખ્ખી",
                        "નેટસ્કેપ",
                        "નિરર્થક",
                        "નવું",
                        "નવી",
                        "ની",
                        "નવ",
                        "નેવું",
                        "એન.એલ.",
                        "બિન",
                        "મધ્યાહન",
                        "સંખ્યા",
                        "નોંધ્યું",
                        "નવલકથા",
                        "નુ",
                        "નલ",
                        "નંબર",
                        "સંખ્યાઓ",
                        "ઓ",
                        "બંધ",
                        "ઓહ",
                        "વૃદ્ધ",
                        "જૂની",
                        "ઓમ",
                        "એકવાર",
                        "ખુલ્લા",
                        "ખોલ્યું",
                        "ઉદઘાટન",
                        "વિરુદ્ધ",
                        "ઓર્ડર",
                        "અન્યથા",
                        "જોઈએ",
                        "અવિરત",
                        "અમારા",
                        "જાતને",
                        "એકંદરે",
                        "પોતાના",
                        "પી",
                        "પા",
                        "પાનું",
                        "પૃષ્ઠો",
                        "ભાગ",
                        "વિભાજિત",
                        "ખાસ",
                        "વિદાય",
                        "ભાગો",
                        "ભૂતકાળ",
                        "પીઈ",
                        "સ્થળ",
                        "મૂકવામાં",
                        "સ્થાનો",
                        "વત્તા",
                        "બપોરે",
                        "બિંદુ",
                        "પોઇન્ટેડ",
                        "પોઇન્ટિંગ",
                        "પોઇન્ટ",
                        "નબળી",
                        "શક્ય",
                        "સંભવત",
                        "સંભવિત",
                        "પીપી",
                        "પીઆર",
                        "હાજર",
                        "પ્રસ્તુત",
                        "ભેટ",
                        "સંભવત.",
                        "સમસ્યા",
                        "સમસ્યાઓ",
                        "ગર્વ",
                        "પીટી",
                        "મૂકો",
                        "તદ્દન",
                        "દોડ્યું",
                        "બદલે",
                        "સહેલાઇથી",
                        "તાજેતરમાં",
                        "રેફ",
                        "અનુલક્ષીને",
                        "સાદર",
                        "પ્રમાણમાં",
                        "સંશોધન",
                        "અનામત",
                        "અનુક્રમે",
                        "પરિણામ",
                        "પરિણામો",
                        "રિંગ",
                        "રો",
                        "ઓરડો",
                        "ઓરડાઓ",
                        "ગોળ",
                        "રુ",
                        "ચલાવો",
                        "સા",
                        "સમાન",
                        "જોયું",
                        "કહેતા",
                        "સે",
                        "સેકન્ડ",
                        "વિભાગ",
                        "લાગતું",
                        "સ્વ",
                        "સમજુ",
                        "મોકલ્યો",
                        "ગંભીર",
                        "ગંભીરતાથી",
                        "સાત",
                        "સિત્તેર",
                        "સાગ",
                        "કરશે",
                        "શન્ટ",
                        "તેણી",
                        "શેડ",
                        "શેલ",
                        "બતાવો",
                        "બતાવ્યું",
                        "દર્શાવે",
                        "બાજુ",
                        "બાજુઓ",
                        "નોંધપાત્ર",
                        "ત્યારથી",
                        "નિષ્ઠાવાન",
                        "સાઇટ",
                        "છ",
                        "સાઠ",
                        "સ્લે",
                        "સહેજ",
                        "શ્રી",
                        "નાના",
                        "નાનું",
                        "કોઈકને",
                        "સોમેથન",
                        "કંઈક",
                        "કયારેક",
                        "ક્યારેક",
                        "ક્યાંક",
                        "જલ્દી",
                        "સ્પષ્ટ",
                        "ધો",
                        "રાજ્ય",
                        "ભારપૂર્વક",
                        "સુ",
                        "પેટા",
                        "સફળતાપૂર્વક",
                        "સૂચન",
                        "સહાયક",
                        "ટી",
                        "લો",
                        "લેવામાં",
                        "લેતા",
                        "ટીસી",
                        "ટીડી",
                        "દસ",
                        "પરીક્ષણ",
                        "કરતાં",
                        "આભાર",
                        "તેઓનું",
                        "ત્યાંથી",
                        "લાલ",
                        "તેમાં",
                        "જાડા",
                        "પાતળા",
                        "વસ્તુ",
                        "વસ્તુઓ",
                        "વિચારો",
                        "ત્રીજું",
                        "ત્રીસ",
                        "તું",
                        "વિચાર્યું",
                        "હજાર",
                        "થ્રોગ",
                        "થ્રુ",
                        "આમ",
                        "ટીપ",
                        "આજે",
                        "લીધો",
                        "ટોચ",
                        "તરફ",
                        "ટીપી",
                        "ટ્રિલિયન",
                        "ટીટી",
                        "વળો",
                        "વળાંક",
                        "ટીવી",
                        "ટ્વિ",
                        "બાર",
                        "વીસ",
                        "અમ",
                        "અન",
                        "હેઠળ",
                        "પૂર્વવત્",
                        "કમનસીબે",
                        "વિપરીત",
                        "અસંભવિત",
                        "યુપીએસ",
                        "અમને",
                        "વાપરવુ",
                        "વપરાયેલ",
                        "ઉપયોગી",
                        "ઉપયોગિતા",
                        "કિંમત",
                        "વિવિધ",
                        "વીસી",
                        "વે",
                        "વીજી",
                        "ઇચ્છતા",
                        "ઇચ્છા",
                        "નકામું",
                        "માર્ગ",
                        "માર્ગો",
                        "અમે",
                        "વેબ",
                        "વેબસાઇટ",
                        "લગ્ન",
                        "કુવાઓ",
                        "ગયા",
                        "શું",
                        "ક્યાંથી",
                        "જ્યારે",
                        "જેમાં",
                        "ધૂન",
                        "ડૂબવું",
                        "કોણ",
                        "જેનું",
                        "વ્યાપકપણે",
                        "પહોળાઈ",
                        "તૈયાર",
                        "વગર",
                        "જીત્યો",
                        "નહીં",
                        "આશ્ચર્ય",
                        "ટેવ",
                        "શબ્દો",
                        "કામ",
                        "દુનિયા",
                        "યે",
                        "વર્ષ",
                        "વર્ષો",
                        "હા",
                        "યુવાન",
                        "તમારા",
                        "તમારું",
                        "જાતે",
                        "શૂન્ય",
                        "જ",
                        "કરે",
                        "હોય",
                        "તેટલું",
                        "ગમે",
                        "બનાવેલ",
                        "તરીકે",
                        "શકો",
                        "છો",
                        "શકે",
                        "થાય",
                        "મુજબ",
                        "પરવાનગી",
                        "પહેલેથી",
                        "રીતે",
                        "દેખીતી",
                        "દેખાય",
                        "પૂછે",
                        "ભયાનક",
                        "પાછળની",
                        "બાજુએ",
                        "રહી",
                        "શરૂ",
                        "માને",
                        "કલ",
                        "શકતા",
                        "પોકળ",
                        "વાણી",
                        "ક્લિક",
                        "આવે",
                        "સમાવે",
                        "શક્યા",
                        "અલગ",
                        "થઈ",
                        "ગયું",
                        "ક્યાં",
                        "તો",
                        "બીજે",
                        "કરીને",
                        "જગ્યાએ",
                        "શોધે",
                        "ઠીક",
                        "અનુસરે",
                        "કાયમ",
                        "વધેલું",
                        "મળે",
                        "જાય",
                        "થયેલ",
                        "ન",
                        "ભાગ્યે",
                        "કરતો",
                        "સૌથી",
                        "કેવી",
                        "કરશો",
                        "તેમ",
                        "કરીશ",
                        "એટલે",
                        "સૂચવે",
                        "અંદરની",
                        "પડશે",
                        "રાખે",
                        "જાણતા",
                        "જાણે",
                        "હમણાં",
                        "ઓછામાં",
                        "તેવી",
                        "બનાવે",
                        "મોટે",
                        "ભાગે",
                        "હોવું",
                        "જોઇએ",
                        "મારી",
                        "માયસે",
                        "જરૂર",
                        "નહી",
                        "કંઈ",
                        "ક્યાય",
                        "નહિ",
                        "ઘણી",
                        "વાર",
                        "ખુલે",
                        "કૃપા",
                        "પ્રદાન",
                        "કરેલ",
                        "પૂરી",
                        "પાડે",
                        "મૂકે",
                        "વ્યાજબી",
                        "કહે",
                        "લાગે",
                        "જુએ",
                        "શાંત",
                        "બતાવે",
                        "દિવસ",
                        "કોઈક",
                        "અંશે",
                        "માફ",
                        "જણાવે",
                        "હજુ",
                        "પૂરતા",
                        "ખાતરી",
                        "વલણ",
                        "ધરાવે",
                        "પાસે",
                        "વિચારે",
                        "પ્રયાસ",
                        "કર્યો",
                        "વળે",
                        "ઉપયોગ",
                        "માંગે",
                        "કરીશું",
                        "છીએ",
                        "કરેલા",
                        "પેજ",
                        "સ્વાગત",
                        "શા",
                        "કેમ",
                        "શકશો",
                        "નાનો"
                    ]




                    var hindiAkshars = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ऌ', 'ऍ', 'ए', 'ऐ', 'ऑ', 'ओ', 'औ', 'क', 'क्ष', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'ज्ञ', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'त्र', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'र्', 'ल', 'ळ', 'व', 'श', 'श्र', 'ष', 'स', 'ह', 'ऽ', 'ॐ', 'क़', 'ख़', 'ग़', 'ज़', 'ड़', 'ढ़', 'फ़', 'ॠ', 'ॡ', '₹']

                    var gujAkshars = ["અ", "આ", "ઇ", "ઈ", "ઉ", "ઊ", "એ", "ઐ", "ઓ", "ઔ", "અં", "અ:", "ઋ", "ઍ", "ઑ", "ઌ", "ક", "ખ", "ગ", "ઘ", "ઙ", "ચ", "છ", "જ", "ઝ", "ઞ", "ટ", "ઠ", "ડ", "ઢ", "ણ", "ત", "થ", "દ", "ધ", "ન", "પ", "ફ", "બ", "ભ", "મ", "ય", "ર", "લ", "ળ", "વ", "શ", "ષ", "સ", "હ", "ક્ષ", "જ્ઞ"]
                    var tlds = ["aaa", "aarp", "abarth", "abb", "abbott", "abbvie", "abc", "able", "abogado", "abudhabi", "ac", "academy", "accenture", "accountant", "accountants", "aco", "active", "actor", "ad", "adac", "ads", "adult", "ae", "aeg", "aero", "aetna", "af", "afamilycompany", "afl", "africa", "ag", "agakhan", "agency", "ai", "aig", "aigo", "airbus", "airforce", "airtel", "akdn", "al", "alfaromeo", "alibaba", "alipay", "allfinanz", "allstate", "ally", "alsace", "alstom", "am", "americanexpress", "americanfamily", "amex", "amfam", "amica", "amsterdam", "analytics", "android", "anquan", "anz", "ao", "aol", "apartments", "app", "apple", "aq", "aquarelle", "ar", "aramco", "archi", "army", "arpa", "art", "arte", "as", "asda", "asia", "associates", "at", "athleta", "attorney", "au", "auction", "audi", "audible", "audio", "auspost", "author", "auto", "autos", "avianca", "aw", "aws", "ax", "axa", "az", "azure", "ba", "baby", "baidu", "banamex", "bananarepublic", "band", "bank", "bar", "barcelona", "barclaycard", "barclays", "barefoot", "bargains", "baseball", "basketball", "bauhaus", "bayern", "bb", "bbc", "bbt", "bbva", "bcg", "bcn", "bd", "be", "beats", "beauty", "beer", "bentley", "berlin", "best", "bestbuy", "bet", "bf", "bg", "bh", "bharti", "bi", "bible", "bid", "bike", "bing", "bingo", "bio", "biz", "bj", "black", "blackfriday", "blanco", "blockbuster", "blog", "bloomberg", "blue", "bm", "bms", "bmw", "bn", "bnl", "bnpparibas", "bo", "boats", "boehringer", "bofa", "bom", "bond", "boo", "book", "booking", "boots", "bosch", "bostik", "boston", "bot", "boutique", "box", "br", "bradesco", "bridgestone", "broadway", "broker", "brother", "brussels", "bs", "bt", "budapest", "bugatti", "build", "builders", "business", "buy", "buzz", "bv", "bw", "by", "bz", "bzh", "ca", "cab", "cafe", "cal", "call", "calvinklein", "cam", "camera", "camp", "cancerresearch", "canon", "capetown", "capital", "capitalone", "car", "caravan", "cards", "care", "career", "careers", "cars", "cartier", "casa", "case", "caseih", "cash", "casino", "cat", "catering", "catholic", "cba", "cbn", "cbre", "cbs", "cc", "cd", "ceb", "center", "ceo", "cern", "cf", "cfa", "cfd", "cg", "ch", "chanel", "channel", "chase", "chat", "cheap", "chintai", "chloe", "christmas", "chrome", "chrysler", "church", "ci", "cipriani", "circle", "cisco", "citadel", "citi", "citic", "city", "cityeats", "ck", "cl", "claims", "cleaning", "click", "clinic", "clinique", "clothing", "cloud", "club", "clubmed", "cm", "cn", "co", "coach", "codes", "coffee", "college", "cologne", "com", "comcast", "commbank", "community", "company", "compare", "computer", "comsec", "condos", "construction", "consulting", "contact", "contractors", "cooking", "cookingchannel", "cool", "coop", "corsica", "country", "coupon", "coupons", "courses", "cr", "credit", "creditcard", "creditunion", "cricket", "crown", "crs", "cruise", "cruises", "csc", "cu", "cuisinella", "cv", "cw", "cx", "cy", "cymru", "cyou", "cz", "dabur", "dad", "dance", "data", "date", "dating", "datsun", "day", "dclk", "dds", "de", "deal", "dealer", "deals", "degree", "delivery", "dell", "deloitte", "delta", "democrat", "dental", "dentist", "desi", "design", "dev", "dhl", "diamonds", "diet", "digital", "direct", "directory", "discount", "discover", "dish", "diy", "dj", "dk", "dm", "dnp", "do", "docs", "doctor", "dodge", "dog", "doha", "domains", "dot", "download", "drive", "dtv", "dubai", "duck", "dunlop", "duns", "dupont", "durban", "dvag", "dvr", "dz", "earth", "eat", "ec", "eco", "edeka", "edu", "education", "ee", "eg", "email", "emerck", "energy", "engineer", "engineering", "enterprises", "epost", "epson", "equipment", "er", "ericsson", "erni", "es", "esq", "estate", "esurance", "et", "eu", "eurovision", "eus", "events", "everbank", "exchange", "expert", "exposed", "express", "extraspace", "fage", "fail", "fairwinds", "faith", "family", "fan", "fans", "farm", "farmers", "fashion", "fast", "fedex", "feedback", "ferrari", "ferrero", "fi", "fiat", "fidelity", "fido", "film", "final", "finance", "financial", "fire", "firestone", "firmdale", "fish", "fishing", "fit", "fitness", "fj", "fk", "flickr", "flights", "flir", "florist", "flowers", "fly", "fm", "fo", "foo", "food", "foodnetwork", "football", "ford", "forex", "forsale", "forum", "foundation", "fox", "fr", "free", "fresenius", "frl", "frogans", "frontdoor", "frontier", "ftr", "fujitsu", "fujixerox", "fun", "fund", "furniture", "futbol", "fyi", "ga", "gal", "gallery", "gallo", "gallup", "game", "games", "gap", "garden", "gb", "gbiz", "gd", "gdn", "ge", "gea", "gent", "genting", "george", "gf", "gg", "ggee", "gh", "gi", "gift", "gifts", "gives", "giving", "gl", "glade", "glass", "gle", "global", "globo", "gm", "gmail", "gmbh", "gmo", "gmx", "gn", "godaddy", "gold", "goldpoint", "golf", "goo", "goodhands", "goodyear", "goog", "google", "gop", "got", "gov", "gp", "gq", "gr", "grainger", "graphics", "gratis", "green", "gripe", "group", "gs", "gt", "gu", "guardian", "gucci", "guge", "guide", "guitars", "guru", "gw", "gy", "hair", "hamburg", "hangout", "haus", "hbo", "hdfc", "hdfcbank", "health", "healthcare", "help", "helsinki", "here", "hermes", "hgtv", "hiphop", "hisamitsu", "hitachi", "hiv", "hk", "hkt", "hm", "hn", "hockey", "holdings", "holiday", "homedepot", "homegoods", "homes", "homesense", "honda", "honeywell", "horse", "hospital", "host", "hosting", "hot", "hoteles", "hotels", "hotmail", "house", "how", "hr", "hsbc", "ht", "htc", "hu", "hughes", "hyatt", "hyundai", "ibm", "icbc", "ice", "icu", "id", "ie", "ieee", "ifm", "ikano", "il", "im", "imamat", "imdb", "immo", "immobilien", "in", "industries", "infiniti", "info", "ing", "ink", "institute", "insurance", "insure", "int", "intel", "international", "intuit", "investments", "io", "ipiranga", "iq", "ir", "irish", "is", "iselect", "ismaili", "ist", "istanbul", "it", "itau", "itv", "iveco", "iwc", "jaguar", "java", "jcb", "jcp", "je", "jeep", "jetzt", "jewelry", "jio", "jlc", "jll", "jm", "jmp", "jnj", "jo", "jobs", "joburg", "jot", "joy", "jp", "jpmorgan", "jprs", "juegos", "juniper", "kaufen", "kddi", "ke", "kerryhotels", "kerrylogistics", "kerryproperties", "kfh", "kg", "kh", "ki", "kia", "kim", "kinder", "kindle", "kitchen", "kiwi", "km", "kn", "koeln", "komatsu", "kosher", "kp", "kpmg", "kpn", "kr", "krd", "kred", "kuokgroup", "kw", "ky", "kyoto", "kz", "la", "lacaixa", "ladbrokes", "lamborghini", "lamer", "lancaster", "lancia", "lancome", "land", "landrover", "lanxess", "lasalle", "lat", "latino", "latrobe", "law", "lawyer", "lb", "lc", "lds", "lease", "leclerc", "lefrak", "legal", "lego", "lexus", "lgbt", "li", "liaison", "lidl", "life", "lifeinsurance", "lifestyle", "lighting", "like", "lilly", "limited", "limo", "lincoln", "linde", "link", "lipsy", "live", "living", "lixil", "lk", "loan", "loans", "locker", "locus", "loft", "lol", "london", "lotte", "lotto", "love", "lpl", "lplfinancial", "lr", "ls", "lt", "ltd", "ltda", "lu", "lundbeck", "lupin", "luxe", "luxury", "lv", "ly", "ma", "macys", "madrid", "maif", "maison", "makeup", "man", "management", "mango", "market", "marketing", "markets", "marriott", "marshalls", "maserati", "mattel", "mba", "mc", "mcd", "mcdonalds", "mckinsey", "md", "me", "med", "media", "meet", "melbourne", "meme", "memorial", "men", "menu", "meo", "metlife", "mg", "mh", "miami", "microsoft", "mil", "mini", "mint", "mit", "mitsubishi", "mk", "ml", "mlb", "mls", "mm", "mma", "mn", "mo", "mobi", "mobile", "mobily", "moda", "moe", "moi", "mom", "monash", "money", "monster", "montblanc", "mopar", "mormon", "mortgage", "moscow", "moto", "motorcycles", "mov", "movie", "movistar", "mp", "mq", "mr", "ms", "msd", "mt", "mtn", "mtpc", "mtr", "mu", "museum", "mutual", "mv", "mw", "mx", "my", "mz", "na", "nab", "nadex", "nagoya", "name", "nationwide", "natura", "navy", "nba", "nc", "ne", "nec", "net", "netbank", "netflix", "network", "neustar", "new", "newholland", "news", "next", "nextdirect", "nexus", "nf", "nfl", "ng", "ngo", "nhk", "ni", "nico", "nike", "nikon", "ninja", "nissan", "nissay", "nl", "no", "nokia", "northwesternmutual", "norton", "now", "nowruz", "nowtv", "np", "nr", "nra", "nrw", "ntt", "nu", "nyc", "nz", "obi", "observer", "off", "office", "okinawa", "olayan", "olayangroup", "oldnavy", "ollo", "om", "omega", "one", "ong", "onl", "online", "onyourside", "ooo", "open", "oracle", "orange", "org", "organic", "origins", "osaka", "otsuka", "ott", "ovh", "pa", "page", "pamperedchef", "panasonic", "panerai", "paris", "pars", "partners", "parts", "party", "passagens", "pay", "pccw", "pe", "pet", "pf", "pfizer", "pg", "ph", "pharmacy", "philips", "phone", "photo", "photography", "photos", "physio", "piaget", "pics", "pictet", "pictures", "pid", "pin", "ping", "pink", "pioneer", "pizza", "pk", "pl", "place", "play", "playstation", "plumbing", "plus", "pm", "pn", "pnc", "pohl", "poker", "politie", "porn", "post", "pr", "pramerica", "praxi", "press", "prime", "pro", "prod", "productions", "prof", "progressive", "promo", "properties", "property", "protection", "pru", "prudential", "ps", "pt", "pub", "pw", "pwc", "py", "qa", "qpon", "quebec", "quest", "qvc", "racing", "radio", "raid", "re", "read", "realestate", "realtor", "realty", "recipes", "red", "redstone", "redumbrella", "rehab", "reise", "reisen", "reit", "reliance", "ren", "rent", "rentals", "repair", "report", "republican", "rest", "restaurant", "review", "reviews", "rexroth", "rich", "richardli", "ricoh", "rightathome", "ril", "rio", "rip", "rmit", "ro", "rocher", "rocks", "rodeo", "rogers", "room", "rs", "rsvp", "ru", "rugby", "ruhr", "run", "rw", "rwe", "ryukyu", "sa", "saarland", "safe", "safety", "sakura", "sale", "salon", "samsclub", "samsung", "sandvik", "sandvikcoromant", "sanofi", "sap", "sapo", "sarl", "sas", "save", "saxo", "sb", "sbi", "sbs", "sc", "sca", "scb", "schaeffler", "schmidt", "scholarships", "school", "schule", "schwarz", "science", "scjohnson", "scor", "scot", "sd", "se", "seat", "secure", "security", "seek", "select", "sener", "services", "ses", "seven", "sew", "sex", "sexy", "sfr", "sg", "sh", "shangrila", "sharp", "shaw", "shell", "shia", "shiksha", "shoes", "shop", "shopping", "shouji", "show", "showtime", "shriram", "si", "silk", "sina", "singles", "site", "sj", "sk", "ski", "skin", "sky", "skype", "sl", "sling", "sm", "smart", "smile", "sn", "sncf", "so", "soccer", "social", "softbank", "software", "sohu", "solar", "solutions", "song", "sony", "soy", "space", "spiegel", "spot", "spreadbetting", "sr", "srl", "srt", "st", "stada", "staples", "star", "starhub", "statebank", "statefarm", "statoil", "stc", "stcgroup", "stockholm", "storage", "store", "stream", "studio", "study", "style", "su", "sucks", "supplies", "supply", "support", "surf", "surgery", "suzuki", "sv", "swatch", "swiftcover", "swiss", "sx", "sy", "sydney", "symantec", "systems", "sz", "tab", "taipei", "talk", "taobao", "target", "tatamotors", "tatar", "tattoo", "tax", "taxi", "tc", "tci", "td", "tdk", "team", "tech", "technology", "tel", "telecity", "telefonica", "temasek", "tennis", "teva", "tf", "tg", "th", "thd", "theater", "theatre", "tiaa", "tickets", "tienda", "tiffany", "tips", "tires", "tirol", "tj", "tjmaxx", "tjx", "tk", "tkmaxx", "tl", "tm", "tmall", "tn", "to", "today", "tokyo", "tools", "top", "toray", "toshiba", "total", "tours", "town", "toyota", "toys", "tr", "trade", "trading", "training", "travel", "travelchannel", "travelers", "travelersinsurance", "trust", "trv", "tt", "tube", "tui", "tunes", "tushu", "tv", "tvs", "tw", "tz", "ua", "ubank", "ubs", "uconnect", "ug", "uk", "unicom", "university", "uno", "uol", "ups", "us", "uy", "uz", "va", "vacations", "vana", "vanguard", "vc", "ve", "vegas", "ventures", "verisign", "versicherung", "vet", "vg", "vi", "viajes", "video", "vig", "viking", "villas", "vin", "vip", "virgin", "visa", "vision", "vista", "vistaprint", "viva", "vivo", "vlaanderen", "vn", "vodka", "volkswagen", "volvo", "vote", "voting", "voto", "voyage", "vu", "vuelos", "wales", "walmart", "walter", "wang", "wanggou", "warman", "watch", "watches", "weather", "weatherchannel", "webcam", "weber", "website", "wed", "wedding", "weibo", "weir", "wf", "whoswho", "wien", "wiki", "williamhill", "win", "windows", "wine", "winners", "wme", "wolterskluwer", "woodside", "work", "works", "world", "wow", "ws", "wtc", "wtf", "xbox", "xerox", "xfinity", "xihuan", "xin", "कॉम", "セール", "佛山", "慈善", "集团", "在线", "한국", "大众汽车", "点看", "คอม", "ভারত", "八卦", "موقع", "বাংলা", "公益", "公司", "香格里拉", "网站", "移动", "我爱你", "москва", "қаз", "католик", "онлайн", "сайт", "联通", "срб", "бг", "бел", "קום", "时尚", "微博", "淡马锡", "ファッション", "орг", "नेट", "ストア", "삼성", "சிங்கப்பூர்", "商标", "商店", "商城", "дети", "мкд", "ею", "ポイント", "新闻", "工行", "家電", "كوم", "中文网", "中信", "中国", "中國", "娱乐", "谷歌", "భారత్", "ලංකා", "電訊盈科", "购物", "クラウド", "ભારત", "通販", "भारत", "网店", "संगठन", "餐厅", "网络", "ком", "укр", "香港", "诺基亚", "食品", "飞利浦", "台湾", "台灣", "手表", "手机", "мон", "الجزائر", "عمان", "ارامكو", "ایران", "العليان", "امارات", "بازار", "پاکستان", "الاردن", "موبايلي", "بھارت", "المغرب", "ابوظبي", "السعودية", "كاثوليك", "سودان", "همراه", "عراق", "مليسيا", "澳門", "닷컴", "政府", "شبكة", "بيتك", "გე", "机构", "组织机构", "健康", "ไทย", "سورية", "рус", "рф", "珠宝", "تونس", "大拿", "みんな", "グーグル", "ελ", "世界", "書籍", "ਭਾਰਤ", "网址", "닷넷", "コム", "天主教", "游戏", "vermögensberater", "vermögensberatung", "企业", "信息", "嘉里大酒店", "嘉里", "مصر", "قطر", "广东", "இலங்கை", "இந்தியா", "հայ", "新加坡", "فلسطين", "政务", "xperia", "xxx", "xyz", "yachts", "yahoo", "yamaxun", "yandex", "ye", "yodobashi", "yoga", "yokohama", "you", "youtube", "yt", "yun", "za", "zappos", "zara", "zero", "zip", "zippo", "zm", "zone", "zuerich", "zw"];

                    var fourLetterList = ["क्रँ", "क्रं", "क्रः", "क्रा", "क्रि", "क्री", "क्रु", "क्रू", "क्रॅ", "क्रे", "क्रै", "क्रॉ", "क्रो", "क्रौ", "क्षँ", "क्षं", "क्षः", "क्षा", "क्षि", "क्षी", "क्षु", "क्षू", "क्षॅ", "क्षे", "क्षै", "क्षॉ", "क्षो", "क्षौ", "ख्रँ", "ख्रं", "ख्रः", "ख्रा", "ख्रि", "ख्री", "ख्रु", "ख्रू", "ख्रॅ", "ख्रे", "ख्रै", "ख्रॉ", "ख्रो", "ख्रौ", "ग्रँ", "ग्रं", "ग्रः", "ग्रा", "ग्रि", "ग्री", "ग्रु", "ग्रू", "ग्रॅ", "ग्रे", "ग्रै", "ग्रॉ", "ग्रो", "ग्रौ", "घ्रँ", "घ्रं", "घ्रः", "घ्रा", "घ्रि", "घ्री", "घ्रु", "घ्रू", "घ्रॅ", "घ्रे", "घ्रै", "घ्रॉ", "घ्रो", "घ्रौ", "ङ्रँ", "ङ्रं", "ङ्रः", "ङ्रा", "ङ्रि", "ङ्री", "ङ्रु", "ङ्रू", "ङ्रॅ", "ङ्रे", "ङ्रै", "ङ्रॉ", "ङ्रो", "ङ्रौ", "च्रँ", "च्रं", "च्रः", "च्रा", "च्रि", "च्री", "च्रु", "च्रू", "च्रॅ", "च्रे", "च्रै", "च्रॉ", "च्रो", "च्रौ", "छ्रँ", "छ्रं", "छ्रः", "छ्रा", "छ्रि", "छ्री", "छ्रु", "छ्रू", "छ्रॅ", "छ्रे", "छ्रै", "छ्रॉ", "छ्रो", "छ्रौ", "ज्ञँ", "ज्ञं", "ज्ञः", "ज्ञा", "ज्ञि", "ज्ञी", "ज्ञु", "ज्ञू", "ज्ञॅ", "ज्ञे", "ज्ञै", "ज्ञॉ", "ज्ञो", "ज्ञौ", "ज्रँ", "ज्रं", "ज्रः", "ज्रा", "ज्रि", "ज्री", "ज्रु", "ज्रू", "ज्रॅ", "ज्रे", "ज्रै", "ज्रॉ", "ज्रो", "ज्रौ", "झ्रँ", "झ्रं", "झ्रः", "झ्रा", "झ्रि", "झ्री", "झ्रु", "झ्रू", "झ्रॅ", "झ्रे", "झ्रै", "झ्रॉ", "झ्रो", "झ्रौ", "ञ्रँ", "ञ्रं", "ञ्रः", "ञ्रा", "ञ्रि", "ञ्री", "ञ्रु", "ञ्रू", "ञ्रॅ", "ञ्रे", "ञ्रै", "ञ्रॉ", "ञ्रो", "ञ्रौ", "ट्रँ", "ट्रं", "ट्रः", "ट्रा", "ट्रि", "ट्री", "ट्रु", "ट्रू", "ट्रॅ", "ट्रे", "ट्रै", "ट्रॉ", "ट्रो", "ट्रौ", "ठ्रँ", "ठ्रं", "ठ्रः", "ठ्रा", "ठ्रि", "ठ्री", "ठ्रु", "ठ्रू", "ठ्रॅ", "ठ्रे", "ठ्रै", "ठ्रॉ", "ठ्रो", "ठ्रौ", "ड्रँ", "ड्रं", "ड्रः", "ड्रा", "ड्रि", "ड्री", "ड्रु", "ड्रू", "ड्रॅ", "ड्रे", "ड्रै", "ड्रॉ", "ड्रो", "ड्रौ", "ण्रँ", "ण्रं", "ण्रः", "ण्रा", "ण्रि", "ण्री", "ण्रु", "ण्रू", "ण्रॅ", "ण्रे", "ण्रै", "ण्रॉ", "ण्रो", "ण्रौ", "त्रँ", "त्रँ", "त्रं", "त्रं", "त्रः", "त्रः", "त्रा", "त्रा", "त्रि", "त्रि", "त्री", "त्री", "त्रु", "त्रु", "त्रू", "त्रू", "त्रॅ", "त्रॅ", "त्रे", "त्रे", "त्रै", "त्रै", "त्रॉ", "त्रॉ", "त्रो", "त्रो", "त्रौ", "त्रौ", "थ्रँ", "थ्रं", "थ्रः", "थ्रा", "थ्रि", "थ्री", "थ्रु", "थ्रू", "थ्रॅ", "थ्रे", "थ्रै", "थ्रॉ", "थ्रो", "थ्रौ", "द्रँ", "द्रं", "द्रः", "द्रा", "द्रि", "द्री", "द्रु", "द्रू", "द्रॅ", "द्रे", "द्रै", "द्रॉ", "द्रो", "द्रौ", "ध्रँ", "ध्रं", "ध्रः", "ध्रा", "ध्रि", "ध्री", "ध्रु", "ध्रू", "ध्रॅ", "ध्रे", "ध्रै", "ध्रॉ", "ध्रो", "ध्रौ", "न्रँ", "न्रं", "न्रः", "न्रा", "न्रि", "न्री", "न्रु", "न्रू", "न्रॅ", "न्रे", "न्रै", "न्रॉ", "न्रो", "न्रौ", "प्रँ", "प्रं", "प्रः", "प्रा", "प्रि", "प्री", "प्रु", "प्रू", "प्रॅ", "प्रे", "प्रै", "प्रॉ", "प्रो", "प्रौ", "फ्रँ", "फ्रं", "फ्रः", "फ्रा", "फ्रि", "फ्री", "फ्रु", "फ्रू", "फ्रॅ", "फ्रे", "फ्रै", "फ्रॉ", "फ्रो", "फ्रौ", "ब्रँ", "ब्रं", "ब्रः", "ब्रा", "ब्रि", "ब्री", "ब्रु", "ब्रू", "ब्रॅ", "ब्रे", "ब्रै", "ब्रॉ", "ब्रो", "ब्रौ", "भ्रँ", "भ्रं", "भ्रः", "भ्रा", "भ्रि", "भ्री", "भ्रु", "भ्रू", "भ्रॅ", "भ्रे", "भ्रै", "भ्रॉ", "भ्रो", "भ्रौ", "म्रँ", "म्रं", "म्रः", "म्रा", "म्रि", "म्री", "म्रु", "म्रू", "म्रॅ", "म्रे", "म्रै", "म्रॉ", "म्रो", "म्रौ", "य्रँ", "य्रं", "य्रः", "य्रा", "य्रि", "य्री", "य्रु", "य्रू", "य्रॅ", "य्रे", "य्रै", "य्रॉ", "य्रो", "य्रौ", "र्रँ", "र्रं", "र्रः", "र्रा", "र्रि", "र्री", "र्रु", "र्रू", "र्रॅ", "र्रे", "र्रै", "र्रॉ", "र्रो", "र्रौ", "ल्रँ", "ल्रं", "ल्रः", "ल्रा", "ल्रि", "ल्री", "ल्रु", "ल्रू", "ल्रॅ", "ल्रे", "ल्रै", "ल्रॉ", "ल्रो", "ल्रौ", "व्रँ", "व्रं", "व्रः", "व्रा", "व्रि", "व्री", "व्रु", "व्रू", "व्रॅ", "व्रे", "व्रै", "व्रॉ", "व्रो", "व्रौ", "श्रँ", "श्रँ", "श्रं", "श्रं", "श्रः", "श्रः", "श्रा", "श्रा", "श्रि", "श्रि", "श्री", "श्री", "श्रु", "श्रु", "श्रू", "श्रू", "श्रॅ", "श्रॅ", "श्रे", "श्रे", "श्रै", "श्रै", "श्रॉ", "श्रॉ", "श्रो", "श्रो", "श्रौ", "श्रौ", "ष्रँ", "ष्रं", "ष्रः", "ष्रा", "ष्रि", "ष्री", "ष्रु", "ष्रू", "ष्रॅ", "ष्रे", "ष्रै", "ष्रॉ", "ष्रो", "ष्रौ", "स्रँ", "स्रं", "स्रः", "स्रा", "स्रि", "स्री", "स्रु", "स्रू", "स्रॅ", "स्रे", "स्रै", "स्रॉ", "स्रो", "स्रौ", "ह्रँ", "ह्रं", "ह्रः", "ह्रा", "ह्रि", "ह्री", "ह्रु", "ह्रू", "ह्रॅ", "ह्रे", "ह्रै", "ह्रॉ", "ह्रो", "ह्रौ", "ढ़्रँ", "ढ़्रं", "ढ़्रः", "ढ़्रा", "ढ़्रि", "ढ़्री", "ढ़्रु", "ढ़्रू", "ढ़्रॅ", "ढ़्रे", "ढ़्रै", "ढ़्रॉ", "ढ़्रो", "ढ़्रौ"];

                    var fourLetterList_guj = [
                        "ક્રઁ",
                        "ક્રં",
                        "ક્રઃ",
                        "ક્રી",
                        "ક્રુ",
                        "ક્રૂ",
                        "ક્રૃ",
                        "ક્રૄ",
                        "ક્રૅ",
                        "ક્રે",
                        "ક્રૈ",
                        "ક્રૉ",
                        "ક્રો",
                        "ક્રૌ",
                        "ક્ર્",
                        "ક્રૢ",
                        "ક્રૣ",
                        "ક્ર઼",
                        "ક્રા",
                        "ક્રિ",
                        "ક્રૻ",
                        "ક્રૼ",
                        "ક્ર૽",
                        "ક્ર૾",
                        "ક્ર૿",
                        "ખ્રઁ",
                        "ખ્રં",
                        "ખ્રઃ",
                        "ખ્રી",
                        "ખ્રુ",
                        "ખ્રૂ",
                        "ખ્રૃ",
                        "ખ્રૄ",
                        "ખ્રૅ",
                        "ખ્રે",
                        "ખ્રૈ",
                        "ખ્રૉ",
                        "ખ્રો",
                        "ખ્રૌ",
                        "ખ્ર્",
                        "ખ્રૢ",
                        "ખ્રૣ",
                        "ખ્ર઼",
                        "ખ્રા",
                        "ખ્રિ",
                        "ખ્રૻ",
                        "ખ્રૼ",
                        "ખ્ર૽",
                        "ખ્ર૾",
                        "ખ્ર૿",
                        "ગ્રઁ",
                        "ગ્રં",
                        "ગ્રઃ",
                        "ગ્રી",
                        "ગ્રુ",
                        "ગ્રૂ",
                        "ગ્રૃ",
                        "ગ્રૄ",
                        "ગ્રૅ",
                        "ગ્રે",
                        "ગ્રૈ",
                        "ગ્રૉ",
                        "ગ્રો",
                        "ગ્રૌ",
                        "ગ્ર્",
                        "ગ્રૢ",
                        "ગ્રૣ",
                        "ગ્ર઼",
                        "ગ્રા",
                        "ગ્રિ",
                        "ગ્રૻ",
                        "ગ્રૼ",
                        "ગ્ર૽",
                        "ગ્ર૾",
                        "ગ્ર૿",
                        "ઘ્રઁ",
                        "ઘ્રં",
                        "ઘ્રઃ",
                        "ઘ્રી",
                        "ઘ્રુ",
                        "ઘ્રૂ",
                        "ઘ્રૃ",
                        "ઘ્રૄ",
                        "ઘ્રૅ",
                        "ઘ્રે",
                        "ઘ્રૈ",
                        "ઘ્રૉ",
                        "ઘ્રો",
                        "ઘ્રૌ",
                        "ઘ્ર્",
                        "ઘ્રૢ",
                        "ઘ્રૣ",
                        "ઘ્ર઼",
                        "ઘ્રા",
                        "ઘ્રિ",
                        "ઘ્રૻ",
                        "ઘ્રૼ",
                        "ઘ્ર૽",
                        "ઘ્ર૾",
                        "ઘ્ર૿",
                        "ઙ્રઁ",
                        "ઙ્રં",
                        "ઙ્રઃ",
                        "ઙ્રી",
                        "ઙ્રુ",
                        "ઙ્રૂ",
                        "ઙ્રૃ",
                        "ઙ્રૄ",
                        "ઙ્રૅ",
                        "ઙ્રે",
                        "ઙ્રૈ",
                        "ઙ્રૉ",
                        "ઙ્રો",
                        "ઙ્રૌ",
                        "ઙ્ર્",
                        "ઙ્રૢ",
                        "ઙ્રૣ",
                        "ઙ્ર઼",
                        "ઙ્રા",
                        "ઙ્રિ",
                        "ઙ્રૻ",
                        "ઙ્રૼ",
                        "ઙ્ર૽",
                        "ઙ્ર૾",
                        "ઙ્ર૿",
                        "ચ્રઁ",
                        "ચ્રં",
                        "ચ્રઃ",
                        "ચ્રી",
                        "ચ્રુ",
                        "ચ્રૂ",
                        "ચ્રૃ",
                        "ચ્રૄ",
                        "ચ્રૅ",
                        "ચ્રે",
                        "ચ્રૈ",
                        "ચ્રૉ",
                        "ચ્રો",
                        "ચ્રૌ",
                        "ચ્ર્",
                        "ચ્રૢ",
                        "ચ્રૣ",
                        "ચ્ર઼",
                        "ચ્રા",
                        "ચ્રિ",
                        "ચ્રૻ",
                        "ચ્રૼ",
                        "ચ્ર૽",
                        "ચ્ર૾",
                        "ચ્ર૿",
                        "છ્રઁ",
                        "છ્રં",
                        "છ્રઃ",
                        "છ્રી",
                        "છ્રુ",
                        "છ્રૂ",
                        "છ્રૃ",
                        "છ્રૄ",
                        "છ્રૅ",
                        "છ્રે",
                        "છ્રૈ",
                        "છ્રૉ",
                        "છ્રો",
                        "છ્રૌ",
                        "છ્ર્",
                        "છ્રૢ",
                        "છ્રૣ",
                        "છ્ર઼",
                        "છ્રા",
                        "છ્રિ",
                        "છ્રૻ",
                        "છ્રૼ",
                        "છ્ર૽",
                        "છ્ર૾",
                        "છ્ર૿",
                        "જ્રઁ",
                        "જ્રં",
                        "જ્રઃ",
                        "જ્રી",
                        "જ્રુ",
                        "જ્રૂ",
                        "જ્રૃ",
                        "જ્રૄ",
                        "જ્રૅ",
                        "જ્રે",
                        "જ્રૈ",
                        "જ્રૉ",
                        "જ્રો",
                        "જ્રૌ",
                        "જ્ર્",
                        "જ્રૢ",
                        "જ્રૣ",
                        "જ્ર઼",
                        "જ્રા",
                        "જ્રિ",
                        "જ્રૻ",
                        "જ્રૼ",
                        "જ્ર૽",
                        "જ્ર૾",
                        "જ્ર૿",
                        "ઝ્રઁ",
                        "ઝ્રં",
                        "ઝ્રઃ",
                        "ઝ્રી",
                        "ઝ્રુ",
                        "ઝ્રૂ",
                        "ઝ્રૃ",
                        "ઝ્રૄ",
                        "ઝ્રૅ",
                        "ઝ્રે",
                        "ઝ્રૈ",
                        "ઝ્રૉ",
                        "ઝ્રો",
                        "ઝ્રૌ",
                        "ઝ્ર્",
                        "ઝ્રૢ",
                        "ઝ્રૣ",
                        "ઝ્ર઼",
                        "ઝ્રા",
                        "ઝ્રિ",
                        "ઝ્રૻ",
                        "ઝ્રૼ",
                        "ઝ્ર૽",
                        "ઝ્ર૾",
                        "ઝ્ર૿",
                        "ઞ્રઁ",
                        "ઞ્રં",
                        "ઞ્રઃ",
                        "ઞ્રી",
                        "ઞ્રુ",
                        "ઞ્રૂ",
                        "ઞ્રૃ",
                        "ઞ્રૄ",
                        "ઞ્રૅ",
                        "ઞ્રે",
                        "ઞ્રૈ",
                        "ઞ્રૉ",
                        "ઞ્રો",
                        "ઞ્રૌ",
                        "ઞ્ર્",
                        "ઞ્રૢ",
                        "ઞ્રૣ",
                        "ઞ્ર઼",
                        "ઞ્રા",
                        "ઞ્રિ",
                        "ઞ્રૻ",
                        "ઞ્રૼ",
                        "ઞ્ર૽",
                        "ઞ્ર૾",
                        "ઞ્ર૿",
                        "ટ્રઁ",
                        "ટ્રં",
                        "ટ્રઃ",
                        "ટ્રી",
                        "ટ્રુ",
                        "ટ્રૂ",
                        "ટ્રૃ",
                        "ટ્રૄ",
                        "ટ્રૅ",
                        "ટ્રે",
                        "ટ્રૈ",
                        "ટ્રૉ",
                        "ટ્રો",
                        "ટ્રૌ",
                        "ટ્ર્",
                        "ટ્રૢ",
                        "ટ્રૣ",
                        "ટ્ર઼",
                        "ટ્રા",
                        "ટ્રિ",
                        "ટ્રૻ",
                        "ટ્રૼ",
                        "ટ્ર૽",
                        "ટ્ર૾",
                        "ટ્ર૿",
                        "ઠ્રઁ",
                        "ઠ્રં",
                        "ઠ્રઃ",
                        "ઠ્રી",
                        "ઠ્રુ",
                        "ઠ્રૂ",
                        "ઠ્રૃ",
                        "ઠ્રૄ",
                        "ઠ્રૅ",
                        "ઠ્રે",
                        "ઠ્રૈ",
                        "ઠ્રૉ",
                        "ઠ્રો",
                        "ઠ્રૌ",
                        "ઠ્ર્",
                        "ઠ્રૢ",
                        "ઠ્રૣ",
                        "ઠ્ર઼",
                        "ઠ્રા",
                        "ઠ્રિ",
                        "ઠ્રૻ",
                        "ઠ્રૼ",
                        "ઠ્ર૽",
                        "ઠ્ર૾",
                        "ઠ્ર૿",
                        "ડ્રઁ",
                        "ડ્રં",
                        "ડ્રઃ",
                        "ડ્રી",
                        "ડ્રુ",
                        "ડ્રૂ",
                        "ડ્રૃ",
                        "ડ્રૄ",
                        "ડ્રૅ",
                        "ડ્રે",
                        "ડ્રૈ",
                        "ડ્રૉ",
                        "ડ્રો",
                        "ડ્રૌ",
                        "ડ્ર્",
                        "ડ્રૢ",
                        "ડ્રૣ",
                        "ડ્ર઼",
                        "ડ્રા",
                        "ડ્રિ",
                        "ડ્રૻ",
                        "ડ્રૼ",
                        "ડ્ર૽",
                        "ડ્ર૾",
                        "ડ્ર૿",
                        "ઢ્રઁ",
                        "ઢ્રં",
                        "ઢ્રઃ",
                        "ઢ્રી",
                        "ઢ્રુ",
                        "ઢ્રૂ",
                        "ઢ્રૃ",
                        "ઢ્રૄ",
                        "ઢ્રૅ",
                        "ઢ્રે",
                        "ઢ્રૈ",
                        "ઢ્રૉ",
                        "ઢ્રો",
                        "ઢ્રૌ",
                        "ઢ્ર્",
                        "ઢ્રૢ",
                        "ઢ્રૣ",
                        "ઢ્ર઼",
                        "ઢ્રા",
                        "ઢ્રિ",
                        "ઢ્રૻ",
                        "ઢ્રૼ",
                        "ઢ્ર૽",
                        "ઢ્ર૾",
                        "ઢ્ર૿",
                        "ણ્રઁ",
                        "ણ્રં",
                        "ણ્રઃ",
                        "ણ્રી",
                        "ણ્રુ",
                        "ણ્રૂ",
                        "ણ્રૃ",
                        "ણ્રૄ",
                        "ણ્રૅ",
                        "ણ્રે",
                        "ણ્રૈ",
                        "ણ્રૉ",
                        "ણ્રો",
                        "ણ્રૌ",
                        "ણ્ર્",
                        "ણ્રૢ",
                        "ણ્રૣ",
                        "ણ્ર઼",
                        "ણ્રા",
                        "ણ્રિ",
                        "ણ્રૻ",
                        "ણ્રૼ",
                        "ણ્ર૽",
                        "ણ્ર૾",
                        "ણ્ર૿",
                        "ત્રઁ",
                        "ત્રં",
                        "ત્રઃ",
                        "ત્રી",
                        "ત્રુ",
                        "ત્રૂ",
                        "ત્રૃ",
                        "ત્રૄ",
                        "ત્રૅ",
                        "ત્રે",
                        "ત્રૈ",
                        "ત્રૉ",
                        "ત્રો",
                        "ત્રૌ",
                        "ત્ર્",
                        "ત્રૢ",
                        "ત્રૣ",
                        "ત્ર઼",
                        "ત્રા",
                        "ત્રિ",
                        "ત્રૻ",
                        "ત્રૼ",
                        "ત્ર૽",
                        "ત્ર૾",
                        "ત્ર૿",
                        "થ્રઁ",
                        "થ્રં",
                        "થ્રઃ",
                        "થ્રી",
                        "થ્રુ",
                        "થ્રૂ",
                        "થ્રૃ",
                        "થ્રૄ",
                        "થ્રૅ",
                        "થ્રે",
                        "થ્રૈ",
                        "થ્રૉ",
                        "થ્રો",
                        "થ્રૌ",
                        "થ્ર્",
                        "થ્રૢ",
                        "થ્રૣ",
                        "થ્ર઼",
                        "થ્રા",
                        "થ્રિ",
                        "થ્રૻ",
                        "થ્રૼ",
                        "થ્ર૽",
                        "થ્ર૾",
                        "થ્ર૿",
                        "દ્રઁ",
                        "દ્રં",
                        "દ્રઃ",
                        "દ્રી",
                        "દ્રુ",
                        "દ્રૂ",
                        "દ્રૃ",
                        "દ્રૄ",
                        "દ્રૅ",
                        "દ્રે",
                        "દ્રૈ",
                        "દ્રૉ",
                        "દ્રો",
                        "દ્રૌ",
                        "દ્ર્",
                        "દ્રૢ",
                        "દ્રૣ",
                        "દ્ર઼",
                        "દ્રા",
                        "દ્રિ",
                        "દ્રૻ",
                        "દ્રૼ",
                        "દ્ર૽",
                        "દ્ર૾",
                        "દ્ર૿",
                        "ધ્રઁ",
                        "ધ્રં",
                        "ધ્રઃ",
                        "ધ્રી",
                        "ધ્રુ",
                        "ધ્રૂ",
                        "ધ્રૃ",
                        "ધ્રૄ",
                        "ધ્રૅ",
                        "ધ્રે",
                        "ધ્રૈ",
                        "ધ્રૉ",
                        "ધ્રો",
                        "ધ્રૌ",
                        "ધ્ર્",
                        "ધ્રૢ",
                        "ધ્રૣ",
                        "ધ્ર઼",
                        "ધ્રા",
                        "ધ્રિ",
                        "ધ્રૻ",
                        "ધ્રૼ",
                        "ધ્ર૽",
                        "ધ્ર૾",
                        "ધ્ર૿",
                        "ન્રઁ",
                        "ન્રં",
                        "ન્રઃ",
                        "ન્રી",
                        "ન્રુ",
                        "ન્રૂ",
                        "ન્રૃ",
                        "ન્રૄ",
                        "ન્રૅ",
                        "ન્રે",
                        "ન્રૈ",
                        "ન્રૉ",
                        "ન્રો",
                        "ન્રૌ",
                        "ન્ર્",
                        "ન્રૢ",
                        "ન્રૣ",
                        "ન્ર઼",
                        "ન્રા",
                        "ન્રિ",
                        "ન્રૻ",
                        "ન્રૼ",
                        "ન્ર૽",
                        "ન્ર૾",
                        "ન્ર૿",
                        "પ્રઁ",
                        "પ્રં",
                        "પ્રઃ",
                        "પ્રી",
                        "પ્રુ",
                        "પ્રૂ",
                        "પ્રૃ",
                        "પ્રૄ",
                        "પ્રૅ",
                        "પ્રે",
                        "પ્રૈ",
                        "પ્રૉ",
                        "પ્રો",
                        "પ્રૌ",
                        "પ્ર્",
                        "પ્રૢ",
                        "પ્રૣ",
                        "પ્ર઼",
                        "પ્રા",
                        "પ્રિ",
                        "પ્રૻ",
                        "પ્રૼ",
                        "પ્ર૽",
                        "પ્ર૾",
                        "પ્ર૿",
                        "ફ્રઁ",
                        "ફ્રં",
                        "ફ્રઃ",
                        "ફ્રી",
                        "ફ્રુ",
                        "ફ્રૂ",
                        "ફ્રૃ",
                        "ફ્રૄ",
                        "ફ્રૅ",
                        "ફ્રે",
                        "ફ્રૈ",
                        "ફ્રૉ",
                        "ફ્રો",
                        "ફ્રૌ",
                        "ફ્ર્",
                        "ફ્રૢ",
                        "ફ્રૣ",
                        "ફ્ર઼",
                        "ફ્રા",
                        "ફ્રિ",
                        "ફ્રૻ",
                        "ફ્રૼ",
                        "ફ્ર૽",
                        "ફ્ર૾",
                        "ફ્ર૿",
                        "બ્રઁ",
                        "બ્રં",
                        "બ્રઃ",
                        "બ્રી",
                        "બ્રુ",
                        "બ્રૂ",
                        "બ્રૃ",
                        "બ્રૄ",
                        "બ્રૅ",
                        "બ્રે",
                        "બ્રૈ",
                        "બ્રૉ",
                        "બ્રો",
                        "બ્રૌ",
                        "બ્ર્",
                        "બ્રૢ",
                        "બ્રૣ",
                        "બ્ર઼",
                        "બ્રા",
                        "બ્રિ",
                        "બ્રૻ",
                        "બ્રૼ",
                        "બ્ર૽",
                        "બ્ર૾",
                        "બ્ર૿",
                        "ભ્રઁ",
                        "ભ્રં",
                        "ભ્રઃ",
                        "ભ્રી",
                        "ભ્રુ",
                        "ભ્રૂ",
                        "ભ્રૃ",
                        "ભ્રૄ",
                        "ભ્રૅ",
                        "ભ્રે",
                        "ભ્રૈ",
                        "ભ્રૉ",
                        "ભ્રો",
                        "ભ્રૌ",
                        "ભ્ર્",
                        "ભ્રૢ",
                        "ભ્રૣ",
                        "ભ્ર઼",
                        "ભ્રા",
                        "ભ્રિ",
                        "ભ્રૻ",
                        "ભ્રૼ",
                        "ભ્ર૽",
                        "ભ્ર૾",
                        "ભ્ર૿",
                        "મ્રઁ",
                        "મ્રં",
                        "મ્રઃ",
                        "મ્રી",
                        "મ્રુ",
                        "મ્રૂ",
                        "મ્રૃ",
                        "મ્રૄ",
                        "મ્રૅ",
                        "મ્રે",
                        "મ્રૈ",
                        "મ્રૉ",
                        "મ્રો",
                        "મ્રૌ",
                        "મ્ર્",
                        "મ્રૢ",
                        "મ્રૣ",
                        "મ્ર઼",
                        "મ્રા",
                        "મ્રિ",
                        "મ્રૻ",
                        "મ્રૼ",
                        "મ્ર૽",
                        "મ્ર૾",
                        "મ્ર૿",
                        "ય્રઁ",
                        "ય્રં",
                        "ય્રઃ",
                        "ય્રી",
                        "ય્રુ",
                        "ય્રૂ",
                        "ય્રૃ",
                        "ય્રૄ",
                        "ય્રૅ",
                        "ય્રે",
                        "ય્રૈ",
                        "ય્રૉ",
                        "ય્રો",
                        "ય્રૌ",
                        "ય્ર્",
                        "ય્રૢ",
                        "ય્રૣ",
                        "ય્ર઼",
                        "ય્રા",
                        "ય્રિ",
                        "ય્રૻ",
                        "ય્રૼ",
                        "ય્ર૽",
                        "ય્ર૾",
                        "ય્ર૿",
                        "ર્રઁ",
                        "ર્રં",
                        "ર્રઃ",
                        "ર્રી",
                        "ર્રુ",
                        "ર્રૂ",
                        "ર્રૃ",
                        "ર્રૄ",
                        "ર્રૅ",
                        "ર્રે",
                        "ર્રૈ",
                        "ર્રૉ",
                        "ર્રો",
                        "ર્રૌ",
                        "ર્ર્",
                        "ર્રૢ",
                        "ર્રૣ",
                        "ર્ર઼",
                        "ર્રા",
                        "ર્રિ",
                        "ર્રૻ",
                        "ર્રૼ",
                        "ર્ર૽",
                        "ર્ર૾",
                        "ર્ર૿",
                        "લ્રઁ",
                        "લ્રં",
                        "લ્રઃ",
                        "લ્રી",
                        "લ્રુ",
                        "લ્રૂ",
                        "લ્રૃ",
                        "લ્રૄ",
                        "લ્રૅ",
                        "લ્રે",
                        "લ્રૈ",
                        "લ્રૉ",
                        "લ્રો",
                        "લ્રૌ",
                        "લ્ર્",
                        "લ્રૢ",
                        "લ્રૣ",
                        "લ્ર઼",
                        "લ્રા",
                        "લ્રિ",
                        "લ્રૻ",
                        "લ્રૼ",
                        "લ્ર૽",
                        "લ્ર૾",
                        "લ્ર૿",
                        "ળ્રઁ",
                        "ળ્રં",
                        "ળ્રઃ",
                        "ળ્રી",
                        "ળ્રુ",
                        "ળ્રૂ",
                        "ળ્રૃ",
                        "ળ્રૄ",
                        "ળ્રૅ",
                        "ળ્રે",
                        "ળ્રૈ",
                        "ળ્રૉ",
                        "ળ્રો",
                        "ળ્રૌ",
                        "ળ્ર્",
                        "ળ્રૢ",
                        "ળ્રૣ",
                        "ળ્ર઼",
                        "ળ્રા",
                        "ળ્રિ",
                        "ળ્રૻ",
                        "ળ્રૼ",
                        "ળ્ર૽",
                        "ળ્ર૾",
                        "ળ્ર૿",
                        "વ્રઁ",
                        "વ્રં",
                        "વ્રઃ",
                        "વ્રી",
                        "વ્રુ",
                        "વ્રૂ",
                        "વ્રૃ",
                        "વ્રૄ",
                        "વ્રૅ",
                        "વ્રે",
                        "વ્રૈ",
                        "વ્રૉ",
                        "વ્રો",
                        "વ્રૌ",
                        "વ્ર્",
                        "વ્રૢ",
                        "વ્રૣ",
                        "વ્ર઼",
                        "વ્રા",
                        "વ્રિ",
                        "વ્રૻ",
                        "વ્રૼ",
                        "વ્ર૽",
                        "વ્ર૾",
                        "વ્ર૿",
                        "શ્રઁ",
                        "શ્રં",
                        "શ્રઃ",
                        "શ્રી",
                        "શ્રુ",
                        "શ્રૂ",
                        "શ્રૃ",
                        "શ્રૄ",
                        "શ્રૅ",
                        "શ્રે",
                        "શ્રૈ",
                        "શ્રૉ",
                        "શ્રો",
                        "શ્રૌ",
                        "શ્ર્",
                        "શ્રૢ",
                        "શ્રૣ",
                        "શ્ર઼",
                        "શ્રા",
                        "શ્રિ",
                        "શ્રૻ",
                        "શ્રૼ",
                        "શ્ર૽",
                        "શ્ર૾",
                        "શ્ર૿",
                        "ષ્રઁ",
                        "ષ્રં",
                        "ષ્રઃ",
                        "ષ્રી",
                        "ષ્રુ",
                        "ષ્રૂ",
                        "ષ્રૃ",
                        "ષ્રૄ",
                        "ષ્રૅ",
                        "ષ્રે",
                        "ષ્રૈ",
                        "ષ્રૉ",
                        "ષ્રો",
                        "ષ્રૌ",
                        "ષ્ર્",
                        "ષ્રૢ",
                        "ષ્રૣ",
                        "ષ્ર઼",
                        "ષ્રા",
                        "ષ્રિ",
                        "ષ્રૻ",
                        "ષ્રૼ",
                        "ષ્ર૽",
                        "ષ્ર૾",
                        "ષ્ર૿",
                        "સ્રઁ",
                        "સ્રં",
                        "સ્રઃ",
                        "સ્રી",
                        "સ્રુ",
                        "સ્રૂ",
                        "સ્રૃ",
                        "સ્રૄ",
                        "સ્રૅ",
                        "સ્રે",
                        "સ્રૈ",
                        "સ્રૉ",
                        "સ્રો",
                        "સ્રૌ",
                        "સ્ર્",
                        "સ્રૢ",
                        "સ્રૣ",
                        "સ્ર઼",
                        "સ્રા",
                        "સ્રિ",
                        "સ્રૻ",
                        "સ્રૼ",
                        "સ્ર૽",
                        "સ્ર૾",
                        "સ્ર૿",
                        "હ્રઁ",
                        "હ્રં",
                        "હ્રઃ",
                        "હ્રી",
                        "હ્રુ",
                        "હ્રૂ",
                        "હ્રૃ",
                        "હ્રૄ",
                        "હ્રૅ",
                        "હ્રે",
                        "હ્રૈ",
                        "હ્રૉ",
                        "હ્રો",
                        "હ્રૌ",
                        "હ્ર્",
                        "હ્રૢ",
                        "હ્રૣ",
                        "હ્ર઼",
                        "હ્રા",
                        "હ્રિ",
                        "હ્રૻ",
                        "હ્રૼ",
                        "હ્ર૽",
                        "હ્ર૾",
                        "હ્ર૿",
                        "ક્ષ્રઁ",
                        "ક્ષ્રં",
                        "ક્ષ્રઃ",
                        "ક્ષ્રી",
                        "ક્ષ્રુ",
                        "ક્ષ્રૂ",
                        "ક્ષ્રૃ",
                        "ક્ષ્રૄ",
                        "ક્ષ્રૅ",
                        "ક્ષ્રે",
                        "ક્ષ્રૈ",
                        "ક્ષ્રૉ",
                        "ક્ષ્રો",
                        "ક્ષ્રૌ",
                        "ક્ષ્ર્",
                        "ક્ષ્રૢ",
                        "ક્ષ્રૣ",
                        "ક્ષ્ર઼",
                        "ક્ષ્રા",
                        "ક્ષ્રિ",
                        "ક્ષ્રૻ",
                        "ક્ષ્રૼ",
                        "ક્ષ્ર૽",
                        "ક્ષ્ર૾",
                        "ક્ષ્ર૿",
                        "ક્ષૃઁ",
                        "ક્ષૃં",
                        "ક્ષૃઃ",
                        "ક્ષૃી",
                        "ક્ષૃુ",
                        "ક્ષૃૂ",
                        "ક્ષૃૃ",
                        "ક્ષૃૄ",
                        "ક્ષૃૅ",
                        "ક્ષૃે",
                        "ક્ષૃૈ",
                        "ક્ષૃૉ",
                        "ક્ષૃો",
                        "ક્ષૃૌ",
                        "ક્ષૃ્",
                        "ક્ષૃૢ",
                        "ક્ષૃૣ",
                        "ક્ષૃ઼",
                        "ક્ષૃા",
                        "ક્ષૃિ",
                        "ક્ષૃૻ",
                        "ક્ષૃૼ",
                        "ક્ષૃ૽",
                        "ક્ષૃ૾",
                        "ક્ષૃ૿",
                        "જ્ઞ્રઁ",
                        "જ્ઞ્રં",
                        "જ્ઞ્રઃ",
                        "જ્ઞ્રી",
                        "જ્ઞ્રુ",
                        "જ્ઞ્રૂ",
                        "જ્ઞ્રૃ",
                        "જ્ઞ્રૄ",
                        "જ્ઞ્રૅ",
                        "જ્ઞ્રે",
                        "જ્ઞ્રૈ",
                        "જ્ઞ્રૉ",
                        "જ્ઞ્રો",
                        "જ્ઞ્રૌ",
                        "જ્ઞ્ર્",
                        "જ્ઞ્રૢ",
                        "જ્ઞ્રૣ",
                        "જ્ઞ્ર઼",
                        "જ્ઞ્રા",
                        "જ્ઞ્રિ",
                        "જ્ઞ્રૻ",
                        "જ્ઞ્રૼ",
                        "જ્ઞ્ર૽",
                        "જ્ઞ્ર૾",
                        "જ્ઞ્ર૿",
                        "જ્ઞૃઁ",
                        "જ્ઞૃં",
                        "જ્ઞૃઃ",
                        "જ્ઞૃી",
                        "જ્ઞૃુ",
                        "જ્ઞૃૂ",
                        "જ્ઞૃૃ",
                        "જ્ઞૃૄ",
                        "જ્ઞૃૅ",
                        "જ્ઞૃે",
                        "જ્ઞૃૈ",
                        "જ્ઞૃૉ",
                        "જ્ઞૃો",
                        "જ્ઞૃૌ",
                        "જ્ઞૃ્",
                        "જ્ઞૃૢ",
                        "જ્ઞૃૣ",
                        "જ્ઞૃ઼",
                        "જ્ઞૃા",
                        "જ્ઞૃિ",
                        "જ્ઞૃૻ",
                        "જ્ઞૃૼ",
                        "જ્ઞૃ૽",
                        "જ્ઞૃ૾",
                        "જ્ઞૃ૿"
                    ]

                    var fileExtensionsWithMimeTypes = {
                        123: "application/vnd.lotus-1-2-3"
                        , ez: "application/andrew-inset"
                        , aw: "application/applixware"
                        , atom: "application/atom+xml"
                        , atomcat: "application/atomcat+xml"
                        , atomsvc: "application/atomsvc+xml"
                        , ccxml: "application/ccxml+xml"
                        , cdmia: "application/cdmi-capability"
                        , cdmic: "application/cdmi-container"
                        , cdmid: "application/cdmi-domain"
                        , cdmio: "application/cdmi-object"
                        , cdmiq: "application/cdmi-queue"
                        , cu: "application/cu-seeme"
                        , davmount: "application/davmount+xml"
                        , dbk: "application/docbook+xml"
                        , dssc: "application/dssc+der"
                        , xdssc: "application/dssc+xml"
                        , ecma: "application/ecmascript"
                        , emma: "application/emma+xml"
                        , epub: "application/epub+zip"
                        , exi: "application/exi"
                        , pfr: "application/font-tdpfr"
                        , woff: "application/font-woff"
                        , gml: "application/gml+xml"
                        , gpx: "application/gpx+xml"
                        , gxf: "application/gxf"
                        , stk: "application/hyperstudio"
                        , ink: "application/inkml+xml"
                        , inkml: "application/inkml+xml"
                        , ipfix: "application/ipfix"
                        , jar: "application/java-archive"
                        , ser: "application/java-serialized-object"
                        , "class": "application/java-vm"
                        , js: "application/javascript"
                        , json: "application/json"
                        , jsonml: "application/jsonml+json"
                        , lostxml: "application/lost+xml"
                        , hqx: "application/mac-binhex40"
                        , cpt: "application/mac-compactpro"
                        , mads: "application/mads+xml"
                        , mrc: "application/marc"
                        , mrcx: "application/marcxml+xml"
                        , ma: "application/mathematica"
                        , nb: "application/mathematica"
                        , mb: "application/mathematica"
                        , mathml: "application/mathml+xml"
                        , mbox: "application/mbox"
                        , mscml: "application/mediaservercontrol+xml"
                        , metalink: "application/metalink+xml"
                        , meta4: "application/metalink4+xml"
                        , mets: "application/mets+xml"
                        , mods: "application/mods+xml"
                        , m21: "application/mp21"
                        , mp21: "application/mp21"
                        , mp4s: "application/mp4"
                        , doc: "application/msword"
                        , dot: "application/msword"
                        , mxf: "application/mxf"
                        , bin: "application/octet-stream"
                        , dms: "application/octet-stream"
                        , lrf: "application/octet-stream"
                        , mar: "application/octet-stream"
                        , so: "application/octet-stream"
                        , dist: "application/octet-stream"
                        , distz: "application/octet-stream"
                        , pkg: "application/octet-stream"
                        , bpk: "application/octet-stream"
                        , dump: "application/octet-stream"
                        , elc: "application/octet-stream"
                        , deploy: "application/octet-stream"
                        , oda: "application/oda"
                        , opf: "application/oebps-package+xml"
                        , ogx: "application/ogg"
                        , omdoc: "application/omdoc+xml"
                        , onetoc: "application/onenote"
                        , onetoc2: "application/onenote"
                        , onetmp: "application/onenote"
                        , onepkg: "application/onenote"
                        , oxps: "application/oxps"
                        , xer: "application/patch-ops-error+xml"
                        , pdf: "application/pdf"
                        , pgp: "application/pgp-encrypted"
                        , asc: "application/pgp-signature"
                        , sig: "application/pgp-signature"
                        , prf: "application/pics-rules"
                        , p10: "application/pkcs10"
                        , p7m: "application/pkcs7-mime"
                        , p7c: "application/pkcs7-mime"
                        , p7s: "application/pkcs7-signature"
                        , p8: "application/pkcs8"
                        , ac: "application/pkix-attr-cert"
                        , cer: "application/pkix-cert"
                        , crl: "application/pkix-crl"
                        , pkipath: "application/pkix-pkipath"
                        , pki: "application/pkixcmp"
                        , pls: "application/pls+xml"
                        , ai: "application/postscript"
                        , eps: "application/postscript"
                        , ps: "application/postscript"
                        , cww: "application/prs.cww"
                        , pskcxml: "application/pskc+xml"
                        , rdf: "application/rdf+xml"
                        , rif: "application/reginfo+xml"
                        , rnc: "application/relax-ng-compact-syntax"
                        , rl: "application/resource-lists+xml"
                        , rld: "application/resource-lists-diff+xml"
                        , rs: "application/rls-services+xml"
                        , gbr: "application/rpki-ghostbusters"
                        , mft: "application/rpki-manifest"
                        , roa: "application/rpki-roa"
                        , rsd: "application/rsd+xml"
                        , rss: "application/rss+xml"
                        , rtf: "application/rtf"
                        , sbml: "application/sbml+xml"
                        , scq: "application/scvp-cv-request"
                        , scs: "application/scvp-cv-response"
                        , spq: "application/scvp-vp-request"
                        , spp: "application/scvp-vp-response"
                        , sdp: "application/sdp"
                        , setpay: "application/set-payment-initiation"
                        , setreg: "application/set-registration-initiation"
                        , shf: "application/shf+xml"
                        , smi: "application/smil+xml"
                        , smil: "application/smil+xml"
                        , rq: "application/sparql-query"
                        , srx: "application/sparql-results+xml"
                        , gram: "application/srgs"
                        , grxml: "application/srgs+xml"
                        , sru: "application/sru+xml"
                        , ssdl: "application/ssdl+xml"
                        , ssml: "application/ssml+xml"
                        , tei: "application/tei+xml"
                        , teicorpus: "application/tei+xml"
                        , tfi: "application/thraud+xml"
                        , tsd: "application/timestamped-data"
                        , plb: "application/vnd.3gpp.pic-bw-large"
                        , psb: "application/vnd.3gpp.pic-bw-small"
                        , pvb: "application/vnd.3gpp.pic-bw-var"
                        , tcap: "application/vnd.3gpp2.tcap"
                        , pwn: "application/vnd.3m.post-it-notes"
                        , aso: "application/vnd.accpac.simply.aso"
                        , imp: "application/vnd.accpac.simply.imp"
                        , acu: "application/vnd.acucobol"
                        , atc: "application/vnd.acucorp"
                        , acutc: "application/vnd.acucorp"
                        , air: "application/vnd.adobe.air-application-installer-package+zip"
                        , fcdt: "application/vnd.adobe.formscentral.fcdt"
                        , fxp: "application/vnd.adobe.fxp"
                        , fxpl: "application/vnd.adobe.fxp"
                        , xdp: "application/vnd.adobe.xdp+xml"
                        , xfdf: "application/vnd.adobe.xfdf"
                        , ahead: "application/vnd.ahead.space"
                        , azf: "application/vnd.airzip.filesecure.azf"
                        , azs: "application/vnd.airzip.filesecure.azs"
                        , azw: "application/vnd.amazon.ebook"
                        , acc: "application/vnd.americandynamics.acc"
                        , ami: "application/vnd.amiga.ami"
                        , apk: "application/vnd.android.package-archive"
                        , cii: "application/vnd.anser-web-certificate-issue-initiation"
                        , fti: "application/vnd.anser-web-funds-transfer-initiation"
                        , atx: "application/vnd.antix.game-component"
                        , mpkg: "application/vnd.apple.installer+xml"
                        , m3u8: "application/vnd.apple.mpegurl"
                        , swi: "application/vnd.aristanetworks.swi"
                        , iota: "application/vnd.astraea-software.iota"
                        , aep: "application/vnd.audiograph"
                        , mpm: "application/vnd.blueice.multipass"
                        , bmi: "application/vnd.bmi"
                        , rep: "application/vnd.businessobjects"
                        , cdxml: "application/vnd.chemdraw+xml"
                        , mmd: "application/vnd.chipnuts.karaoke-mmd"
                        , cdy: "application/vnd.cinderella"
                        , cla: "application/vnd.claymore"
                        , rp9: "application/vnd.cloanto.rp9"
                        , c4g: "application/vnd.clonk.c4group"
                        , c4d: "application/vnd.clonk.c4group"
                        , c4f: "application/vnd.clonk.c4group"
                        , c4p: "application/vnd.clonk.c4group"
                        , c4u: "application/vnd.clonk.c4group"
                        , c11amc: "application/vnd.cluetrust.cartomobile-config"
                        , c11amz: "application/vnd.cluetrust.cartomobile-config-pkg"
                        , csp: "application/vnd.commonspace"
                        , cdbcmsg: "application/vnd.contact.cmsg"
                        , cmc: "application/vnd.cosmocaller"
                        , clkx: "application/vnd.crick.clicker"
                        , clkk: "application/vnd.crick.clicker.keyboard"
                        , clkp: "application/vnd.crick.clicker.palette"
                        , clkt: "application/vnd.crick.clicker.template"
                        , clkw: "application/vnd.crick.clicker.wordbank"
                        , wbs: "application/vnd.criticaltools.wbs+xml"
                        , pml: "application/vnd.ctc-posml"
                        , ppd: "application/vnd.cups-ppd"
                        , car: "application/vnd.curl.car"
                        , pcurl: "application/vnd.curl.pcurl"
                        , dart: "application/vnd.dart"
                        , rdz: "application/vnd.data-vision.rdz"
                        , uvf: "application/vnd.dece.data"
                        , uvvf: "application/vnd.dece.data"
                        , uvd: "application/vnd.dece.data"
                        , uvvd: "application/vnd.dece.data"
                        , uvt: "application/vnd.dece.ttml+xml"
                        , uvvt: "application/vnd.dece.ttml+xml"
                        , uvx: "application/vnd.dece.unspecified"
                        , uvvx: "application/vnd.dece.unspecified"
                        , uvz: "application/vnd.dece.zip"
                        , uvvz: "application/vnd.dece.zip"
                        , fe_launch: "application/vnd.denovo.fcselayout-link"
                        , dna: "application/vnd.dna"
                        , mlp: "application/vnd.dolby.mlp"
                        , dpg: "application/vnd.dpgraph"
                        , dfac: "application/vnd.dreamfactory"
                        , kpxx: "application/vnd.ds-keypoint"
                        , ait: "application/vnd.dvb.ait"
                        , svc: "application/vnd.dvb.service"
                        , geo: "application/vnd.dynageo"
                        , mag: "application/vnd.ecowin.chart"
                        , nml: "application/vnd.enliven"
                        , esf: "application/vnd.epson.esf"
                        , msf: "application/vnd.epson.msf"
                        , qam: "application/vnd.epson.quickanime"
                        , slt: "application/vnd.epson.salt"
                        , ssf: "application/vnd.epson.ssf"
                        , es3: "application/vnd.eszigno3+xml"
                        , et3: "application/vnd.eszigno3+xml"
                        , ez2: "application/vnd.ezpix-album"
                        , ez3: "application/vnd.ezpix-package"
                        , fdf: "application/vnd.fdf"
                        , mseed: "application/vnd.fdsn.mseed"
                        , seed: "application/vnd.fdsn.seed"
                        , dataless: "application/vnd.fdsn.seed"
                        , gph: "application/vnd.flographit"
                        , ftc: "application/vnd.fluxtime.clip"
                        , fm: "application/vnd.framemaker"
                        , frame: "application/vnd.framemaker"
                        , maker: "application/vnd.framemaker"
                        , book: "application/vnd.framemaker"
                        , fnc: "application/vnd.frogans.fnc"
                        , ltf: "application/vnd.frogans.ltf"
                        , fsc: "application/vnd.fsc.weblaunch"
                        , oas: "application/vnd.fujitsu.oasys"
                        , oa2: "application/vnd.fujitsu.oasys2"
                        , oa3: "application/vnd.fujitsu.oasys3"
                        , fg5: "application/vnd.fujitsu.oasysgp"
                        , bh2: "application/vnd.fujitsu.oasysprs"
                        , ddd: "application/vnd.fujixerox.ddd"
                        , xdw: "application/vnd.fujixerox.docuworks"
                        , xbd: "application/vnd.fujixerox.docuworks.binder"
                        , fzs: "application/vnd.fuzzysheet"
                        , txd: "application/vnd.genomatix.tuxedo"
                        , ggb: "application/vnd.geogebra.file"
                        , ggt: "application/vnd.geogebra.tool"
                        , gex: "application/vnd.geometry-explorer"
                        , gre: "application/vnd.geometry-explorer"
                        , gxt: "application/vnd.geonext"
                        , g2w: "application/vnd.geoplan"
                        , g3w: "application/vnd.geospace"
                        , gmx: "application/vnd.gmx"
                        , kml: "application/vnd.google-earth.kml+xml"
                        , kmz: "application/vnd.google-earth.kmz"
                        , gqf: "application/vnd.grafeq"
                        , gqs: "application/vnd.grafeq"
                        , gac: "application/vnd.groove-account"
                        , ghf: "application/vnd.groove-help"
                        , gim: "application/vnd.groove-identity-message"
                        , grv: "application/vnd.groove-injector"
                        , gtm: "application/vnd.groove-tool-message"
                        , tpl: "application/vnd.groove-tool-template"
                        , vcg: "application/vnd.groove-vcard"
                        , hal: "application/vnd.hal+xml"
                        , zmm: "application/vnd.handheld-entertainment+xml"
                        , hbci: "application/vnd.hbci"
                        , les: "application/vnd.hhe.lesson-player"
                        , hpgl: "application/vnd.hp-hpgl"
                        , hpid: "application/vnd.hp-hpid"
                        , hps: "application/vnd.hp-hps"
                        , jlt: "application/vnd.hp-jlyt"
                        , pcl: "application/vnd.hp-pcl"
                        , pclxl: "application/vnd.hp-pclxl"
                        , "sfd-hdstx": "application/vnd.hydrostatix.sof-data"
                        , mpy: "application/vnd.ibm.minipay"
                        , afp: "application/vnd.ibm.modcap"
                        , listafp: "application/vnd.ibm.modcap"
                        , list3820: "application/vnd.ibm.modcap"
                        , irm: "application/vnd.ibm.rights-management"
                        , sc: "application/vnd.ibm.secure-container"
                        , icc: "application/vnd.iccprofile"
                        , icm: "application/vnd.iccprofile"
                        , igl: "application/vnd.igloader"
                        , ivp: "application/vnd.immervision-ivp"
                        , ivu: "application/vnd.immervision-ivu"
                        , igm: "application/vnd.insors.igm"
                        , xpw: "application/vnd.intercon.formnet"
                        , xpx: "application/vnd.intercon.formnet"
                        , i2g: "application/vnd.intergeo"
                        , qbo: "application/vnd.intu.qbo"
                        , qfx: "application/vnd.intu.qfx"
                        , rcprofile: "application/vnd.ipunplugged.rcprofile"
                        , irp: "application/vnd.irepository.package+xml"
                        , xpr: "application/vnd.is-xpr"
                        , fcs: "application/vnd.isac.fcs"
                        , jam: "application/vnd.jam"
                        , rms: "application/vnd.jcp.javame.midlet-rms"
                        , jisp: "application/vnd.jisp"
                        , joda: "application/vnd.joost.joda-archive"
                        , ktz: "application/vnd.kahootz"
                        , ktr: "application/vnd.kahootz"
                        , karbon: "application/vnd.kde.karbon"
                        , chrt: "application/vnd.kde.kchart"
                        , kfo: "application/vnd.kde.kformula"
                        , flw: "application/vnd.kde.kivio"
                        , kon: "application/vnd.kde.kontour"
                        , kpr: "application/vnd.kde.kpresenter"
                        , kpt: "application/vnd.kde.kpresenter"
                        , ksp: "application/vnd.kde.kspread"
                        , kwd: "application/vnd.kde.kword"
                        , kwt: "application/vnd.kde.kword"
                        , htke: "application/vnd.kenameaapp"
                        , kia: "application/vnd.kidspiration"
                        , kne: "application/vnd.kinar"
                        , knp: "application/vnd.kinar"
                        , skp: "application/vnd.koan"
                        , skd: "application/vnd.koan"
                        , skt: "application/vnd.koan"
                        , skm: "application/vnd.koan"
                        , sse: "application/vnd.kodak-descriptor"
                        , lasxml: "application/vnd.las.las+xml"
                        , lbd: "application/vnd.llamagraphics.life-balance.desktop"
                        , lbe: "application/vnd.llamagraphics.life-balance.exchange+xml"
                        , apr: "application/vnd.lotus-approach"
                        , pre: "application/vnd.lotus-freelance"
                        , nsf: "application/vnd.lotus-notes"
                        , org: "application/vnd.lotus-organizer"
                        , scm: "application/vnd.lotus-screencam"
                        , lwp: "application/vnd.lotus-wordpro"
                        , portpkg: "application/vnd.macports.portpkg"
                        , mcd: "application/vnd.mcd"
                        , mc1: "application/vnd.medcalcdata"
                        , cdkey: "application/vnd.mediastation.cdkey"
                        , mwf: "application/vnd.mfer"
                        , mfm: "application/vnd.mfmp"
                        , flo: "application/vnd.micrografx.flo"
                        , igx: "application/vnd.micrografx.igx"
                        , mif: "application/vnd.mif"
                        , daf: "application/vnd.mobius.daf"
                        , dis: "application/vnd.mobius.dis"
                        , mbk: "application/vnd.mobius.mbk"
                        , mqy: "application/vnd.mobius.mqy"
                        , msl: "application/vnd.mobius.msl"
                        , plc: "application/vnd.mobius.plc"
                        , txf: "application/vnd.mobius.txf"
                        , mpn: "application/vnd.mophun.application"
                        , mpc: "application/vnd.mophun.certificate"
                        , xul: "application/vnd.mozilla.xul+xml"
                        , cil: "application/vnd.ms-artgalry"
                        , cab: "application/vnd.ms-cab-compressed"
                        , xls: "application/vnd.ms-excel"
                        , xlm: "application/vnd.ms-excel"
                        , xla: "application/vnd.ms-excel"
                        , xlc: "application/vnd.ms-excel"
                        , xlt: "application/vnd.ms-excel"
                        , xlw: "application/vnd.ms-excel"
                        , xlam: "application/vnd.ms-excel.addin.macroenabled.12"
                        , xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12"
                        , xlsm: "application/vnd.ms-excel.sheet.macroenabled.12"
                        , xltm: "application/vnd.ms-excel.template.macroenabled.12"
                        , eot: "application/vnd.ms-fontobject"
                        , chm: "application/vnd.ms-htmlhelp"
                        , ims: "application/vnd.ms-ims"
                        , lrm: "application/vnd.ms-lrm"
                        , thmx: "application/vnd.ms-officetheme"
                        , cat: "application/vnd.ms-pki.seccat"
                        , stl: "application/vnd.ms-pki.stl"
                        , ppt: "application/vnd.ms-powerpoint"
                        , pps: "application/vnd.ms-powerpoint"
                        , pot: "application/vnd.ms-powerpoint"
                        , ppam: "application/vnd.ms-powerpoint.addin.macroenabled.12"
                        , pptm: "application/vnd.ms-powerpoint.presentation.macroenabled.12"
                        , sldm: "application/vnd.ms-powerpoint.slide.macroenabled.12"
                        , ppsm: "application/vnd.ms-powerpoint.slideshow.macroenabled.12"
                        , potm: "application/vnd.ms-powerpoint.template.macroenabled.12"
                        , mpp: "application/vnd.ms-project"
                        , mpt: "application/vnd.ms-project"
                        , docm: "application/vnd.ms-word.document.macroenabled.12"
                        , dotm: "application/vnd.ms-word.template.macroenabled.12"
                        , wps: "application/vnd.ms-works"
                        , wks: "application/vnd.ms-works"
                        , wcm: "application/vnd.ms-works"
                        , wdb: "application/vnd.ms-works"
                        , wpl: "application/vnd.ms-wpl"
                        , xps: "application/vnd.ms-xpsdocument"
                        , mseq: "application/vnd.mseq"
                        , mus: "application/vnd.musician"
                        , msty: "application/vnd.muvee.style"
                        , taglet: "application/vnd.mynfc"
                        , nlu: "application/vnd.neurolanguage.nlu"
                        , ntf: "application/vnd.nitf"
                        , nitf: "application/vnd.nitf"
                        , nnd: "application/vnd.noblenet-directory"
                        , nns: "application/vnd.noblenet-sealer"
                        , nnw: "application/vnd.noblenet-web"
                        , ngdat: "application/vnd.nokia.n-gage.data"
                        , "n-gage": "application/vnd.nokia.n-gage.symbian.install"
                        , rpst: "application/vnd.nokia.radio-preset"
                        , rpss: "application/vnd.nokia.radio-presets"
                        , edm: "application/vnd.novadigm.edm"
                        , edx: "application/vnd.novadigm.edx"
                        , ext: "application/vnd.novadigm.ext"
                        , odc: "application/vnd.oasis.opendocument.chart"
                        , otc: "application/vnd.oasis.opendocument.chart-template"
                        , odb: "application/vnd.oasis.opendocument.database"
                        , odf: "application/vnd.oasis.opendocument.formula"
                        , odft: "application/vnd.oasis.opendocument.formula-template"
                        , odg: "application/vnd.oasis.opendocument.graphics"
                        , otg: "application/vnd.oasis.opendocument.graphics-template"
                        , odi: "application/vnd.oasis.opendocument.image"
                        , oti: "application/vnd.oasis.opendocument.image-template"
                        , odp: "application/vnd.oasis.opendocument.presentation"
                        , otp: "application/vnd.oasis.opendocument.presentation-template"
                        , ods: "application/vnd.oasis.opendocument.spreadsheet"
                        , ots: "application/vnd.oasis.opendocument.spreadsheet-template"
                        , odt: "application/vnd.oasis.opendocument.text"
                        , odm: "application/vnd.oasis.opendocument.text-master"
                        , ott: "application/vnd.oasis.opendocument.text-template"
                        , oth: "application/vnd.oasis.opendocument.text-web"
                        , xo: "application/vnd.olpc-sugar"
                        , dd2: "application/vnd.oma.dd2+xml"
                        , oxt: "application/vnd.openofficeorg.extension"
                        , pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        , sldx: "application/vnd.openxmlformats-officedocument.presentationml.slide"
                        , ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow"
                        , potx: "application/vnd.openxmlformats-officedocument.presentationml.template"
                        , xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        , xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template"
                        , docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        , dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template"
                        , mgp: "application/vnd.osgeo.mapguide.package"
                        , dp: "application/vnd.osgi.dp"
                        , esa: "application/vnd.osgi.subsystem"
                        , pdb: "application/vnd.palm"
                        , pqa: "application/vnd.palm"
                        , oprc: "application/vnd.palm"
                        , paw: "application/vnd.pawaafile"
                        , str: "application/vnd.pg.format"
                        , ei6: "application/vnd.pg.osasli"
                        , efif: "application/vnd.picsel"
                        , wg: "application/vnd.pmi.widget"
                        , plf: "application/vnd.pocketlearn"
                        , pbd: "application/vnd.powerbuilder6"
                        , box: "application/vnd.previewsystems.box"
                        , mgz: "application/vnd.proteus.magazine"
                        , qps: "application/vnd.publishare-delta-tree"
                        , ptid: "application/vnd.pvi.ptid1"
                        , qxd: "application/vnd.quark.quarkxpress"
                        , qxt: "application/vnd.quark.quarkxpress"
                        , qwd: "application/vnd.quark.quarkxpress"
                        , qwt: "application/vnd.quark.quarkxpress"
                        , qxl: "application/vnd.quark.quarkxpress"
                        , qxb: "application/vnd.quark.quarkxpress"
                        , bed: "application/vnd.realvnc.bed"
                        , mxl: "application/vnd.recordare.musicxml"
                        , musicxml: "application/vnd.recordare.musicxml+xml"
                        , cryptonote: "application/vnd.rig.cryptonote"
                        , cod: "application/vnd.rim.cod"
                        , rm: "application/vnd.rn-realmedia"
                        , rmvb: "application/vnd.rn-realmedia-vbr"
                        , link66: "application/vnd.route66.link66+xml"
                        , st: "application/vnd.sailingtracker.track"
                        , see: "application/vnd.seemail"
                        , sema: "application/vnd.sema"
                        , semd: "application/vnd.semd"
                        , semf: "application/vnd.semf"
                        , ifm: "application/vnd.shana.informed.formdata"
                        , itp: "application/vnd.shana.informed.formtemplate"
                        , iif: "application/vnd.shana.informed.interchange"
                        , ipk: "application/vnd.shana.informed.package"
                        , twd: "application/vnd.simtech-mindmapper"
                        , twds: "application/vnd.simtech-mindmapper"
                        , mmf: "application/vnd.smaf"
                        , teacher: "application/vnd.smart.teacher"
                        , sdkm: "application/vnd.solent.sdkm+xml"
                        , sdkd: "application/vnd.solent.sdkm+xml"
                        , dxp: "application/vnd.spotfire.dxp"
                        , sfs: "application/vnd.spotfire.sfs"
                        , sdc: "application/vnd.stardivision.calc"
                        , sda: "application/vnd.stardivision.draw"
                        , sdd: "application/vnd.stardivision.impress"
                        , smf: "application/vnd.stardivision.math"
                        , sdw: "application/vnd.stardivision.writer"
                        , vor: "application/vnd.stardivision.writer"
                        , sgl: "application/vnd.stardivision.writer-global"
                        , smzip: "application/vnd.stepmania.package"
                        , sm: "application/vnd.stepmania.stepchart"
                        , sxc: "application/vnd.sun.xml.calc"
                        , stc: "application/vnd.sun.xml.calc.template"
                        , sxd: "application/vnd.sun.xml.draw"
                        , std: "application/vnd.sun.xml.draw.template"
                        , sxi: "application/vnd.sun.xml.impress"
                        , sti: "application/vnd.sun.xml.impress.template"
                        , sxm: "application/vnd.sun.xml.math"
                        , sxw: "application/vnd.sun.xml.writer"
                        , sxg: "application/vnd.sun.xml.writer.global"
                        , stw: "application/vnd.sun.xml.writer.template"
                        , sus: "application/vnd.sus-calendar"
                        , susp: "application/vnd.sus-calendar"
                        , svd: "application/vnd.svd"
                        , sis: "application/vnd.symbian.install"
                        , sisx: "application/vnd.symbian.install"
                        , xsm: "application/vnd.syncml+xml"
                        , bdm: "application/vnd.syncml.dm+wbxml"
                        , xdm: "application/vnd.syncml.dm+xml"
                        , tao: "application/vnd.tao.intent-module-archive"
                        , pcap: "application/vnd.tcpdump.pcap"
                        , cap: "application/vnd.tcpdump.pcap"
                        , dmp: "application/vnd.tcpdump.pcap"
                        , tmo: "application/vnd.tmobile-livetv"
                        , tpt: "application/vnd.trid.tpt"
                        , mxs: "application/vnd.triscape.mxs"
                        , tra: "application/vnd.trueapp"
                        , ufd: "application/vnd.ufdl"
                        , ufdl: "application/vnd.ufdl"
                        , utz: "application/vnd.uiq.theme"
                        , umj: "application/vnd.umajin"
                        , unityweb: "application/vnd.unity"
                        , uoml: "application/vnd.uoml+xml"
                        , vcx: "application/vnd.vcx"
                        , vsd: "application/vnd.visio"
                        , vst: "application/vnd.visio"
                        , vss: "application/vnd.visio"
                        , vsw: "application/vnd.visio"
                        , vis: "application/vnd.visionary"
                        , vsf: "application/vnd.vsf"
                        , wbxml: "application/vnd.wap.wbxml"
                        , wmlc: "application/vnd.wap.wmlc"
                        , wmlsc: "application/vnd.wap.wmlscriptc"
                        , wtb: "application/vnd.webturbo"
                        , nbp: "application/vnd.wolfram.player"
                        , wpd: "application/vnd.wordperfect"
                        , wqd: "application/vnd.wqd"
                        , stf: "application/vnd.wt.stf"
                        , xar: "application/vnd.xara"
                        , xfdl: "application/vnd.xfdl"
                        , hvd: "application/vnd.yamaha.hv-dic"
                        , hvs: "application/vnd.yamaha.hv-script"
                        , hvp: "application/vnd.yamaha.hv-voice"
                        , osf: "application/vnd.yamaha.openscoreformat"
                        , osfpvg: "application/vnd.yamaha.openscoreformat.osfpvg+xml"
                        , saf: "application/vnd.yamaha.smaf-audio"
                        , spf: "application/vnd.yamaha.smaf-phrase"
                        , cmp: "application/vnd.yellowriver-custom-menu"
                        , zir: "application/vnd.zul"
                        , zirz: "application/vnd.zul"
                        , zaz: "application/vnd.zzazz.deck+xml"
                        , vxml: "application/voicexml+xml"
                        , wgt: "application/widget"
                        , hlp: "application/winhlp"
                        , wsdl: "application/wsdl+xml"
                        , wspolicy: "application/wspolicy+xml"
                        , "7z": "application/x-7z-compressed"
                        , abw: "application/x-abiword"
                        , ace: "application/x-ace-compressed"
                        , dmg: "application/x-apple-diskimage"
                        , aab: "application/x-authorware-bin"
                        , x32: "application/x-authorware-bin"
                        , u32: "application/x-authorware-bin"
                        , vox: "application/x-authorware-bin"
                        , aam: "application/x-authorware-map"
                        , aas: "application/x-authorware-seg"
                        , bcpio: "application/x-bcpio"
                        , torrent: "application/x-bittorrent"
                        , blb: "application/x-blorb"
                        , blorb: "application/x-blorb"
                        , bz: "application/x-bzip"
                        , bz2: "application/x-bzip2"
                        , boz: "application/x-bzip2"
                        , cbr: "application/x-cbr"
                        , cba: "application/x-cbr"
                        , cbt: "application/x-cbr"
                        , cbz: "application/x-cbr"
                        , cb7: "application/x-cbr"
                        , vcd: "application/x-cdlink"
                        , cfs: "application/x-cfs-compressed"
                        , chat: "application/x-chat"
                        , pgn: "application/x-chess-pgn"
                        , nsc: "application/x-conference"
                        , cpio: "application/x-cpio"
                        , csh: "application/x-csh"
                        , deb: "application/x-debian-package"
                        , udeb: "application/x-debian-package"
                        , dgc: "application/x-dgc-compressed"
                        , dir: "application/x-director"
                        , dcr: "application/x-director"
                        , dxr: "application/x-director"
                        , cst: "application/x-director"
                        , cct: "application/x-director"
                        , cxt: "application/x-director"
                        , w3d: "application/x-director"
                        , fgd: "application/x-director"
                        , swa: "application/x-director"
                        , wad: "application/x-doom"
                        , ncx: "application/x-dtbncx+xml"
                        , dtb: "application/x-dtbook+xml"
                        , res: "application/x-dtbresource+xml"
                        , dvi: "application/x-dvi"
                        , evy: "application/x-envoy"
                        , eva: "application/x-eva"
                        , bdf: "application/x-font-bdf"
                        , gsf: "application/x-font-ghostscript"
                        , psf: "application/x-font-linux-psf"
                        , otf: "application/x-font-otf"
                        , pcf: "application/x-font-pcf"
                        , snf: "application/x-font-snf"
                        , ttf: "application/x-font-ttf"
                        , ttc: "application/x-font-ttf"
                        , pfa: "application/x-font-type1"
                        , pfb: "application/x-font-type1"
                        , pfm: "application/x-font-type1"
                        , afm: "application/x-font-type1"
                        , arc: "application/x-freearc"
                        , spl: "application/x-futuresplash"
                        , gca: "application/x-gca-compressed"
                        , ulx: "application/x-glulx"
                        , gnumeric: "application/x-gnumeric"
                        , gramps: "application/x-gramps-xml"
                        , gtar: "application/x-gtar"
                        , hdf: "application/x-hdf"
                        , install: "application/x-install-instructions"
                        , iso: "application/x-iso9660-image"
                        , jnlp: "application/x-java-jnlp-file"
                        , latex: "application/x-latex"
                        , lzh: "application/x-lzh-compressed"
                        , lha: "application/x-lzh-compressed"
                        , mie: "application/x-mie"
                        , prc: "application/x-mobipocket-ebook"
                        , mobi: "application/x-mobipocket-ebook"
                        , application: "application/x-ms-application"
                        , lnk: "application/x-ms-shortcut"
                        , wmd: "application/x-ms-wmd"
                        , wmz: "application/x-msmetafile"
                        , xbap: "application/x-ms-xbap"
                        , mdb: "application/x-msaccess"
                        , obd: "application/x-msbinder"
                        , crd: "application/x-mscardfile"
                        , clp: "application/x-msclip"
                        , exe: "application/x-msdownload"
                        , dll: "application/x-msdownload"
                        , com: "application/x-msdownload"
                        , bat: "application/x-msdownload"
                        , msi: "application/x-msdownload"
                        , mvb: "application/x-msmediaview"
                        , m13: "application/x-msmediaview"
                        , m14: "application/x-msmediaview"
                        , wmf: "application/x-msmetafile"
                        , emf: "application/x-msmetafile"
                        , emz: "application/x-msmetafile"
                        , mny: "application/x-msmoney"
                        , pub: "application/x-mspublisher"
                        , scd: "application/x-msschedule"
                        , trm: "application/x-msterminal"
                        , wri: "application/x-mswrite"
                        , nc: "application/x-netcdf"
                        , cdf: "application/x-netcdf"
                        , nzb: "application/x-nzb"
                        , p12: "application/x-pkcs12"
                        , pfx: "application/x-pkcs12"
                        , p7b: "application/x-pkcs7-certificates"
                        , spc: "application/x-pkcs7-certificates"
                        , p7r: "application/x-pkcs7-certreqresp"
                        , rar: "application/x-rar-compressed"
                        , ris: "application/x-research-info-systems"
                        , sh: "application/x-sh"
                        , shar: "application/x-shar"
                        , swf: "application/x-shockwave-flash"
                        , xap: "application/x-silverlight-app"
                        , sql: "application/x-sql"
                        , sit: "application/x-stuffit"
                        , sitx: "application/x-stuffitx"
                        , srt: "application/x-subrip"
                        , sv4cpio: "application/x-sv4cpio"
                        , sv4crc: "application/x-sv4crc"
                        , t3: "application/x-t3vm-image"
                        , gam: "application/x-tads"
                        , tar: "application/x-tar"
                        , tcl: "application/x-tcl"
                        , tex: "application/x-tex"
                        , tfm: "application/x-tex-tfm"
                        , texinfo: "application/x-texinfo"
                        , texi: "application/x-texinfo"
                        , obj: "application/x-tgif"
                        , ustar: "application/x-ustar"
                        , src: "application/x-wais-source"
                        , der: "application/x-x509-ca-cert"
                        , crt: "application/x-x509-ca-cert"
                        , fig: "application/x-xfig"
                        , xlf: "application/x-xliff+xml"
                        , xpi: "application/x-xpinstall"
                        , xz: "application/x-xz"
                        , z1: "application/x-zmachine"
                        , z2: "application/x-zmachine"
                        , z3: "application/x-zmachine"
                        , z4: "application/x-zmachine"
                        , z5: "application/x-zmachine"
                        , z6: "application/x-zmachine"
                        , z7: "application/x-zmachine"
                        , z8: "application/x-zmachine"
                        , xaml: "application/xaml+xml"
                        , xdf: "application/xcap-diff+xml"
                        , xenc: "application/xenc+xml"
                        , xhtml: "application/xhtml+xml"
                        , xht: "application/xhtml+xml"
                        , xml: "application/xml"
                        , xsl: "application/xml"
                        , dtd: "application/xml-dtd"
                        , xop: "application/xop+xml"
                        , xpl: "application/xproc+xml"
                        , xslt: "application/xslt+xml"
                        , xspf: "application/xspf+xml"
                        , mxml: "application/xv+xml"
                        , xhvml: "application/xv+xml"
                        , xvml: "application/xv+xml"
                        , xvm: "application/xv+xml"
                        , yang: "application/yang"
                        , yin: "application/yin+xml"
                        , zip: "application/zip"
                        , adp: "audio/adpcm"
                        , au: "audio/basic"
                        , snd: "audio/basic"
                        , mid: "audio/midi"
                        , midi: "audio/midi"
                        , kar: "audio/midi"
                        , rmi: "audio/midi"
                        , m4a: "audio/mp4"
                        , mp4a: "audio/mp4"
                        , mpga: "audio/mpeg"
                        , mp2: "audio/mpeg"
                        , mp2a: "audio/mpeg"
                        , mp3: "audio/mpeg"
                        , m2a: "audio/mpeg"
                        , m3a: "audio/mpeg"
                        , oga: "audio/ogg"
                        , ogg: "audio/ogg"
                        , spx: "audio/ogg"
                        , s3m: "audio/s3m"
                        , sil: "audio/silk"
                        , uva: "audio/vnd.dece.audio"
                        , uvva: "audio/vnd.dece.audio"
                        , eol: "audio/vnd.digital-winds"
                        , dra: "audio/vnd.dra"
                        , dts: "audio/vnd.dts"
                        , dtshd: "audio/vnd.dts.hd"
                        , lvp: "audio/vnd.lucent.voice"
                        , pya: "audio/vnd.ms-playready.media.pya"
                        , ecelp4800: "audio/vnd.nuera.ecelp4800"
                        , ecelp7470: "audio/vnd.nuera.ecelp7470"
                        , ecelp9600: "audio/vnd.nuera.ecelp9600"
                        , rip: "audio/vnd.rip"
                        , weba: "audio/webm"
                        , aac: "audio/x-aac"
                        , aif: "audio/x-aiff"
                        , aiff: "audio/x-aiff"
                        , aifc: "audio/x-aiff"
                        , caf: "audio/x-caf"
                        , flac: "audio/x-flac"
                        , mka: "audio/x-matroska"
                        , m3u: "audio/x-mpegurl"
                        , wax: "audio/x-ms-wax"
                        , wma: "audio/x-ms-wma"
                        , ram: "audio/x-pn-realaudio"
                        , ra: "audio/x-pn-realaudio"
                        , rmp: "audio/x-pn-realaudio-plugin"
                        , wav: "audio/x-wav"
                        , xm: "audio/xm"
                        , cdx: "chemical/x-cdx"
                        , cif: "chemical/x-cif"
                        , cmdf: "chemical/x-cmdf"
                        , cml: "chemical/x-cml"
                        , csml: "chemical/x-csml"
                        , xyz: "chemical/x-xyz"
                        , bmp: "image/bmp"
                        , cgm: "image/cgm"
                        , g3: "image/g3fax"
                        , gif: "image/gif"
                        , ief: "image/ief"
                        , jpeg: "image/jpeg"
                        , jpg: "image/jpeg"
                        , jpe: "image/jpeg"
                        , ktx: "image/ktx"
                        , png: "image/png"
                        , btif: "image/prs.btif"
                        , sgi: "image/sgi"
                        , svg: "image/svg+xml"
                        , svgz: "image/svg+xml"
                        , tiff: "image/tiff"
                        , tif: "image/tiff"
                        , psd: "image/vnd.adobe.photoshop"
                        , uvi: "image/vnd.dece.graphic"
                        , uvvi: "image/vnd.dece.graphic"
                        , uvg: "image/vnd.dece.graphic"
                        , uvvg: "image/vnd.dece.graphic"
                        , djvu: "image/vnd.djvu"
                        , djv: "image/vnd.djvu"
                        , sub: "text/vnd.dvb.subtitle"
                        , dwg: "image/vnd.dwg"
                        , dxf: "image/vnd.dxf"
                        , fbs: "image/vnd.fastbidsheet"
                        , fpx: "image/vnd.fpx"
                        , fst: "image/vnd.fst"
                        , mmr: "image/vnd.fujixerox.edmics-mmr"
                        , rlc: "image/vnd.fujixerox.edmics-rlc"
                        , mdi: "image/vnd.ms-modi"
                        , wdp: "image/vnd.ms-photo"
                        , npx: "image/vnd.net-fpx"
                        , wbmp: "image/vnd.wap.wbmp"
                        , xif: "image/vnd.xiff"
                        , webp: "image/webp"
                        , "3ds": "image/x-3ds"
                        , ras: "image/x-cmu-raster"
                        , cmx: "image/x-cmx"
                        , fh: "image/x-freehand"
                        , fhc: "image/x-freehand"
                        , fh4: "image/x-freehand"
                        , fh5: "image/x-freehand"
                        , fh7: "image/x-freehand"
                        , ico: "image/x-icon"
                        , sid: "image/x-mrsid-image"
                        , pcx: "image/x-pcx"
                        , pic: "image/x-pict"
                        , pct: "image/x-pict"
                        , pnm: "image/x-portable-anymap"
                        , pbm: "image/x-portable-bitmap"
                        , pgm: "image/x-portable-graymap"
                        , ppm: "image/x-portable-pixmap"
                        , rgb: "image/x-rgb"
                        , tga: "image/x-tga"
                        , xbm: "image/x-xbitmap"
                        , xpm: "image/x-xpixmap"
                        , xwd: "image/x-xwindowdump"
                        , eml: "message/rfc822"
                        , mime: "message/rfc822"
                        , igs: "model/iges"
                        , iges: "model/iges"
                        , msh: "model/mesh"
                        , mesh: "model/mesh"
                        , silo: "model/mesh"
                        , dae: "model/vnd.collada+xml"
                        , dwf: "model/vnd.dwf"
                        , gdl: "model/vnd.gdl"
                        , gtw: "model/vnd.gtw"
                        , mts: "model/vnd.mts"
                        , vtu: "model/vnd.vtu"
                        , wrl: "model/vrml"
                        , vrml: "model/vrml"
                        , x3db: "model/x3d+binary"
                        , x3dbz: "model/x3d+binary"
                        , x3dv: "model/x3d+vrml"
                        , x3dvz: "model/x3d+vrml"
                        , x3d: "model/x3d+xml"
                        , x3dz: "model/x3d+xml"
                        , appcache: "text/cache-manifest"
                        , ics: "text/calendar"
                        , ifb: "text/calendar"
                        , css: "text/css"
                        , csv: "text/csv"
                        , html: "text/html"
                        , htm: "text/html"
                        , n3: "text/n3"
                        , txt: "text/plain"
                        , text: "text/plain"
                        , conf: "text/plain"
                        , def: "text/plain"
                        , list: "text/plain"
                        , log: "text/plain"
                        , "in": "text/plain"
                        , dsc: "text/prs.lines.tag"
                        , rtx: "text/richtext"
                        , sgml: "text/sgml"
                        , sgm: "text/sgml"
                        , tsv: "text/tab-separated-values"
                        , t: "text/troff"
                        , tr: "text/troff"
                        , roff: "text/troff"
                        , man: "text/troff"
                        , me: "text/troff"
                        , ms: "text/troff"
                        , ttl: "text/turtle"
                        , uri: "text/uri-list"
                        , uris: "text/uri-list"
                        , urls: "text/uri-list"
                        , vcard: "text/vcard"
                        , curl: "text/vnd.curl"
                        , dcurl: "text/vnd.curl.dcurl"
                        , mcurl: "text/vnd.curl.mcurl"
                        , scurl: "text/vnd.curl.scurl"
                        , fly: "text/vnd.fly"
                        , flx: "text/vnd.fmi.flexstor"
                        , gv: "text/vnd.graphviz"
                        , "3dml": "text/vnd.in3d.3dml"
                        , spot: "text/vnd.in3d.spot"
                        , jad: "text/vnd.sun.j2me.app-descriptor"
                        , wml: "text/vnd.wap.wml"
                        , wmls: "text/vnd.wap.wmlscript"
                        , s: "text/x-asm"
                        , asm: "text/x-asm"
                        , c: "text/x-c"
                        , cc: "text/x-c"
                        , cxx: "text/x-c"
                        , cpp: "text/x-c"
                        , h: "text/x-c"
                        , hh: "text/x-c"
                        , dic: "text/x-c"
                        , f: "text/x-fortran"
                        , "for": "text/x-fortran"
                        , f77: "text/x-fortran"
                        , f90: "text/x-fortran"
                        , java: "text/x-java-source"
                        , nfo: "text/x-nfo"
                        , opml: "text/x-opml"
                        , p: "text/x-pascal"
                        , pas: "text/x-pascal"
                        , etx: "text/x-setext"
                        , sfv: "text/x-sfv"
                        , uu: "text/x-uuencode"
                        , vcs: "text/x-vcalendar"
                        , vcf: "text/x-vcard"
                        , "3gp": "video/3gpp"
                        , "3g2": "video/3gpp2"
                        , h261: "video/h261"
                        , h263: "video/h263"
                        , h264: "video/h264"
                        , jpgv: "video/jpeg"
                        , jpm: "video/jpm"
                        , jpgm: "video/jpm"
                        , mj2: "video/mj2"
                        , mjp2: "video/mj2"
                        , mp4: "video/mp4"
                        , mp4v: "video/mp4"
                        , mpg4: "video/mp4"
                        , mpeg: "video/mpeg"
                        , mpg: "video/mpeg"
                        , mpe: "video/mpeg"
                        , m1v: "video/mpeg"
                        , m2v: "video/mpeg"
                        , ogv: "video/ogg"
                        , qt: "video/quicktime"
                        , mov: "video/quicktime"
                        , uvh: "video/vnd.dece.hd"
                        , uvvh: "video/vnd.dece.hd"
                        , uvm: "video/vnd.dece.mobile"
                        , uvvm: "video/vnd.dece.mobile"
                        , uvp: "video/vnd.dece.pd"
                        , uvvp: "video/vnd.dece.pd"
                        , uvs: "video/vnd.dece.sd"
                        , uvvs: "video/vnd.dece.sd"
                        , uvv: "video/vnd.dece.video"
                        , uvvv: "video/vnd.dece.video"
                        , dvb: "video/vnd.dvb.file"
                        , fvt: "video/vnd.fvt"
                        , mxu: "video/vnd.mpegurl"
                        , m4u: "video/vnd.mpegurl"
                        , pyv: "video/vnd.ms-playready.media.pyv"
                        , uvu: "video/vnd.uvvu.mp4"
                        , uvvu: "video/vnd.uvvu.mp4"
                        , viv: "video/vnd.vivo"
                        , webm: "video/webm"
                        , f4v: "video/x-f4v"
                        , fli: "video/x-fli"
                        , flv: "video/x-flv"
                        , m4v: "video/x-m4v"
                        , mkv: "video/x-matroska"
                        , mk3d: "video/x-matroska"
                        , mks: "video/x-matroska"
                        , mng: "video/x-mng"
                        , asf: "video/x-ms-asf"
                        , asx: "video/x-ms-asf"
                        , vob: "video/x-ms-vob"
                        , wm: "video/x-ms-wm"
                        , wmv: "video/x-ms-wmv"
                        , wmx: "video/x-ms-wmx"
                        , wvx: "video/x-ms-wvx"
                        , avi: "video/x-msvideo"
                        , movie: "video/x-sgi-movie"
                        , smv: "video/x-smv"
                        , ice: "x-conference/x-cooltalk"
                    };


                    var fileExts = Object.keys(fileExtensionsWithMimeTypes);

                    exports.setAbbreviations = function (abbr) {
                        if (abbr) {
                            abbreviations = abbr
                        } else {
                            abbreviations = englishAbbreviations
                        }
                    };

                    // KDK: Fixed RegExp, which were not handling single character word
                    exports.isCapitalized = function (str) {
                        if (/([a-z]|[A-Z])+/gm.test(str) === true) {
                            return /^[A-Z]{1,}.*/.test(str) || this.isNumber(str)
                        }
                        return false;
                    };

                    exports.old_isCapitalized = function (str) {
                        return /^[A-Z][a-z].*/.test(str) || this.isNumber(str)
                    };

                    // KDK - Added Check for Comma, Brackets etc.
                    exports.isSentenceStarter = function (str) {

                        // Hint - Cleaning Tags and Punctuations
                        var cleanedString = str.replace(/(<[^>]*>)|(\p{gc=Punctuation})/gmu, "");

                        return (this.isNumber(cleanedString) || /^[A-Z]{1,}/.test(cleanedString));
                    };

                    exports.old_isSentenceStarter = function (str) {
                        //change by MG
                        ///([^a-zA-Z0-9_.]$)/
                        // old regex /([\W]$)/
                        if (/([^a-zA-Z0-9_.]$)/g.test(str) === true) {
                            return false;
                        }
                        return this.isCapitalized(str) || /``|"|'/.test(str.substring(0, 2))
                    };

                    exports.older_isSentenceStarter = function (str) {
                        return this.isCapitalized(str) || /``|"|'/.test(str.substring(0, 2))
                    };

                    exports.escapeCharactersInRegExp = function (str) {
                        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    };

                    // KDK - Added returnBoolean flag for clarity
                    // Added as fallback to check against actual word as abbervations
                    // MG - regex /(?!(\w+(?!([^<]+)?>)))./ changed to /(?!(\w+(?!([^<]+)?>)))\./
                    exports.isCommonAbbreviation = function (str, returnBoolean = false) {
                        var cleanedString = str.replace(/(<[^>]*>)|(\p{gc=Punctuation})/gmu, "");
                        if (returnBoolean === true) {
                            return abbreviations.indexOf(cleanedString) > -1;
                        }
                        return ~abbreviations.indexOf(cleanedString);
                    };

                    exports.old_isCommonAbbreviation = function (str, returnBoolean = false) {
                        if (returnBoolean === true) {
                            return abbreviations.indexOf(str.replace(/(\W+)(<[^>]*>)/g, "")) > -1 || abbreviations.indexOf(str.replace(/(?!(\w+(?!([^<]+)?>)))./g, "")) > -1
                            /* || abbreviations.indexOf(str) > -1 */
                        }
                        return ~abbreviations.indexOf(str.replace(/(?!(\w+(?!([^<]+)?>)))./g, ""))
                        /* || abbreviations.indexOf(str) > -1 */
                    };

                    exports.older_isCommonAbbreviation = function (str) {
                        return ~abbreviations.indexOf(str.replace(/(?!(\w+(?!([^<]+)?>)))./g, ""))
                    };

                    // KDK - Added all possible combinations of time abbreviations
                    exports.isTimeAbbreviation = function (word, next, strictWordCheck = false) {
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

                    exports.old_isTimeAbbreviation = function (word, next) {
                        if (word === "a.m." || word === "p.m.") {
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
                    exports.isGeoCoordinates = function (word, next) {

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
                    exports.isDottedAbbreviation = function (word) {
                        try {
                            // let char = word.split(".").filter((x) => {
                            //     return x !== ""
                            // }).length;
                            // let charNum = word.split("").filter((x) => {
                            //     return /\p{Letter}{1}/u.test(x)
                            // }).length;
                            if (this.isURL(word.slice(0, word.length - 1)) === false) {
                                return false;
                            }
                            return /^\p{Alpha}+\.\p{Alpha}+\./gmu.test(word.replace(/[\(\)\[\]\{\}]/g, ""))
                        } catch (error) {
                            return false
                        }
                    }

                    exports.old_isDottedAbbreviation = function (word) {
                        var matches = word.replace(/[\(\)\[\]\{\}]/g, "")
                            .match(/(\p{Alpha}\.)+/gu);
                        return matches && matches[0].length > 0
                    };

                    exports.isCustomAbbreviation = function (str) {


                        function getAkhsharCount(word) {

                            let wordCharacters = word.split("").filter((char) => {
                                //
                                //return hindiAkshars.includes(char) || gujAkshars.includes(char);
                                return /\p{Letter}/u.test(char) && /\p{Number}/u.test(char) === false;
                            }
                            )
                            console.log(wordCharacters)
                            return wordCharacters.length;

                        }
                        //cleaning string
                        str = str.replace(/([\(|\[|\{|\"|\'|\`|\)|\]|\}|\"|\'|\`]{1})/g, "")
                        //adding check of number
                        if (this.isNumber(str) === true) {
                            return false
                        }

                        const regexp = /^(\p{Alpha}{1,4}\.\p{Alpha}{1,4}\.)+/gu

                        if (str.endsWith(".")) {

                            //to check if abbr is in english
                            if (/([a-z]|[A-Z])+\./gm.test(str) === true && /^\p{Upper}/gu.test(str) && str.length <= 3) {
                                return true
                            }

                            //checking for stopwords
                            if (stopwords.includes(str.slice(0, str.length - 1))) {
                                return false
                            }


                            if (str.length <= 3) {

                                return true
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

                                // let charCounts = getAkhsharCount(str)

                                // if (charCounts <= 4) {
                                //     return true
                                // }
                            }
                            if (getAkhsharCount(str) < 3) {
                                return true
                            }

                        }

                        return false;

                        // if (/([a-z]|[A-Z])+\./gm.test(str) === true) {
                        //     return str.length <= 3 && this.isCapitalized(str)
                        // } else {
                        //     const regexpHindiAbbreviation = /(([\u0900-\u097F]{1,4}\.)([\u0900-\u097F]{1,4}\.)+)/;

                        //     if (str.endsWith(".")) {
                        //         let notAbbreviations = ["था", "थे", "थी", "है", "हैं", "दें", "છે", "હતી", "હતા", "હતો"]
                        //         // if (str.length <= 3 && notAbbreviations.includes(str.split(".")[0]) === false) {

                        //         //     return true
                        //         // }

                        //         //MG :changing to stopwords
                        //         if (str.length <= 3 && (stopwords_hi.includes(str.split(".")[0]) === false || stopwords_guj.includes(str.split(".")[0]) === false)) {

                        //             return true
                        //         }

                        //         if (regexpHindiAbbreviation.test(str) === true) {

                        //             let charCounts = getAkhsharCount(str)

                        //             if (charCounts <= 4) {
                        //                 return true
                        //             }
                        //         }

                        //         if (fourLetterList.includes(str.split(".")[0]) === true) {
                        //             return true
                        //         }
                        //     }

                        //     return false
                        // }

                    }

                    exports.older_isCustomAbbreviation = function (str) {

                        // if (str.length <= 3) {
                        //     return true
                        // }

                        return str.length <= 3 && this.isCapitalized(str)
                    };

                    exports.old_isCustomAbbreviation = function (str) {
                        if (str.length <= 3) {
                            return true
                        }
                        return this.isCapitalized(str)
                    };

                    exports.isNameAbbreviation = function (wordCount, words) {
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

                    exports.old_isNameAbbreviation = function (wordCount, words) {
                        if (words.length > 0) {
                            if (wordCount < 5 && words[0].length < 6 && this.isCapitalized(words[0])) {
                                return true
                            }
                            var capitalized = words.filter(function (str) {
                                return /[A-Z]/.test(str.charAt(0))
                            });
                            return capitalized.length >= 3
                        }
                        return false
                    };

                    //MG
                    exports.isNumber = function (str, dotPos) {
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
                    exports.old_isNumber = function (str, dotPos) {
                        if (dotPos) {
                            str = str.slice(dotPos - 1, dotPos + 2)
                        }

                        return /\p{Number}/gmu.test(str);
                        //return !isNaN(str)


                        //MG: regex to handle multi language numerals 1.1 latin १४९ devnagari ০৯৫৮ bangla ੦੯੪੩ gurumukhi ૦૯૪  gujarati ୦୯୩୫ oriya ௦௧௨௩௪௫௬௭௮௯ tamil ౦౯౫౪     telegu ೦೯೪	  kannada ൦൯൬ malayalam ٠١٩٧   urdu
                        //return /[\d|\u0966-\u096F|\u09E6-\u09EF|\u0A66-\u0A6F|\u0AE6-\u0AEF|\u0B66-\u0B6F|\u0BE6-\u0BEF|\u0C66-\u0C6F|\u0CE6-\u0CEF|\u0D66-\u0D6F|\u0660-\u0669-]/gm.test(str);

                    };
                    exports.isPhoneNr = function (str) {
                        return str.match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/)
                    };
                    exports.isURL = function (str) {
                        return str.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
                    };
                    exports.isTLD = function (str) {
                        return ~tlds.indexOf(str.replace(/(\W+)(<[^>]*>)/g, ""));
                    };

                    // KDK - Added Hashtag Check
                    exports.isHashTag = function (str) {
                        // old regex /^(#[a-z\d-]+)/
                        //MG
                        if (/^(#{1}[\p{Alpha}\p{Number}]+)/gmu.test(str)) {
                            return true;
                        }
                        return false;
                    }

                    // KDK - Added returnBoolean flag for clarity
                    exports.isStopWord = function (str, returnBoolean = false) {
                        str = str.toLocaleLowerCase()
                        if (/([a-z]|[A-Z])+/gm.test(str) === true) {
                            if (returnBoolean === true) {
                                return stopwords_en.indexOf(str.replace(/(\W+)(<[^>]*>)/g, "")) > -1 || stopwords_en.indexOf(str.replace(/(?!(\w+(?!([^<]+)?>)))./g, "")) > -1;
                            }
                            return ~stopwords_en.indexOf(str.replace(/(\W+)(<[^>]*>)/g, ""));
                        }
                        else {
                            // if (returnBoolean === true) {
                            //     return stopwords_hi.indexOf(str.replace(/(<[^>]*>)/g, "")) > -1 || stopwords_guj.indexOf(str.replace(/(<[^>]*>)/g, "")) > -1
                            // }
                            // return ~stopwords_hi.indexOf(str.replace(/(<[^>]*>)/g, "")) || ~stopwords_guj.indexOf(str.replace(/(<[^>]*>)/g, ""));
                            if (returnBoolean === true) {
                                return stopwords.indexOf(str.replace(/(<[^>]*>)/g, "")) > -1
                            }
                            return ~stopwords.indexOf(str.replace(/(<[^>]*>)/g, ""))
                        }

                    };



                    exports.old_isStopWord = function (str) {
                        return ~stopwords_en.indexOf(str.replace(/(\W+)(<[^>]*>)/g, ""));
                    };

                    exports.isFileExtension = function (str) {
                        return ~fileExts.indexOf(str.replace(/(\W+)(<[^>]*>)/g, ""));
                    };
                    exports.isDotPrefixedWord = function (word) {
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
                    exports.isConcatenated = function (word) {
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
                        }

                        return false;
                    };
                    exports.old_isConcatenated = function (word) {
                        var i = 0;

                        if ((i = word.indexOf(".")) > -1) {

                            var indexOfPeriod = -1;
                            var match = /(\!)(?!([^<]+)?>)/.exec(word);

                            if (match) {
                                indexOfPeriod = match.index;
                            }

                            if (indexOfPeriod === -1) {
                                return false;
                            } else {
                                i = indexOfPeriod;
                            }

                            var c = word.charAt(i + 1);
                            if (c.match(/[a-zA-Z].*/)) {
                                if (word.slice(0, i)
                                    .length == 0) {
                                    return [word.charAt(i), word.slice(i + 1)]
                                } else {
                                    return [word.slice(0, i)
                                        .concat(word.charAt(i)), word.slice(i + 1)
                                    ]
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
                            if (c.match(/[a-zA-Z].*/)) {
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
                            if (c.match(/[a-zA-Z].*/)) {
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
                    exports.older_isConcatenated = function (word) {
                        var i = 0;
                        if ((i = word.indexOf(".")) > -1 || (i = word.indexOf("!")) > -1) {
                            var c = word.charAt(i + 1);
                            if (c.match(/[a-zA-Z].*/)) {
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
                            if (c.match(/[a-zA-Z].*/)) {
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
                    exports.isSuperScriptBoundary = function (word, nword) {
                        if (word === "@~@" && /<sup/g.test(nword)) {
                            return true;
                        } else if (word === "@~@" && !this.isCapitalized(nword) && !/<[a-z]{1,}/g.test(nword)) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    exports.isBoundaryChar = function (word) {

                        //MG : purnaviram added as a boundary char
                        return this.cleanBrackets(word) === ("." || "!" || "?" || "।")
                    };

                    // KDK - Added for handling "[.?!]<sup|sub" tags as "[.?!] <sup|sub"
                    exports.fixSentenceWithNextSUPOrSUB = function (str) {
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
                    exports.cleanBrackets = function (word) {
                        try {
                            var regexpStartsWithBrackets = /(^[\(|\[|\{\"|\'|\`]{1,})/;
                            var regexpEndsWithBrackets = /([\)|\]|\}|\"|\'|\`]{1,}$)/;

                            if (regexpStartsWithBrackets.test(this.stripTags(word)) === true) {
                                return word.replace(regexpStartsWithBrackets, "");
                            } else if (regexpEndsWithBrackets.test(this.stripTags(word)) === true) {
                                return word.replace(regexpEndsWithBrackets, "");
                            } else {
                                return word;
                            }

                        } catch (error) {
                            return word

                        }

                    }

                    // KDK - Added method for cleaning word for performing evaluation against Number, Stopword, Abbreviation etc.
                    exports.stripTags = function (str) {
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

                    exports.getAllChilds = function (node) {
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
                    exports.getWords = function (markupString) {
                        var words = []
                            , whitespaceDelimeter = "@--@"
                            , whitespaceFinderRegExp = /\s+/g
                            , contentType = "text/html";

                        var doc = new DOMParser()
                            .parseFromString(markupString, contentType);

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

                        return words;

                    };

                    exports.isEnglishWord = function (str) {
                        return /[a-z|A-Z]+/.test(str)
                    }

                    exports.getMeta = function (word, next = null) {
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
                    exports.wordMetaData = function (prev = null, current, next = null) {
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

                    , {}
                ]
                , 2: [function (require, module, exports) {
                    exports.endsWithChar = function ends_with_char(word, c) {
                        if (c.length > 1) {
                            return c.indexOf(word.slice(-1)) > -1
                        }
                        return word.slice(-1) === c
                    };
                    exports.endsWith = function ends_with(word, end) {
                        return word.slice(word.length - end.length) === end
                    }
                }
                    , {}
                ]
                , 3: [function (require, module, exports) {
                    module.exports = function sanitizeHtml(text, opts) {
                        if (typeof text == "string" || text instanceof String) {
                            var $div = document.createElement("DIV");
                            $div.innerHTML = text;
                            text = ($div.textContent || "")
                                .trim()
                        } else if (typeof text === "object" && text.textContent) {
                            text = (text.textContent || "")
                                .trim()
                        }
                        return text
                    }
                }
                    , {}
                ]
                , 4: [function (require, module, exports) {

                    "use strict";
                    var sanitizeHtml = require("sanitize-html");
                    var String = require("./String");
                    var Match = require("./Match");
                    var newline_placeholder = " @~@ ";
                    var newline_placeholder_t = newline_placeholder.trim();

                    var buildSentences = function (text, options) {

                        Match.setAbbreviations(options.abbreviations);

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

                        /*
                        // BUG: Sometimes markup breaks the used regular expression.
                        text = text.trim().replace(/((?!([^<[^>]*>))\s+)/g, "@~~@");
                        var words = text.split("@~~@");
                        */

                        // Hint: A much better words formation from String/Markup
                        // var words = Match.getWords(Match.fixSentenceWithNextSUPOrSUB(text));
                        var words = Match.getWords(text);
                        // console.log("StripTAgss function :",stripTagss("random"))
                        console.log("Total Words => ", words.length);
                        console.log("Words => ", words);

                        var wordCount = 0;
                        var index = 0;
                        var temp = [];
                        var sentences = [];
                        var current = [];

                        if (!words || !words.length) {
                            return []
                        }

                        for (var i = 0, L = words.length; i < L; i++) {

                            wordCount++;


                            let wordMeta = Match.wordMetaData((i === 0 ? null : words[i - 1]), words[i], (i === L - 1 ? null : words[i + 1]));

                          console.log(i, wordMeta);
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
                                    for (var pi = 1; pi < pi.length - 1; pi++) {
                                        var wordFromPart = parts[pi];
                                        if (wordFromPart.length !== 0) {
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

                            if (~words[i].indexOf(",")) {
                                wordCount = 0
                            }

                            if (Match.isBoundaryChar(words[i]) || String.endsWithChar(words[i], "?!।") || words[i] === newline_placeholder_t) {

                                if (words[i] === "." && (Match.cleanBrackets(words[i + 1]) === "." || Match.cleanBrackets(words[i + 1]) === "?" || Match.cleanBrackets(words[i + 1]) === "!")) {
                                    continue
                                }
                                // KDK - Added Check for Next Word Starts with Uppercase 
                                //MG - to check for capital word only if next word is of english language
                                if ((i + 1 < L) && (/([a-z]|[A-Z])+/g.test(words[i + 1]) === true ? (Match.isCapitalized(words[i + 1].charAt(0)) === true) : true)) {
                                    if ((options.newline_boundaries || options.html_boundaries) && words[i] === newline_placeholder_t) {
                                        current.pop()
                                    }
                                    sentences.push(current);
                                    wordCount = 0;
                                    current = [];
                                    continue;
                                }

                            }

                            // if (String.endsWithChar(words[i], '"') || String.endsWithChar(words[i], "”")) {
                            //     words[i] = words[i].slice(0, -1)
                            // }


                            // KDK - Added check for ends with question mark
                            if (String.endsWithChar(words[i], ".") || String.endsWithChar(words[i], "?") || String.endsWithChar(words[i], "।")) {

                                if (i + 1 < L) {

                                    if (words[i].length === 2 && Match.isNumber(words[i].charAt(0)) === false) {

                                        //Conflicting case
                                        // KDK - Added Check for Next Word Not Stop Word
                                        if (Match.isStopWord(words[i + 1].toLowerCase(), true) === false) {
                                            continue;
                                        }
                                        // if (Match.isStopWord(words[i + 1].toLowerCase(), true) === false && Match.isCapitalized(words[i+1].charAt(0)) === false) {
                                        //     continue;
                                        // }


                                        if (Match.isCapitalized(words[i].charAt(0)) === false && Match.isStopWord(words[i + 1].toLowerCase(), true) === true) {
                                            continue;
                                        }

                                    }


                                    // KDK - Added for Handling Geo Location
                                    if (Match.isGeoCoordinates(words[i], words[i + 1]) === true) {
                                        continue;
                                    }


                                    // KDK - Added Check for Next Word Is Not Stop word & Not Abbreviation     
                                    if (Match.isCommonAbbreviation(words[i], true) === true || Match.isCommonAbbreviation(words[i].toLowerCase(), true) === true) {
                                        if (
                                            (Match.isSentenceStarter(words[i + 1]) === true)
                                            &&
                                            (Match.isNumber(words[i + 1]) === false)
                                            &&
                                            (Match.isStopWord(words[i + 1].toLowerCase(), true) === false)
                                        ) {
                                            continue;
                                        }


                                    }

                                    //MG
                                    if ((Match.isCommonAbbreviation(words[i], true) === true || Match.isCommonAbbreviation(words[i].toLowerCase(), true) === true || Match.isCustomAbbreviation(words[i]) === true || Match.isCustomAbbreviation(words[i].toLowerCase()) === true) && Match.isNumber(words[i + 1])) {
                                        if (String.endsWithChar(words[i + 1], ".?!।")) {
                                            continue
                                        }
                                    }
                                    /* // TODO: MUKUL - Breaking Cases
                                    if (Match.isCommonAbbreviation(words[i], true)  && (Match.isSentenceStarter(words[i + 1]) || Match.isSentenceStarter(Match.cleanBrackets(words[i + 1])))===false && (Match.isCommonAbbreviation(words[i + 1], true) === false || Match.isStopWord(words[i + 1].toLowerCase(), true) === false)) {
                                        continue
                                    }
                                    */

                                    if (Match.isSentenceStarter(words[i + 1]) || Match.isSentenceStarter(Match.cleanBrackets(words[i + 1]))) {


                                        var nextWordIsStopWord = Match.isStopWord(words[i + 1].toLowerCase(), true) || false;
                                        var nextWordIsAbbreviation = Match.isCommonAbbreviation(words[i + 1], true) || false;
                                        var nextWordIsNumber = Match.isNumber(words[i + 1]) || false;
                                        var nextWordIsStopWordOrAbbreviation = (nextWordIsStopWord || nextWordIsAbbreviation || false);

                                        // KDK - Added Partial Check with Existing Implementation
                                        if (Match.isTimeAbbreviation(words[i], words[i + 1], true) || Match.isTimeAbbreviation(words[i], words[i + 1])) {
                                            continue;
                                        }

                                        if (Match.isCustomAbbreviation(words[i]) && Match.isNumber(words[i + 1])) {
                                            continue;
                                        }

                                        //MG
                                        if (nextWordIsAbbreviation === false && nextWordIsStopWord === false && (Match.isDottedAbbreviation(words[i]) || Match.isDottedAbbreviation(words[i + 1])) === true) {
                                            continue
                                        }




                                   

                                        if (Match.isCommonAbbreviation(words[i], true) && Match.isCommonAbbreviation(words[i + 1], true)) {
                                            continue;
                                        }

                                        if (Match.isCommonAbbreviation(words[i], true) && Match.isCustomAbbreviation(words[i + 1], true)) {
                                            continue;
                                        }





                                    } else {

                                        if (String.endsWith(words[i], "..")) {
                                            continue;
                                        }

                                        //MG - added to handle cases like “the laws of the universe will appear less complex. . . .”

                                        if (words[i].endsWith(".") && words[i + 1] === ".") {
                                            continue;
                                        }

                                        // KDK - Added check for current word is abbreviation
                                        if (Match.isCommonAbbreviation(words[i], true) === true || Match.isCommonAbbreviation(words[i].toLowerCase(), true) === true) {
                                            continue;
                                        }

                                        if (Match.isCommonAbbreviation(words[i + 1], true) === true || Match.isCommonAbbreviation(words[i + 1].toLowerCase(), true) === true) {
                                            continue;
                                        }

                                        if (Match.isDottedAbbreviation(words[i])) {
                                            continue;
                                        }

                                        if (Match.isNameAbbreviation(wordCount, words.slice(i, 5))) {
                                            continue;
                                        }

                                        if ((words[i].toLowerCase()
                                            .includes("href") ||
                                            words[i].toLowerCase()
                                                .includes("title") ||
                                            words[i].toLowerCase()
                                                .includes("src"))) {
                                            continue;
                                        }

                                        // KDK - Added for checking next word with lower case letter
                                        // KDK - Added check for next word is not HashTag

                                        if (Match.isHashTag(words[i + 1]) === false && Match.isCapitalized(words[i + 1].charAt(0)) === false) {

                                          


                                            if (
                                                (Match.isCommonAbbreviation(words[i], true) ||
                                                    Match.isCommonAbbreviation(words[i].toLowerCase(), true) ||
                                                    Match.isCustomAbbreviation(words[i])) === true
                                                &&
                                                (String.endsWith(words[i], "।") ||
                                                    String.endsWith(words[i], "?") ||
                                                    String.endsWith(words[i], "!") ||
                                                    String.endsWith(words[i], ".")) === true
                                                &&
                                                ((/([a-z]|[A-Z])+/gm.test(words[i]) === true) ? (Match.isStopWord(words[i + 1].toLowerCase(), true) === false) : (Match.isStopWord(words[i + 1], true) === false))
                                            ) {
                                                continue;
                                            }

                                            // KDK - Added check for next word is stop word but in lowercase letter
                                            if (
                                                (words[i].indexOf("।") > -1 === false) &&
                                                (Match.isStopWord(Match.cleanBrackets(words[i + 1].toLowerCase()), true) === true) &&
                                                (/([a-z]|[A-Z])+/gm.test(words[i + 1]) === true) &&
                                                (Match.isCapitalized(Match.cleanBrackets(words[i + 1]).charAt(0)) === false)) {
                                                continue;
                                            }

                                        }

                                    }
                                }

                                sentences.push(current);
                                current = [];
                                wordCount = 0;
                                continue
                            }

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

                        return sentences

                    };
                    var sentenceStrings = function (sentences) {

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
                    exports.sentences = function (text, user_options) {

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

                        var sentenceData = buildSentences(text, options);

                        if (options.parse_type === "words") {
                            return sentenceWords(sentenceData)
                        } else {
                            return sentenceStrings(sentenceData)
                        }
                    }
                }

                    , {
                    "./Match": 1
                    , "./String": 2
                    , "sanitize-html": 3
                }
                ]
            }, {}, [4])(4)
    });