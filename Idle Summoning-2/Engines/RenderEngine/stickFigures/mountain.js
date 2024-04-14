class Mountain extends StickFigure {
     constructor(pos, color, progressCounter, ee) {
          let vectors = {
               1:  { x: 0, y: 200, color: "RGB(220,220,220)" },
               2: { x: 100, y: 150, color: "RGB(220,220,220)"  },
               3: { x: 200, y: 180, color: "RGB(220,220,220)"  },
               4: { x: 300, y: 90, color: "RGB(220,220,220)"  },
               5: { x: 400, y: 160, color: "RGB(220,220,220)"  },
               6: { x: 500, y: 100, color: "RGB(220,220,220)"  },
               7: { x: 600, y: 180, color: "RGB(220,220,220)"  },
               8: { x: 750, y: 70, color: "RGB(220,220,220)"  },
               9: { x: 825, y: 100, color: "RGB(220,220,220)"  },
               10: { x: 900, y: 50, color: "RGB(220,220,220)" },



                           
               11: { x: 0,   y: 300 },
               12: { x: 100, y: 250 },
               13: { x: 200, y: 280 },
               14: { x: 300, y: 190 },
               15: { x: 400, y: 260 },
               16: { x: 500, y: 200 },
               17: { x: 600, y: 280 },
               18: { x: 750, y: 170 },
               19: { x: 825, y: 200 },
               20: { x: 900, y: 150 },
               
               21: { x: -50,   y: 400 },
               22: { x: 50, y: 350 },
               23: { x: 150, y: 380 },
               24: { x: 250, y: 290 },
               25: { x: 350, y: 360 },
               26: { x: 450, y: 300 },
               27: { x: 550, y: 380 },
               28: { x: 700, y: 270 },
               29: { x: 775, y: 300 },
               30: { x: 850, y: 250 },

               31: { x: -100,   y: 500 },
               32: { x: 0, y: 450 },
               33: { x: 100, y: 480 },
               34: { x: 200, y: 390 },
               35: { x: 300, y: 460 },
               36: { x: 400, y: 400 },
               37: { x: 500, y: 480 },
               38: { x: 650, y: 370 },
               39: { x: 725, y: 400 },
               40: { x: 800, y: 350 },

               41: { x: -50,   y: 600 },
               42: { x: 50, y: 550 },
               43: { x: 150, y: 580 },
               44: { x: 250, y: 490 },
               45: { x: 350, y: 560 },
               46: { x: 450, y: 500 },
               47: { x: 550, y: 580 },
               48: { x: 700, y: 470 },
               49: { x: 775, y: 500 },
               50: { x: 850, y: 450 },

               51: { x: 1000, y: 75, color: "RGB(220,220,220)" },
               52: { x: 1100, y: 50, color: "RGB(220,220,220)" },

               53: { x: 1000, y: 200 },
               54: { x: 1100, y: 150 },

          }
          let vectorKeys = Object.keys(vectors);
          //vectorKeys.sort()
          let sticks = []      
          //sticks.push([vectorKeys[10], vectorKeys[51]])
          sticks.push([vectorKeys[9], vectorKeys[50]])
          sticks.push([vectorKeys[50], vectorKeys[51]])
          sticks.push([vectorKeys[19], vectorKeys[50]])


          sticks.push([vectorKeys[19], vectorKeys[52]])
          sticks.push([vectorKeys[52], vectorKeys[53]])
          sticks.push([vectorKeys[29], vectorKeys[52]])

          for (let i = 1; i < 10; i++) {
               sticks.push([vectorKeys[i-1], vectorKeys[i]])
          }
          for (let i = 11; i < 20; i++) {
               sticks.push([vectorKeys[i-1], vectorKeys[i]])
          }
          for (let i = 21; i < 30; i++) {
               sticks.push([vectorKeys[i-1], vectorKeys[i]])
          }
                  
          for (let i = 31; i < 40; i++) {
               sticks.push([vectorKeys[i-1], vectorKeys[i]])
          }
          for (let i = 41; i < 50; i++) {
               sticks.push([vectorKeys[i-1], vectorKeys[i]])
          }

          for (let i = 1; i < 10; i++) {
               sticks.push([vectorKeys[i+10], vectorKeys[i-1]])
          }
          for (let i = 11; i < 20; i++) {
               sticks.push([vectorKeys[i+10], vectorKeys[i-1]])
          }
          for (let i = 21; i < 30; i++) {
               sticks.push([vectorKeys[i+10], vectorKeys[i-1]])
          }
          for (let i = 31; i < 40; i++) {
               sticks.push([vectorKeys[i+10], vectorKeys[i-1]])
          }
          
          
          let body = {
               dots: vectors,
               sticks: sticks,
               movement: { x: 5, y: 65 }
          }

          super(body, color_mountain, ee)
          //this.setShadows()
          //this.dots[this.dots.length - 1].activated = true;
          //this.shadowDots[this.shadowDots.length - 1].activated = true;

          this.dots[20].activated = true;
          this.dots[20].shadow.activated = true

     }

     interpolatePoints(point1, point2, t) {
          const x = point1.x + (point2.x - point1.x) * t;
          const y = point1.y + (point2.y - point1.y) * t;
          return { x, y };
     }

     addInterpolationPoints(vectors, numInterpolations) {
          const vectorKeys = Object.keys(vectors);

          for (let i = 1; i < vectorKeys.length; i++) {
               const startKey = vectorKeys[i - 1];
               const endKey = vectorKeys[i];
               const startPoint = vectors[startKey];
               const endPoint = vectors[endKey];

               // Add interpolation points
               for (let j = 1; j <= numInterpolations; j++) {
                    const t = j / (numInterpolations + 1); // Interpolation parameter
                    const interpolatedPoint = interpolatePoints(startPoint, endPoint, t);
                    vectors[`${startKey}_${j}`] = interpolatedPoint;
               }
          }
     }


}