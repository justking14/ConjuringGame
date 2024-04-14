class Meter extends StickFigure{
     constructor(ee) {
          let body = {
               dots: {
                    /*
               "1": { x: 0, y: 0 },
               "2": { x: 65, y: 0 },
               "3": { x: 130, y: 0 },
               "4": { x: 195, y: 0 },
               "5": { x: 260, y: 0 },
               "6": { x: 325, y: 0 },
               "7": { x: 390, y: 0 },
               "8": { x: 455, y: 0 },
               "9": { x: 520, y: 0 },

               "1a": { x: 0, y: 120 },
               "2a": { x: 65, y: 120 },
               "3a": { x: 130, y: 120 },
               "4a": { x: 195, y: 120 },
               "5a": { x: 260, y: 120 },
               "6a": { x: 325, y: 120 },
               "7a": { x: 390, y: 120 },
               "8a": { x: 455, y: 120 },
               "9a": { x: 520, y: 120 },

               "1c": { x: 0, y: 60 },
               "9c": { x: 520, y: 60 },
               */
               },

               sticks: [
                    /*
                    ["1", "2"], ["2", "3"], ["3", "4"], ["4", "5"], ["5", "6"], ["5", "6"], ["6", "7"], ["7", "8"], ["8", "9"],
                    ["1a", "2a"], ["2a", "3a"], ["3a", "4a"], ["4a", "5a"], ["5a", "6a"], ["5a", "6a"], ["6a", "7a"], ["7a", "8a"], ["8a", "9a"],
                    ["1", "1c"], ["1c", "1a"], ["9", "9c"], ["9c", "9a"], 
                    */
               ],

               movement: { x: 500, y: CANVAS_HEIGHT - 150 }
          } 

          for (var i = 0; i < 11; i++) {
               let name = i + "a"
               let nameb = i + "b"
               body.dots[name] = { x: 50 * i, y: 0 }
               body.dots[nameb] = { x: 50 * i, y: 120 }
               
               if (i > 0) {
                    let nameA0 = (i - 1) + "a"
                    let nameB0 = (i - 1) + "b"
                    body.sticks.push([nameA0, name])
                    body.sticks.push([nameB0, nameb])
                    
               }
          }
          body.dots["0c"] = { x: 0, y: 60 }
          body.dots["10c"] = { x: 500, y: 60 }
          
          body.sticks.push(["0a","0c"])
          body.sticks.push(["0c","0b"])

          body.sticks.push(["10a","10c"])
          body.sticks.push(["10c","10b"])
          //body.sticks.push(["11a", "11b"])
          


          super(body, "blue", ee)
          //blue
          this.meterBar = new StickFigure({
          dots: {
          "1": { x: 0, y: 0, color: "silver", },
          "2": { x: 0, y: 60, color: "silver" },
          "3": { x: 0, y: 120, color: "silver" },
          },
          sticks: [["1", "2"], ["2", "3"]],
          movement: { x: 500, y: CANVAS_HEIGHT - 150 }
          }, "black", ee)
          customForEach(this.sticks, (st) => { st.lineWidth = 6 })
          customForEach(this.meterBar.sticks, (st) => { st.lineWidth = 8 })
          


          this.counter = 0;

          this.clickTextNow = new AlphanumericEntity(515, CANVAS_HEIGHT - 124, "white", 9, true)
     
          this.hasClicked = false;
     }

     update(ctx, endgame) {
          for (let st of this.clickTextNow.sticks) {
               st.lineWidth = 100;
               st.shadow.lineWidth = 10;
          }
          this.updateFigure(endgame)
          this.render(ctx)
          this.isGameRunning = endgame;

          if (this.counter >= 5 && this.counter <= 7) {
               if (this.isGameRunning === true) {
                    this.clickTextNow.render(ctx, "CLICK NOW", endgame)

               }
          }
          if (this.isGameRunning) {
               this.meterBar.update(ctx, endgame)
          }
          
     }
     
     trigger(type) {
          if (type === "step") {
               if (this.isGameRunning === true) {
                    this.hasClicked = false;
                    this.meterBar.moveElements(50, 0)
                    this.counter++
                    if (this.counter > 10) {
                         this.counter = 0
                         this.meterBar.moveElements(-500 - 50,  0)
                    }
               }
               if (this.speed === 1) {
                    ee.addEvent(500, { actor: this, type: "step" })
               } else {
                    ee.addEvent(200 / this.speed, { actor: this, type: "step" })
               }
          } else if (type === "startDot") {
               this.dots[this.dots.length - 2].activated = true;
               this.dots[this.dots.length - 2].shadow.activated = true;
               this.activateDots()
               this.meterBar.activateDots()
          }else if (type === "updateDots") {
               this.updateDots()
               this.meterBar.updateDots()
          }
     }
}