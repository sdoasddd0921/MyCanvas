var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');

var radius = 10;
var dragging = false;

// document.body.clientWidth = window.innerWidth;
// document.body.clientHeight = window.innerHeight;

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = radius*2;

var putPoint = function(e){
  if(dragging){
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }
}

var engage = function(e){
  dragging=true;
  putPoint(e);
}

var disengage = function(){
  dragging=false;
  ctx.beginPath();
}

canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);