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
  res.send("Worlds Server Is Running :)");
});

app.get("/api/token/:token_id", (req, res) => {
  const tokenId = req.params.token_id;
  const worldMetadata = getTokenData()[tokenId].metadata;
  res.send(worldMetadata);
});

app.get("/api/animation/:token_id", (req, res) => {
  res.render("index.html");
});

app.get("/api/download", (req, res) => {
  res.download("./../public/db.json");
});

app.listen(port, () => {
  console.log("App running on port 5000");
});
