const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const reverseMapping = (o) =>
  Object.keys(o).reduce((r, k) => Object.assign(r, { [o[k]]: k }), {});
const britishToAmericanSpelling = reverseMapping(americanToBritishSpelling);
const britishToAmericanTitles = reverseMapping(americanToBritishTitles);
const britishOnly = require("./british-only.js");

class Translator {
  translate(sentence, local) {
    let newSentence;
    switch (local) {
      case "british-to-american":
        newSentence = this.startBritish(sentence);
        break;
      case "american-to-british":
        newSentence = this.startAmerican(sentence);
        break;
      default:
        return { error: "Invalid value for locale field" };
    }
    return newSentence;
  }
  startBritish(sentence) {
    let newSentence = this.checkDiffence(sentence, britishOnly);
    newSentence = this.checkDiffence(newSentence, britishToAmericanSpelling);
    newSentence = this.checkDiffence(newSentence, britishToAmericanTitles);
    newSentence = this.timeReplace(newSentence, ".", ":");
    return newSentence;
  }
  startAmerican(sentence) {
    let newSentence = this.checkDiffence(sentence, americanOnly);
    newSentence = this.checkDiffence(newSentence, americanToBritishSpelling);
    newSentence = this.checkDiffence(newSentence, americanToBritishTitles);
    newSentence = this.timeReplace(newSentence, ":", ".");
    return newSentence;
  }
  checkDiffence(sentence, obj) {
    Object.keys(obj).forEach((difference) => {
      let differenceTest = new RegExp(difference + "((\\W)|$)", "gi");
      if (!differenceTest.test(sentence)) return;
      let words = sentence.match(differenceTest);
      words.forEach((word) => {
        let punctuation;
        if (/\w/.test(word[word.length - 1])) {
          punctuation = "";
        } else {
          punctuation = word[word.length - 1];
        }
        sentence = sentence.replace(
          word,
          `${obj[difference]}${punctuation}`
        );
      });
    });
    return sentence;
  }
  timeReplace(sentence, initial, final) {
    let matchTest = new RegExp(`\\d+${initial}\\d+`, "gi");
    let matches = sentence.match(matchTest);
    if (!matches) return sentence;
    let newSentence = sentence;
    matches.forEach((match) => {
      let replacement = `${match.replace(initial, final)}`;
      newSentence = newSentence.replace(matchTest, replacement);
    });
    return newSentence;
  }
}

module.exports = Translator;
