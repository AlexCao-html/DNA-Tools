const mRNAtAA = {
    "UUU": "PHE",
    "UUC": "PHE",
    "UUA": "LEU",
    "UUG": "LEU",
    "UCU": "SER",
    "UCC": "SER",
    "UCA": "SER",
    "UCG": "SER",
    "UAU": "TYR",
    "UAC": "TYR",
    "UAA": "STOP",
    "UAG": "STOP",
    "UGU": "CYS",
    "UGC": "CYS",
    "UGA": "STOP",
    "UGG": "TRP",
    "CUU": "LEU",
    "CUC": "LEU",
    "CUA": "LEU",
    "CUG": "LEU",
    "CCU": "PRO",
    "CCC": "PRO",
    "CCA": "PRO",
    "CCG": "PRO",
    "CAU": "HIS",
    "CAC": "HIS",
    "CAA": "GLN",
    "CAG": "GLN",
    "CGU": "ARG",
    "CGC": "ARG",
    "CGA": "ARG",
    "CGG": "ARG",
    "AUU": "ISO",
    "AUC": "ISO",
    "AUA": "ISO",
    "AUG": "MET",
    "ACU": "THR",
    "ACC": "THR",
    "ACA": "THR",
    "ACG": "THR",
    "AAU": "ASN",
    "AAC": "ASN",
    "AAA": "LYS",
    "AAG": "LYS",
    "AGU": "SER",
    "AGC": "SER",
    "AGA": "ARG",
    "AGG": "ARG",
    "GUU": "VAL",
    "GUC": "VAL",
    "GUA": "VAL",
    "GUG": "VAL",
    "GCU": "ALA",
    "GCC": "ALA",
    "GCA": "ALA",
    "GCG": "ALA",
    "GAU": "ASP",
    "GAC": "ASP",
    "GAA": "GLU",
    "GAG": "GLU",
    "GGU": "GLY",
    "GGC": "GLY",
    "GGA": "GLY",
    "GGG": "GLY",
}

const AA3t1 = {
    "ALA": "A", 
    "ARG": "R", 
    "ASN": "N", 
    "ASP": "D", 
    "CYS": "C", 
    "GLN": "Q", 
    "GLU": "E", 
    "GLY": "G", 
    "HIS": "H", 
    "ISO": "I", 
    "LEU": "L", 
    "LYS": "K", 
    "MET": "M", 
    "PHE": "F", 
    "PRO": "P", 
    "SER": "S", 
    "THR": "T", 
    "TRP": "W", 
    "TYR": "Y", 
    "VAL": "V", 
};

const AA3tf = {
    "ALA": "Alanine",
    "ARG": "Arginine",
    "ASN": "Aspagine",
    "ASP": "Aspartic acid",
    "CYS": "Cysteine",
    "GLN": "Glutamic acid",
    "GLU": "Glutamine",
    "GLY": "Glycine",
    "HIS": "Histidine",
    "ISO": "Isoleucine",
    "LEU": "Leucine",
    "LYS": "Lysine",
    "MET": "Methionine",
    "PHE": "Phenylalanine",
    "PRO": "Proline",
    "SER": "Serine",
    "THR": "Threonine",
    "TRP": "Tryptophan",
    "TYR": "Tyrosine",
    "VAL": "Valine",
};

const inverse = {
    "RtR": {
        "A": "U",
        "U": "A",
        "C": "G",
        "G": "C",
    },
    "RtD": {
        "A": "T",
        "U": "A",
        "C": "G",
        "G": "C",
    },
    "DtR": {
        "A": "U",
        "T": "A",
        "C": "G",
        "G": "C",
    },
    "DtD": {
        "A": "U",
        "T": "A",
        "C": "G",
        "G": "C",
    },
};

const convert = {
    "DtR": {
        "A": "A",
        "T": "U",
        "C": "G",
        "G": "C",
    },
    "RtD": {
        "A": "A",
        "U": "T",
        "C": "G",
        "G": "C",
    },
}

document.getElementById("AA-select-mRNA").addEventListener("click", () => {
    document.getElementById("AA-ct-mRNA").style.display = "block";
    document.getElementById("AA-ct-tRNA").style.display = "none";
    document.getElementById("AA-ct-Chromosome").style.display = "none";
    document.getElementById("AA-ct-CChromosome").style.display = "none";
});

