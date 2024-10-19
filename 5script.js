// A.5 draw spriograph
// used https://www.w3schools.com/html/html5_canvas.asp

var t = 0; // angle in radians
var prevX = null;
var prevY = null;
var animationId; // animation id frame

// start
function startSpiro() {
  // values from user input
  let R = parseFloat(document.getElementById("R").value);
  let r = parseFloat(document.getElementById("r").value);
  let O = parseFloat(document.getElementById("O").value);

  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height); // clear
  ctx.strokeStyle = "blue"; // color
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(c.width / 2, c.height / 2);

  prevX = null;
  prevY = null;
  t = 0;

  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  // drawing animation
  drawSpiro(ctx, R, r, O);
}

// function to animate
function drawSpiro(ctx, R, r, O) {
  // spirograph equations
  var x = (R + r) * Math.cos(t) - (r + O) * Math.cos(((R + r) / r) * t);
  var y = (R + r) * Math.sin(t) - (r + O) * Math.sin(((R + r) / r) * t);

  if (prevX !== null && prevY !== null) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  prevX = x;
  prevY = y;

  // line thickness
  t += 0.01;

  // animate continues until it is complete
  if (t < 20) {
    animationId = requestAnimationFrame(function () {
      drawSpiro(ctx, R, r, O);
    });
  } else {
    cancelAnimationFrame(animationId); // stop animation
  }
}
