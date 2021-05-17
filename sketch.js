var dog,happyDog,database,foodS,foodStock,happyDogImg,dogImg,Food;
var milk_img;
var fedTime, lastFed;
var foodObj;
var feed,addFood;
var food;

function preload()
{
	dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
  milk_img=loadImage("images/Milk.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  //food=new food();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  
  foodObj=new Food();
  var dog=createSprite(250,250,1,1);
  dog.addImage(dogImg);
  dog.scale=0.5;

  feed=createButton("Feed the Dog");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(300,145);
  addFood.mousePressed(addFoods);

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
 
}


function draw() {  
  background(46,139,87);

  food=new Food();

  textSize(24);
  fill("white");
  stroke("red");
  text("VIRTUAL PET",30,30);

  fedTime=database.ref("fedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  foodObj.display();

  drawSprites();
  //add styles here

  //Food();
   
}

function readStock(data){
  foodS=data.val();
  foodObj=getFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS,
  })
}

function feedTheDog(){
  dog.addImage(happyDogImg);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
  })
}
