var dog, dogImg, happydogImg;
var database;
var foodS, foodStock;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/happydogImg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg)
  dog.scale = 0.2;
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happydogImg)
  } 
  fill(255);
  textSize(15);
  stroke(0);
  text("Food Remaining: "+foodS,170,200);
  textSize(15);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 125,50);

  drawSprites(); 
  
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    food: x
  })
}