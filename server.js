require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public.css'));
app.use('/img', express.static(__dirname + 'public.img'));
app.use('/js', express.static(__dirname + 'public.js'));

app.use(expressLayouts);
app.set('layout', './layouts/full-width')
app.set("view engine", "ejs");

var bodyParser = require('body-parser');
var multer = require('multer');
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const mongoose = require('mongoose');
const { request } = require('express');
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    runValidators: true,
})

const gebruikerSchema = new mongoose.Schema({
    naam: {
      type: String,
    },
    leeftijd: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    telefoon: {
      type: Number,
    },
    console: {
      type: String,
    },
    bio: {
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
    },
    img: {
      
    }
});

const gebruiker = mongoose.model("gebruiker", gebruikerSchema)



const storage = multer.diskStorage({
  destination: function (request, file, callback){
    callback(null, './public/uploads');
  },

  filename: function (request, file, callback){
    callback(null, Date.now() + file.originalname);
  },

});

const storageWijzig = multer.diskStorage({
  destination: function (request, file, callback){
    callback(null, './public/uploads');
  },

  filename: function (request, file, callback){
    callback(null, Date.now() + file.originalname);
  },

});


const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const uploadWijzig = multer({
  storage: storageWijzig,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});



app.get('', (req, res) => {
    res.render('index')
})




app.get('/aanmelden', (req, res) => {
    res.render('aanmelden')
})

app.post('/aanmelden', upload.single('image'), async (req, res) => {
  console.log(request.file)
    let nieuwGebruiker = new gebruiker({
        naam: req.body.naam,
        leeftijd: req.body.leeftijd,
        email: req.body.email,
        telefoon: req.body.telefoon,
        console: req.body.console,
        bio: req.body.bio,
        game1: req.body.game1,
        game2: req.body.game2,
        game3: req.body.game3,
        game4: req.body.game4,
        img: req.file.filename
    });
   
    nieuwGebruiker.save(function (err) {
      if (err) {
        console.log('error');
        res.redirect('/error')
      } else {
      res.redirect('/zoeken')
      }
    })
})




app.get('/zoeken', (req, res) => {
  gebruiker.find({}, function(err, gebruikers) {
      res.render('zoeken', {
          gebruikersLijst: gebruikers
      })
  })
})

// nog in ontwikkeling
app.post('/zoeken', async (req, res) => {
  const consoleFilter = req.body.consolefilter
  let query = {}
  if (consoleFilter === 'Alle') {
  } else {
    query = {
       console: req.body.consoleFilter
    }
    console.log(consoleFilter);
  }
})




app.get('/wijzigen', (req, res) => {
  res.render('wijzigen')
})


app.post('/wijzigen', uploadWijzig.single('wijzigimage'), async (req, res) => {
  try {
    const doc = await gebruiker.findOne({ email: req.body.wijzigemail });
      doc.overwrite({     
        naam: req.body.wijzignaam,
        leeftijd: req.body.wijzigleeftijd,
        email: req.body.wijzigemail,
        telefoon: req.body.wijzigtelefoon,
        console: req.body.wijzigconsole,
        bio: req.body.wijzigbio,
        game1: req.body.wijziggame1,
        game2: req.body.wijziggame2,
        game3: req.body.wijziggame3,
        game4: req.body.wijziggame4,
        img: req.file.filename
      });

    await doc.save();
    res.redirect('/zoeken');

  } catch(err) {
  console.log(err);
  res.redirect('/error');
  }
})




app.get('/verwijderen', (req, res) => {
  res.render('verwijderen')
})

app.post('/verwijderen', async (req, res) => {
  try {
    await gebruiker.deleteMany({
      email: req.body.verwijderemail,
  })

  res.redirect('/zoeken')

  } catch (err) {
    res.redirect('/error')
  } 
})




app.get('/hoe-werkt-het', (req, res) => {
  res.render('hoewerkthet')
})




app.get('/error', (req, res) => {
  res.render('error')
})




app.use(function(req, res) {
  res.status(404).render("404");
});




app.listen(port, () => {
    console.log("Server is aan");
}) 