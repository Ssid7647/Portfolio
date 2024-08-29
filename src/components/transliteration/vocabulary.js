const indoarab_num = Array.from({ length: 10 }, (_, i) => String.fromCharCode(i + 48));

const english_lower_script = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97))
    .concat(['é', 'è', 'á']);


// export class Vocabulary {
//     constructor(lang_script = english_lower_script,is_target=false) {
//         this.glyphs = lang_script;
//         this.char2idx = {};
//         this.idx2char = {};
//         this.PAD_token = "[PAD]"
//         this.SOS_token = "[SOS]"
//         this.ARB_token = "[ARB]"
//         this.ASM_token = "[ASM]"
//         this.BEN_token = "[BEN]"
//         this.GUJ_token = "[GUJ]"
//         this.HIN_token = "[HIN]"
//         this.KAN_token = "[KAN]"
//         this.MAL_token = "[MAL]"
//         this.MAR_token = "[MAR]"
//         this.ORI_token = "[ORI]"
//         this.PAN_token = "[PAN]"
//         this.TAM_token = "[TAM]"
//         this.TEL_token = "[TEL]"
//         this.EOS_token = "[EOS]"
//         this.MASK_token = "[MASK]"
//         this._create_index();
//     }

//     _create_index() {
//         this.char2idx[this.PAD_token] = 0
//         this.char2idx[this.SOS_token] = 1
//         this.char2idx[this.ARB_token] = 3
//         this.char2idx[this.ASM_token] = 4
//         this.char2idx[this.BEN_token] = 5
//         this.char2idx[this.GUJ_token] = 6
//         this.char2idx[this.HIN_token] = 7
//         this.char2idx[this.KAN_token] = 8
//         this.char2idx[this.MAL_token] = 9
//         this.char2idx[this.MAR_token] = 10
//         this.char2idx[this.ORI_token] = 11
//         this.char2idx[this.PAN_token] = 12
//         this.char2idx[this.TAM_token] = 13
//         this.char2idx[this.TEL_token] = 14
//         this.char2idx[this.EOS_token] = 15
//         this.char2idx[this.MASK_token] = 16
//         this.char2idx["'"] = 17
//         this.char2idx['%'] = 18
//         this.char2idx['!'] = 19
//         this.char2idx['?'] = 20
//         this.char2idx[':'] = 21
//         this.char2idx[' '] = 22
//         this.char2idx['-'] = 23
//         this.char2idx[','] = 24
//         this.char2idx['.'] = 25
//         this.char2idx['('] = 26
//         this.char2idx[')'] = 27
//         this.char2idx['/'] = 28
//         this.char2idx['^'] = 29

//         for (let idx = 0; idx < indoarab_num.length; idx++) {
//             const char = indoarab_num[idx];
//             this.char2idx[char] = idx + 30;
//         }

//         for (let idx = 0; idx < this.glyphs.length; idx++) {
//             const char = this.glyphs[idx];
//             this.char2idx[char] = idx + 40;
//         }

//         for (const [char, idx] of Object.entries(this.char2idx)) {
//             this.idx2char[idx] = char;
//         }
//     }

//     size() {
//         return Object.keys(this.char2idx).length;
//     }

//     word2xlitvec(word,) {
//         try {
//             const vec = [this.char2idx[this.SOS_token]];
//             for (const char of word) {
//                 vec.push(this.char2idx[char]);
//             }
//             vec.push(this.char2idx[this.EOS_token]);
//             return vec;
//         } catch (error) {
//             console.error("[ERROR] in word:", word, "Error token not in Vocabulary:", error);
//             process.exit(1);
//         }
//     }

//     xlitvec2word(vector, RTL = false) {
//         const tokens_to_ignore = [
//             this.char2idx[this.SOS_token],
//             this.char2idx[this.PAD_token],
//             this.char2idx[this.MASK_token]
//         ]
//         // console.log(tokens_to_ignore)
//         let char_list = [];
//         for (let char of vector) {
//             if (char === this.char2idx[this.EOS_token]) {
//                 break
//             }
//             else if (tokens_to_ignore.includes(char) === true) {
//                 continue
//             }
//             else {
//                 char_list.push(this.idx2char[char])
//             }
//         }

//         if (RTL) {
//             return char_list.reverse().join('')
//         }
//         // const char_list = vector.map(i => this.idx2char[i]).filter(char => tokens_to_ignore.includes(char)===false);
//         return char_list.join('');
//     }
// }
export class Vocabulary {
    constructor(lang_script, is_target = false) {
        this.glyphs = lang_script;
        this.is_target = is_target;
        this.char2idx = {};
        this.idx2char = {};

        this.PAD_token = "[PAD]";
        this.SOS_token = "[SOS]";
        this.ARB_token = "[ARB]";
        this.ASM_token = "[ASM]";
        this.BEN_token = "[BEN]";
        this.GUJ_token = "[GUJ]";
        this.HIN_token = "[HIN]";
        this.KAN_token = "[KAN]";
        this.MAL_token = "[MAL]";
        this.MAR_token = "[MAR]";
        this.ORI_token = "[ORI]";
        this.PAN_token = "[PAN]";
        this.TAM_token = "[TAM]";
        this.TEL_token = "[TEL]";
        this.EOS_token = "[EOS]";
        this.MASK_token = "[MASK]";

        this._create_index();
    }

