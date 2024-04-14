class EventItem {
     constructor(timeRemaining, triggeredFunction, repeatable, repeatCount) {
          this.triggeredFunction = triggeredFunction;
          this.timeRemaining = timeRemaining;

          this.resetTime = this.timeRemaining;//used if repeatable
          this.repeatable = repeatable || false;
          this.repeatCount = repeatCount || Infinity;

          this.state = "ticking";
     }

     update(timeDifference) {
          this.timeRemaining -= timeDifference;
          if (this.timeRemaining <= 0) {
               this.state = "ready";
          }
     }

     trigger() {
          this.state = "finished";

          try {
               if (this.triggeredFunction() === true) {
                    //if a repeatable event, repeat
                    this.repeat();
               }
          } catch (error) {
               console.error('Error executing triggered function:', error);
          }
     }
          
     repeat() {
          this.repeatCount -= 1
          if (this.repeatable && this.repeatCount > 0) {
               this.timeRemaining = this.resetTime
               this.state = "ticking"
          }
     }
}

class EventEngine{
     constructor() {
          this.startTime = 0;
          this.lastTick = Date.now();
          this.paused = false;
          this.events = []
     }
     pause() {
          this.paused = true;
     }
     unpause() {
          //update game clock so timer doesn't keep running
          this.paused = false;
          this.lastTick = Date.now()
     }

     addEvent(timeRemaining, returnedObject) {
          this.events.push(new EventItem(timeRemaining, returnedObject))
     }

     update() {
          let triggeredArray = []

          if (!this.paused) {
               //update each so that each event move closer to the goal
               let timeDifference = (Date.now() - this.lastTick) * 1

               customForEach(this.events, (event) => {
                    if (event.state === "ticking") {
                         event.update(timeDifference)
                         if (event.state === "ready") {
                              triggeredArray.push(event)
                         }
                    }
               })
               
               this.lastTick = Date.now()
          }
          this.events = this.events.filter((event)=>event.state !== "ready")
          return triggeredArray
     }
}

