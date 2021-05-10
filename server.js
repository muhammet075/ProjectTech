const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const mongo = require('./mongo');
const gerbuikerSchema = require('./schemas/gerbuiker-schema');

const connectToMongo = async () => {
    await mongo().then(async (mongoose) =>{
        try {
            console.log("test");

            const gebruiker = {
                naam: "muhammet",
                email: "muhammet075@icloud.com",
                telefoon: "061234567",
                console: "PS5",
                game1: "he1",
                game2: "he2",
                game3: "he3",
                game4: "he4"
            }

            await new gerbuikerSchema(gebruiker).save()

        } finally {
            mongoose.connection.close();
        }
    })
}

connectToMongo();


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public.css'));
app.use('/img', express.static(__dirname + 'public.img'));


app.use(expressLayouts);
app.set('layout', './layouts/full-width')
app.set("view engine", "ejs");

app.get('', (req, res) => {
    res.render('index')
})

app.get('/aanmelden', (req, res) => {
    res.render('aanmelden')
})

app.get('/zoeken', (req, res) => {
    res.render('zoeken')
})

app.listen(port, () => {
    console.log("Server is aan");
}) 

