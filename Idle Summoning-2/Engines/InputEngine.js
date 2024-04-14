class InputEngine {
     constructor() {
          this.vKeyPreviousState = []//previous key state
          this.vIsKeyPressed = []//pressed keys
          this.vIsDownClick = []//true when first pressed down
          this.vIsUpClick = []//true when first released 

          this.firstKeyPressed = false;
          this.init()
     }

     init() {
          document.addEventListener("keyup", (event) => {
              // let key = event.key;
               let key = (event.key === " ") ? "Space" : event.key
               if(key === " "){key = "Space"}
               this.vIsKeyPressed[key] = false
               //console.log(event.key)
          })
          document.addEventListener("keydown", (event) => {
               //let key = event.key;
               let key = (event.key === " ") ? "Space" : event.key
               if(key === " "){key = "Space"}
               this.vIsKeyPressed[key] = true
               //console.log(event.key)
          })

          const keyboardKeys = [
               "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
               "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
               "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
               "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
               "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
               "Enter", "Tab", "Shift", "Control", "Alt", "Space", "Escape", "Backspace", "Delete", "CapsLock",
               "Insert", "Home", "End", "PageUp", "PageDown", "PrintScreen", "ScrollLock", "PauseBreak",
               "ContextMenu", "NumLock", "AudioVolumeUp", "AudioVolumeDown", "AudioVolumeMute"
          ];
          //const keyState = {};

          keyboardKeys.forEach((key) => {
               this.vIsKeyPressed[key] = false;
               this.vKeyPreviousState[key] = false;
          });
     }

     alert() {
          console.log("alert")
          console.error("alert")
     }

     isKeyPressed(keyCode){ return this.vIsKeyPressed[keyCode] }//is key held down
     isDownClick(keyCode) { return this.vIsDownClick[keyCode]  }//first pressed down
     isUpClick(keyCode)   { return this.vIsUpClick[keyCode]    }///first unpressed

     update() {
          for (let key in this.vIsKeyPressed) {
               this.vIsUpClick[key]   = ( this.vKeyPreviousState[key]) && !this.vIsKeyPressed[key]
               this.vIsDownClick[key] = (!this.vKeyPreviousState[key]) &&  this.vIsKeyPressed[key]     
          
               this.vKeyPreviousState[key] = this.vIsKeyPressed[key]
          }
     }
}