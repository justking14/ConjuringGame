         
class Ground extends StickFigure {
     constructor(progressCounter, ee) {
          let body = { dots: {}, sticks: [], movement: { x: 0, y: 0 } }
          //super(body, "#554124", ee)

        

          super(body, color_ground_dirt, ee)


          //rising ground
          for (let i = 0; i < 22; i++) {
               this.addDot("step", 0 + (50 * i),
                    (CANVAS_HEIGHT ) - (25 * i), "none", dotSize, false, color_ground_grass)

               if (i > 0) {
                    this.addStickIndex(i, i - 1)
               }
          }
          ///5 + 50 * 22, 742
          //
          for (let i = 0; i < 22; i++) {
               let parentX = 0 + (50 * i)
               let parentY = (CANVAS_HEIGHT) - (25 * i)

               this.addDot("step", (50 * i),
                    Math.min(parentY + Math.sin(i/2)*50 + 100, CANVAS_HEIGHT), "none", dotSize)
                    ///(CANVAS_HEIGHT ) - (15 * i) + noise(0,i**i) * 50, "none", dotSize)

               
               if (i > 0) {
                    this.addStickIndex(i - 1 + 22, i + 22)
                    //this.addStickIndex(i - 1 + 22, i)
               }
          }

          
          
              //flat ground
          for (let i = 0; i < 22; i++) {
               this.addDot("step", 0 + (50 * i) ,
                    (CANVAS_HEIGHT ), "none", dotSize)
               
               if (i > 0) {
                    this.addStickIndex(i  + 22, i)
                    //this.addStickIndex(i - 1 + 22, i + 44)///diagonal lines connecting to rising ground    
                                        
                    //this.addStickIndex(i - 1 + 42, i + 21)
                    //this.addStickIndex(i  + 41, i + 42)

               }
          }
          

          /*
          //diagonal 
          for (let i = 6; i < 22; i++) {
               this.addDot("step", (50 * i),
                    (CANVAS_HEIGHT ) - (20 * i) + Math.sin(i**i)*50 + 25, "none", dotSize)
                    ///(CANVAS_HEIGHT ) - (15 * i) + noise(0,i**i) * 50, "none", dotSize)

               if (i > 2) {
                    //this.addStickIndex(i - 1 + 22, i)
                    this.addStickIndex(i - 1 + 22 - 6, i + 22 - 6)///diagonal lines connecting to rising ground                     
               }
          }
          */

          /*
          //flat ground
          for (let i = 0; i < 21; i++) {
               this.addDot("step", (50 * i) ,
                    (CANVAS_HEIGHT ), "none", dotSize)
               
               if (i > 0) {
                    this.addStickIndex(i  + 21, i)
                    this.addStickIndex(i + 21, i + 42)///diagonal lines connecting to rising ground    
                                        
                    this.addStickIndex(i - 1 + 42, i + 21)
                    this.addStickIndex(i  + 41, i + 42)

               }
          }
          */
          for (let st of this.sticks) {
               st.lineWidth = lineSize;
               st.shadow.lineWidth = lineSize;
          }
          //this.resetPositions()
     }


     trigger(type) {
          if (type === "startDot") {
               console.log("SHOULD NOT HIT", this.dots[0])
               this.activateDots()
               if (this.dots[0]) {
                    //start on the left and right side of the screen
                    this.dots[0].activated = true
                    this.dots[0].shadow.activated = true

                    this.dots[10].activated = true
                    this.dots[10].shadow.activated = true

                    ee.addEvent(20, { actor: this, type: "updateDots" })
               } else {
                    console.error(" up your lemon ")
               }
          } else if (type === "updateDots") {
               this.updateDots()
               
          }
     }

}
