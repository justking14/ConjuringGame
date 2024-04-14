class Sissy extends StickFigure{
     constructor(pos, color, progressCounter, front) {
          let body = {
               dots: {

                    "head": { x: 50, y: 0, radius: 10, locked: false, type: "f", locked: false },

                    "bodyTop": { x: 30, y: 10, type: "f",  locked: false },
                    "bodyBottom": { x: 15, y: 40, type: "pelvis", locked: true},
               
                    "leftArm": { x: 35, y: 40, type: "leftArm", locked: true},
                    "lowerLeftArm": { x: 65, y: 15, type: "lowerLeftArm", locked: true },
                    "rightArm": { x: 35, y: 50, type: "rightArm", locked: true },
                    "lowerRightArm": { x: 65, y: 25, type: "lowerRightArm", locked: true },

                    "leftLeg": { x: 10, y: 75, type: "leftLeg", locked: true },
                    "lowerLeftLeg": { x: 5, y: 110, type: "leftLeg", locked: true},
                    "rightLeg": { x: 10, y: 75, type: "rightLeg", locked: true},
                    "lowerRightLeg": { x: 5, y: 110, type: "rightLeg", locked: true },
               },
          
               sticks: [["head", "bodyTop"], ["bodyTop", "bodyBottom"], ["bodyTop", "leftArm"],
               ["bodyTop", "rightArm"], ["bodyBottom", "leftLeg"], ["bodyBottom", "rightLeg"],
               ["leftLeg", "lowerLeftLeg"], ["rightLeg", "lowerRightLeg"], ["leftArm", "lowerLeftArm"], ["rightArm", "lowerRightArm"]],
               movement: { x: pos.x, y: pos.y },
          }
               

          super(body, color_person, ee)

          this.initProperties(progressCounter)
          
          customForEach(this.dots, (dot) => {
               if (front === true) {
                    if (dot.type === "leftLeg" || dot.type === "leftArm" || dot.type === "lowerLeftArm") {
                         dot.hidden = true;
                    }
                    dot.shadow.hidden = true;
               }
          })
     
          this.audio_Step1 = new Audio("sounds/step1.wav")
          this.audio_Step2 = new Audio("sounds/step2.wav")

          this.startedStepping = false;
     }

     initProperties(progressCounter) {
          this.intervalA = 0;
          this.intervalB = 0 
          this.intervalCount = 0
          this.humanBack = undefined;
          this.progressCounter = progressCounter
          this.positive = true;
     }
 
     animate() {
          
          this.intervalCount += 0.025 * this.speed/4
          let stepSwing = 10 * this.intervalCount

          this.playStepSound(stepSwing)

          customForEach(this.dots, (CN) => {
               let type = CN.type;
               switch (type) {
                    case "leftLeg":
                         CN.pos.x = CN.startPos.x + (15 * Math.cos(stepSwing)) + 10;
                         CN.pos.y = CN.startPos.y + 15 * Math.sin(stepSwing);
                         break;
                    case "rightLeg":
                         CN.pos.x = CN.startPos.x + (15 * Math.cos((stepSwing) - Math.PI)) + 10;
                         CN.pos.y = CN.startPos.y + 15 * Math.sin((stepSwing) - Math.PI);
                         break;
                    case "leftArm":
                         CN.pos.x = CN.startPos.x + (15 * Math.sin(stepSwing))
                         CN.pos.y = CN.startPos.y - Math.abs((15 * Math.sin(stepSwing)))
                         break;
                    case "lowerLeftArm":
                         CN.pos.x = CN.startPos.x + (20 * Math.sin(stepSwing))
                         break;
                    case "rightArm":
                         CN.pos.x = CN.startPos.x + (15 * Math.sin((stepSwing) - Math.PI)) 
                         CN.pos.y = CN.startPos.y - Math.abs((15 * Math.sin(stepSwing) - Math.PI))
                         break;
                    case "lowerRightArm":
                         CN.pos.x = CN.startPos.x + (20 * Math.sin((stepSwing) - Math.PI))
                         break;
                    case "pelvis":
                         CN.pos.x = CN.startPos.x + (5 * Math.sin((stepSwing) - Math.PI)) 
                         break;
               }
          })
     }

     playStepSound(stepSwing) {
          let check = (15 * Math.cos(stepSwing))
          if (this.humanBack !== undefined) {
               if (check > 0 && this.positive === false) {
                    this.positive = true;
                    playSound("sounds/step1.wav")
               } else if (check < 0 && this.positive === true) {
                    this.positive = false;
                    playSound("sounds/step2.wav")
               }
          }
     }

     trigger(type) {
          if (type === "step") {
               this.handleStep()
          } else if (type === "animate") {
               this.handleAnimate()
          } else if (type === "fuckUp") {
               this.handleFuckUp()
          } else if (type === "startDot") {
               this.activateDots()
          }else if (type === "updateDots") {
               this.updateDots()
          }
     }

     handleStep() {
          if (this.startedStepping === false) {
               this.startedStepping = true
               ee.addEvent(20, { actor: this, type: "animate" })
          }
          if (this.state !== "idle") {
               ee.addEvent(humanStepDelay, { actor: this, type: "step" })
               return;
          }
          
          // Adjust delta values based on the scaling factor
          let delta = new Vector((0.9 / 2)  / (humanSpeedBuffer),
               (-0.45 / 2)  / (humanSpeedBuffer));

          // Move elements up the mountain, with the movement slowing down as altitude increases
          this.moveElements(delta.x * (this.speed),
               delta.y * (this.speed ));
          
          if (this.humanBack !== undefined) {
               //body top reached the top, bit uncertain due to wobble from animation
               if (this.dots[0].pos.x > 150 + (this.progressCounter * 150)) {
                    this.state = "crossedThreshold"//ups rest counter in summit
               }
          }
          ee.addEvent(humanStepDelay, { actor: this, type: "step" })
     }

     handleAnimate() {
          if (this.state !== "idle") {
               ee.addEvent(20, { actor: this, type: "animate" })
               return;
          }          
          this.animate();//move body parts
          ee.addEvent(20, { actor: this, type: "animate" })
     }

     handleFuckUp() {
          //send flying in the sky
          customForEach(this.dots, (currentNode) => {
               currentNode.state = "falling"
               currentNode.vel.y = -1 * ((Math.random() * 100) + 1000)
               currentNode.pos.x += (Math.random() * 100) - 50
          })
     }
}