    _create_index() {
        this.char2idx[this.PAD_token] = 0;
        this.char2idx[this.SOS_token] = 1;
        this.char2idx[this.ARB_token] = 3;
        this.char2idx[this.ASM_token] = 4;
        this.char2idx[this.BEN_token] = 5;
        this.char2idx[this.GUJ_token] = 6;
        this.char2idx[this.HIN_token] = 7;
        this.char2idx[this.KAN_token] = 8;
        this.char2idx[this.MAL_token] = 9;
        this.char2idx[this.MAR_token] = 10;
        this.char2idx[this.ORI_token] = 11;
        this.char2idx[this.PAN_token] = 12;
        this.char2idx[this.TAM_token] = 13;
        this.char2idx[this.TEL_token] = 14;
        this.char2idx[this.EOS_token] = 15;
        this.char2idx[this.MASK_token] = 16;
        this.char2idx["'"] = 17;
        this.char2idx['%'] = 18;
        this.char2idx['!'] = 19;
        this.char2idx['?'] = 20;
        this.char2idx[':'] = 21;
        this.char2idx[' '] = 22;
        this.char2idx['-'] = 23;
        this.char2idx[','] = 24;
        this.char2idx['.'] = 25;
        this.char2idx['('] = 26;
        this.char2idx[')'] = 27;
        this.char2idx['/'] = 28;
        this.char2idx['^'] = 29;

        // Assuming indoarab_num is defined elsewhere
        for (let idx = 0; idx < indoarab_num.length; idx++) {
            this.char2idx[indoarab_num[idx]] = idx + 30;
        }

        for (let idx = 0; idx < this.glyphs.length; idx++) {
            this.char2idx[this.glyphs[idx]] = idx + 40;
        }

        for (let [char, idx] of Object.entries(this.char2idx)) {
            this.idx2char[idx] = char;
        }
    }

    size() {
        return Object.keys(this.char2idx).length;
    }

    word2xlitvec(word, language) {
        try {
            let languageToken;
            switch (language) {
                case "asm":
                    languageToken = this.ASM_token;
                    break;
                case "arb":
                    languageToken = this.ARB_token;
                    break;
                case "ben":
                    languageToken = this.BEN_token;
                    break;
                case "guj":
                    languageToken = this.GUJ_token;
                    break;
                case "hin":
                    languageToken = this.HIN_token;
                    break;
                case "kan":
                    languageToken = this.KAN_token;
                    break;
                case "mal":
                    languageToken = this.MAL_token;
                    break;
                case "mar":
                    languageToken = this.MAR_token;
                    break;
                case "ori":
                    languageToken = this.ORI_token;
                    break;
                case "pan":
                    languageToken = this.PAN_token;
                    break;
                case "tam":
                    languageToken = this.TAM_token;
                    break;
                case "tel":
                    languageToken = this.TEL_token;
                    break;
                default:
                    throw new Error("Unknown language");
            }

            let vec = [];
            if (this.is_target === true) {
                vec.push(this.char2idx[this.SOS_token]);
            } else {
                vec.push(this.char2idx[languageToken]);
            }

            for (let char of word) {
                vec.push(this.char2idx[char]);
            }
            vec.push(this.char2idx[this.EOS_token]);

            return new Int32Array(vec);
        } catch (error) {
            console.error("[ERROR] in word:", word, " Error token not in Vocabulary:", error);
            throw error;
        }
    }

    xlitvec2word(vector, RTL = false) {
        const tokens_to_ignore = new Set([
            this.char2idx[this.EOS_token],
            this.char2idx[this.SOS_token],
            this.char2idx[this.PAD_token],
            this.char2idx[this.MASK_token],
            this.char2idx[this.ASM_token],
            this.char2idx[this.BEN_token],
            this.char2idx[this.GUJ_token],
            this.char2idx[this.HIN_token],
            this.char2idx[this.KAN_token],
            this.char2idx[this.MAL_token],
            this.char2idx[this.MAR_token],
            this.char2idx[this.ORI_token],
            this.char2idx[this.PAN_token],
            this.char2idx[this.TAM_token],
            this.char2idx[this.TEL_token],
            this.char2idx[this.ARB_token]
        ]);

        let char_list = [];
        for (let i of vector) {
            if (!tokens_to_ignore.has(i)) {
                char_list.push(this.idx2char[i]);
            }
        }

        return char_list.join("");
    }
}


