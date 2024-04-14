class Raven extends Puppet{
     constructor(moveX, moveY, increment, speedIncrement) {

          let body;
          body = {
               dots: { 
                    "1"  : { x: 0, y: 25 },  
                    "2"  : { x: 15, y: 40 },
                    "3"  : { x: 45, y: 35 },
                    "4": { x: 50, y: 0 },  
                    "5": { x: 30, y: 20, locked: "true" },  

                    "beakTip": { x: 85, y: 10, color: "RGB(255,165,0)" },  // Orange
                    "beakBase": { x: 60, y: 20 },
     
                    "tail": { x: -20, y: 40, type: "B" },
                    
                    "wing1": { x: 0, y: 5, type: "A" },
                    "wing2": { x: -30, y: 25 , type: "A" },

               },
               sticks: [["1", "2",0], ["2", "3",0], ["5", "1",0], ["4", "5",0],
                    ["3", "5"],   ["2", "5"], 
                    ["4", "beakBase"], ["beakBase", "beakTip"], ["4", "beakTip"],
                    ["1", "tail"],
                    ["3", "beakBase"],

                    ["5", "wing1", 1],
                    ["wing1", "wing2", 2]
               ],
               movement: { x: moveX, y: moveY }
          }
     
          super(body, "RGB(240,240,240)")

          speedIncrement = (Math.random()*3)+2;
          this.speed = 1
          this.increment = increment//Math.random() * 100;
          this.posIncrement = speedIncrement/3
          this.speedIncrement = speedIncrement//(Math.random() + 0.5) * 2

          let posX = -230//(Math.random() * 300) - 350
          let posY = (Math.random() * 500) - 250
          customForEach(this.nodes, (dot) => {
               //dot.startPos.x = dot.startPos.x - 100
               //dot.startPos.y = dot.startPos.y + + posY

               //dot.resetPos.x = dot.startPos.x + (200 * Math.sin(this.posIncrement)) + posX;
               //dot.resetPos.y = dot.startPos.y + 25 * Math.sin(this.increment * 5) + posY

               dot.startPos.x += (CANVAS_WIDTH/2 - 200) + posX //+ Math.random() * 100
               dot.startPos.y += (CANVAS_HEIGHT / 2) + posY// + (Math.random() * 200) - 100
               

               dot.pos.x = dot.startPos.x + 100 * this.speedIncrement;
               dot.pos.y = dot.startPos.y

               customForEach(dot.edges, (edge) => {
                    edge.fraction = 1.0
                    edge.lineWidth = 6
                    if(edge.color === "black" || edge.color === undefined){edge.color = "white"}
               })
          })

          ee.addEvent(1000, { actor: this, type: "step" })

     }
     update(ctx, isGameRunning) {
          //update dots
          this.isGameRunning = isGameRunning
          this.updateFigure(isGameRunning)
          this.render(ctx)
                    
          
     }

     trigger(type) {
          //console.log(type)
          if (type === "step") {
               //if (this.isGameRunning) {
                    //console.log(this.nodes)
                    this.increment    += 0.0045 * this.speed  
                    this.posIncrement += 0.0045 * this.speed  

               let turnBack = false;
                    //let diff = Math.max(Math.random(),0.9)//Math.abs(Math.random() + 0.2)
                    customForEach(this.nodes, (dot) => {
                         dot.pos.x += 2 * this.speedIncrement
                         if (dot.pos.x > 1200) {
                              turnBack = true;

                         }

                         let baseY = dot.startPos.y + 25 * Math.sin(this.increment * 5)
                         if (dot.type === "A") {
                              baseY += 25 * Math.sin(this.increment * 20)
                         } else if (dot.type === "B") {
                              baseY += 3 * Math.sin(this.increment * 50) * -1
                         }
                         dot.pos.y = baseY;
                         
                    })
               if (turnBack === true) {
                    customForEach(this.nodes, (dot) => {
                         dot.pos.x -= 1500
                         dot.resetPos.x = - 1500
                    })
               }
               
               //}

               ee.addEvent(20, { actor: this, type: "step" })
          }  else if (type === "startDot") {
               this.activateDots()
          }else if (type === "updateDots") {
               this.updateDots()
          }
     }    
}