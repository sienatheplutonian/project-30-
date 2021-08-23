const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var jointPoint, jointLink
var stones = []
var axeImg, backgroundImg, woodImg, stoneImg, zombieImg, zombie, zombie2, zombie3, zombie4

function preload(){

axeImg = loadImage("assets/axe.png")
backgroundImg = loadImage("assets/background.png")
woodImg = loadImage("assets/wood.png")
stoneImg = loadImage("assets/stone.png")
zombieImg = loadImage("assets/zombie.png")
zombie2 = loadImage("assets/zombie2.png")
zombie3 = loadImage("assets/zombie3.png")
zombie4 = loadImage("assets/zombie4.png")
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width*2, 20)
  leftWall = new Base(100, height - 300, 200, height/2 + 100)
  rightWall = new Base(width-100, height - 300, 200, height/2 + 100)
  
  bridge = new Bridge(30, {x:50, y:height/2 - 140})
  jointPoint = new Base(width-250,height/2 - 100,40,20)

  Matter.Composite.add(bridge.body, jointPoint)
  jointLink = new Link(bridge, jointPoint)
   
  zombie = createSprite(width/2, height - 110)
  zombie.addAnimation("righttoleft", zombieImg, zombie2, zombieImg)
  zombie.addAnimation("lefttoright", zombie3, zombie4, zombie3)
  zombie.scale = 0.1 

  breakButton = createButton("")
  breakButton.position(width-200, height/2 - 50)
  breakButton.class("breakButton")
  breakButton.mousePressed(handleButtonPress)

  zombie.velocityX = 10

  //for loop
  for (var i = 0; i<= 8; i++){
    var x = random(width/2 - 200, width/2 + 300)
    var y = random(-10,140)
    var stone = new Stone (x,y,80,80)
    stones.push(stone)
  }
}

function draw() {
  background(51);
  Engine.update(engine);
  ground.show()
  leftWall.show()
  rightWall.show()
  bridge.show()

  for(var stone of stones){
    stone.show()
  }
  drawSprites()
}
function handleButtonPress(){
  jointLink.detach()
  setTimeout(() =>{
    bridge.break()
    }, 1500)
}


