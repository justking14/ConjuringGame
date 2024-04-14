class Edge{
     constructor(head, tail, index, lineWidth, isShadow) {
          this.head = head;
          this.tail = tail;
          this.lineWidth = lineWidth
          this.isShadow = isShadow;
          this.index = index;

          this.hidden = false
          
          this.touched = false;

          this.touchedBottom = false;
          this.touchedMiddle = false;
          this.touchedTop = false;

          this.fullyTouched = false;

          this.fraction = 0;
          this.color;

          this.gravityApplied = true;

     }

     update() {  
          if (this.gravityApplied === true) {
               this.pos.y += 10
          }
     }

     render(ctx, color) {
          if (this.hidden === true) { return }
          let count = [this.touchedBottom, this.touchedMiddle, this.touchedTop].filter(Boolean).length;
          if (this.fullyTouched === false) {
               /*
               if (count === 1) {
                    this.color = "RGB(50,0,0)"
               } else if (count === 2) {
                    this.color = "RGB(150,0,0)"
               } else if (count === 3) {
                    this.color = "red"
               }
               */
          }
               renderLineFraction(ctx,
                    this.head.pos.x, this.head.pos.y, this.tail.pos.x, this.tail.pos.y,
                    this.fraction, this.lineWidth, this.color || color
               )
          
          if (count !== 0) {
               if(count !== 0){color = "red"}


               let xDiff = this.tail.pos.x - this.head.pos.x;
               let yDiff = this.tail.pos.y - this.head.pos.y;
               
               if (this.touchedBottom === true) {     
                    renderLineFraction(ctx,
                         this.head.pos.x, this.head.pos.y,
                         this.head.pos.x + xDiff / 3, this.head.pos.y + yDiff / 3, 
                         this.fraction, this.lineWidth, color
                    )
               }
               if (this.touchedMiddle === true) {
                    renderLineFraction(ctx,
                         this.head.pos.x + xDiff / 3, this.head.pos.y + yDiff / 3,
                         this.head.pos.x + 2 * xDiff / 3, this.head.pos.y + 2 * yDiff / 3, 
                         this.fraction, this.lineWidth, color
                    )
               }
               if (this.touchedTop === true) {
                    renderLineFraction(ctx,
                         this.head.pos.x + 2 * xDiff / 3, this.head.pos.y + 2 * yDiff / 3,
                         this.tail.pos.x, this.tail.pos.y, 
                         this.fraction, this.lineWidth, color
                    )
               }
          }
          /*
          if (this.hidden === true) { return }
          let count = [this.touchedBottom, this.touchedMiddle, this.touchedTop].filter(Boolean).length;
          if (this.fullyTouched === false) {
               if (count === 1) {
                    this.color = "RGB(50,0,0)"
               } else if (count === 2) {
                    this.color = "RGB(150,0,0)"
               } else if (count === 3) {
                    this.color = "red"
               }
          }
          //if(this.touched === true && this.fullyTouched === false){this.color = "red"}
          renderLineFraction(ctx,
               this.head.pos.x, this.head.pos.y, this.tail.pos.x, this.tail.pos.y,
               this.fraction, this.lineWidth, this.color || color
          )
          */
     }
}