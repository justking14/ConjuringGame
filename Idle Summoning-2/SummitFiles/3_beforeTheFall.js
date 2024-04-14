//set things up for the dots to fall and ensure the background is fully transparent
class gameLogicBeforeTheFall extends gameLogic{
     constructor(parent) {
          super(parent)
     }

     start() {
          customObjectForEach(this.figures, (key, figure) => {
               if (figure.background === false) {
                    //figure.transition("beforeTheFall")
                    customForEach(figure.entity.dots, (dot) => {
                         dot.transition("beforeTheFall")//not sure if this does anything
                    })
               } else {
                    figure.alpha = 0.0
               }
          })
          ee.addEvent(4000, { actor: this.parent, type: "transition", classifier: "falling"  })
     }

     draw(ctx) {
          this.parent.drawFigures(ctx, false, true)
     }
     
     trigger(type) {
          if (type === "step") {
               customObjectForEach(this.figures, (key, figure) => {
                    if (figure.background === false) {
                         //slowly remove sticks, changing activated fraction for each dot
                         figure.entity.adjustSticks(c_witherSticks)
                    } else {
                         //slowly hide background images
                         figure.alpha = Math.max(0, figure.alpha - 0.035)
                    }
               })
          } 
     }
}
