//Variables
var asteroid,asteroid2, astronaut, ufo, spaceship, space;
var spaceImg, spaceshipImg, astronautImg, asteroidImg, asteroid2Img, ufoImg;
var astronautCollection = 0;
var astronautG, asteroidG, asteroid2G, ufoG;
var score;
var restartImg;
var abductionSound, endSound;

//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  spaceImg = loadImage("spacevertical.png");
  spaceshipImg = loadImage("Spaceship.png");
  astronautImg = loadImage("Astronaut.png");
  asteroidImg = loadImage("Asteroid.png");
  asteroid2Img = loadImage("Asteroid2.png");
  ufoImg = loadImage("Ufo.png");
  endImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png")
  abductionSound = loadSound("abduction.mp3")
  endSound = loadSound("end.mp3")
}

function setup() {

  //create a canvas

  createCanvas(windowWidth, windowHeight);

  //Scaling
  

  // Moving background

  space = createSprite(width / 2, height / 2);
  space.addImage(spaceImg);
  space.velocityY = 5;
  space.scale = 1.5;


  spaceship = createSprite(width / 2, height - 20, 20, 20);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.25;
  


  astronautG = new Group();
  
  asteroidG = new Group();

  asteroid2G = new Group();

  ufoG = new Group();

  edges = createEdgeSprites();
}

function draw() {
  background("black");
  
 

  if (gameState === PLAY) {
    restartImg.visible = false;
    spaceship.x = World.mouseX;
    spaceship.collide(edges);
    //code to reset the background
    if (space.y > height/0.5) {
      space.y = height /8;
    }
    createAstronaut();
    createAsteroid();
    createAsteroid2();
    createUfo();
    if (astronautG.isTouching(spaceship)) {
      astronautCollection = astronautCollection + 1;
    }

    if (ufoG.isTouching(spaceship)){
      abductionSound.play();
      gameState = END;
    }
    
    if (asteroidG.isTouching(spaceship)){
      abductionSound.play();
      gameState = END;
    }

    if (asteroid2G.isTouching(spaceship)){
      abductionSound.play();
      gameState = END;
    }

  } else if (gameState === END) {
    if (space.y > height/0.5) {
      space.y = height / 8;
    }
    restartImg.visible = true;
    spaceship.addImage(endImg);
    spaceship.x = width / 2;
    spaceship.y = height / 2;
    spaceship.scale = 0.6;

    astronautG.destroyEach();
    asteroidG.destroyEach();
    asteroid2G.destroyEach();
    ufoG.destroyEach();

    astronautG.setVelocityYEach(0);
    asteroidG.setVelocityYEach(0);
    asteroid2G.setVelocityYEach(0);
    ufoG.setVelocityYEach(0);

    //if(mousePressedOver(restartImg)) {
     //reset();
  }

  drawSprites();
  textSize(30);
  fill(255);
  text("Score: " + astronautCollection, width - 250, 30);

  textSize(25);
  fill(150);
  text("Get the highest score possible by saving the astronauts without dying! Good Luck!", width - 1250,30)
}

function reset()
{
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;

  ufoG.destroyEach()
  asteroidG.destroyEach()
  asteroid2G.destroyEach()
  astronautG.destroyEach()
  score=0
}

function createAsteroid() {
  if (World.frameCount % 150 == 0) {
    var asteroid = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.8;
    asteroid.velocityY = 7;
    asteroid.lifetime = 200;
    asteroidG.add(asteroid);
    asteroid.setCollider("circle", 0, 0, 60);
  }
}

function createAsteroid2() {
  if (World.frameCount % 100 == 0) {
    var asteroid2 = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    asteroid2.addImage(asteroid2Img);
    asteroid2.scale = 0.3;
    asteroid2.velocityY = 9;
    asteroid2.lifetime = 200;
    asteroid2G.add(asteroid2);
    asteroid2.setCollider("circle", 0, 0, 60);
  }
}

function createUfo() {
  if (World.frameCount % 200 == 0) {
    var ufo = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    ufo.addImage(ufoImg);
    ufo.scale = 1;
    ufo.velocityY = 5;
    ufo.lifetime = 200;
    ufoG.add(ufo);
    ufo.setCollider("circle", 0, 0, 70);
  }
}

function createAstronaut() {
  if (World.frameCount % 600 == 0) {
    var astronaut = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    astronaut.addImage(astronautImg);
    astronaut.scale = 0.575;
    astronaut.velocityY = 5;
    astronaut.lifetime = 200;
    astronautG.add(astronaut);
  }
}