
let g_level = 1
class SummoningCircle extends Puppet{
     constructor(level, ee) {
          //console.log(level, ee)
          g_level = level
          let body = { dots: {}, sticks: [], movement: { x: 0, y: 0 } }
          super(body, "black", ee)
          this.color = "black"
          this.movementFraction = 0.12
          this.touchingNode = false;
          this.finishedTouching = false;
          this.circleRadius = 200

          this.level = level
          this.pulseIncrement = 0;
          this.circleColor = 0

          this.killMe = false;
          this.offCanvas = false;
          this.countdown = 60;
          this.youLost = false;
          this.hasGameStarted = true;

          this.summonBirds = false

          if (g_difficulty === "easy") {
               this.circleRadius = 30
          } else if (g_difficulty === "normal") {
               this.circleRadius = 20
          } else if (g_difficulty === "misery") {
               this.circleRadius = 10
          }
          //this.circleRadius = 200

     }

     setupBody(body) {
                    
          this.movementFraction = 0.12;

          const [centerX, centerY] = this.getNewVector();
          const vertices = [];

          const radius = 325;
          let numLines = 24;
          const numSegments = 1;

          for (let j = 1; j <= numSegments; j++) {
               const segmentRadius = (radius * j) / numSegments;

               for (let i = 0; i < numLines; i++){
                    const angle = (Math.PI * 2 * i) / numLines;

                    const x = centerX + Math.cos(angle + 45) * segmentRadius;
                    const y = centerY + Math.sin(angle + 45) * segmentRadius;
                    if (j % 2 !== 0) {
                         vertices.push({ x: x, y: y, i: i, j: j })
                         this.addNode("boulder", x, y, "none", 4 + j * 7, false, "red")
                         
                    }

               }
          }

          
          for (let i = 0; i < vertices.length; i++) {
               for (let j = 0; j < vertices.length; j++) {
                    if (i !== j) {
                         if (Math.abs(vertices[i].i - vertices[j].i) <= 1) {
                              this.addStickIndex(i,j,0)
                         } 
                    }
                    if (vertices[j].i === numLines - 1 && vertices[i].i === 0) {
                         this.addStickIndex(i,j, 0)
                    }
               }
          }
          
          if (g_level === 1) {
                this.addStickIndex(5, 21, 1)
               this.addStickIndex(21, 13, 2)
               this.addStickIndex(13, 5, 3)
               this.addStickIndex(5, 17, 4)

          }else if (g_level === 2) {
               this.addStickIndex(0, 14, 1)
               this.addStickIndex(14, 4, 2)
               this.addStickIndex(4, 18, 3)
               this.addStickIndex(18, 9, 4)
               this.addStickIndex(9, 0, 5)
          } else if (g_level === 3) {
               this.addStickIndex(6, 18, 1)
               this.addStickIndex(18, 2, 2)
               this.addStickIndex(2, 10, 3)
               this.addStickIndex(10, 22, 4)
               this.addStickIndex(22, 14, 5)
               this.addStickIndex(14, 6, 6)
          } else if (g_level === 4) {
               
               this.addStickIndex(1, 7, 1)
               this.addStickIndex(7, 13, 2)
               this.addStickIndex(13, 19, 3)
               this.addStickIndex(13, 1, 3)

               this.addStickIndex(19, 1, 4)
               this.addStickIndex(19, 7, 4)
               
               this.addStickIndex(4, 10, 1)
               this.addStickIndex(10, 16, 2)
               this.addStickIndex(16, 22, 3)
               this.addStickIndex(16, 4, 3)

               this.addStickIndex(22, 4, 4)
               this.addStickIndex(22, 4, 4)


          } else if (g_level === 5) {
               for (var i = 0; i < 23; i+=3){
                    for (var j = 0; j < 23; j += 3) {
                         if (i !== j) {
                              this.addStickIndex(i, j, i + j)
                         }
                    }
               }
          }else if (g_level === 6) {
               for (var i = 0; i < 23; i+=2){
                    for (var j = 0; j < 23; j += 2) {
                         if (i !== j) {
                              this.addStickIndex(i, j, i + j)
                         }
                    }
               }
          }else if (g_level === 7) {
               for (var i = 0; i < 23; i+=1){
                    for (var j = 0; j < 23; j += 1) {
                         if (i !== j) {
                              this.addStickIndex(i, j, i + j)
                         }
                    }
               }
          }

          this.vertices = vertices
          ee.addEvent(1000, { actor: this, type: "startDot" })
          ee.addEvent(1000, { actor: this, type: "step" })
          ee.addEvent(3000, { actor: this, type: "countdown" })
     }

