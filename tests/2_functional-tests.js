const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  suite("POST /api/translate => object", () => {
    test("Text and Locale Fields", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "Mangoes are my favorite fruit.",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, "Mangoes are my favorite fruit.");
          assert.equal(
            res.body.translation,
            `Mangoes are my <span class="highlight">favourite</span> fruit.`
          );
          done();
        });
    });
    test("Invalid Locale Field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "Mangoes are my favorite fruit.", locale: "fail" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid value for locale field");
          done();
        });
    });
    test("Missing Text Field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ locale: "american-to-british" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("Missing Locale Field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "Mangoes are my favorite fruit." })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("Empty Text Field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "", locale: "american-to-british" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "No text to translate");
          done();
        });
    });
    test("Text with No Translation Needed", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "Mangoes are my favourite fruit.",
          locale: "american-to-british",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.text, "Mangoes are my favourite fruit.");
          assert.equal(res.body.translation, "Everything looks good to me!");
          done();
        });
    });
  });
});
