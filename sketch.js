var Play = 1;
var End = 0;
var gameState = Play;
var cb, cb_running, cb_collided, obs, obs_group, score;
var background1, background_image, obs_Image, ground;

function preload(){

cb_running = loadAnimation("cowboy_1.png","cowboy_2.png","cowboy_3.png",
"cowboy_4.png","cowboy_5.png","cowboy_6.png","cowboy_7.png","cowboy_8.png");

cb_collided = loadAnimation("cowboy_7.png");

background_image = loadImage("background.jpg");

obs_image = loadImage("cactus.png");
}

function setup(){
  createCanvas(750,500);

  background1 = createSprite(0,0,750,500);
  background1.addImage(background_image);
  background1.scale = 3.5;

  ground = createSprite(0,450,1500,5);
  //ground.visible = false;

  cb = createSprite(50,350,50,50);
  cb.addAnimation("running", cb_running);
  cb.addAnimation("collided",cb_collided);
  cb.scale = 0.45;
  cb.setCollider("rectangle",0,0,100,300)
  cb.debug = false;

  obs_group = createGroup();
}

function draw(){
  background("blue")

  if(gameState === Play){

   background1.velocityX = -3 
   if(background1.x < 0){
    background1.x = background1.width/2;
   }
   
   cb.collide(ground);

   if(keyDown("space")){
    cb.velocityY = -15;
   }

   cb.velocityY = cb.velocityY + 0.8;

   score = Math.round(frameCount/20);

   spawn_obs();

   if(cb.isTouching(obs_group)){
    gameState = End
   }

  }

  if(gameState === End){
    obs_group.setVelocityXEach(0);
    obs_group.setLifetimeEach(-1);
    background1.velocityX = 0;
    cb.velocityY = 0;
    cb.changeAnimation("collided",cb_collided);
  }
  
  
  drawSprites();

  if(gameState === End){
    fill("red");
    textSize(30);
    text("GAME OVER",300,200);
  }

  fill("blue")
  textSize(25);
  text("Score: " + score,620,50)
}

function spawn_obs(){
 if(frameCount % 100 === 0){
   obs = createSprite(700,400,50,50);
   obs.addImage(obs_image);
   obs.scale = 0.20;
   obs.velocityX = -8;
   obs.lifetime = 150;
   obs.setCollider("rectangle",0,0,375,500)
   obs.debug = false;
   obs_group.add(obs);
   console.log(frameCount);
 }
}
