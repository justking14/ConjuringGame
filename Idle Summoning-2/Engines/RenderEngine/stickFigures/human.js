class Human extends StickFigure{
     constructor(pos, color, progressCounter, front) {
          let body = this.initBody();
          super(body, "RGB(320,320,320)", ee)

          this.intervalA = 0;
          this.intervalB = 0 
          this.intervalCount = 0
          this.humanBack = undefined;

          this.progressCounter = progressCounter
          
          customForEach(this.dots, (dot) => {
               if (front === true) {
                    if (dot.type === "a" || dot.type === "c") {
                         dot.hidden = true;
                    }
                    dot.shadow.hidden = true;
               } else {
                    if (dot.type === "b" || dot.type === "d") {
                         //dot.hidden = true;
                         //dot.shadow.hidden = true;
                    }
               }
          })

          /*
          for (let i = 0; i < this.dots.length; i++) {
               if (front === true) {
                    if (this.dots[i].type === "a" || this.dots[i].type === "c") {
                         this.dots[i].hidden = true 
                    }
                    this.shadowDots[i].hidden = true;

               } else {
                    if (this.dots[i].type === "b" || this.dots[i].type === "d"  || this.dots[i].type === "e") {
                         this.dots[i].hidden = true 
                         this.shadowDots[i].hidden = false
                    } else if (this.dots[i].type === "a" || this.dots[i].type === "c") {
                         //this.shadowDots[i].hidden = true;
                    }
               }
          }
          */
     
          this.positive = true;
          this.audio_Step1 = new Audio("step1.wav")
          this.audio_Step2 = new Audio("step2.wav")

          ee.addEvent(20, { actor: this, type: "animate" })
     }

     initBody() {
          return {
               dots: {

                         "head": { x: 50, y: 0, radius: 10, locked: false, type: "f", locked: false },

                         "bodyTop": { x: 30, y: 10, type: "f",  locked: false },
                         "bodyBottom": { x: 15, y: 40, type: "f", locked: false},
                    
                         "leftArm": { x: 35, y: 40, type: "c", color: "RGB(80,80,80)", locked: true},
                         "lowerLeftArm": { x: 65, y: 15, type: "c", color: "RGB(80,80,80)", locked: true },
                         "rightArm": { x: 35, y: 50, type: "d", locked: true },
                         "lowerRightArm": { x: 65, y: 25, type: "d", locked: true },

                         "leftLeg": { x: 20, y: 75, type: "a", color: "RGB(80,80,80)", locked: true },
                         "lowerLeftLeg": { x: 20, y: 120, type: "a", color: "RGB(80,80,80)", locked: true},
                         "rightLeg": { x: 20, y: 75, type: "b", locked: true},
                         "lowerRightLeg": { x: 20, y: 120, type: "b", locked: true },
                                        

                    },
               
                    sticks: [["head", "bodyTop"], ["bodyTop", "bodyBottom"], ["bodyTop", "leftArm"],
                    ["bodyTop", "rightArm"], ["bodyBottom", "leftLeg"], ["bodyBottom", "rightLeg"],
                    ["leftLeg", "lowerLeftLeg"], ["rightLeg", "lowerRightLeg"], ["leftArm", "lowerLeftArm"], ["rightArm", "lowerRightArm"]],
                    movement: { x: pos.x, y: pos.y },
               }
     }

     animate() {
          
          this.intervalCount += 0.025 * this.speed/4
          let progress = (Math.sin(this.intervalCount) + 1) / 2
          
          const extendedLegX = 20; // X-coordinate for the extended leg
          const bentLegX = 10; // X-coordinate for the bent leg
          const legMovement = 16 * Math.sin(this.intervalCount * Math.PI * 2); // Simulate walking motion

          let check = (Math.sin(this.intervalCount * Math.PI * 2))
          if (check > 0 && this.positive === false) {
               this.positive = true;
               this.audio_Step1.play()
          } else if (check < 0 && this.positive === true) {
               this.positive = false;
               this.audio_Step2.play()
          }
          customForEach(this.dots, (CN) => {
               let type = CN.type;
               switch (CN.type) {
                    case "a":
                         CN.pos.x = CN.startPos.x + legMovement/2
                         CN.pos.y = CN.startPos.y + ((legMovement) * -1)
                         break;
                    case "b":
                         CN.pos.x = CN.startPos.x + (legMovement * -1/2)
                         CN.pos.y = CN.startPos.y + (legMovement / 1.5)
                         break;
                    case "c":
                         CN.pos.x = CN.startPos.x + legMovement
                         CN.pos.y = CN.startPos.y + ((legMovement / 2) * -1)
                         break;
                    case "d":
                         CN.pos.x = CN.startPos.x + (legMovement * -1)
                         CN.pos.y = CN.startPos.y + ((legMovement / 2) * 1)
                         break;
                    case "e":
                         CN.pos.x = CN.startPos.x + legMovement * 2
                         CN.pos.y = CN.startPos.y + ((legMovement / 2) * 1)
                         break;
               }
          })
     }

     trigger(type) {
          if (type === "step") {
               if (this.state !== "idle") {
                    //console.log("not idle ", this.state)
                    ee.addEvent(humanStepDelay, { actor: this, type: "step" })
                    return;
               }

               let scale = 1 //- (this.altitude / 300);

               // Adjust delta values based on the scaling factor
               let delta = new Vector((0.9 / 2) * scale,
                    (-0.45 / 2) * scale);

               // Move elements up the mountain, with the movement slowing down as altitude increases
               this.moveElements(delta.x * (this.speed / humanSpeedBuffer),
                    delta.y * (this.speed / humanSpeedBuffer));

               //let delta = new Vector(0.9 / 2, -0.45 / 2)
               //this.moveElements(delta.x * (this.speed / humanSpeedBuffer),
                 //   delta.y * (this.speed / humanSpeedBuffer));//move up the mountain
               
               if (this.humanBack !== undefined) {
                    //body top reached the top, bit uncertain due to wobble from animation
                    if (this.dots[0].pos.x > 150 + (this.progressCounter * 150)) {
                         this.state = "crossedThreshold"//ups rest counter in summit
                    }
               }
               ee.addEvent(humanStepDelay, { actor: this, type: "step" })

          } else if (type === "animate") {
               if (this.state !== "idle") {
                    ee.addEvent(20, { actor: this, type: "animate" })
                    return;
               }          
               this.animate();//move body parts
               ee.addEvent(20, { actor: this, type: "animate" })
          } else if (type === "fuckUp") {
               console.log("fuck up")
               //send flying in the sky, not called
               customForEach(this.dots, (currentNode) => {
                    currentNode.state = "falling"
                    currentNode.vel.y = -1 * ((Math.random() * 100) + 1000)
                    currentNode.pos.x += (Math.random() * 100) - 50
               })
          } else if (type === "startDot") {
               this.activateDots()
          }else if (type === "updateDots") {
               this.updateDots()
          }
     }

}