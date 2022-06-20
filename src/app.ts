import express from "express";
import path from "path";
import { checkEvents } from "./services/contractServices";
import { addWorldToDb, getTokenData } from "./services/dbServices";

const app = express();

app.get("/", async (req, res) => {
  try {
    res.send("Server Running!");
  } catch {
    res.sendStatus(500);
  }
});

app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
const port = process.env.PORT || 5000;

app.get("/api/token/:token_id", async (req, res) => {
  try {
    await checkEvents();

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