     lineCircleOverlap(x1, y1, x2, y2, xc, yc, radius) {
          // Calculate the coefficients of the line equation (Ax + By + C = 0)
          let A = y2 - y1;
          let B = x1 - x2;
          let C = x2 * y1 - x1 * y2;

          // Calculate the distance from the circle's center to the line
          let distance = Math.abs(A * xc + B * yc + C) / Math.sqrt(A * A + B * B);

          // Check if the distance is greater than the radius
          if (distance > radius) {
               return false; // No overlap
          }

          // Calculate the projection of the circle's center onto the line (nearest point on infinite line)
          let t = ((xc - x1) * (x2 - x1) + (yc - y1) * (y2 - y1)) / ((x2 - x1) ** 2 + (y2 - y1) ** 2);
          let closestX = x1 + t * (x2 - x1);
          let closestY = y1 + t * (y2 - y1);

          // Ensure the closest point is within the bounds of the line segment
          closestX = Math.max(Math.min(closestX, Math.max(x1, x2)), Math.min(x1, x2));
          closestY = Math.max(Math.min(closestY, Math.max(y1, y2)), Math.min(y1, y2));

          // Recalculate the distance to this bounded closest point
          distance = Math.sqrt((xc - closestX) ** 2 + (yc - closestY) ** 2);

          // Check again if this bounded distance is within the radius
          return distance <= radius;
     }

