class GameObjectBuilder{
     constructor() {
          this.product = new GameObject()
     }

     setName(name) {
          this.product.name = name;
          return this;
     }

     setPos(x, y) {
           if (arguments.length === 1) {
                this.product.pos = new Vector(x.x, x.y)
                this.product.startPos = new Vector(x.x, x.y)
                this.product.resetPos = new Vector(x.x, x.y)
          } else if (arguments.length === 2) {
                this.product.pos = new Vector(x, y)
                this.product.startPos = new Vector(x, y)
                this.product.resetPos = new Vector(x, y)
           }
          return this
     }

     setVel(x, y) {
          if (arguments.length === 1) {
               this.product.vel = new Vector(x.x,x.y)
          } else if (arguments.length === 2) {
               this.product.vel = new Vector(x,y)
          }
          return this
     }

     setColor(color) {
          this.product.color = color
          return this
     }

     setType(type) {
          this.product.type = type || "undefined";
          return this
     }

     setRadius(radius) {
          this.product.radius = radius
          return this
     }

     setMass(mass) {
          this.product.mass = mass
          return this
     }

     build() { return this.product }
}

class GameObject {
     constructor() {
          this.name = "unnamed for his sins";
          this.pos = new Vector(0, 0);
          this.startPos = new Vector(0, 0);
          this.resetPos = new Vector(0, 0);
          this.color = "#e62a4f";
          this.type = "unbound for his crimes"
          this.radius = 10;
          this.mass = 999999999;
          this.vel = new Vector(0, 0);

          this.hidden = false;

          this.activated = false;
          this.activatedFraction = 0.0

          this.offset = new Vector(0,0)
     }
}

// Using the builder pattern to create a Product object
const demoGO = new GameObjectBuilder().setName("Widget").setPos(10,7).setType("Electronics").build();
console.log(demoGO);
