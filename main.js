// select canvas element
const canvas = document.getElementById("pong");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

// load sounds
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

// Ball object
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 4,
    velocityX : 3,
    velocityY : 3,
    speed : 3,
    color : "#D7A30F"
}

// User Paddle
const user = {
    x : -3, // left side of canvas
    y : (canvas.height - 200)/4, // -100 the height of paddle
    width : 10,
    height : 60,
    score : 0,
    color : "#DB0026"
}

// COM Paddle
const com = {
    x : canvas.width - 7, // - width of paddle
    y : (canvas.height - 0)/2, // -100 the height of paddle
    width : 10,
    height : 60,
    score : 0,
    color : "#004526"
}

// NET
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// listening to the mouse
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY/2 - rect.top - user.height/2;
}

// when COM or USER scores, we reset the ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 3;
}

// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// collision detection
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// update function, the function that does all calculations
function update(){
    
    // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
    if( ball.x - ball.radius < 0 ){
        com.score++;
        comScore.play();
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }
    
    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // computer plays for itself, and we must be able to beat it
    // simple AI
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;
    
    // when the ball collides with bottom and top walls we inverse the y velocity.
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
    }
    
    // we check if the paddle hit the user or the com paddle
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;
    
    // if the ball hits a paddle
    if(collision(ball,player)){
        // we check where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height/2));
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height/2);
        
        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint;
        
        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.1;
    }
}

// render function, the function that does al the drawing
function render(){
    
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#fff");
    
    // draw the net
    drawNet();
    
    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the COM's paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}
function game(){
    update();
    render();
}
// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);





// Slideshot Slips
const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

var iSlider = {
  slideIndex: null,
  prevSlideIndex: null,
  slides: null,
  defaultDuration: 2000,

  initSlides: function(){
    this.slides = document.getElementsByClassName("iSlide");
    for( var i = 0; i < this.slides.length; i++ ){
      this.slides[i].style.display = "none"; 
    }
    this.prevSlideIndex = null;
    this.slideIndex = -1;
  },

  showSlides: function(){
    if( this.prevSlideIndex != null )  this.slides[ this.prevSlideIndex ].style.display = "none";
    this.slideIndex = ( this.slideIndex + 1 + this.slides.length ) % this.slides.length;
    this.slides[ this.slideIndex ].style.display = "block";
    this.prevSlideIndex = this.slideIndex;
    var duration = +( this.slides[ this.slideIndex ].getAttribute('data-duration') || this.defaultDuration );
    setTimeout( this.showSlides.bind( this ), duration ); // Change image every 2 seconds
  }
};

iSlider.initSlides();
iSlider.showSlides();

//background comfort text

const comfort = document.querySelectorAll('#comfort path');

for(let i=0; i<comfort.length; i++){
  console.log(`Letter ${i} is ${comfort[i].getTotalLength()}`);
}

const style = document.querySelectorAll('#style path');

for(let i=0; i<style.length; i++){
  console.log(`Letter ${i} is ${style[i].getTotalLength()}`);
}

const tennisclub = document.querySelectorAll('#tennisclub path');

for(let i=0; i<tennisclub.length; i++){
  console.log(`Letter ${i} is ${tennisclub[i].getTotalLength()}`);
}

const inspired = document.querySelectorAll('#inspired path');

for(let i=0; i<inspired.length; i++){
  console.log(`Letter ${i} is ${inspired[i].getTotalLength()}`);
}

const modern = document.querySelectorAll('#modern path');

for(let i=0; i<modern.length; i++){
  console.log(`Letter ${i} is ${modern[i].getTotalLength()}`);
}

const slides = document.querySelectorAll('#slides path');

for(let i=0; i<slides.length; i++){
  console.log(`Letter ${i} is ${slides[i].getTotalLength()}`);
}

var $path = $('.comfort');
$path.waypoint(function (direction) {
  console.log(direction)
  if (direction == 'down') {
    $path.addClass('js-comfort-animate');
    console.log("Direction is down")
  } else {
    console.log("Direction is not down")
    $path.removeClass('js-comfort-animate');
  }
}, { offset: '50%' });
