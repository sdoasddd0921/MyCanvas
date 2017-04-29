var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');

var radius = 10;
var dragging = false;

var minRad = 0.5,
    maxRad = 100,
    defaultRad = 20,
    interval = 5,
    radSpan = document.getElementById('radval'),
    decRad = document.getElementById('decrad'),
    incRad = document.getElementById('incrad');

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




/*radius.js*/
var setRadius = function(newRadius){
  if(newRadius<minRad)
    newRadius = minRad;
  else if(newRadius>maxRad)
    newRadius = maxRad;
  radius = newRadius;
  ctx.lineWidth = radius*2;

  radSpan.innerHTML = radius;
}


decRad.addEventListener('click', function(){
  setRadius(radius-interval);
});
incRad.addEventListener('click', function(){
  setRadius(radius==0.5?interval:radius+interval);
});

setRadius(defaultRad);

/* colors */
var colors = ['black', 'grey', 'white', 'red', 'orange',
              'yellow','green', 'blue', 'indigo', 'violet'];



for(var i=0, n=colors.length;i<n;i++) {
  var swatch = document.createElement('div');
  swatch.className = 'swatch';
  swatch.style.backgroundColor = colors[i];
  swatch.addEventListener('click', setSwatch);
  document.getElementById('colors').appendChild(swatch);
}

function setColor(color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  var active = document.getElementsByClassName('active')[0];
  if(active) {
    active.className = 'swatch';
  }
}

function setSwatch(e) {
  var swatch = e.target;
  setColor(swatch.style.backgroundColor);
  swatch.className += ' active';
}

setSwatch({target: document.getElementsByClassName('swatch')[0]});

/* save */
var saveButton = document.getElementById('save');

saveButton.addEventListener('click', saveImage)

function saveImage() {
  var data = canvas.toDataURL();

  

  // window.open(data, '_blank', 'location=0, menubar=0');
}
