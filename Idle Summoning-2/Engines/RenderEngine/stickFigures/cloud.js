class Cloud extends StickFigure{
     constructor(moveX, moveY, increment) {

          let body;
          if (Math.random() <= 1.0) {
               /*
                body = {
                    dots: {
                         "1": { x: 0, y: 20 },
                         "2": { x: 20, y: 40 },
                         "3": { x: 40, y: 40 },
                         "4": { x: 60, y: 20 },
                         "5": { x: 40, y: 0 },
                         "6": { x: 20, y: 0 },
                    },
                    sticks: [["1", "2"], ["2", "3"], ["3", "4"],
                    ["4", "5"], ["5", "6"], ["6", "1"]
                    ],
                    movement: { x: moveX, y: moveY }
               }*/

               body = {
                    dots: {
                         "1": { x: 0, y: 25 },
                                                  
                         "1a": { x: 10, y: 45 },

                         "2": { x: 30, y: 55 },



                         "3": { x: 60, y: 55 },
                                                  
                         "3a": { x: 80, y: 45 },

                         "4": { x: 90, y: 25 },
                                                  
                         "4a": { x: 80, y: 5 },

                         "5": { x: 60, y: 0 },


                         "1b": { x: 10, y: 5 },

                         "6": { x: 30, y: 0 },
                    },
                    sticks: [["1", "1a"],["1a","2"], ["2", "3"], ["3a", "4"],["3a","3"],
                    ["4a", "5"], ["4a","4"],["5", "6"], ["6", "1b"], ["1b","1"]
                    ],
                    movement: { x: moveX, y: moveY }
               }
               
          } else {
          

               body = {
                    dots: {
                         /*
                         "1": { x: 25, y: 50 },
                         "3": { x: 5, y: 38 },
                         "5": { x: 25, y: 26 },
                         "7": { x: 45, y: 38 },

                    
                         "2": { x: 65, y: 50 },
                         "4": { x: 85, y: 38 },
                         "6": { x: 65, y: 26 },
                         "8": { x: 45, y: 38 },
                         */
                          "1": { x: 0, y: 10 },
                         "2": { x: 20, y: 0 },
                         "3": { x: 40, y: 5 },
                         "4": { x: 60, y: 10 },
                         "5": { x: 70, y: 30 },
                         "6": { x: 60, y: 50 },
                         "7": { x: 40, y: 60 },
                         "8": { x: 20, y: 50 },
                         "9": { x: 0, y: 40 },

                    },
                    //sticks: [["1", "2"], ["1", "3"], ["2", "4"], ["3", "5"], ["4", "6"], ["7", "5"], ["8", "6"], ["9","7"]
                                        
                    sticks: [["1", "2"], ["2", "3"], ["3", "4"], ["4", "5"], ["5", "6"], ["6", "7"], ["7", "8"], ["8", "9"], ["9","1"]

                    
                    ],
                    movement: { x: moveX, y: moveY }
               }
          }

     
          super(body, "white")
          this.increment = increment//Math.random() * 100;


          customForEach(this.dots, (dot) => {
               //dot.startPos.x = dot.startPos.x + 1000 * Math.sin(this.increment);
               //dot.startPos.y = dot.pos.y;

               dot.resetPos.x = dot.startPos.x + 1200 * Math.sin(this.increment);
               dot.resetPos.y = dot.startPos.y + 25 * Math.sin(this.increment * 5)
          })
     }
     update(ctx, isGameRunning) {
          //update dots
          this.isGameRunning = isGameRunning
          this.updateFigure(isGameRunning)
          this.render(ctx)
          if (isGameRunning === true) {
               customForEach(this.dots, (dot) => {
                    dot.pos.x = dot.startPos.x + 1200 * Math.sin(this.increment);
                    dot.pos.y = dot.startPos.y + 25 * Math.sin(this.increment * 5)
               })
          }
     }

     trigger(type) {
          if (type === "step") {
               if (this.isGameRunning) {
                    this.increment += 0.0045 * this.speed  
               }
               ee.addEvent(20, { actor: this, type: "step" })
          } else if (type === "startDot") {
               this.activateDots()
          }else if (type === "updateDots") {
               this.updateDots()
          }
     }    
}