const express = require('express');
const app = express();
const port = 3000;


app.get("/", home);
app.get("/about", about);


app.use(express.static('static'));
app.set("view engine", "ejs");


function home(req, res){
    res.render("index", {data: autos});
}

function about(req, res){
    res.send("Over ons")
}


app.listen(port, () => {
    console.log("Server is aan");
}) 



const autos = {
    merk: "Mercedes-Benz",
    kleur: "Zwart"
}