     trigger(type) {
          //console.log(type)
          if (type === "step") {
               console.log()
               if(this.finishedTouching === true){return}
               let somethingTouched = false;
               //if (this.isGameRunning === true) {
               let allEdges = this.getAllEdges(false)
               allEdges.forEach(edge => {
                    let p1X = edge.head.pos.x;
                    let p1Y = edge.head.pos.y;
                    let p2X = edge.tail.pos.x;
                    let p2Y = edge.tail.pos.y;

                    if (this.lineCircleOverlap(p1X, p1Y, p2X, p2Y, g_posX, g_posY, this.circleRadius)) {
                                                  
                         somethingTouched = true;
                         let xDiff = p2X - p1X;
                          let yDiff = p2Y - p1Y;

                         
                         let thirtyPercentMark = new Vector(
                              p1X + 0.165 * (p2X - p1X), // X coordinate at the 30% mark
                              p1Y + 0.165 * (p2Y - p1Y)  // Y coordinate at the 30% mark
                         );
                         let distanceB = Math.sqrt((g_posX - thirtyPercentMark.x) ** 2 + (g_posY - thirtyPercentMark.y) ** 2)
                         if(distanceB < this.circleRadius){
                              edge.touchedBottom = true;
                         }

                         let centerLine = new Vector((p1X + p2X) / 2, (p1Y + p2Y) / 2)
                         let distance = Math.sqrt((g_posX - centerLine.x) ** 2 + (g_posY - centerLine.y) ** 2)
                         if(distance < this.circleRadius){
                              edge.touchedMiddle = true;
                         }

                         let sixtyPercentMark = new Vector(
                              p1X + 0.83 * (p2X - p1X), // X coordinate at the 30% mark
                              p1Y + 0.83 * (p2Y - p1Y)  // Y coordinate at the 30% mark
                         );
                         let topLine = new Vector(p2X, p2Y)
                         let distanceT = Math.sqrt((g_posX - sixtyPercentMark.x) ** 2 + (g_posY - sixtyPercentMark.y) ** 2)
                         if(distanceT < this.circleRadius){
                              edge.touchedTop = true;
                         }
                    }
               });
               this.nodes.forEach(node => {

                    let dist = Math.sqrt((node.pos.x - g_posX) * (node.pos.x - g_posX) +
                         (node.pos.y - g_posY) * (node.pos.y - g_posY));
                    if(dist < node.radius + this.circleRadius){
                         somethingTouched = true;
                         node.touched = true;
                    }
               })
               this.touchingNode = somethingTouched === true 
               if (somethingTouched === false) {
                    this.offCanvas = true;
                    //ee.addEvent(3000, { actor: this, type: "onCanvas" })

                    allEdges.forEach(edge => {
                         edge.touchedBottom = false;    
                         edge.touchedMiddle = false;
                         edge.touchedTop = false;
                         edge.color = "black"
                    })
                    this.nodes.forEach(node => {
                         node.touched = false
                         node.color = "black"
                    }) 
                              

               } else {
                    this.offCanvas = false
               }

               let allNodesTouched = true;
               allEdges.forEach(edge => {
                    if (edge.touchedBottom === false || edge.touchedMiddle === false || edge.touchedTop === false) {
                         allNodesTouched = false
                    }
               })
               this.nodes.forEach(node => { if (node.touched === false) { allNodesTouched = false } })


               if (allNodesTouched === true) {
                    if (this.finishedTouching === false) {
                         this.finishedTouching = true;
                                        
                         ee.addEvent(1000, { actor: this, type: "pulse" })
                                                  
                         ee.addEvent(1000, { actor: this, type: "summonBirds" })

                         ee.addEvent(4000, { actor: this, type: "transition" })

                    }
                    //allEdges.forEach(edge => { edge.hidden = true })
                    //this.nodes.forEach(node => {node.hidden = true})
               }

               ee.addEvent(2, { actor: this, type: "step" })
          } else if (type === "startDot") {
               this.activateDots()
          }else if (type === "updateDots") {
               this.updateDots()

          } else if (type === "countdown") {
               if (this.finishedTouching === false && this.killMe === false && this.youLost === false) {
                    if (this.hasGameStarted === true) {
                         this.countdown -= 1
                    }
                    if (this.countdown <= 0) {
                         this.countdown = 0
                         //this.youLost = true
                         this.nodes.forEach(node => {
                              node.gravityApplied = true
                         }) 
                                                  
                         ee.addEvent(3000, { actor: this, type: "lost" })

                    } else {
                         ee.addEvent(3000, { actor: this, type: "countdown" })
                    }
               }
          } else if (type === "lost") {
               this.youLost = true
          } else if (type === "pulse") {
                              
               this.pulseIncrement += 0.25
               this.circleColor+=3

               
               let allEdges = this.getAllEdges(false)
               let red = Math.floor(50 + Math.random() * 200)
               let color = "RGB(" + 255 + "," + this.circleColor + "," + this.circleColor + ")" 
               let size1 = 12 + Math.abs(Math.sin(this.pulseIncrement)) * 10
               let size2 = 12 + Math.abs(Math.sin(this.pulseIncrement)) * 10

               //console.log(color, this.circleColor)
               allEdges.forEach(edge => {
                    edge.fullyTouched = true;
                    edge.color = color;     
                    edge.lineWidth = size1
                    edge.fraction = Math.max(edge.fraction - 0.2, 0)
               })
               this.nodes.forEach(node => {
                    node.fullyTouched = true 
                    node.color = color
                    node.radius = size2
               }) 
               ee.addEvent(100, { actor: this, type: "pulse" })
          } else if (type === "transition") {
               this.killMe = true;
          } else if (type === "summonBirds") {
               this.summonBirds = true
          }
     }

     //vector that must be moved towards
     getNewVector() {
          return [
               CANVAS_WIDTH/2,
               CANVAS_HEIGHT/2 + 25,
          ]
     }
}