document.getElementById("AA-select-tRNA").addEventListener("click", () => {
    document.getElementById("AA-ct-mRNA").style.display = "none";
    document.getElementById("AA-ct-tRNA").style.display = "block";
    document.getElementById("AA-ct-Chromosome").style.display = "none";
    document.getElementById("AA-ct-CChromosome").style.display = "none";
});

document.getElementById("AA-select-Chromosome").addEventListener("click", () => {
    document.getElementById("AA-ct-mRNA").style.display = "none";
    document.getElementById("AA-ct-tRNA").style.display = "none";
    document.getElementById("AA-ct-Chromosome").style.display = "block";
    document.getElementById("AA-ct-CChromosome").style.display = "none";
});

document.getElementById("AA-select-CChromosome").addEventListener("click", () => {
    document.getElementById("AA-ct-mRNA").style.display = "none";
    document.getElementById("AA-ct-tRNA").style.display = "none";
    document.getElementById("AA-ct-Chromosome").style.display = "none";
    document.getElementById("AA-ct-CChromosome").style.display = "block";
});

document.getElementById("convert-mRNA-AA").addEventListener("click", () => {
    var s = document.getElementById("AA-set-mRNA").value.toUpperCase();
    if (/^([AUGC]{3})*(AUG)+([AUGC]{3})*((UAA)|(UAG)|(UGA))+([AUGC]{3})*$/.test(s)) {
        var olf = [""];
        var tlf = [""];
        var ff = [""];
        var find = false;
        for (var i = 0; i < s.length; i += 3) {
            var cc = mRNAtAA[s[i]+s[i+1]+s[i+2]]
            if (cc == "MET" && !find && olf != [""]) {
                find = true;
                olf.push("");
                tlf.push("");
                ff.push("");
            }
            if (cc == "STOP" && find) {
                find = false;
            }
            if (find) {
                olf[olf.length-1] += AA3t1[cc];
                tlf[tlf.length-1] += cc[0] + cc[1].toLowerCase() + cc[2].toLowerCase() + " ";
                ff[ff.length-1] += AA3tf[cc] + ", ";
            }
        }
        tlf = tlf.map((n) => {return n.slice(0,-1)});
        ff = ff.map((n) => {return n.slice(0,-2)});
        document.getElementById("output-mRNA-AA-1").innerHTML = olf.join(";&emsp;").slice(7);
        document.getElementById("output-mRNA-AA-3").innerHTML = tlf.join(";&emsp;").slice(7);
        document.getElementById("output-mRNA-AA-f").innerHTML = ff.join(";&emsp;").slice(7);
    } else if (s.length % 3 != 0) {
        alert("The amount of the nucleotides must be divisible by 3");
    } else if (!/^[AUGC]*$/.test(s)) {
        alert("There are only be A, U, G, or C nucleotides");
    } else {
        alert("You must have a start (AUG) and end (UAA, UAG, or UGA) codon, and the codons' first nucleotide's index must be divisible by 3")
    }
});

document.getElementById("convert-tRNA-AA").addEventListener("click", () => {
    var t = document.getElementById("AA-set-tRNA").value.toUpperCase();
    var s = "";
    for (var i = 0; i < t.length; i++) {
        s += inverse.RtR[t[i]];
    }
    if (/^([AUGC]{3})*(AUG)+([AUGC]{3})*((UAA)|(UAG)|(UGA))+([AUGC]{3})*$/.test(s)) {
        var olf = [""];
        var tlf = [""];
        var ff = [""];
        var find = false;
        for (var i = 0; i < s.length; i += 3) {
            var cc = mRNAtAA[s[i]+s[i+1]+s[i+2]]
            if (cc == "MET" && !find && olf != [""]) {
                find = true;
                olf.push("");
                tlf.push("");
                ff.push("");
            }
            if (cc == "STOP" && find) {
                find = false;
            }
            if (find) {
                olf[olf.length-1] += AA3t1[cc];
                tlf[tlf.length-1] += cc[0] + cc[1].toLowerCase() + cc[2].toLowerCase() + " ";
                ff[ff.length-1] += AA3tf[cc] + ", ";
            }
        }
        tlf = tlf.map((n) => {return n.slice(0,-1)});
        ff = ff.map((n) => {return n.slice(0,-2)});
        document.getElementById("output-tRNA-AA-1").innerHTML = olf.join(";&emsp;").slice(7);
        document.getElementById("output-tRNA-AA-3").innerHTML = tlf.join(";&emsp;").slice(7);
        document.getElementById("output-tRNA-AA-f").innerHTML = ff.join(";&emsp;").slice(7);
    } else if (s.length % 3 != 0) {
        alert("The amount of the nucleotides must be divisible by 3");
    } else if (!/^[AUGC]*$/.test(s)) {
        alert("There are only be A, U, G, or C nucleotides");
    } else {
        alert("You must have a start (UAC) and end (AUU, AUC, or ACU) codon, and the codons' first nucleotide's index must be divisible by 3")
    }
});

