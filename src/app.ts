import express from "express";
import path from "path";
import { addWorldToDb, getTokenData } from "./services/dbServices";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  try {
    res.send("Worlds Server Is Running :)");
  } catch {
    res.sendStatus(500);
  }
});

app.get("/api/token/:token_id", (req, res) => {
  try {
    const tokenId = req.params.token_id;
    const worldMetadata = getTokenData()[tokenId].metadata;
    res.send(worldMetadata);
  } catch {
    res.sendStatus(500);
  }
});

app.get("/api/animation/:token_id", (req, res) => {
  try {
    res.render("index.html");
  } catch {
    res.sendStatus(500);
  }
});

app.get("/api/download", (req, res) => {
  try {
    res.download(path.join(__dirname, "../public/db.json"));
  } catch {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log("App running on port 5000");
});
