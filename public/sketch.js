let p5Canvas;
let jsonData;
let tokenSeed;

let sun;
let planets = [];

function preload() {
  jsonData = loadJSON("../../../db.json");
}

function setup() {
  canvasSize = 600;

  url = getURL();
  const tokenUrl = getTokenIdFromURL(url);

  tokenSeed = jsonData[tokenUrl].seed;
  const {
    G,
    sunColor,
    numPlanets,
    planetDistanceFromSun,
    planetAngle,
    isPlanetVelReversed,
    planetSize,
    finalPlanetVel,
    planetColor,
  } = tokenSeed;

  // p5 set up
  colorMode(HSB, 255);
  url = getURL();
  p5Canvas = createCanvas(canvasSize, canvasSize);

  sun = new Sun(80, createVector(0, 0), createVector(0, 0), sunColor);

  for (let i = 0; i < numPlanets; i++) {
    // planet position
    let r = planetDistanceFromSun[i];
    let theta = planetAngle[i];
    let planetPos = createVector(r * cos(theta), r * sin(theta));

    //planet velocity
    let planetVel = planetPos.copy();
    planetVel.rotate(HALF_PI);
    planetVel.setMag(sqrt((G * sun.mass) / planetPos.mag()));

    if (isPlanetVelReversed) {
      planetVel.mult(-1);
    }

    planetVel.mult(finalPlanetVel[i]);
    planets.push(new Body(planetSize[i], planetPos, planetVel, planetColor[i]));
  }
}

function draw() {
  translate(width / 2, height / 2);
  background(30);

  sun.show();
  for (const planet of planets) {
    sun.attract(planet);
    planet.show();
    planet.update();
  }
}

class Body {
  constructor(mass, pos, vel, color) {
    this.mass = mass;
    this.pos = pos;
    this.vel = vel;
    this.r = this.mass;
    this.path = [];
    this.color = color;

    this.show = () => {
      noStroke();

      fill(this.color - 10, 180, 200);
      ellipse(this.pos.x + this.r / 22, this.pos.y - 1, this.r + 4, this.r + 4);

      fill(this.color, 180, 200);
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
      stroke("#262626");
      for (let i = 0; i < this.path.length - 8; i++) {
        line(
          this.path[i].x,
          this.path[i].y,
          this.path[i + 1].x,
          this.path[i + 1].y
        );
      }
    };

    this.update = () => {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.path.push(this.pos.copy());
      if (this.path.length > 35) {
        this.path.splice(0, 1);
      }
    };

    this.applyForce = (f) => {
      this.vel.x += f.x / this.mass;
      this.vel.y += f.y / this.mass;
    };

    this.attract = (child) => {
      let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);
      let f = this.pos.copy().sub(child.pos);
      const { G } = tokenSeed;
      f.setMag((G * this.mass * child.mass) / (r * r));
      child.applyForce(f);
    };
  }
}

class Sun extends Body {
  constructor(mass, pos, vel, color) {
    super(mass, pos, vel, color);
  }
}

const getTokenIdFromURL = (url) => {
  let tokenId = url;

  if (tokenId[tokenId.length - 1] === "/") {
    tokenId = tokenId.slice(0, -1);
  }

  tokenId = tokenId.split("/").pop();

  return tokenId;
};
