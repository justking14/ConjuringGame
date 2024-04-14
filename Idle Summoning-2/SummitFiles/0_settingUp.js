//increase alphas and activation fractions
//to do: implement activation fraction in trigger
let g_difficulty = ""
class gameLogicSettingUp extends gameLogic{
     constructor(parent) {
          super(parent)
          
          this.speedText = new AlphanumericEntity(7, 10, "white", 7)
          
          this.introText = new AlphanumericEntity(7, 200, "white", 7)

          this.easyText   = new AlphanumericEntity(CANVAS_WIDTH/2 - 100, 300, "white", 7)
          this.normalText = new AlphanumericEntity(CANVAS_WIDTH/2 - 100, 425, "white", 7)
          this.hardText   = new AlphanumericEntity(CANVAS_WIDTH/2 - 100, 550, "white", 7)

          this.timerText = new AlphanumericEntity(20, 700, "white", 7)

          this.gameStarted = false;
          document.addEventListener("keydown", (event) => {
               if (this.gameStarted === false) {
                    let key = (event.key === " ") ? "Space" : event.key
                    if (["1", "2", "3"].includes(key)) {
                         this.gameStarted = true
                         if (key === "1") {
                              g_difficulty = "easy"
                         } else if (key === "2") {
                              g_difficulty = "normal"
                         } else if (key === "3") {
                              g_difficulty = "misery"
                         }
                         g_level = 1;              
                         this.figures.sun.entity = new SummoningCircle(g_level)
                    }     
               }
          })
     }
     trigger(type) {
          //console.log(type)

          if (type === "step") {
               //adjust RBG elements bit by bit, test later                              
               let sun = this.figures.sun.entity
               sun.movementFraction = Math.max(0.11, sun.movementFraction - 0.0075)
          }
     }
     draw(ctx) {

          if (this.gameStarted === false) {
               this.speedText.render(ctx, "WELCOME TO DEMON SUMMONING SCHOOL!", false)

               this.introText.render(ctx, "        SELECT A DIFFICULTY", false)
               this.easyText.render(ctx, "1 - EASY", false)
               this.normalText.render(ctx, "2 - NORMAL", false)
               this.hardText.render(ctx, "3 - MISERY", false)

          } else {
               this.parent.drawFigures(ctx, true, false)
                    
               let radius = 10
               if (g_difficulty === "easy") {
                    radius = 20
               } else if (g_difficulty === "normal") {
                    radius = 10
               } else if (g_difficulty === "misery") {
                    radius = 5
               }


               renderCircle(ctx, g_posX - 1, g_posY - 1, radius, "black" || color)
               renderCircle(ctx, g_posX, g_posY, radius + 1, "red" || color)

               let sun = this.figures.sun.entity
               console.log(sun.youLost)
               if (sun.youLost === true) {
                    this.speedText.color = "red"
                    this.speedText.render(ctx, "        YOU LOST! START OVER!", false)
                    //g_level = 1;
                    //ee.removeEvents(sun)
                    if (g_difficulty === "misery") {
                         for (var member in this.figures) {
                              if (this.figures[member].z !== 1) {
                                   delete this.figures[member];
                              }
                         }
                         g_level = 1
                         this.figures.sun.entity = new SummoningCircle(g_level)
                         this.figures.sun.entity.hasGameStarted = true;
                    } else {
                         

                         this.figures.sun.entity = new SummoningCircle(g_level)
                         this.figures.sun.entity.hasGameStarted = true;
                    }
                    console.log(this.figures)
               } else if (sun.summonBirds === true) {
                    sun.summonBirds = false
                    this.figures["Bird" + g_level] = { entity: new Raven(0, 0, 5, 3), background: false }
                    this.figures["Raven" + g_level] = { entity: new Raven(0, 0, 5, 3), background: false }
                    this.figures["Dove" + g_level] = { entity: new Raven(0, 0, 5, 3), background: false }
                    this.figures["Bluejay" + g_level] = { entity: new Raven(0, 0, 5, 3), background: false }
               }else if(sun.killMe === true){
                    this.figures.sun.entity = new SummoningCircle(g_level += 1)
                                        this.figures.sun.entity.hasGameStarted = true;

               } else if (sun.finishedTouching === true) {
                    this.speedText.render(ctx, "YOU HAVE SUMMONED A POWERFUL DEMON", false)
               } else if (sun.offCanvas === true) {
                    this.speedText.color = "red"
                    this.speedText.render(ctx, "        STAY ON THE CANVAS!", false)
               }

               this.timerText.render(ctx, "TIME LEFT " + sun.countdown, false)
          }
     }
}