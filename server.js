require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public.css'));
app.use('/img', express.static(__dirname + 'public.img'));

app.use(expressLayouts);
app.set('layout', './layouts/full-width')
app.set("view engine", "ejs");

var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const mongoose = require('mongoose');
 mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const gebruikerSchema = new mongoose.Schema({
    naam: {
      type: String,
    },
    email: {
      type: String,
    },
    telefoon: {
      type: Number,
    },
    console: {
      type: String,
    },
    game1: {
      type: String,
    },
    game2: {
      type: String,
    },
    game3: {
      type: String,
    },
    game4: {
      type: String,
    }
  });

const gebruiker = mongoose.model("gebruiker", gebruikerSchema)

app.get('', (req, res) => {
    res.render('index')
})

app.get('/aanmelden', (req, res) => {
    res.render('aanmelden')
})

app.post('/aanmelden', async (req, res) => {
    let nieuwGebruiker = new gebruiker({
        naam: req.body.naam,
        email: req.body.email,
        telefoon: req.body.telefoon,
        console: req.body.console,
        game1: req.body.game1,
        game2: req.body.game2,
        game3: req.body.game3,
        game4: req.body.game4
    });
    nieuwGebruiker.save();
    res.redirect('/zoeken');
})

app.get('/zoeken', (req, res) => {
  gebruiker.find({}, function(err, gebruikers) {
      res.render('zoeken', {
          gebruikersLijst: gebruikers
      })
  })
})




app.listen(port, () => {
    console.log("Server is aan");
}) 