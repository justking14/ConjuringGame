class Stick {
     constructor(p1, p2, isShadow, index) {
          this.startPoint = p1;
          this.endPoint = p2;
          this.index = index || 0;

          this.stiffness = 2;
          this.color = '#f5476a';

          this.lineWidth = lineSize;
          this.length = this.startPoint.pos.distance(this.endPoint.pos);

          if (isShadow === false) {
               this.shadow = new Stick(p1.shadow, p2.shadow, true)
          }
     }

     update() {
          //don't bother with physics when falling
                    
          if (this.startPoint.state === "beforeTheFall" || this.endPoint.state === "beforeTheFall") { return }

          if (this.startPoint.state === "falling" || this.endPoint.state === "falling") { return }
          if (this.startPoint.state === "resetting" || this.endPoint.state === "resetting") { return }

          // calculate the distance between two dots
          let delta = new Vector(this.endPoint.pos.x, this.endPoint.pos.y)
          let dist = delta.distance(this.startPoint.pos)
          delta.sub(this.startPoint.pos)
          
          // calculate the resting distance between the dots
          let diff = (this.length - dist) / dist * this.stiffness;

          // getting the offset of the dots
          let offset = new Vector(delta.x * diff * 0.5, delta.y * diff * 0.5);

          // calculate mass, might not matter
          let totalMass = this.startPoint.mass + this.endPoint.mass;
          let m2 = this.startPoint.mass / totalMass;
          let m1 = this.endPoint.mass / totalMass;

          // and finally apply the offset with calculated mass
          if (!this.startPoint.pinned) {this.startPoint.pos.sub(offset.multiply(m1))}
          if (!this.endPoint.pinned) {this.endPoint.pos.add(offset.multiply(m2))}
     }

     render(ctx, color, fraction) {
          if (this.startPoint.state === "beforeTheFall" || this.endPoint.state === "beforeTheFall") { return }
          if (this.startPoint.state === "resetting" || this.endPoint.state === "resetting") { return }
          if (this.startPoint.state === "falling" || this.endPoint.state === "falling") { return }
          if (this.startPoint.hidden === true || this.endPoint.hidden === true) { return }
          
          //recolor line to match the connected dot
          if (this.startPoint.color) { color = this.startPoint.color }
          if (this.endPoint.color) { color = this.endPoint.color }
                    
          //pick whichever one is more activated
          fraction = Math.max(this.startPoint.activatedFraction, this.endPoint.activatedFraction)

          //if one is activated, activate both and begin the process of drawing a line from a to b
          if (fraction >= 1) {
               this.startPoint.activated = true;
               this.endPoint.activated = true;
          }

          //if endpoint, is more activated, change start point alpha to match 
          /*
          if (this.endPoint.activatedFraction > this.startPoint.activatedFraction) {
               this.startPoint.activatedFractionAlpha = this.endPoint.activatedFraction
          } else {
               this.endPoint.activatedFractionAlpha = this.startPoint.activatedFraction
          }
          */

          //draw from start to end or end to start, based on which end is more activated
          if (this.startPoint.activatedFraction > this.endPoint.activatedFraction) {
               renderLineFraction(ctx, this.startPoint.pos.x, this.startPoint.pos.y,
                    this.endPoint.pos.x, this.endPoint.pos.y, fraction, this.lineWidth, color
               )
          } else {
               renderLineFraction(ctx, this.endPoint.pos.x, this.endPoint.pos.y,
                    this.startPoint.pos.x, this.startPoint.pos.y, fraction, this.lineWidth, color
               )
          }
     }

     destroy() {

     }
}