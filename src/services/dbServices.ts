import fs from "fs";
import { generateWorldData } from "./worldsServices";

export const getTokenData = () => {
  const jsonData = fs.readFileSync("public/db.json");
  const worldData = JSON.parse(String(jsonData));
  return worldData;
};

export const addWorldToDb = (tokenId: string) => {
  const worldDb = getTokenData();
  console.log(worldDb[tokenId]);
  if (worldDb[tokenId] != null) return;

  const newWorld = generateWorldData(tokenId);
  worldDb[tokenId] = newWorld;
  const newWorldDbJson = JSON.stringify(worldDb);
  fs.writeFileSync("public/db.json", newWorldDbJson);
};
