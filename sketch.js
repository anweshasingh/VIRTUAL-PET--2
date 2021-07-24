var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("dog.png")
  dogimg2 = loadImage("dog1.png")
	//load images here
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
 // console.log(database);
 
  foodobject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition);
  
  feed = createButton("FEED DOG")
  feed.position(900,60)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(800,60)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}



function AddFood(){
position++
database.ref('/').update({
  'Food':position
})
}
function FeedDog(){

dog.addImage(dogimg2)
if(foodobject.getFoodStock()<= 0){
  foodobject.updateFoodStock(foodobject.getFoodStock()*0);
}else{
  foodobject.updateFoodStock(foodobject.getFoodStock()-1);
}

 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
