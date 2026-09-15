const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");


//bools and global variables
sheepCollision = false;
fCollision = false;
lamb1Collision = false;
lamb2Collision = false;
lamb3Collision = false;
lamb4Collision = false;
sheepMove =true;
farmerMove = true;
drawGame = true;
win = false;


var countSheep =0;
var countStray = 0;


//gets images from folder
let image = new Image();
image.src = "assets/img/garden.png"; //loads vegetable garden

let imageF = new Image();
imageF.src = "assets/img/farmer.png"; //loads the famrmer character

let imageW = new Image();
imageW.src = "assets/img/well.png";//loads farm

let imageS = new Image();
imageS.src = "assets/img/sheep.png";//loads the sheep

let imageH = new Image();
imageH.src = "assets/img/house.png";//loads the house 

let imageL = new Image();
imageL.src = "assets/img/lake.png";//gets the lake image

let imageT = new Image();
imageT.src = "assets/img/trees.png";//gets the lake image

let imaget = new Image();
imaget.src = "assets/img/tree.png";//gets the lake image

let imagef = new Image();
imagef.src = "assets/img/fence.png";//gets the lake image

//sounds
let spooky = new Audio('assets/media/spooky.mp3');
let baa = new Audio('assets/media/sheep.mp3');
// GameObject holds positional information
// Can be used to hold other information based on requirements


const scale = 1;
const fwidth = 32;
const fheight = 48;
const scaledWidth = scale * fwidth;
const scaledHeight = scale * fheight;
const swidth = 33;
const sheight = 33;
const sscaledWidth = scale * swidth;
const sscaledHeight = scale * sheight;
const walkLoop = [0, 1, 0, 2];
const frameLimit = 7;
let currentLoopIndex = 0;
let frameCount = 0;
let farmerDirection = 0;
let sheepDirection = 0;
let speed = 2;
let sheepSpeed = 1;
let lamb1Direction = 0;
let lamb2Direction = 0;
let lamb3Direction = 0;
let lamb4Direction = 0;
let timer = 3000;


function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.mvmtDirection = "None";

}


function drawSprites()
{
context.fillStyle
}
// draws garden at the position and size decalred
let garden = new GameObject(image, 0, 0, 115, 112);
 console.log("loaded garden ");

7// draws second garden at the position and size decalred
 let garden2 = new GameObject(image, 500, 200, 115, 112);
 console.log("loaded garden ");

 // draws farmer at the position and size decalred
 let farmer = new GameObject(imageF, 366, 200, 77, 75);
 console.log("loaded farmer ");

 // draws lake at the position and size decalred
let lake = new GameObject(imageL, 989, 0, 111, 312);
console.log("loaded farm ");

// draws sheep at the position and size decalred
let sheep = new GameObject(imageS, 500, 300, 128, 160);
console.log("loaded sheep");

// draws lambs 1-4 at the position and size decalred
let lamb1 = new GameObject(imageS,300,410, 128,160);
console.log("loaded lamb1");
let lamb2 = new GameObject(imageS,600,200, 128,160);
console.log("loaded lamb2");
let lamb3 = new GameObject(imageS,890,100, 128,160);
console.log("loaded lamb3");
let lamb4 = new GameObject(imageS,700,40, 128,160);
console.log("loaded lamb4");

// draws house at the position and size decalred
let house = new GameObject(imageH,177,0,201,205)
console.log("loaded house");
//loading tree pile
let trees = new GameObject(imageT,902,314,189,186);
console.log("loaded trees");

// draws well at the position and size decalred
let well = new GameObject(imageW,60,410,90,64);
console.log("loaded trees");
// draws tree 1-5 at the positions and size decalred
let tree1 = new GameObject(imaget,702,314,81,87);
console.log("loaded tree");
let tree2 = new GameObject(imaget,800,190,81,87);
console.log("loaded tree");
let tree3 = new GameObject(imaget,202,274,81,87);
console.log("loaded tree");
let tree4 = new GameObject(imaget,580,100,81,87);
console.log("loaded tree");
let tree5 = new GameObject(imaget,400,404,81,87);
console.log("loaded tree");

// draws fence at the position and size decalred
let fence1 = new GameObject(imagef,370,0,200,200);
console.log("loaded fence");




context.fillStyle = "BLACK";
context.fillRect(20, 20, 1100, 500);

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down, MouseClicks)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
let gamerInput = new GamerInput("None"); //No Input

