"use strict";

const Translator = require("../components/translator.js");
const express = require("express");

module.exports = function (app) {
  const translator = new Translator();

  app
    .route("/api/translate")
    .post(express.urlencoded({ extended: false }), (req, res) => {
      if (req.body.text === undefined || !req.body.locale)
        return res.json({ error: "Required field(s) missing" });
      else if (req.body.text === "")
        return res.json({ error: "No text to translate" });
      let returned = translator.translate(req.body.text, req.body.locale);
      if (returned.error) {
        return res.json({error: returned.error})
      }
      console.log(returned);
      if (returned == req.body.text)
        return res.json({text: req.body.text, translation: "Everything looks good to me!"});
      res.json({text: req.body.text, translation: returned});
    });
};
