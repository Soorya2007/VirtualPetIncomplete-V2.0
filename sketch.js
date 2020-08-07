//Create variables here
var dog ,happyD,happyDog,foodS,foodStock,database;
var feedPet,addFood,fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  happyDog = loadImage(images/dogImg.png);
  happyD = loadImage(images/dogImg1.png);
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage("dog",happyDog);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);  

  foodObj = new Food();

  feedPet = createButton("Feed The Dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(rgb(46, 139, 87));
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dogg",happyD);
  }
  fedTime=database.ref('Feed Time');
  fedTime.on("value",function(data){
  lastFed = data.val();
  });
  textSize(25);
  fill(color(0,0,0));
  stroke(255,204,0);
  text(foodStock,250,20);
  text("NOTE : YOU CAN FEED YOUR DOG MILK BY PRESSING THE UP ARROW KEY",250,480);
  foodObj.display();
  drawSprites();
  //add styles here

}
//function to read values from DB
function readStock(data){
    foodStock-data.val();
}
function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    foodS:x 
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.red('/').update({
    Food:foodS
  })
}