function playSpooky(){

console.log("soundloaded");
spooky.play();

}
function playBaa()
{
console.log("baa loaded")
baa.play();

}
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    console.log(event);
    console.log("Event type: " + event.type);
    // console.log("Keycode: " + event.key);

    if (event.type === "keydown") {
        switch (event.key) {
            case "ArrowLeft": // Left Arrow
                gamerInput = new GamerInput("Left");
                break; //Left key
            case "ArrowUp": // Up Arrow
                gamerInput = new GamerInput("Up");
                break; //Up key
            case "ArrowRight": // left Arrow
                gamerInput = new GamerInput("Right");
                break; //Up key
            case "ArrowDown": // down Arrow
                gamerInput = new GamerInput("Down");
                break; //Up key
                  case "w": // Up Arrow
                gamerInput = new GamerInput("w");
                break; //Up key
            case "d": // left Arrow
                gamerInput = new GamerInput("d");
                break; //Up key
            case "s": // down Arrow
                gamerInput = new GamerInput("s");
                break; //Up key
                 case "a": // down Arrow
                gamerInput = new GamerInput("a");
                break; //Up key
             default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None");
    }
      
}

// Farmer Spritesheet atlas references
// row 0 down
// row 3 up
// row 1 left
// row 2 right

function update() {
sheepCollide();
lamb1Collide();
lamb2Collide();
lamb3Collide();
lamb4Collide();
farmerCollision();
strayed();
gameTimer();

    // console.log("Update");
       if (gamerInput.action === "Up") {
          //  console.log("Farmer Up");
            farmer.y -= speed; // Move Player Up
             farmerDirection = 3;
    } else if (gamerInput.action === "Down") {
           // console.log("Farmer Down");
             farmerDirection = 0;
            farmer.y += speed; // Move Player Down
    } else if (gamerInput.action === "Left") {
           // console.log("Farmer Left");
             farmerDirection = 1;
            farmer.x -= speed; // Move Player Left
    } else if (gamerInput.action === "Right") {
           // console.log("Farmer Right");
             farmerDirection = 2;
            farmer.x += speed; // Move Player Right
    }
    function gameTimer()
    {
        timer--;

    if (timer ==0)
        {
        endGame();
        win =false;
    console.log("game-over. You lose :(");
        }
    }
      
    
    // Spritesheet atlas references
    // row 0 down
    // row 2 up
    // row 1 left
    // row 1 right


// console.log("Update");
 

    //randomises sheeps direction every few seconds
if(sheep.ChangeTimer > 0)
{   sheep.ChangeTimer--;}
else{
  sheep.ChangeTimer = 30 + Math.floor(Math.random() * 60);
  sheep.direction = Math.floor(Math.random() * 4);
}
if (!sheepCollision)
{
       if (sheep.direction === 2) {
           sheep.y -= 1; // Move sheep Up 

    } else if (sheep.direction ===0) {
            sheep.y += 1; // Move sheep Down
            
   } else if (sheep.direction=== 3) {
            sheep.x -= 1; // Move sheep Left
                      
   } else if (sheep.direction === 1) {
            sheep.x += 1; // Move sheep Right      
   }
}
 

//randomises lambs direction every few seconds
if(lamb1.ChangeTimer > 0)
{   lamb1.ChangeTimer--;}
else{
  lamb1.ChangeTimer = 30 + Math.floor(Math.random() * 60);
  lamb1.direction = Math.floor(Math.random() * 4);
}
if (!lamb1Collision)
{
    if (lamb1.direction === 2) {
           lamb1.y -= 1; // Move lamb Up 

    } else if (lamb1.direction ===0) {
            lamb1.y += 1; // Move lamb Down
            
   } else if (lamb1.direction=== 3) {
            lamb1.x -= 1; // Move lamb Left
                      
   } else if (lamb1.direction === 1) {
            lamb1.x += 1; // Move lamb Right
            
   }
}

    //randomises lambs direction every few seconds
if(lamb1.ChangeTimer > 0)
{   lamb1.ChangeTimer--;}
else{
  lamb2.ChangeTimer = 30 + Math.floor(Math.random() * 60);
  lamb2.direction = Math.floor(Math.random() * 4);
}
if (!lamb2Collision)
{
       if (lamb2.direction === 2) {
           lamb2.y -= 1; // Move lamb Up 

    } else if (lamb2.direction ===0) {
            lamb2.y += 1; // Move lamb Down
            
   } else if (lamb2.direction=== 3) {
            lamb2.x -= 1; // Move lamb Left
                      
   } else if (lamb2.direction === 1) {
            lamb2.x += 1; // Move lamb Right 
   }
}

    //randomises lambs direction every few seconds
if(lamb3.ChangeTimer > 0)
{   lamb3.ChangeTimer--;}
else{
  lamb3.ChangeTimer = 30 + Math.floor(Math.random() * 60);
  lamb3.direction = Math.floor(Math.random() * 4);
}
if (!lamb3Collision)
{
       if (lamb3.direction === 2) {
           lamb3.y -= 1; // Move lamb Up 

    } else if (lamb3.direction ===0) {
            lamb3.y += 1; // Move lamb Down
            
   } else if (lamb3.direction=== 3) {
            lamb3.x -= 1; // Move lamb Left
                      
   } else if (lamb3.direction === 1) {
            lamb3.x += 1; // Move lamb Right      
   }
}

    //randomises lambs direction every few seconds
if(lamb4.ChangeTimer > 0)
{   lamb4.ChangeTimer--;}
else{
  lamb4.ChangeTimer = 30 + Math.floor(Math.random() * 60);
  lamb4.direction = Math.floor(Math.random() * 4);
}
if (!lamb4Collision)
{
       if (lamb4.direction === 2) {
           lamb4.y -= 1; // Move lamb Up 

    } else if (lamb4.direction ===0) {
            lamb4.y += 1; // Move lamb Down
            
   } else if (lamb4.direction=== 3) {
            lamb4.x -= 1; // Move lamb Left
                      
   } else if (lamb4.direction === 1) {
            lamb4.x += 1; // Move lamb Right     
   }
}
}
function endGame()
{
drawGame = false;
    console.log("game-over");

}

