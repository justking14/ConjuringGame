function lerp(start, end, t) {
     return start * (1 - t) + end * t;
}




class Vector {
     constructor(x, y) {
          this.x = x || 0;
          this.y = y || 0;
     }

     //Setters
     setX(x) { this.x = x }
     setY(y) { this.y = y }
     setXY(x, y) { this.x = x; this.y = y }
     copy(otherV) { this.x = otherV.x; this.y = otherV.y }
     
     //Modifiers
     static add(v1, v2) { return new Vector(v1.x + v2.x, v1.y + v2.y) }
     add(x, y) {
          if (arguments.length === 1) {
               this.x += x.x;
               this.y += x.y;
          } else if (arguments.length === 2) {
               this.x += x;
               this.y += y;
          }
          return this;
     }

     static sub(v1, v2) { return new Vector(v1.x - v2.x, v1.y - v2.y); }
     sub(x, y) {
          if (arguments.length === 1) {
               this.x -= x.x;
               this.y -= x.y;
          } else if (arguments.length === 2) {
               this.x -= x;
               this.y -= y;
          }
          return this;
     }

     static multiply(v1, v2){return new Vector(v1.x * v2.x, v1.y * v2.y)}
     multiply(v) {
          if (typeof v === 'number') {
               this.x *= v;
               this.y *= v;
          } else {
               this.x *= v.x;
               this.y *= v.y;
          }
          return this;
     }

     static div(v1, v2) { return new Vector(v1.x / v2.x, v1.y / v2.y) }
     div(v) {
          if (typeof v === 'number') {
               this.x /= v;
               this.y /= v;
          } else {
               this.x /= v.x;
               this.y /= v.y;
          }
          return this;
     }

     /*
     jitter(a, b) {
          var v = new Vector(a, b);
          this.x += normalizedRandom() * v.x;
          this.y += normalizedRandom() * v.y;
          return this;
     }*/
     jitter(amount) {

          //this.x += (Math.random() * amount * 2) - amount
          this.y += (Math.random() * amount) - amount/2

     }

     //Getters
     magnitude() { return Math.sqrt(this.x * this.x + this.y * this.y); }
     normalize() {
          let m = this.magnitude();
          if (m > 0) {this.div(m);}
          return this;
     }
     distance(otherV) {
          let dx = this.x - otherV.x;
          let dy = this.y - otherV.y;
          return Math.sqrt(dx * dx + dy * dy);
     }

     static getNormalizedDirection(v1, v2) {
          // Calculate the difference in coordinates
          const dx = v2.x - v1.x;
          const dy = v2.y - v1.y;

          // Calculate the length of the vector
          const length = Math.sqrt(dx * dx + dy * dy);

          // Calculate the normalized vector components
          const normalizedX = dx / length;
          const normalizedY = dy / length;

          return new Vector(normalizedX, normalizedY);
     }

     static getDirection(v1, v2) {
          // Calculate the difference in coordinates
          const dx = v2.x - v1.x;
          const dy = v2.y - v1.y;

          

          return new Vector(dx, dy);
     }

}
