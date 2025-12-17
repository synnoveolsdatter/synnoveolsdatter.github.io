const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
const JCONSANTS = ['j', 'm', 's'];
const JVOWELS = ['a', 'e'];

/* DEFINITIONS FOR LOGIC ETC */

class Jimser {
    constructor() {
        this.jc_i = 0;
        this.jv_i = 0;
    }

    charToJames(c) {
        if (Jimser.isConsonant(c) != -1) {
            let idx = Jimser.isConsonant(c);
            let ret = "";
            if (idx < 0) {
                ret = c;
            } else {
                for (let i = 0; i < idx + 1; i++) {
                    ret += JCONSANTS[this.jc_i];
                }
                this.plusC();
            }

            return ret;
        }

        let idx = Jimser.isVowel(c);
        let ret = '';
        if (idx < 0) {
            ret = c;
        } else {
            for (let i = 0; i < idx + 1; i++) {
                ret += JVOWELS[this.jv_i];
            }
            this.plusV();
        }
        return ret;
    }

    static jamesToChar(c, len) {
        if (Jimser.isJConsonant(c) != -1) {// must be a consonant
            return CONSONANTS[len - 1];
        }
        return VOWELS[len - 1];
    }

    plusC() {
        this.jc_i = (this.jc_i + 1) % JCONSANTS.length;
    }

    plusV() {
        this.jv_i = (this.jv_i + 1) % JVOWELS.length;
    }

    static isVowel(c) {
        for (let i = 0; i < VOWELS.length; i++) {
            if (c == VOWELS[i])
                return i;
        }
        return -1;
    }

    static isConsonant(c) {
        for (let i = 0; i < CONSONANTS.length; i++) {
            if (c == CONSONANTS[i])
                return i;
        }
        return -1;
    }

    static isJConsonant(c) {
        for (let i = 0; i < JCONSANTS.length; i++)
            if (c == JCONSANTS[i])
                return i;

        return -1;
    }
}

// text -> string
const jtoe = (text) => {
    let text_bytes = [...text];
    let ret = "";
    let txt = [];// chars and their lengths (Originally Vec<(char, usize)>)

    // serialise jamish text into `txt` variable
    let i = 0;
    while (i < text.length - 1) {
        let j = i;
        while (j < text.length && text_bytes[j] == text_bytes[i]) {
            j += 1;
        }
        txt.push({char: text_bytes[i], len: j - i});
        i += j - i;// increase by the length we just pushed to the vector
    }

    // now that it's serialised, convert it into normal text (stored in `ret`)
    for (obj of txt) {
        if (!obj.char.match(/[a-z]/i)) {
            ret += obj.char * obj.len;
            continue;
        }
        ret += Jimser.jamesToChar(obj.char, obj.len);
    }

    return ret;
};

const etoj = (text) => {
    let jimmer = new Jimser();
    let ret = "";
    let txt = text.trim().toLowerCase();

    for (ch of [...txt]) {
        let append = ch;
        if (text.match(/[a-z]/i))
            append = jimmer.charToJames(ch);

        ret += append;
    }

    return ret;
};

/* ACTUAL FUNCTIONING SHIT */
const inp = document.getElementById("TEXTT");
let ttype = undefined;
let rad = document.getElementById("form").translationtype;
let output = document.getElementById("OUTPUT");

for (let i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        if (ttype != this.value) {
            ttype = this.value;
            inp.value = '';
            inp.innerText = '';
            // console.log("new val - " + inp.value);
        }
        // console.log("new radio selection - " + ttype);
    });
}

inp.addEventListener('input', () => {
    if (ttype == "JTOE") {
        console.log("translating jtoe")
        output.innerText = jtoe(inp.value);
        return;
    }
    output.innerText = etoj(inp.value);
});