function sheepCollide()
{
  
if (farmer.y <= sheep.y + 40  && 
    sheep.y <= farmer.y + 48 && 
    farmer.x <= sheep.x + 32  &&
    sheep.x <= farmer.x + 32
)//collision detection between the sheep and farmer
{
    sheepCollision = true;
    countSheep  +=1;
    capturedSheep();
}
}
function capturedSheep()//Returns the sheep to inside the fence if they get captured
{
sheep.x = 450;
sheep.y = 75;
}
function displayMessages()
{
    if (drawGame == true)
    {
    //display message for amount of sheep caught
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Sheep Caught: " + countSheep , 700 , 50);

    //display message for amount of sheep gone of screen
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Sheep strayed: " + countStray , 700,  70);

        //display message for amount of sheep gone of screen
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Time Left: " + timer, 700 ,90);
    }
    else if (win == true)
{
    context.fillStyle = "white";
    context.font = "50px Arial";
    context.fillText("YOU WIN!! ", 400 , 200);
}
    else if (win == false)
        {   context.fillStyle = "white";
    context.font = "50px Arial";
    context.fillText("YOU LOST :( ", 400 , 150);

    context.fillStyle = "white";
    context.font = "50px Arial";
    context.fillText("Sheep Caught: " + countSheep , 400 , 50);
    }
}


function lamb1Collide()
{
  
if (farmer.y <= lamb1.y + 40  && 
    lamb1.y <= farmer.y + 48 && 
    farmer.x <= lamb1.x + 32  &&
    lamb1.x <= farmer.x + 32
)//collision detection between the sheep and farmer
{
    lamb1Collision = true;
    countSheep +=1;
    capturedLamb1();
}

} 

//end of update function

function capturedLamb1()//Returns the sheep to inside the fence if they get captured
{
lamb1.x = 410;
lamb1.y = 70;
}

function lamb2Collide()
{
  
if (farmer.y <= lamb2.y + 40  && 
    lamb2.y <= farmer.y + 48 && 
    farmer.x <= lamb2.x + 32  &&
    lamb2.x <= farmer.x + 32
)//collision detection between the sheep and farmer
{
    lamb2Collision = true;
    countSheep +=1;
    capturedLamb2();
}
}


function capturedLamb2()//Returns the sheep to inside the fence if they get captured
{
lamb2.x = 380;
lamb2.y = 60;
}

