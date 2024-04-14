class Boulder extends StickFigure {
     constructor(pos, color, ee) {

          let body = { dots: {}, sticks: [], movement: { x: 0, y: 0 } }
          super(body, "black", ee)
 
          this.velocity = 0;
          //this.activateDots()
     }

     setupBody(body) {
          this.centerX = 215;
          this.centerY = 535;
                    
          const vertices = [];
          const outerVertices = []

          const radius = 100;
          let numLines = 8;
          const numSegments = 2;

          this.intervalCount = 0
          
          this.state = "rollingUp";

          for (let j = 1; j <= numSegments; j++) {
               const segmentRadius = (radius * j) / numSegments;
               for (let i = 0; i < numLines; i++){
                    const angle = (Math.PI * 2 * i) / numLines;

                    const x = 0 + Math.cos(angle + 45) * segmentRadius;
                    const y = 0 + Math.sin(angle + 45) * segmentRadius;
               
                    vertices.push({ x: x, y: y, i: i, j: j })
                    this.addDot("boulder", x, y, "none", 7, false, "silver")

               }
          }

          for (let i = 0; i < vertices.length; i++) {
               for (let j = 0; j < vertices.length; j++) {
                    if (i !== j) {
                         if (Math.abs(vertices[i].i - vertices[j].i) <= 1) {
                              this.addStickIndex(i,j)
                         } else if (vertices[i].i === vertices[j].i) {
                              //this.addStickIndex(i,j)
                         }
                    }
                    if (vertices[j].i === numLines - 1 && vertices[i].i === 0) {
                         this.addStickIndex(i,j)
                    }
               }
          }

          this.addDot("boulder", 0, 0, "none", 7, false, "silver")
          for (let i = 0; i < vertices.length; i++) {
               if (vertices[i].j === 1) {
                    this.addStickIndex(i, this.dots.length - 1)
               }
          }
          this.addStickIndex(0, this.dots.length - 1)


          this.vertices = vertices

          for (let i = 0; i < this.dots.length; i++) {
               this.dots[i].pos.x += this.centerX;
               this.dots[i].pos.y += this.centerY

               this.dots[i].resetPos.x += this.centerX;
               this.dots[i].resetPos.y += this.centerY
          }

          
          ee.addEvent(1000, { actor: this, type: "startDot" })
          
     }

     
     updateShadows() {

          for (let i = 0; i < this.dots.length; i++) {
                   
               let rotationAngle = this.intervalCount;
               let rotatingPoint = new Vector(this.centerX + this.dots[i].pos.x, this.centerY + this.dots[i].pos.y);
               let fixedPosition = g_sunPos;

               // Calculate the rotated position of the rotating point
               const cosAngle = Math.cos(-rotationAngle);
               const sinAngle = Math.sin(-rotationAngle);

               const rotatedX = rotatingPoint.x * cosAngle - rotatingPoint.y * sinAngle;
               const rotatedY = rotatingPoint.x * sinAngle + rotatingPoint.y * cosAngle;

               // Calculate the direction vector to the fixed position, accounting for sunPos movement
               const direction = {
                    x: fixedPosition.x - (this.centerX + rotatedX),
                    y: fixedPosition.y - (this.centerY + rotatedY)
               };

               // Normalize the direction vector
               const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
               if (length !== 0) {
                    direction.x /= length;
                    direction.y /= length;
               }

               let distance = this.dots[i].pos.distance(g_sunPos)
               let shadowLength = Math.min(c_SHADOW_DISTANCE / distance, lineSize)

               
               this.dots[i].shadow.radius = shadowLength/4

               //console.log(distance)
               this.dots[i].shadow.pos.x = this.dots[i].pos.x - direction.x * shadowLength
               this.dots[i].shadow.pos.y = this.dots[i].pos.y - direction.y * shadowLength
               
               //this.shadowDots[i].pos.x = this.dots[i].pos.x - direction.x * 5;
               //this.shadowDots[i].pos.y = this.dots[i].pos.y - direction.y * 5;
                         
               //this.shadowDots[i].pos.x = this.dots[i].pos.x - direction.x * c_SHADOW_DISTANCE
               //this.shadowDots[i].pos.y = this.dots[i].pos.y - direction.y * c_SHADOW_DISTANCE
          }
     }
     
     

     update(ctx, endgame, color ) {
          //this.finished = done;
          this.isGameRunning = endgame;

          if (this.state !== "falling") {
               //customForEach(this.dots, (dot) => { dot.state = "idle" })
          
               ctx.save()
               ctx.translate(this.centerX, this.centerY);
          
               ctx.rotate(this.intervalCount);
                                 
               if (this.state === "rollingUp1") {
  
                    ctx.beginPath();
                    ctx.fillStyle = color || "black"
                    ctx.lineWidth = 0;

                    for (let i = 1; i < this.vertices.length; i++) {
                         if (this.vertices[i].j === 2) {
                              ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
                         }
                    }
                    //ctx.stroke();
                    ctx.closePath();
                    ctx.fill()
               }

               ctx.translate(-this.centerX, -this.centerY);

          }
          this.updateFigure(false)
          this.render(ctx)
          
          ctx.restore()
     }

     trigger(type) {
          //console.log(type)
          if (type === "step") {
               let Xmove = (0.9 / 2) * this.speed  / (humanSpeedBuffer)
               let Ymove = (-0.45 / 2) * this.speed   / (humanSpeedBuffer)
               let intervalIncrement = 0.01 * this.speed  
               
               //console.log(this.state, this.dots[0].pos.y)
               if (this.state === "rollingUp") {

                    customForEach(this.dots, (dot) => {
                         dot.activatedFraction = 1.0
                         dot.pos.x += Xmove;
                         dot.pos.y += Ymove;
                              //= new Vector(dot.pos.x + Xmove, dot.pos.y + Ymove);
                    })
                    this.centerX += Xmove
                    this.centerY += Ymove
                                   
                    this.intervalCount += intervalIncrement/2
               } else if (this.state === "rollingDown") {
                    this.velocity += 0.05
                    
                    customForEach(this.dots, (dot) => {
                      
                         dot.pos.x -= (0.9 / 2) * this.velocity
                         dot.pos.y -= (-0.45 / 2) * this.velocity
                              //= new Vector(dot.pos.x + Xmove, dot.pos.y + Ymove);
                    })

                    this.centerX -= (0.9 / 2) * this.velocity
                    this.centerY -= (-0.45 / 2) * this.velocity
                    //this.intervalCount -= intervalIncrement * this.velocity * 0.25
                    this.intervalCount -= (0.01 * 8) * this.velocity * 0.25

               }
                                   
               ee.addEvent(2, { actor: this, type: "step" })

          } else if(type === "fall"){
               this.state = "rollingDown"
          } else if (type === "startDot") {
               this.activateDots()
          }else if (type === "updateDots") {
               this.updateDots()
          }
     }
}

