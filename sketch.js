var monkey, monkey_running;
var obstacle, obstacleImage, obstacleGroup;
var banana ,bananaImage, foodGroup;
var backGround, backImage;
var score;
var ground;


function preload(){  
 monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("stone.png");
 backImage = loadImage("jungle.jpg");
 bananaImage = loadImage("banana.png");
 
}

function setup() {
  createCanvas(400,400);
  
  //backGround = createSprite(200,200,4000,400);
  //backGround.addImage(backImage);
  
  ground = createSprite(200,375,4000,10);
  ground.visible = false;

  monkey = createSprite(50,340,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
}

function draw() {
  background(220);

  //if(backGround.x < 0){
 //   backGround.x = 1000
 // }

 image(backImage,0,0,1600,400)

    
  if(keyDown("space") && monkey.y >= 100){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.velocityX = 3
  camera.position.x = monkey.x;
  camera.position.y = 200;
  
  monkey.collide(ground);


   
  food();

  if (foodGroup.isTouching(monkey)){
    score = score+2
    monkey.scale = (.09 + .01* score/10);
    foodGroup.destroyEach();
  }

  rock();

  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.1;
  }

  
  drawSprites();
  
  fill("white");
  textSize(15);
  text("Score = " +score,300,50);
}


function food(){
  if (frameCount % 100 === 0){
    banana = createSprite(400,200,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 150;
    foodGroup.add(banana);
  }
}

function rock(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(400,350,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.12;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}

