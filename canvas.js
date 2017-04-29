var canvas = document.getElementById('canvas');
var ctx    = canvas.getContext('2d');

var radius = 10;
var dragging = false;

var minRad = 0.5,
    maxRad = 100,
    defaultRad = 20,
    interval = 5,
    radSpan = document.getElementById('radval'),
    decRad  = document.getElementById('decrad'),
    incRad  = document.getElementById('incrad'),
    clear   = document.getElementById('clear');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = radius*2;

window.onresize = function(){
  var image = ctx.getImageData(0,0,canvas.width,canvas.height);
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.putImageData(image,0,0);

  ctx.lineWidth = radius*2;
  ctx.fillStyle = defaultColor;
  ctx.strokeStyle = defaultColor;
}

function clearCanvas(){
  canvas.width = canvas.width;

  ctx.lineWidth = radius*2;
  ctx.fillStyle = defaultColor;
  ctx.strokeStyle = defaultColor;
}

function putPoint(e){
  if(dragging){
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
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

/*radius*/
var setRadius = function(newRadius){
  if(newRadius<minRad)
    newRadius = minRad;
  else if(newRadius>maxRad)
    newRadius = maxRad;
  radius = newRadius;
  ctx.lineWidth = radius*2;

  radSpan.innerHTML = radius;
}

clear.addEventListener('click', clearCanvas);

decRad.addEventListener('click', function(){
  setRadius(radius-interval);
});

incRad.addEventListener('click', function(){
  setRadius(radius==0.5?interval:radius+interval);
});

setRadius(defaultRad);

/* colors */
var defaultColor = '#000';
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
  defaultColor = color;
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

  var downloadButton = document.getElementById('download');

  // window.open(data, '_blank', 'location=0, menubar=0');
  downloadFile(downloadButton, getdate(), data);
}

function getdate() {
  var now = new Date(),
      y = now.getFullYear(),
      M = now.getMonth() + 1,
      d = now.getDate(),
      h = now.getHours(),
      m = now.getMinutes(),
      s = now.getSeconds();
  return y + (M < 10 ? "0" + M : M) + (d < 10 ? "0" + d : d) +
             (h < 10 ? "0" + h : h) + (m < 10 ? "0" + m : m) +
             (s < 10 ? "0" + s : s);
}

function downloadFile(aLink, fileName, content){
    aLink.download = fileName;
    aLink.href = content;
}
