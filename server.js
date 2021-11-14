const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = process.env.PORT || 5000;
const fetch = require("node-fetch");

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public.css"));
app.use("/js", express.static(__dirname + "public.js"));

app.use(expressLayouts);
app.set("layout", "./layouts/formaat");
app.set("view engine", "ejs");

app.use(express.json());
var bodyParser = require("body-parser");

app.get("", handleApi, (req, res) => {
  res.render("index");
});

async function handleApi(req, res) {
  const cryptoApi = await fetch("https://www.cryptingup.com/api/markets")
    .then((res) => res.json())
    .then((json) => {
      let nieuweCrypto = [];

      for (var i = 0; i < 20; i++) {
        nieuweCrypto.push(json.markets[i]);
      }
      console.log("he", nieuweCrypto);

      const cryptoData = json.data;

      res.render("", {
        nieuweCrypto: nieuweCrypto,
      });
    });
}

app.listen(port, () => {
  console.log("Server aan");
});