function lamb3Collide()
{
  
if (farmer.y <= lamb3.y + 40  && 
    lamb3.y <= farmer.y + 48 && 
    farmer.x <= lamb3.x + 32  &&
    lamb3.x <= farmer.x + 32
)//collision detection between the sheep and farmer
{
    lamb3Collision = true;
    countSheep +=1;
    capturedLamb3();
}

}

function capturedLamb3()//Returns the sheep to inside the fence if they get captured
{
lamb3.x = 430;
lamb3.y = 40;
}

function lamb4Collide()
{
  
if (farmer.y <= lamb4.y + 40  && 
    lamb4.y <= farmer.y + 48 && 
    farmer.x <= lamb4.x + 32  &&
    lamb4.x <= farmer.x + 32
)//collision detection between the sheep and farmer
{
    lamb4Collision = true;
    countSheep +=1;
    capturedLamb4();
}
}

function capturedLamb4()//Returns the sheep to inside the fence if they get captured
{
lamb4.x = 470;
lamb4.y = 60;
}

function strayed()
{
    offSheep = 0;   //count for when the sheep is off the screen
    offLamb1 = 0;
    offLamb2 = 0;
    offLamb3 = 0;
    offLamb4 = 0;

if (sheep.x <0 ||   //if sheep is not on screen then the offSheep count will go up
sheep.x >1100||
sheep.y <0||
sheep.y>500)
{ 
    offSheep = 1;
}

if (lamb1.x <0 ||    //if lamb1 is not on screen then the offLamb1 count will go up
lamb1.x >1100||
lamb1.y <0||
lamb1.y>500)
{
   offLamb1 = 1;
}

if (lamb2.x <0 ||    //if lamb2 is not on screen then the offLamb1 count will go up
lamb2.x >1100||
lamb2.y <0||
lamb2.y>500)
{
   offLamb2 = 1;
}

if (lamb3.x <0 ||    //if lamb3 is not on screen then the offLamb1 count will go up
lamb3.x >1100||
lamb3.y <0||
lamb3.y>500)
{
   offLamb3 = 1;
}

if (lamb4.x <0 ||    //if lamb4 is not on screen then the offLamb1 count will go up
lamb4.x >1100||
lamb4.y <0||
lamb4.y>500)
{
   offLamb4 = 1;
}
countStray = offSheep + offLamb1 + offLamb2 + offLamb3 + offLamb4;  //gets the count for sheep off the screen 
if (countSheep ==5)
{
    endGame();
    win = true;
    console.log("game-over. You win :)");
}

}


function farmerCollision()  //gets the collisions for the farmer
{
if (farmer.y +48 > 0 &&     //Fence collision
    farmer.y < 195 &&
    farmer.x +32 > 365   &&
    570 > farmer.x
)
{
    resetFarmer();
}

if (farmer.y <= 0 &&         //Bounds collision
    farmer.y +48 <= 499 &&
    farmer.x +32 >= 1100   &&
    0 <= farmer.x
)
{
     resetFarmer();
}
}   //end of farmer collision


function resetFarmer()      //Resets farmers position (random)
{
    farmer.y = Math.floor(Math.random() * 500);
    farmer.x = Math.floor(Math.random() * 1100);
}

//ANIMATES SPRITES MOVING
function drawFrame(image, frameX, frameY, canvasX, canvasY) {
    if( drawGame == true)
    {
    context.drawImage(image,
                  frameX * fwidth, frameY * fheight, fwidth, fheight,
                  canvasX, canvasY, scaledWidth, scaledHeight); //gets the different frames for the farmer
    }
}

