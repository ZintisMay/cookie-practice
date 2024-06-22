const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(cookieParser("MY SECRET"));

app.get("/", (req, res) => {
  res.cookie("name", "value", { signed: true });
  res.sendFile(pathTo("index.html"));
});

app.get("/seeCookie", (req, res) => {
  let s = JSON.stringify(req.signedCookies);
  res.send(s || "NOTHING HERE");
});

app.get("/secret", (req, res) => {
  let val = req.signedCookies?.["name"];
  if (val === "value") {
    res.send("Good");
  } else {
    res.send("Bad");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function pathTo(fileName) {
  return `${__dirname}/${fileName}`;
}