document.getElementById("convert-Chromosome-AA").addEventListener("click", () => {
    var t = document.getElementById("AA-set-Chromosome").value.toUpperCase();
    var s = "";
    for (var i = 0; i < t.length; i++) {
        s += inverse.DtR[t[i]];
    }
    if (/^([AUGC]{3})*(AUG)+([AUGC]{3})*((UAA)|(UAG)|(UGA))+([AUGC]{3})*$/.test(s)) {
        var olf = [""];
        var tlf = [""];
        var ff = [""];
        var find = false;
        for (var i = 0; i < s.length; i += 3) {
            var cc = mRNAtAA[s[i]+s[i+1]+s[i+2]]
            if (cc == "MET" && !find && olf != [""]) {
                find = true;
                olf.push("");
                tlf.push("");
                ff.push("");
            }
            if (cc == "STOP" && find) {
                find = false;
            }
            if (find) {
                olf[olf.length-1] += AA3t1[cc];
                tlf[tlf.length-1] += cc[0] + cc[1].toLowerCase() + cc[2].toLowerCase() + " ";
                ff[ff.length-1] += AA3tf[cc] + ", ";
            }
        }
        tlf = tlf.map((n) => {return n.slice(0,-1)});
        ff = ff.map((n) => {return n.slice(0,-2)});
        document.getElementById("output-Chromosome-AA-1").innerHTML = olf.join(";&emsp;").slice(7);
        document.getElementById("output-Chromosome-AA-3").innerHTML = tlf.join(";&emsp;").slice(7);
        document.getElementById("output-Chromosome-AA-f").innerHTML = ff.join(";&emsp;").slice(7);
    } else if (s.length % 3 != 0) {
        alert("The amount of the nucleotides must be divisible by 3");
    } else if (!/^[AUGC]*$/.test(s)) {
        alert("There are only be A, T G, or C nucleotides");
    } else {
        alert("You must have a start (TAC) and end (ATT, ATC, or ACT) codon, and the codons' first nucleotide's index must be divisible by 3")
    }
});

document.getElementById("convert-CChromosome-AA").addEventListener("click", () => {
    var t = document.getElementById("AA-set-CChromosome").value.toUpperCase();
    var s = "";
    for (var i = 0; i < t.length; i++) {
        s += convert.DtR[t[i]];
    }
    if (/^([AUGC]{3})*(AUG)+([AUGC]{3})*((UAA)|(UAG)|(UGA))+([AUGC]{3})*$/.test(s)) {
        var olf = [""];
        var tlf = [""];
        var ff = [""];
        var find = false;
        for (var i = 0; i < s.length; i += 3) {
            var cc = mRNAtAA[s[i]+s[i+1]+s[i+2]]
            if (cc == "MET" && !find && olf != [""]) {
                find = true;
                olf.push("");
                tlf.push("");
                ff.push("");
            }
            if (cc == "STOP" && find) {
                find = false;
            }
            if (find) {
                olf[olf.length-1] += AA3t1[cc];
                tlf[tlf.length-1] += cc[0] + cc[1].toLowerCase() + cc[2].toLowerCase() + " ";
                ff[ff.length-1] += AA3tf[cc] + ", ";
            }
        }
        tlf = tlf.map((n) => {return n.slice(0,-1)});
        ff = ff.map((n) => {return n.slice(0,-2)});
        document.getElementById("output-CChromosome-AA-1").innerHTML = olf.join(";&emsp;").slice(7);
        document.getElementById("output-CChromosome-AA-3").innerHTML = tlf.join(";&emsp;").slice(7);
        document.getElementById("output-CChromosome-AA-f").innerHTML = ff.join(";&emsp;").slice(7);
    } else if (s.length % 3 != 0) {
        alert("The amount of the nucleotides must be divisible by 3");
    } else if (!/^[AUGC]*$/.test(s)) {
        alert("There are only be A, T G, or C nucleotides");
    } else {
        alert("You must have a start (TAC) and end (ATT, ATC, or ACT) codon, and the codons' first nucleotide's index must be divisible by 3")
    }
});