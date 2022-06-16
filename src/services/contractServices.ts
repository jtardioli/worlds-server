import { BigNumber, ethers } from "ethers";
import { utimes } from "fs";
import { worldsAddress, worldsABI } from "../constants";
import { addWorldToDb } from "./dbServices";
const provider = new ethers.providers.JsonRpcProvider(
  "https://rinkeby.infura.io/v3/f68c132d062442189a9313f314f78992"
);
export const checkEvents = async () => {
  let worldsContract = new ethers.Contract(worldsAddress, worldsABI, provider);

  worldsContract.on("Transfer", (from, to, updatedIndex) => {
    console.log(from, to, updatedIndex);
    if (from === ethers.constants.AddressZero) {
      const tokenId = ethers.BigNumber.from(updatedIndex).toString();

      addWorldToDb(tokenId);
    }
  });
};
