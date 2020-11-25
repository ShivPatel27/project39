var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstaclesGroup;
var score;
var ground;
var survivaltime = 0;
var index = 0;
var gameState = "play";
var monkey_stop;


function preload(){
  
  
  monkey_running = 
loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png",
  "sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png",
  "sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  monkey_stop = loadAnimation("sprite_2.png","sprite_3.png" );
 
}



function setup() {
  createCanvas(600,200);
  
  
  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("run",monkey_running);
  monkey.scale = 0.1;
  //monkey.debug = true;
  
  ground = createSprite(50, 190, 600, 5);
  
  
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
}

function draw() {
  background("green");
  
  monkey.collide (ground);
  
  if(gameState = "play"){
    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -10;
    } 
  //"the camera position changes due to this command"
    
    camera.position.x = monkey.x ; 
      
     spawnfood();
    spawnobstacle();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime:" + survivaltime,100,50);
  
   //add gravity
    monkey.velocityY = monkey.velocityY + 0.8; 

    if(obstaclesGroup.isTouching(monkey)){
      gameState = "end";
    }
  }else
  if( gameState = "end"){
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    monkey.changeAnimation("collided", monkey_stop);
  }

  drawSprites();
}
function spawnfood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(120, 140));
    banana.addImage(bananaImage);
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 180;
    
    banana.scale = 0.07;

    //add each banana to the group
    foodGroup.add(banana);
  }
}
function spawnobstacle() {
  //write code here to spawn the obstacles
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 170, 40, 10);
   // obstacle.y = Math.round(random(120, 200));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;

    //assign lifetime to the variable
    obstacle.lifetime = 200;

    obstaclesGroup.add(obstacle);
  }
}