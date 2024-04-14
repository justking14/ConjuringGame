class Node{
     constructor(name, posX, posY, type, radius, locked, color, isShadow) {
          this.name = name;
          this.type = type

          this.pos = new Vector(posX, posY)
          this.resetPos = new Vector(posX, posY)
          this.startPos = new Vector(posX, posY)

          this.radius = radius;
          this.locked = locked || false;
          this.hidden = false
          this.activated = false
          this.color = color || "black"

          this.edges = [];

          this.isShadow = isShadow 
          if (this.isShadow === false) {
               this.shadow = new Node(name, posX, posY, type, radius, locked, "Black", true)
          }

          this.activated = false;
          this.touched = false;
          this.fullyTouched = false
          this.speed = (Math.random() * 10) + 2.5
          this.gravityApplied = false
     }

     attachEdge(tail, index = 0, lineWidth = c_lineSize, isShadow = false) {
          this.edges.push(new Edge(this, tail, index, lineWidth, isShadow))
     }

     update() {
          if (this.gravityApplied === true) {
               this.pos.y += this.speed
          }
     }

     render(ctx, color) {
          if (this.hidden) { return }
          if(this.touched === true && this.fullyTouched === false){this.color = "red"}
          renderCircle(ctx, this.pos.x, this.pos.y, this.radius, this.color || color)
     }
}
