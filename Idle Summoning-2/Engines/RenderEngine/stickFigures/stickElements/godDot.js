/*
This code
contains name, pos, associated sticks
things should spread out like a breadthfirst search
*/

class Node{
     constructor(name, posX, posY, type, radius, locked, color, isShadow) {
          this.name = name;
          this.type = type

          this.pos = new Vector(posX, posY)
          this.radius = radius;
          this.locked = locked || false;
          this.hidden = false
          this.activated = false
          this.color = color || "black"

          this.edges = [];

          this.isShadow = isShadow 
          if (this.isShadow === false) {
               this.shadow = new Node(name, posX, posY, type, radius, locked, "Black", true)
          }
     }
     
     attachEdge(tail, ) {
          
     }

     update() {
     }

     render(ctx, color) {
          if (this.hidden) { return }
          renderCircle(ctx, this.pos.x, this.pos.y, this.radius, this.color || color)
     }
}

class Edge{
     constructor(head, tail, lineWidth, isShadow, index) {
          this.head = head;
          this.tail = tail;
          this.lineWidth = lineWidth
          this.isShadow = isShadow;
          this.index = index;

          this.fraction = 0;
     }

     update() {    
     }

     render(ctx, color, fraction) {
          renderLineFraction(ctx,
               this.head.pos.x, this.head.pos.y, this.tail.pos.x, this.tail.pos.y,
               this.fraction, this.lineWidth, color
          )
     }
}

class Puppet{
     constructor(body, color) {
          this.nodes = []
          this.setupBody(body)

          this.currentStickIndex = 0;
          this.edgeIndex = 0;

          ee.addEvent(100, { actor: this, type: "updateDots" })
     }

     update() { }
     render(){}
     
     setupBody(body) {
          for (const [key, obj] of Object.entries(body.dots)) {
               this.addNode(key, obj.x, obj.y, obj.type,
                    obj.radius || dotSize, obj.locked, obj.color || this.color);
          }
          
          //add edges to individual nodes
          for (const [p1, p2, index, length] of body.sticks) {
               let head = this.getDot(p1)
               head.attachEdge(this.getDot(p2), false, index || 0)
          }
          ee.addEvent(1000, { actor: this, type: "startDot" })    
     }

     addNode(name, x, y, type, radius, locked, color) {
          this.nodes.push(
               new Node(name, x, y, type, radius, locked, color, false)
          )
     }

     addStickIndex(p1, p2, index, length) {
          this.nodes[p1].edges.push(
               new Edge(this.nodes[p1], this.nodes[p2], 10, false, index)
          )
     }

     getDot(name) { return this.nodes.find((element) => element.name === name); }

     activateDots() {
          //up the alphas 
          if (this.nodes[0]) {

               this.nodes[this.nodes.length - 1].activated = true
               this.nodes[this.nodes.length - 1].shadow.activated = true
  
               if (this.started === false) {
                    this.started = true;
               }
               
          } else {
               console.error(" no dots ", this)
          }
     }
     updateDots() {
          console.log(" update dots ")
          //update alphas for activated dots
          if (this.isGameRunning) {
               if (this.adjustSticks(c_spreadSticks, true) === false) {
                    ee.addEvent(50, { actor: this, type: "updateDots" })
               }
          }
     }


     adjustSticks(change) {
          let min = 10;///check to see if it has fully consumed the object

          let allEdgesExplored = true;
          customForEach(this.nodes, (dot) => {
               customForEach(dot.edges, (edge) => {
                    if (edge.index === this.edgeIndex && edge.fraction < 1.0) {
                         allEdgesExplored = false
                    }
               })
          })
          if(allEdgesExplored === true){this.edgeIndex+=1}

          customForEach(this.nodes.filter((dot) => dot.activated), (dot) => {
               dot.activatedFraction = clamp(dot.activatedFraction + change, 0, 1)

               customForEach(dot.edges, (edge) => {
                    if (edge.index !== this.edgeIndex) {
                    } else {
                         edge.fraction += 0.35
                         if (edge.fraction >= 1.0) {
                              edge.fraction = 1.0
                              edge.tail.activated = true;
                         }
                    }
               })
          })

          if (change > 0) {
               //start of game
               customForEach(this.nodes.filter((dot) => dot.activated), (dot) => {
                    dot.shadow.activatedFraction = clamp(dot.shadow.activatedFraction + (change * 0.75), 0, 1)
               })
          } else {
               //while falling               
               customForEach(this.nodes.filter((dot) => dot.activated), (dot) => {
                    dot.shadow.activatedFraction = clamp(dot.shadow.activatedFraction + (change * 1.25), 0, 1)
               })
          }
          customForEach(this.nodes.filter((dot) => dot), (dot) => {
               min = Math.min(min, dot.shadow.activatedFraction)
          })
          return false; //min >= 1 && min !== 10
     }

     updateFigure() {
          //update dots
          customForEach(this.nodes, (dot) => {
               dot.update()
               dot.shadow.update()
          })

          for (let j = 0; j < this.physicIterations; j++) {
               //update sticks repeatedly
               customForEach(this.edges, (stick) => {
                    stick.update()
                    stick.shadow.update()
               })
          }
          //this.updateShadows()
     }
     
     render(ctx) {
          let color = this.color;
          //render shadows
          if (this.state === "idle" || this.state === "rollingUp") {
               //customForEach(this.sticks, (stick) => { stick.shadow.render(ctx, "Black") })
               customForEach(this.dots, (dot) => { dot.shadow.render(ctx, "Black") })
          }
          
          //customForEach(this.sticks, (stick) => { stick.render(ctx, color) })
          customForEach(this.dots, (dot) => { dot.render(ctx, color) })

     }

     update(ctx, endgame) {
          this.isGameRunning = endgame;

          this.updateFigure(endgame)
          this.render(ctx)
     }
}