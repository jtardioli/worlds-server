import express from "express";
import { addWorldToDb, getTokenData } from "./src/services/dbServices";

const app = express();

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/public/");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/api/token/:token_id", (req, res) => {
  const tokenId = req.params.token_id;
  const worldMetadata = getTokenData()[tokenId].metadata;
  res.send(worldMetadata);
});

app.get("/api/animation/:token_id", (req, res) => {
  res.render("index.html");
});

app.get("/api/:token_id", (req, res) => {
  const tokenId = req.params.token_id;
  addWorldToDb(tokenId);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("App running on port 5000");
});
