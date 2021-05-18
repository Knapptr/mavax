const express = require("express");
const getData = require("../scraper/getData");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.render("search");
});
app.post("/", (req, res, next) => {
  const zip = req.body.zip;
  res.redirect(`/${zip}`);
});
app.get("/:zip", async (req, res, next) => {
  const zip = req.params.zip;
  const data = await getData(zip);
  if (!data) {
    res.render("data", { zip, data: null });
    return;
  }
  console.log(data);
  res.render("data", { data, zip });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
