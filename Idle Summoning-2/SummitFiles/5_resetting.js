//move each dot back into place with a delay between each dot
class gameLogicResetting extends gameLogic{
     constructor(parent) {
          super(parent)
     }
     start() {
          customObjectForEachAndFilter(this.figures, (figure) => figure.background === false,
               (key, figure) => {
                    let increment = 0;
                    customForEach(figure.entity.dots, (dot) => {
                         increment += 50
                         setTimeout(()=>dot.transition("resetting"),increment )
                    })
               }
          )
          ee.addEvent(5000, { actor: this.parent, type: "fullGameReset" })
     }
     trigger(type) {
          //remove each element and replace it with a new one
          if (type === "fullGameReset") {
               deleteAllProperties(this.parent.figures)
               this.parent.init()
          } 
     }
     draw(ctx) {
          this.parent.drawFigures(ctx, false, false)
     }
}


