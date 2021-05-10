const mongoose = require("mongoose");


const gebruikerSchema = mongoose.Schema({
    naam: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    telefoon: {
      type: Number,
      required: true
    },
    console: {
      type: String,
      required: true
    },
    game1: {
      type: String,
      required: true
    },
    game2: {
      type: String,
      required: true
    },
    game3: {
      type: String,
      required: true
    },
    game4: {
        type: String,
        required: true
      }
  });

module.exports = mongoose.model("gebruikers", gebruikerSchema);