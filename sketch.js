
var balloon,balloonImage1,balloonImage2;
var database 
var position
var edges
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");

  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(displayWidth-20,displayHeight-160);

  balloon=createSprite(330,820,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.8;

  edges=createEdgeSprites()
  

  var balloonpostion=database.ref('balloon/position');
  balloonpostion.on("value", readPosition, showError)
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  
  if(keyDown(LEFT_ARROW)){
     updatePosition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
     updatePosition(10,0)
  }
  else if(keyDown(UP_ARROW) && position.y>=60){
      updatePosition(0,-10)
      balloon.scale=balloon.scale-0.005
  }
  else if(keyDown(DOWN_ARROW) && position.y<=660){
      updatePosition(0,10)
      balloon.scale=balloon.scale+0.005
  }

  balloon.bounceOff(edges);

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function readPosition(data){
  console.log(data.val())
  position=data.val()
  balloon.x=position.x
  balloon.y=position.y
}

function updatePosition(x,y){
  //console.log(position)
  database.ref('balloon/position').update({
      x :position.x+x ,
      y :position.y+y
  })
}

function showError(){
  console.log("THERE IS AN ERROR")
}


  




