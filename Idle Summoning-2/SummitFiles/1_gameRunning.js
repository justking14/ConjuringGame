//main function for game running.  keep track of player's position as he moves up
class gameLogicGameRunning extends gameLogic {
     constructor(parent) {
          super(parent)
     }

     start() {
          customObjectForEach(this.figures, (key, fig) => {
               if (fig.background === false) {
                    //start the stepping process for each newly made entity
                    ee.addEvent(1, { actor: fig.entity, type: "step" })
               } else {
                    //ensure background is fully visible by this point
                    fig.alpha = 1.0
               }
          })
     }

     update(engine) {
          let humanFront = this.figures.humanFront.entity;
          let humanBack = this.figures.humanBack.entity;

          //set up fraction based on how far forward the player has moved
          //console.log(g_playerProgressFaction)
          g_playerProgressFaction = Math.max(g_playerProgressFaction, (humanFront.dots[0].pos.x) / (100 + (150 * 5)) - 0.17 )
          
          //accelerate world elements based on global speed variable
          customObjectForEach(this.figures,
               (key, fig) => {
                    //console.log(fig)
                    if (fig.background === false) {
                         //console.log(this.parent.resetScore)
                         fig.entity.updateSpeed(this.parent.speed, this.parent.altitude, this.parent.resetScore)
                    }
               }
          )
          
          //if human has crossed one of 3 thresholds 
          if (humanFront.state === "crossedThreshold") {
               //tracks # of thresholds crossed
               this.parent.progressCounter++;

               //return back to idle state to keep up the walk cycle
               humanFront.state = "idle";
               humanBack.state  = "idle";
               humanFront.progressCounter = this.parent.progressCounter
               humanBack.progressCounter  = this.parent.progressCounter

               //if summit reached, set player to fall and send dots flying
               //consider making this a global variable that updates after each fall
               if (this.parent.progressCounter === 5) {
                    this.parent.trigger("transition", "boulderRolling")
               }
          }
     }

     trigger(type) {
          if (type === "step") {
               let humanFrontDot = this.figures.humanFront.entity.dots[0];

               customForEach(this.figures.ground.entity.dots, (dot) => {
                    let dist = humanFrontDot.pos.distance(dot.pos)
                    if (dist < 150) {
                         let cpy = new Vector()
                         cpy.copy(dot.startPos)
                         cpy.jitter(3)
                         dot.pos.copy(cpy)
                    }
               })
          }
     }

     draw(ctx) {
          this.parent.drawFigures(ctx, true, false)
          this.parent.speedText.render(ctx, "SPEED:" + this.parent.speed, false)
          //this.parent.altitudeText.render(ctx, "ALTITUDE:" + Math.floor(this.parent.altitude), false)

     }
}