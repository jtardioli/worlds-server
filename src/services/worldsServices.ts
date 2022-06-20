import { HOST } from "../constants";
export const generateWorldData = (tokenId: string) => {
  // GLOBAL
  const canvasSize = 600;
  const G = random(45, 130);
  const sunColor = random(10, 35);
  const numPlanets = random(1, 8);

  //Per Planet
  const planetDistanceFromSun = [];
  const planetAngle = [];
  const isPlanetVelReversed = [];

  const finalPlanetVel = [];
  const planetSize = [];
  const planetColor = [];

  for (let i = 0; i < numPlanets; i++) {
    planetDistanceFromSun.push(random(80, canvasSize / 2));
    planetAngle.push(random(0, 2 * Math.PI));
    isPlanetVelReversed.push(random(1, 10) <= 1);
    const destabalize = Math.random() * 0.3;
    finalPlanetVel.push(random(1 - destabalize, 1 + destabalize));
    planetSize.push(random(5, 30));
    planetColor.push(random(5, 255));
  }

  return {
    seed: {
      G,
      sunColor,
      numPlanets,
      planetDistanceFromSun,
      planetAngle,
      isPlanetVelReversed,
      planetSize,
      finalPlanetVel,
      planetColor,
    },
    metadata: {
      name: getWorldName(1)[0],
      description: `A unique world with ${numPlanets} planets`,
      animation_url: `${HOST}/api/animation/${tokenId}`,
      external_url: `${HOST}/api/animation/${tokenId}`,
      image: `${HOST}/api/image`,
    },
  };
};

function makeid() {
  const length = random(0, 3);
  var result = "";
  var characters = "ABKLMNPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  if (length > 1) {
    result = " ";
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (result.length === 3) {
      result = result.slice(0, -1);
      result = result + random(0, 9);
    }
  }

  return result;
}

const getWorldName = (count: number) => {
  var vowels: Record<string, string[]> = {
    "1": [
      "b",
      "c",
      "d",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "p",
      "q",
      "r",
      "s",
      "t",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    "2": ["a", "e", "o", "u"],
    "3": [
      "br",
      "cr",
      "dr",
      "fr",
      "gr",
      "pr",
      "str",
      "tr",
      "bl",
      "cl",
      "fl",
      "gl",
      "pl",
      "sl",
      "sc",
      "sk",
      "sm",
      "sn",
      "sp",
      "st",
      "sw",
      "ch",
      "sh",
      "th",
      "wh",
    ],
    "4": [
      "ae",
      "ai",
      "ao",
      "au",
      "a",
      "ay",
      "ea",
      "ei",
      "eo",
      "eu",
      "e",
      "ey",
      "ua",
      "ue",
      "ui",
      "uo",
      "u",
      "uy",
      "ia",
      "ie",
      "iu",
      "io",
      "iy",
      "oa",
      "oe",
      "ou",
      "oi",
      "o",
      "oy",
    ],
    "5": [
      "turn",
      "ter",
      "nus",
      "rus",
      "tania",
      "hiri",
      "hines",
      "gawa",
      "nides",
      "carro",
      "rilia",
      "stea",
      "lia",
      "lea",
      "ria",
      "nov",
      "phus",
      "mia",
      "nerth",
      "wei",
      "ruta",
      "tov",
      "zuno",
      "vis",
      "lara",
      "nia",
      "liv",
      "tera",
      "gantu",
      "yama",
      "tune",
      "ter",
      "nus",
      "cury",
      "bos",
      "pra",
      "thea",
      "nope",
      "tis",
      "clite",
    ],
    "6": [
      "una",
      "ion",
      "iea",
      "iri",
      "illes",
      "ides",
      "agua",
      "olla",
      "inda",
      "eshan",
      "oria",
      "ilia",
      "erth",
      "arth",
      "orth",
      "oth",
      "illon",
      "ichi",
      "ov",
      "arvis",
      "ara",
      "ars",
      "yke",
      "yria",
      "onoe",
      "ippe",
      "osie",
      "one",
      "ore",
      "ade",
      "adus",
      "urn",
      "ypso",
      "ora",
      "iuq",
      "orix",
      "apus",
      "ion",
      "eon",
      "eron",
      "ao",
      "omia",
      "tron",
      "ilio",
    ],
  };

  const mtx = [
      [1, 1, 2, 2, 5, 5],
      [2, 2, 3, 3, 6, 6],
      [3, 3, 4, 4, 5, 5],
      [4, 4, 3, 3, 6, 6],
      [3, 3, 4, 4, 2, 2, 5, 5],
      [2, 2, 1, 1, 3, 3, 6, 6],
      [3, 3, 4, 4, 2, 2, 5, 5],
      [4, 4, 3, 3, 1, 1, 6, 6],
      [3, 3, 4, 4, 1, 1, 4, 4, 5, 5],
      [4, 4, 1, 1, 4, 4, 3, 3, 6, 6],
    ],
    fn = function (i: string) {
      return Math.floor(Math.random() * vowels[i].length);
    };

  const ret = [];
  let name;
  let comp;
  let i;
  let il;
  let c = 0;

  for (; c < count; c++) {
    name = "";
    comp = mtx[c % mtx.length];
    for (i = 0, il = comp.length / 2; i < il; i++) {
      name += vowels[comp[i * 2]][fn(String(comp[i * 2 + 1]))];
    }
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    ret.push(`${nameCapitalized}${makeid()}`);
  }

  return ret;
};

export function random(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
