function renderCircle(ctx, x, y, radius, fillStyle) {
     ctx.beginPath();
     ctx.fillStyle = fillStyle
     if (blackOutlineTurnedOn) {
          ctx.strokeStyle = "black"
          ctx.lineWidth = 2
     } else {
          ctx.strokeStyle = fillStyle
     }
     //ctx.lineWidth = 0
     ctx.arc(x, y, radius, 0, Math.PI * 2);
     ctx.fill();
     ctx.stroke();
     ctx.closePath();
}

function renderChromaticAberrationCircle(ctx, x, y, radius, fillStyle) {
  const colorOffset = radius; // Adjust this value for the amount of chromatic aberration

  // Render the circle with red channel
  renderCircle(ctx, x - colorOffset, y, radius, `rgba(255, 0, 0, 0.7)`);
  
  // Render the circle with green channel
  renderCircle(ctx, x, y - colorOffset, radius, `rgba(0, 255, 0, 0.7)`);
  
  // Render the circle with blue channel
  renderCircle(ctx, x + colorOffset, y, radius, `rgba(0, 0, 255, 0.7)`);
  
  // Render the main circle
  renderCircle(ctx, x, y, radius, fillStyle);
}



function renderLine(ctx, x1, y1, x2, y2, lineWidth, color) {
     
     ctx.beginPath();
     ctx.strokeStyle = color || "black"
     ctx.lineWidth = lineWidth  || 0;
     
     ctx.moveTo(x1, y1);
     ctx.lineTo(x2, y2);
     ctx.stroke();
     ctx.closePath();

}

function renderLineFraction(ctx, x1,y1,x2,y2, t, lineWidth, color) {
     ctx.beginPath();
     ctx.strokeStyle = "pink" || "black"
     ctx.lineWidth = lineWidth || 0;
     ctx.lineCap = "round"

     let deltaX = (x2 - x1) * t
     let deltaY = (y2 - y1) * t 

     if (blackOutlineTurnedOn) {
          renderLine(ctx, x1, y1, x1 + deltaX, y1 + deltaY, lineWidth, "black")
          renderLine(ctx, x1, y1, x1 + deltaX, y1 + deltaY, lineWidth - 2, color)
     } else {
          renderLine(ctx, x1, y1, x1 + deltaX, y1 + deltaY, lineWidth, color)
     }
 
}