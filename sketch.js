var dog,sadDog,happyDog;
var database;
var foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload(){
   sadDog=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happy dog.png");
   }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton('Feed the dog');
  feed.position(550,70);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(650,70);
  addFood.mousePressed(addFoods);

 
 
}

// function to display UI
function draw() {
  background(46,139,87);
  foodObj.display();
 
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
   });

   fill(255,255,254);
   textSize(15);
   if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM ",350,30);
}else{
  text("Last Feed : "+ lastFed + " AM",350,30);
}
drawSprites();
}
 
  //  fill(255,255,254);
  //  stroke("black");
  //  text("Food remaining : "+foodS,170,200);
  // textSize(13);
  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);


   //Function to read values from DB
   function readStock(data){
      foodS=data.val();
      foodObj.updateFoodStock(foodS)
   }

   function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}