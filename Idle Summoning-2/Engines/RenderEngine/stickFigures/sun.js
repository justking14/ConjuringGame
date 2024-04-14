
class Sun extends StickFigure{
     constructor(progressCounter, ee) {
          let body = { dots: {}, sticks: [], movement: { x: 0, y: 0 } }
          super(body, color_sun, ee)
          this.color = color_sun
          this.movementFraction = 0.12
     }

     setupBody(body) {
                    
          this.movementFraction = 0.12;

          const [centerX, centerY] = this.getNewVector();
          console.log(centerX, centerY)
          const vertices = [];

          const radius = 50;
          let numLines = 10;
          const numSegments = 3;

          for (let j = 1; j <= numSegments; j++) {
               const segmentRadius = (radius * j) / numSegments;

               for (let i = 0; i < numLines; i++){
                    const angle = (Math.PI * 2 * i) / numLines;

                    const x = centerX + Math.cos(angle + 45) * segmentRadius;
                    const y = centerY + Math.sin(angle + 45) * segmentRadius;
                    if (j % 2 !== 0) {
                         vertices.push({ x: x, y: y, i: i, j: j })
                         this.addDot("boulder", x, y, "none", 4 + j * 2, false, color_sun)
                    }

               }
          }

          
          for (let i = 0; i < vertices.length; i++) {
               for (let j = 0; j < vertices.length; j++) {
                    if (i !== j) {
                         if (Math.abs(vertices[i].i - vertices[j].i) <= 1) {
                              this.addStickIndex(i,j)
                         } 
                    }
                    if (vertices[j].i === numLines - 1 && vertices[i].i === 0) {
                         this.addStickIndex(i,j)
                    }
               }
          }

          this.addDot("sun", centerX, centerY, "none", 7, false, color_sun)
          for (let i = 0; i < vertices.length; i++) {
               if (vertices[i].j === 1) {
                    this.addStickIndex(i, this.dots.length - 1)
               }
          }
          this.addStickIndex(0, this.dots.length - 1)

          
          this.vertices = vertices
          ee.addEvent(1000, { actor: this, type: "startDot" })
          
     }
     
     render(ctx) {
          let color = this.color;
          //render shadows, not for shadow
          this.sticks.forEach(function (stick) { stick.shadow.render(ctx, "Black") })
          this.dots.forEach(function (dot) {dot.shadow.render(ctx, "Black") })
               
          ctx.fillStyle = color
          this.sticks.forEach(function (stick) { stick.render(ctx, color) })
          this.dots.forEach(function (dot) {dot.render(ctx, color) })
     }


     trigger(type) {
          if (type === "step") {
               if (this.isGameRunning === true) {
                    let Ymove = 0.1

                    //this.centerY += Ymove * this.speed / 50
               
                    let [oldX, oldY] = this.getNewVector()

                    //link to player position
                    //console.log(this.movementFraction, g_playerProgressFaction)
                    if (this.movementFraction - 0.5 <= g_playerProgressFaction) {
                         const difference = this.movementFraction - (g_playerProgressFaction + 0.35);
                         const increment = difference/150; // You can adjust the multiplier as needed
                         this.movementFraction -= increment ;
                    }
               
                    let [newX, newY] = this.getNewVector()
                    //g_sunPos = new Vector(newX, newY)
                    g_sunPos = new Vector(this.dots[0].pos.x, this.dots[0].pos.y)
                    customForEach(this.dots, (dot) => {
                         dot.activated = true;
                         dot.pos.x += (newX - oldX) 
                         dot.pos.y += (newY - oldY) 
                    })
               }
               ee.addEvent(2, { actor: this, type: "step" })
          } else if (type === "startDot") {
               this.activateDots()
          }else if (type === "updateDots") {
               this.updateDots()
          }
     }

     //vector that must be moved towards
     getNewVector() {
          return [
               lerp(0, 10, this.movementFraction) * 100,
               lerp(0, (Math.sin(this.movementFraction * 10 / 2) * -100) + 230, this.movementFraction)
          ]
     }
}