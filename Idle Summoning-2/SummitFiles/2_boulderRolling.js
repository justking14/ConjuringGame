//class for rolling boulder down the hill upon level being completed
//also performs a screen shake and slowly removes the connections between dots
class gameLogicBoulderRolling extends gameLogic{
     constructor(parent) {
          super(parent)
          this.jitterAmount = 0;
     }
     start() {
          this.jitterAmount = 0;

          //this.parent.resetScore += this.parent.altitude / 100
          console.log("GRT ", this.parent.resetScore, this.parent.altitude)

          let humanFront = this.figures.humanFront.entity;
          let humanBack = this.figures.humanBack.entity;
          //changing state keeps the player from stepping
          humanFront.state = "falling"
          humanBack.state  = "falling"
                    
          //set nodes to falling and randomizes vel x and pos y
          ee.addEvent(1300, { actor: humanFront, type: "fuckUp" })
          ee.addEvent(1300, { actor: humanBack , type: "fuckUp" })
          
          //pause briefly before starting the falling animation
          this.figures.boulder.entity.state = "paused"
          ee.addEvent(50, { actor: this.figures.boulder.entity, type: "fall" })

     
          this.figures.sun.entity.movementFraction = 0.99//consider testing this
          ee.addEvent(1300, { actor: this.parent, type: "bang" })//plays bang sound 
          ee.addEvent(6000, { actor: this.parent, type: "transition", classifier: "beforeTheFall" })
     }

     draw(ctx) {
          //shakes each figure apart
          //consider moving to trigger function 
          
          customObjectForEachAndFilter(this.figures,
               (figure) => figure.background === false,
               (key, figure) =>
                    customForEach(figure.entity.dots, (dot) => {
                         dot.pos.jitter(this.jitterAmount)
                    })
          )
          customObjectForEachAndFilter(this.figures,
               (figure) => figure.background === false,
               (key, figure) =>
                    customForEach(figure.entity.sticks, (dot) => {
                         //dot.length+= (Math.random()*0.00002)-0.00001
                    })
          )

          this.jitterAmount = Math.min(this.jitterAmount + 0.015, 10)
          this.parent.drawFigures(ctx, false, false)
     }

     trigger(type) {
          if (type === "step") {
               if (this.jitterAmount > 2.0) {
                    customObjectForEach(this.figures, (key, figure) => {
                         if (figure.background === false) {
                              //slowly remove sticks, changing activated fraction for each dot
                              figure.entity.adjustSticks(c_witherSticks * 1.25)
                         } else {
                              //slowly hide background images
                              figure.alpha = Math.max(0, figure.alpha - 0.035)
                         }
                    })
               }
          } 
     }

}
