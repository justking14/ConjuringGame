
class Puppet{
     constructor(body, color) {
          this.nodes = []
          this.setupBody(body)

          this.currentStickIndex = 0;
          this.edgeIndex = 0;

          ee.addEvent(100, { actor: this, type: "updateDots" })
     }

     setupBody(body) {
          for (const [key, obj] of Object.entries(body.dots)) {
               this.addNode(key, obj.x, obj.y, obj.type,
                    obj.radius || dotSize, obj.locked, obj.color || this.color);
          }
          
          //add edges to individual nodes
          for (const [p1, p2, index, lineWidth] of body.sticks) {
               let head = this.getDot(p1)
               head.attachEdge(this.getDot(p2), index, lineWidth)
          }
          ee.addEvent(1000, { actor: this, type: "startDot" })    
     }

     addNode(name, x, y, type, radius, locked, color) {
          this.nodes.push(
               new Node(name, x, y, type, radius, locked, color, false)
          )
     }

     addStickIndex(head, tail, index, lineWidth) {
          this.nodes[head].attachEdge(this.nodes[tail], index, lineWidth, false)
     }

     getDot(name) { return this.nodes.find((element) => element.name === name); }

     activateDots() {
          if (this.nodes[0]) {
               this.nodes[this.nodes.length - 1].activated = true
               this.nodes[this.nodes.length - 1].shadow.activated = true
  
               if (this.started === false) { this.started = true; }
          } else {
               console.error(" no dots ", this)
          }
     }

     updateDots() {
          //update alphas for activated dots
          //if (this.isGameRunning) {
               if (this.adjustSticks(c_spreadSticks, true) === false) {
                    ee.addEvent(50, { actor: this, type: "updateDots" })
               }
          //}
     }

     getAllEdges(isShadow = false) {
          let allEdges = []
          if (isShadow === false) {
               this.nodes.forEach(node => { allEdges = allEdges.concat(node.edges); });
          } else {
               this.nodes.forEach(node => { allEdges = allEdges.concat(node.shadow.edges); });
          }
          return allEdges
     }

     adjustSticks(change) {
          let allEdgesExplored = true;
               
          let allEdges = this.getAllEdges()
          const activatedNodes = this.nodes.filter(dot => dot.activated)

          allEdges.forEach(edge => {
               if (edge.index === this.edgeIndex) {
                    if (activatedNodes.includes(edge.head)) {
                         edge.fraction = Math.min(1.0, edge.fraction + 0.35);
                         edge.tail.activated = edge.fraction = 1.0;
                    }
               
                    if (edge.fraction < 1.0) {
                         allEdgesExplored = false;
                    }
               }
          })
          if (allEdgesExplored) { this.edgeIndex += 1 }
     
          let checkedAll = true;
          customForEach(allEdges, (edge) => {
               if (edge.fraction < 1.0 || edge.tail.activated === false) { checkedAll = false }
          })
          /*
          customForEach(allEdges, (edge) => {
               if (edge.index === this.edgeIndex && edge.fraction < 1.0) {
                    allEdgesExplored = false
               }
          })
          
          if(allEdgesExplored === true){this.edgeIndex+=1}

          customForEach(this.nodes.filter((dot) => dot.activated), (dot) => {
               dot.activatedFraction = clamp(dot.activatedFraction + change, 0, 1)

               customForEach(dot.edges.filter((edge) => edge.index === this.edgeIndex), (edge) => {
                    edge.fraction = Math.min(1.0, edge.fraction + 0.35)
                    edge.tail.activated = edge.fraction === 1.0 ? edge.tail.activated = true : edge.tail.activated = false;
               })
          })

          let checkedAll = true
          customForEach(allEdges, (edge) => {
               //console.log(edge)
               if (edge.fraction < 1.0) { checkedAll = false }
          })
          */
          return checkedAll; //min >= 1 && min !== 10
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
          this.sortEdges(ctx, true, "Black")
          this.sortEdges(ctx, false, this.color)
     }

     sortEdges(ctx, isShadow, color) {
          let allEdges = this.getAllEdges(isShadow)
          allEdges.sort((a, b) => a.index - b.index)
          allEdges.forEach(edge => {
               edge.render(ctx, color)
          })
          this.nodes.forEach(function (dot) {dot.render(ctx, color) })
     }

     update(ctx, endgame) {
          this.isGameRunning = endgame;

          this.updateFigure(endgame)
          this.render(ctx)
     }

     trigger(type) {
          if (type === "startDot") {
             //  this.activateDots()
          }else if (type === "updateDots") {
               //this.updateDots()
          }
     }

          moveElements(x, y) {
          customForEach(this.nodes, (dot) => {
               dot.pos.add(x, y)
               //dot.startPos.add(x, y)

               //dot.shadow.pos.add(x, y)
               //dot.shadow.startPos.add(x, y)
          })
     }
}