function drawSheep(imageS, frameX, frameY, canvasX, canvasY) {
    if( drawGame == true)
    {
    context.drawImage(imageS,
                  frameX * swidth, frameY * sheight, swidth, sheight,
                  canvasX, canvasY, sscaledWidth, sscaledHeight);//gets the different frames for the sheep
    }
}
function drawLamb1(imageS, frameX, frameY, canvasX, canvasY)
{
    if( drawGame == true)
    {
    context.drawImage(imageS,
                    frameX * swidth, frameY * sheight, swidth, sheight,
                  canvasX, canvasY, sscaledWidth, sscaledHeight);//gets the different frames for the lambs
    }
}
function drawLamb2(imageS, frameX, frameY, canvasX, canvasY)
{
    if( drawGame == true)
    {
    context.drawImage(imageS,
                    frameX * swidth, frameY * sheight, swidth, sheight,
                  canvasX, canvasY, sscaledWidth, sscaledHeight);//gets the different frames for the lambs
    }
}
function drawLamb3(imageS, frameX, frameY, canvasX, canvasY)
{
    if( drawGame == true)
    {
    context.drawImage(imageS,
                    frameX * swidth, frameY * sheight, swidth, sheight,
                  canvasX, canvasY, sscaledWidth, sscaledHeight);//gets the different frames for the lambs
    }
}
function drawLamb4(imageS, frameX, frameY, canvasX, canvasY)
{
    if( drawGame == true)
    {
    context.drawImage(imageS,
                    frameX * swidth, frameY * sheight, swidth, sheight,
                  canvasX, canvasY, sscaledWidth, sscaledHeight);//gets the different frames for the lambs
    }
}
//GETS THE DIFFERENT FRAMES FOR THE SPRITES
function animate() {
    if (gamerInput.action != "None"){
        frameCount++;
        if (frameCount >= frameLimit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= walkLoop.length) {
                currentLoopIndex = 0;
            }//actually amimates the different frames for the moving sprites
        }      
    }
    else{
        currentLoopIndex = 0;
    }


    drawFrame(farmer.spritesheet, walkLoop[currentLoopIndex], farmerDirection, farmer.x, farmer.y);//coordinates the directions with the sprite direction 
    drawSheep(sheep.spritesheet, walkLoop[currentLoopIndex], sheepDirection, sheep.x, sheep.y);    // and also draws the sprite in its new position
    drawLamb1(lamb1.spritesheet, walkLoop[currentLoopIndex], lamb1Direction, lamb1.x, lamb1.y);
    drawLamb2(lamb2.spritesheet, walkLoop[currentLoopIndex], lamb2Direction, lamb2.x, lamb2.y);
    drawLamb3(lamb3.spritesheet, walkLoop[currentLoopIndex], lamb3Direction, lamb3.x, lamb3.y);
    drawLamb4(lamb4.spritesheet, walkLoop[currentLoopIndex], lamb4Direction, lamb4.x, lamb4.y);
}

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down, MouseClicks)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}


// Default GamerInput is set to None
let newInput = new GamerInput("none"); //No Input

function draw() {
    
    // Clear Canvas
context.clearRect(0,0,canvas.width,canvas.height);
    //console.log("Draw");
    //console.log(player);

if (drawGame ==true)

{    //draw lake
context.drawImage(lake.spritesheet, 
                      lake.x,
                      lake.y,
                      lake.width,
                      lake.height);
//draw gardens 1-2
context.drawImage(garden.spritesheet, 
                      garden.x,
                      garden.y,
                      garden.width,
                      garden.height);
context.drawImage(garden2.spritesheet, 
                      garden2.x,
                      garden2.y,
                      garden2.width,
                      garden2.height);

//draw trees sprite
context.drawImage(trees.spritesheet, 
                      trees.x,
                      trees.y,
                      trees.width,
                      trees.height);

//draw well sprite
context.drawImage(well.spritesheet, 
                      well.x,
                      well.y,
                      well.width,
                      well.height);

//draw house sprite
context.drawImage(house.spritesheet, 
                      house.x,
                      house.y,
                      house.width,
                      house.height);
                
//drawing trees sprites 1-5
context.drawImage(tree1.spritesheet, 
                      tree1.x,
                      tree1.y,
                      tree1.width,
                      tree1.height);
context.drawImage(tree2.spritesheet, 
                      tree2.x,
                      tree2.y,
                      tree2.width,
                      tree2.height);
                      
context.drawImage(tree3.spritesheet, 
                      tree3.x,
                      tree3.y,
                      tree3.width,
                      tree3.height);
context.drawImage(tree4.spritesheet, 
                      tree4.x,
                      tree4.y,
                      tree4.width,
                      tree4.height);
context.drawImage(tree5.spritesheet, 
                      tree5.x,
                      tree5.y,
                      tree5.width,
                      tree5.height);

 //draw fence sprite                     
context.drawImage(fence1.spritesheet, 
                      fence1.x,
                      fence1.y,
                      fence1.width,
                      fence1.height);
    }
 }



function gameloop() {
    update(); //updates the canvas
    draw(); //draws the sprites on the screen
    animate();  //animates the sheep, lambs and farmer walking
    displayMessages(); //displays captured count and strayed count

    //drawSprites();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);