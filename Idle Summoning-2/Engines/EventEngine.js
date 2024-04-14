/*
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
               if (this.repeatable === true) {
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

class EventEngine {
     constructor() {
          this.events = [];
          this.triggeredArray = []
     }

     addEvent(timeToTrigger, triggeredFunction) {
          const event = new EventItem(timeToTrigger, triggeredFunction);
          this.events.push(event);
          this.scheduleEvent(event);
     }

     scheduleEvent(event) {
          if (event.timeRemaining > 1) {
               event.timeoutId = setTimeout(() => this.handleEventTimeout(event), event.timeRemaining);
          } else {
               this.handleEventTimeout(event);
          }
     }

     handleEventTimeout(event) {
          event.trigger();
          this.events = this.events.filter((e) => e !== event);
          if (event.repeatable === true) {
               //uncomment later, not currently used
               //event.repeat();
               //this.scheduleEvent(event);
          }

          this.triggeredArray.push(event.triggeredFunction)
     }

     pause() {
          console.log('paused');
          this.events.forEach((event) => clearTimeout(event.timeoutId));
     }

     unpause() {
          console.log('unpaused');
          this.events.forEach((event) => this.scheduleEvent(event));
     }

     removeEvents(lostSoul) {
          //console.log(lostSoul, this.events[0].triggeredFunction.actor)
          this.events = this.events.filter((e) => e.triggeredFunction.actor !== lostSoul);
     }
          
     update() {
          if (!this.paused) {
               this.events = this.events.filter((e) => e.state !== "finished");
               this.events = this.events.filter((e) => e.triggeredFunction.actor.putToRest = false);

               //return copy of triggered function array 
               let returnedArray = [...this.triggeredArray]
               this.triggeredArray = []
               this.triggeredArray.length = 0
               return returnedArray
          }
          return []
     }
}
*/

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
               if (this.repeatable === true) {
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

class EventEngine {
     constructor() {
          this.events = [];
          this.triggeredArray = []
     }

     addEvent(timeToTrigger, triggeredFunction) {
          const event = new EventItem(timeToTrigger, triggeredFunction);
          this.events.push(event);
          this.scheduleEvent(event);
     }

     scheduleEvent(event) {
          if (event.timeRemaining > 1) {
               event.timeoutId = setTimeout(() => this.handleEventTimeout(event), event.timeRemaining);
          } else {
               this.handleEventTimeout(event);
          }
     }

     handleEventTimeout(event) {
          event.trigger();
          this.events = this.events.filter((e) => e !== event);
          if (event.repeatable === true) {
               //uncomment later, not currently used
               //event.repeat();
               //this.scheduleEvent(event);
          }

          this.triggeredArray.push(event.triggeredFunction)
     }

     pause() {
          console.log('paused');
          this.events.forEach((event) => clearTimeout(event.timeoutId));
     }

     unpause() {
          console.log('unpaused');
          this.events.forEach((event) => this.scheduleEvent(event));
     }

     removeEvents(lostSoul) {
          //console.log(lostSoul, this.events[0].triggeredFunction.actor)
          this.events = this.events.filter((e) => e.triggeredFunction.actor !== lostSoul);
     }
          
     update() {
          if (!this.paused) {
               this.events = this.events.filter((e) => e.state !== "finished");
               this.events = this.events.filter((e) => e.triggeredFunction.actor.putToRest = false);

               //return copy of triggered function array 
               let returnedArray = [...this.triggeredArray]
               this.triggeredArray = []
               this.triggeredArray.length = 0
               return returnedArray
          }
          return []
     }
}
