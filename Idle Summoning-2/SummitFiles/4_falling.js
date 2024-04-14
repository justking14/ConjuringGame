//have each dot fall with a delay between each drop 
class gameLogicFalling extends gameLogic{
     constructor(parent) {
          super(parent)
     }
     start() {
          this.figures.boulder.entity.state = "falling"
          //this.figures.boulder.entity.centerY = 0//???
          customObjectForEach(this.figures, (key, fig) => {
               let increment = 0;
               if (fig.background === false) {
                    //drop after x seconds
                    customForEach(fig.entity.dots, (dot) => {
                         increment += 50
                         setTimeout(() => dot.transition("falling"), increment)
                    })
               }
          })
          ee.addEvent(5000, { actor: this.parent, type: "transition", classifier: "resetting"  })
     }

     draw(ctx) {
          this.parent.drawFigures(ctx, false, true)
     }
}