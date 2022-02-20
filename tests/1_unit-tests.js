const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const TranslatorW = require("../components/translatorWithoutHighlight");

const translatorW = new TranslatorW();
const translator = new Translator();

suite("Unit Tests", () => {
  suite("American to British with translatorW", () => {
    test("Mangoes are my favorite fruit.", (done) => {
      assert.equal(
        translatorW.startAmerican("Mangoes are my favorite fruit."),
        "Mangoes are my favourite fruit."
      );
      done();
    });
    test("I ate yogurt for breakfast.", (done) => {
      assert.equal(
        translatorW.startAmerican("I ate yogurt for breakfast."),
        "I ate yoghurt for breakfast."
      );
      done();
    });
    test("We had a party at my friend's condo.", (done) => {
      assert.equal(
        translatorW.startAmerican("We had a party at my friend's condo."),
        "We had a party at my friend's flat."
      );
      done();
    });
    test("Can you toss this in the trashcan for me?", (done) => {
      assert.equal(
        translatorW.startAmerican("Can you toss this in the trashcan for me?"),
        "Can you toss this in the bin for me?"
      );
      done();
    });
    test("The parking lot was full.", (done) => {
      assert.equal(
        translatorW.startAmerican("The parking lot was full."),
        "The car park was full."
      );
      done();
    });
    test("Like a high tech Rube Goldberg machine.", (done) => {
      assert.equal(
        translatorW.startAmerican("Like a high tech Rube Goldberg machine."),
        "Like a high tech Heath Robinson device."
      );
      done();
    });
    test("To play hooky means to skip class or work.", (done) => {
      assert.equal(
        translatorW.startAmerican("To play hooky means to skip class or work."),
        "To bunk off means to skip class or work."
      );
      done();
    });
    test("No Mr. Bond, I expect you to die.", (done) => {
      assert.equal(
        translatorW.startAmerican("No Mr. Bond, I expect you to die."),
        "No Mr Bond, I expect you to die."
      );
      done();
    });
    test("Dr. Grosh will see you now.", (done) => {
      assert.equal(
        translatorW.startAmerican("Dr. Grosh will see you now."),
        "Dr Grosh will see you now."
      );
      done();
    });
    test("Lunch is at 12:15 today.", (done) => {
      assert.equal(
        translatorW.startAmerican("Lunch is at 12:15 today."),
        "Lunch is at 12.15 today."
      );
      done();
    });
  });
  suite("British to American with translatorW", () => {
    test("We watched the footie match for a while.", (done) => {
      assert.equal(
        translatorW.startBritish("We watched the footie match for a while."),
        "We watched the soccer match for a while."
      );
      done();
    });
    test("Paracetamol takes up to an hour to work.", (done) => {
      assert.equal(
        translatorW.startBritish("Paracetamol takes up to an hour to work."),
        "Tylenol takes up to an hour to work."
      );
      done();
    });
    test("First, caramelise the onions.", (done) => {
      assert.equal(
        translatorW.startBritish("First, caramelise the onions."),
        "First, caramelize the onions."
      );
      done();
    });
    test("I spent the bank holiday at the funfair.", (done) => {
      assert.equal(
        translatorW.startBritish("I spent the bank holiday at the funfair."),
        "I spent the public holiday at the carnival."
      );
      done();
    });
    test("I had a bicky then went to the chippy.", (done) => {
      assert.equal(
        translatorW.startBritish("I had a bicky then went to the chippy."),
        "I had a cookie then went to the fish-and-chip shop."
      );
      done();
    });
    test("I've just got bits and bobs in my bum bag.", (done) => {
      assert.equal(
        translatorW.startBritish("I've just got bits and bobs in my bum bag."),
        "I've just got odds and ends in my fanny pack."
      );
      done();
    });
    test("The car boot sale at Boxted Airfield was called off.", (done) => {
      assert.equal(
        translatorW.startBritish(
          "The car boot sale at Boxted Airfield was called off."
        ),
        "The swap meet at Boxted Airfield was called off."
      );
      done();
    });
    test("Have you met Mrs Kalyani?", (done) => {
      assert.equal(
        translatorW.startBritish("Have you met Mrs Kalyani?"),
        "Have you met Mrs. Kalyani?"
      );
      done();
    });
    test("Prof Joyner of King's College, London.", (done) => {
      assert.equal(
        translatorW.startBritish("Prof Joyner of King's College, London."),
        "Prof. Joyner of King's College, London."
      );
      done();
    });
    test("Tea time is usually around 4 or 4.30.", (done) => {
      assert.equal(
        translatorW.startBritish("Tea time is usually around 4 or 4.30."),
        "Tea time is usually around 4 or 4:30."
      );
      done();
    });
  });
  suite("American to British with translator", () => {
    test("Mangoes are my favorite fruit.", (done) => {
      assert.equal(
        translator.startAmerican("Mangoes are my favorite fruit."),
        `Mangoes are my <span class="highlight">favourite</span> fruit.`
      );
      done();
    });
    test("I ate yogurt for breakfast.", (done) => {
      assert.equal(
        translator.startAmerican("I ate yogurt for breakfast."),
        `I ate <span class="highlight">yoghurt</span> for breakfast.`
      );
      done();
    });
  });
  suite("British to American with translator", () => {
    test("We watched the footie match for a while.", (done) => {
      assert.equal(
        translator.startBritish("We watched the footie match for a while."),
        `We watched the <span class="highlight">soccer</span> match for a while.`
      );
      done();
    });
    test("Paracetamol takes up to an hour to work.", (done) => {
      assert.equal(
        translator.startBritish("Paracetamol takes up to an hour to work."),
        `<span class="highlight">Tylenol</span> takes up to an hour to work.`
      );
      done();
    });
  });
});
