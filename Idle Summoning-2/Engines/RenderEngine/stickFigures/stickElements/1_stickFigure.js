class StickFigure {
     constructor(body, color) {
          this.dots = []
          this.sticks = []

          this.physicIterations = 50;//16
          this.color = color

          this.speed = 1;
          this.states = ["idle", "falling", "merging", "crossedThreshold", "endgame"]
          this.state = "idle"

          this.stickIndex = 0

          this.altitude = 0;

          this.isGameRunning = true;
          this.started = false;
          this.putToRest = false;
          
          //set dots and sticks and move them as needed
          if (Object.keys(body).length !== 0) {
               this.setupBody(body)
               this.moveElements(body["movement"]["x"], body["movement"]["y"])
               this.resetPositions()
          }
                    
          ee.addEvent(100, { actor: this, type: "updateDots" })

          //ee.addEvent(200, { actor: this, type: "step" })
     }

     updateSpeed(speed, altitude, resetScore) {
          let scale = 1 //- Math.pow((altitude / 333), 2);
          this.speed = (scale * speed * resetScore)
     }

     setupBody(body) {
          //console.log(body)
          for (const [key, obj] of Object.entries(body.dots)) {
               this.addDot(key, obj.x, obj.y, obj.type,
                    obj.radius || dotSize, obj.locked, obj.color || this.color);
          }

          for (const [p1, p2, length] of body.sticks) {
               //console.log(length)
               this.addStick(p1, p2, length);
          }
          ee.addEvent(1000, { actor: this, type: "startDot" })    
     }

     activateDots() {
          //up the alphas 
          if (this.dots[0]) {

               this.dots[this.dots.length - 1].activated = true
               this.dots[this.dots.length - 1].shadow.activated = true
  
               if (this.started === false) {
                    this.started = true;
               }
               
          } else {
               console.error(" no dots ", this)
          }
     }
     updateDots() {
          //update alphas for activated dots
          if (this.isGameRunning) {
               if (this.adjustSticks(c_spreadSticks, true) === false) {
                    ee.addEvent(50, { actor: this, type: "updateDots" })
               }
          }
          
          
     }

     resetPositions() {
          customForEach(this.dots, (dot) => {
               dot.resetPos = new Vector(dot.pos.x, dot.pos.y);
          })
     }

     moveElements(x, y) {
          customForEach(this.dots, (dot) => {
               dot.pos.add(x, y)
               dot.startPos.add(x, y)

               dot.shadow.pos.add(x, y)
               dot.shadow.startPos.add(x, y)
          })
     }

     getDot(name) { return this.dots.find((element) => element.name === name); }
     getShadowDot(name) {
          return this.dots.find((element) => element.name === name).shadow;
     }


     addDot(name, x, y, type, radius, locked, color) {
          this.dots.push(
               new dotManager(name, x, y, type, radius, locked, color)
          )
     }
     addStick(p1, p2, index = 0) {
          let dist = this.getDot(p1).pos.distance(this.getDot(p2).pos)
          //console.log(dist)
          this.sticks.push(
               new Stick(this.getDot(p1), this.getDot(p2), false, index )
          );

     }
     addStickIndex(p1, p2, index = 0) {
          this.sticks.push(
               new Stick(this.dots[p1], this.dots[p2], false, index)
          );
     }

     setColor(color) {
          this.color = color
          customForEach(this.dots, (dot) => { dot.color = color })
     }
     
     updateShadows() {
          //shadows must always be near their partner dot
          for (let i = 0; i < this.dots.length; i++) {
               let shadow = this.dots[i].shadow
               if (shadow) {
                    let direction = Vector.getNormalizedDirection(this.dots[i].pos, g_sunPos)

                    let distance = this.dots[i].pos.distance(g_sunPos)
                    let shadowLength = Math.min(c_SHADOW_DISTANCE / distance, lineSize)

                    shadow.radius = shadowLength / 4

                    shadow.pos.x = this.dots[i].pos.x - direction.x * shadowLength
                    shadow.pos.y = this.dots[i].pos.y - direction.y * shadowLength
               }
          }
     }

     updateFigure(endgame) {
          //update dots
          customForEach(this.dots, (dot) => {
               dot.update()
               dot.shadow.update()
          })

          for (let j = 0; j < this.physicIterations; j++) {
               //update sticks repeatedly
               customForEach(this.sticks, (stick) => {
                    stick.update()
                    stick.shadow.update()
               })
          }
          this.updateShadows()
     }
     render(ctx) {
          let color = this.color;
          //render shadows
          if (this.state === "idle" || this.state === "rollingUp") {
               customForEach(this.sticks, (stick) => { stick.shadow.render(ctx, "Black") })
               customForEach(this.dots, (dot) => { dot.shadow.render(ctx, "Black") })
          }
          
          customForEach(this.sticks, (stick) => { stick.render(ctx, color) })
          customForEach(this.dots, (dot) => { dot.render(ctx, color) })

     }

     update(ctx, endgame) {
          this.isGameRunning = endgame;

          this.updateFigure(endgame)
          this.render(ctx)
     }

     transition(newState) {
          customForEach(this.dots, (dot) => {
               dot.transition(newState)
               dot.shadow.transition(newState)
          })
     }

     adjustSticks(change) {
          let min = 10;///check to see if it has fully consumed the object

          customForEach(this.dots.filter((dot) => dot.activated), (dot) => {
               dot.activatedFraction = clamp(dot.activatedFraction + change, 0, 1)
          })
          if (change > 0) {
               //start of game
               customForEach(this.dots.filter((dot) => dot.activated), (dot) => {
                    dot.shadow.activatedFraction = clamp(dot.shadow.activatedFraction + (change * 0.75), 0, 1)
               })
          } else {
               //while falling               
               customForEach(this.dots.filter((dot) => dot.activated), (dot) => {
                    dot.shadow.activatedFraction = clamp(dot.shadow.activatedFraction + (change * 1.25), 0, 1)
               })
          }
          customForEach(this.dots.filter((dot) => dot), (dot) => {
               min = Math.min(min, dot.shadow.activatedFraction)
          })
          return min >= 1 && min !== 10
     }

     trigger(type) {
          if(this.putToRest){return}
          if (type === "updateDots") {
               //update alphas for activated dots
               this.updateDots()
          } else if (type === "startDot") {
               this.activateDots()
          }
     }

     destroy() {

          
          this.dots.forEach(dot => {
                    ee.removeEvents(dot.shadow)
                    dot.shadow.destroy()
                    ee.removeEvents(dot)
                    dot.destroy()
               }
          );
          this.sticks.forEach(dot => {
                    ee.removeEvents(dot.shadow)
                    dot.shadow.destroy()

                    ee.removeEvents(dot)
                    dot.destroy()
               }
          );
          
          ee.removeEvents(this)

          // Clear arrays
          this.dots = [];
          this.sticks = [];
     }
}
