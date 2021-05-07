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

app.get('', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.listen(port, () => {
    console.log("Server is aan");
}) 