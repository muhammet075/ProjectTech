const express = require('express');
const app = express();
const port = 8000;




app.get("/", home);
app.get("/about", about);

function home(req, res){
    res.send("Welkom");
}

function about(req, res){
    res.send("Over ons")
}



app.listen(port, () => {
    console.log("Server is aan");
}) 