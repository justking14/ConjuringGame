class AlphanumericEntity extends Puppet {
     constructor(x,y, color, size, activeLetters) {
          super({ dots: {}, sticks: [], movement: { x: 0, y: 0 } }, color || "black")
          this.size = 5;
          this.radius = dotSize
                    
          this.x = x;
          this.y = y;

          this.color = color;
                    
          this.lastString = ""
          this.letterArray = []

          this.activeLetters = activeLetters
     }

     activateLetters() {
          customForEach(this.letterArray, (letter) => {
               customForEach(letter.nodes, (dot) => {
                    dot.activated = true;
                    dot.activatedFraction = 1.0;
                    customForEach(dot.edges, (edge) => {
                         edge.fraction = 1.0
                    })
               })
          })
     }
     
     render(ctx, newString, endgame) {
          //ensures that it doesn't reset every frame
          if (newString !== this.lastString || this.size !== this.lastSize) {
               this.lastSize = this.size
               this.lastString = newString
               for (let i of this.letterArray) {
                    i.putToRest = true;
                    ee.removeEvents(i)
                    //i.destroy()
               }
               this.letterArray.length = 0;
          
               let letterCount = 0;
               console.log(newString)
               for (let i of newString) {
                    let newLetter = new Puppet({ dots: {}, sticks: [], movement: { x: 0, y: 0 } }, this.color)
                    newLetter.activatedFraction = 1.0//0.1
                    newLetter.activated = true;
                    let letterFramework = alphanumericLibrary[i]

                    //add dots
                    //console.log(letterFramework, i)
                    for (const dot in letterFramework.dots) {
                         let obj = letterFramework.dots[dot]//get properties related to dot
                         newLetter.addNode(dot, obj.x * this.size, obj.y * this.size,
                              obj.type || "none", obj.radius || dotSize - 1, obj.locked || false)
                    }
                    if (i === "!") {
                         newLetter.nodes.forEach((dot) => {
                              dot.activated = true;
                              dot.activatedFraction = 1.0
                              dot.edges.forEach((edge) => {
                                   edge.fraction = 1.0
                              })
                         })
                    }

                    //add sticks connecting dots
                    customForEach(letterFramework.sticks, (edge) => {
                         let head = newLetter.getDot(edge[0])
                         head.attachEdge(newLetter.getDot(edge[1]), 0, 10)
                         //console.log(head, newLetter.getDot(edge[1]))
                    })

                    //move to selected position
                    newLetter.moveElements(this.x + letterCount * (6 * this.size), this.y)

                    if (newLetter.nodes.length !== 0) {
                         //ee.addEvent(1, { actor: newLetter, type: "startDot" })
                    }

                    letterCount += 1
                    this.letterArray.push(newLetter)
               }
          }

          //if (this.activeLetters === true && this.letterArray.length !== 0) {
            //   this.activeLetters = false
               this.activateLetters()
          //}
          
          //render shadows
          customForEach(this.letterArray, (letter) => {
               //letter.sortEdges(ctx, true, "Black")
               //letter.sortEdges(ctx, false, this.color)
               letter.updateFigure(endgame)

               let allEdges = letter.getAllEdges(false)
               //console.log(letter, allEdges)
                    allEdges.sort((a, b) => a.index - b.index)
                    allEdges.forEach(edge => {
                    edge.render(ctx, "white")
               })
          })
     }
}


let alphanumericLibrary = {
     "A": {
          dots: {
               "1a": { x: 2, y: 0 },
               "2a": { x: 0, y: 5 },
               "3a": { x: 4, y: 5 },
               "4a": { x: 0, y: 8 },
               "5a": { x: 4, y: 8 },

          },
          sticks: [["1a", "2a"], ["1a", "3a"], ["3a", "2a"], ["3a", "5a"], ["4a", "2a"],]
     },

     "B": {
          dots: {
               "12b": { x: 0, y: 0},
               "13b": { x: 2, y: 0},
               "14b": { x: 0, y: 4},
               "15b": { x: 2, y: 4},
               "16b": { x: 0, y: 8},
               "17b": { x: 2, y: 8 },
               
               "18b": { x: 4, y: 2 },
               "19b": { x: 4, y: 6 },
          },
          sticks: [["12b", "13b"], ["12b", "14b"],
               ["14b", "15b"], ["14b", "16b"], ["16b", "17b"],
               ["13b", "18b"], ["17b", "19b"],  
               ["15b", "18b"], ["15b", "19b"],  
          ]
     },


     "C": {
          dots: {
               "1c": { x: 0, y: 0 },
               "2c": { x: 4, y: 0 },
               "3c": { x: 0, y: 8 },
               "4c": { x: 4, y: 8 },
          },
          sticks: [["1c", "2c"], ["1c", "3c"], ["3c", "4c"]]
     },

     "D": {
          dots: {
               "1d": { x: 0, y: 0 },
               "2d": { x: 2, y: 0 },
               "3d": { x: 4, y: 4 },
               "4d": { x: 2, y: 8 },
               "5d": { x:  0, y: 8 },
          },
          sticks: [["1d", "2d"], ["2d", "3d"], ["3d", "4d"],["4d", "5d"],["5d", "1d"] ]
     },

     "E": {
          dots: {
               "12e": { x: 0, y: 0},
               "13e": { x: 4, y: 0},
               "14e": { x: 0, y: 4},
               "15e": { x: 2, y: 4},
               "16e": { x: 0, y: 8},
               "17e": { x: 4, y: 8},
          },
          sticks: [["12e", "13e"], ["12e", "14e"], ["14e", "15e"], ["14e", "16e"], ["16e","17e"]]
     },

     "F": {
          dots: {
               "12f": { x: 0, y: 0},
               "13f": { x: 4, y: 0},
               "14f": { x: 0, y: 4},
               "15f": { x: 2, y: 4},
               "16f": { x: 0, y: 8},
          },
          sticks: [["12f", "13f"], ["12f", "14f"], ["14f", "15f"],
          ["14f", "16f"]]
     },

     "G": {
          dots: {
               "1g": { x: 0, y: 0 },
               "2g": { x: 4, y: 0 },
                                        
               "5g": { x: 4, y: 4 },
               "6g": { x: 2, y: 4 },

               "3g": { x: 4, y: 8 },
               "4g": { x: 0, y: 8 },
          },
          sticks: [["1g", "2g"], ["3g", "5g"], ["6g", "5g"], ["3g", "4g"],["4g", "1g"] ]
     },

     "H": {
          dots: {
               "1h": { x: 0, y: 8 },
               "5h": { x: 0, y: 4 },
               "2h": { x: 0, y: 0 },

               "3h": { x: 4, y: 8 },
               "6h": { x: 4, y: 4 },
               "4h": { x: 4, y: 0 },
          },
          sticks: [["1h", "5h"], ["5h", "2h"], ["3h", "6h"],["6h","4h"], ["5h", "6h"]]
     },


     "I": {
          dots: {
               "1i": { x: 0, y: 0 },
               "2i": { x: 2, y: 0 },
               "3i": { x: 4, y: 0 },

               "4i": { x: 2, y: 8 },
               "5i": { x: 0, y: 8 },
               "6i": { x: 4, y: 8 },
          },
          sticks: [["1i", "2i"],["2i", "3i"], ["2i", "4i"],["4i", "5i"],["5i", "6i"] ]
     },

     "J": {
          dots: {
               "1j": { x: 4, y: 0 },
               "3j": { x: 4, y: 8 },
               "4j": { x: 0, y: 8 },
               "5j": { x: 0, y: 4 },

          },
          sticks: [["1j", "3j"], ["3j", "4j"], ["5j", "4j"],  ]
     },

     "K": {
          dots: {
               "1k": { x: 0, y: 0 },
               "2k": { x: 0, y: 4 },
               "3k": { x: 0, y: 8 },
               "4k": { x: 4, y: 8 },
               "5k": { x: 4, y: 0 },
          },
          sticks: [["1k", "2k"], ["2k", "3k"], ["2k", "4k"], ["2k", "5k"]]
     },

     "L": {
          dots: {
               "1l": { x: 0, y: 0 },
               "3l": { x: 0, y: 8 },
               "4l": { x: 4, y: 8 },
          },
          sticks: [["1l", "3l"], ["3l", "4l"]]
     },

     "M": {
          dots: {
               "1m": { x: 0, y: 8 },
               "2m": { x: 0, y: 0 },
               "3m": { x: 4, y: 8 },
               "4m": { x: 4, y: 0 },
               "5m": { x: 2, y: 8 },

          },
          sticks: [["1m", "2m"], ["3m", "4m"], ["2m", "5m"], ["4m","5m"]  ]
     },

     "N": {
          dots: {
               "1nN": { x: 0, y: 8 },
               "2nN": { x: 0, y: 0 },
               "3nN": { x: 4, y: 8 },
               "4nN": { x: 4, y: 0 },
          },
          sticks: [["1nN", "2nN"], ["2nN", "3nN"], ["3nN", "4nN"]]
     },

     "O": {
          dots: {
               "1o": { x: 0, y: 0 },
               "2o": { x: 4, y: 0 },
               "3o": { x: 4, y: 8 },
               "4o": { x: 0, y: 8 },
          },
          sticks: [["1o", "2o"], ["2o", "3o"], ["3o", "4o"],["4o", "1o"] ]
     },
                    
     "P": {
          dots: {
               "12p": { x: 0, y: 0},
               "13p": { x: 4, y: 0},
               "14p": { x: 0, y: 4},
               "15p": { x: 4, y: 4},
               "16p": { x: 0, y: 8},
          },
          sticks: [["12p", "13p"], ["12p", "14p"], ["14p", "15p"], ["14p", "16p"], ["13p","15p"]]
     },
                    
     "Q": {
          dots: {
               "1q": { x: 0, y: 0 },
               "2q": { x: 4, y: 0 },
               "3q": { x: 4, y: 8 },
               "4q": { x: 0, y: 8 },
               "5q": { x: 2, y: 4 },

          },
          sticks: [["1q", "2q"], ["2q", "3q"], ["3q", "4q"],["4q", "1q"], ["3q","5q"]]
     },       
     
     "R": {
          dots: {
               "12r": { x: 0, y: 0},
               "13r": { x: 2, y: 0},
               "14r": { x: 0, y: 4},
               "15r": { x: 2, y: 4},
               "16r": { x: 0, y: 8},
               "17r": { x: 4, y: 8 },
               
               "18r": { x: 4, y: 2 },
               "19r": { x: 4, y: 8 },
          },
          sticks: [["12r", "13r"], ["12r", "14r"],
               ["14r", "15r"], ["14r", "16r"], 
               ["13r", "18r"], ["17r", "19r"],  
               ["15r", "18r"], ["15r", "19r"],  
          ]
     },

     "S": {
          dots: {
               "1s": { x: 0, y: 0 },
               "2s": { x: 4, y: 0 },
               "3s": { x: 0, y: 4 },
               "4s": { x: 4, y: 4 },
               "5s": { x: 4, y: 8 },
               "6s": { x: 0, y: 8 },
          },
          sticks: [["1s", "2s"], ["1s", "3s"], ["3s", "4s"], ["4s", "5s"], ["5s", "6s"]]
     },

     "T": {
          dots: {
               "7t": { x: 0, y: 0},
               "8t": { x: 4, y: 0},
               "9t": { x: 2, y: 0},
               "2t": { x: 2, y: 4},
               "11t": { x: 2, y: 8},
          },
          sticks: [["7t", "8t"], ["8t", "9t"], ["9t", "2t"], ["11t", "2t"]]
     },

     "U": {
          dots: {
               "1u": { x: 0, y: 0 },
               "2u": { x: 4, y: 0 },
               "3u": { x: 4, y: 8 },
               "4u": { x: 0, y: 8 },
          },
          sticks: [ ["2u", "3u"], ["3u", "4u"],["4u", "1u"] ]
     },

     "V": {
          dots: {
               "1v": { x: 0, y: 0 },
               "2v": { x: 4, y: 0 },
               "4v": { x: 2, y: 8 },
          },
          sticks: [ ["1v", "4v"], ["2v", "4v"] ]
     },

     "W": {
          dots: {
               "1w": { x: 0, y: 0 },
               "2w": { x: 1, y: 8 },
               "3w": { x: 2, y: 4 },
               "4w": { x: 3, y: 8 },
               "5w": { x: 4, y: 0 },
          },
          sticks: [["1w", "2w"], ["2w", "3w"], ["3w", "4w"], ["4w","5w"] ]
     },


     "X": {
          dots: {
               "1x": { x: 0, y: 0 },
               "2x": { x: 4, y: 0 },
               "3x": { x: 4, y: 8 },
                    "4x": { x: 0, y: 8 },
               "5x": { x: 2, y: 4 },

          },
          sticks: [["1x", "5x"], ["2x", "5x"], ["3x", "5x"],["4x", "5x"] ]
     },

     "Y": {
          dots: {
               "1y": { x: 0, y: 0 },
                    "2y": { x: 4, y: 0 },
               
               "5y": { x: 2, y: 4 },
               "4y": { x: 2, y: 8 },

          },
          sticks: [["1y", "5y"], ["2y", "5y"], ["4y", "5y"] ]
     },


     "Z": {
          dots: {
               "1z": { x: 0, y: 0 },
               "2z": { x: 4, y: 0 },
               "3z": { x: 4, y: 8 },
               "4z": { x: 0, y: 8 },
          },
          sticks: [["1z", "2z"], ["3z", "4z"], ["2z","4z"] ]
     },


     "!": {
          dots: {
               "1ex": { x: 2, y: 0},
               "2ex": { x: 2, y: 5 },
               "3ex": { x: 2, y: 8 },
               "4ex": { x: 2, y: 8 },
               "5ex": { x: 2, y: 8 },


          },
          sticks: [["2ex", "1ex"], ["3ex", "4ex"], ["5ex", "4ex"]]
     },

     ".": {
          dots: {
               "1pe": { x: 2, y: 8},

          },
          sticks: []
     },

     ":": {
          dots: {
               "1dot": { x: 2, y: 2},
               "2dot": { x: 2, y: 6},
          },
          sticks: [["1dot","2dot"]]
     },
      "-": {
          dots: {
               "1dot": { x: 0, y: 4},
               "2dot": { x: 4, y: 4},
          },
          sticks: [["1dot","2dot"]]
     },

     " ": {
          dots: {},
          sticks: []
     },

        0: {
          dots: {
               "0_1": { x: 0, y: 0 },
               "0_2": { x: 4, y: 0 },
               "0_3": { x: 0, y: 8 },
               "0_4": { x: 4, y: 8 },
          },
          sticks: [["0_1","0_2"],["0_1","0_3"],["0_1","0_4"],["0_3","0_4"], ["0_2","0_4"]]
     },
     1: {
          dots: {
               "1_1": { x: 0, y: 8 },
               "1_2": { x: 2, y: 8 },
               "1_3": { x: 4, y: 8 },
               "1_4": { x: 2, y: 0 },
               "1_5": { x: 0, y: 4 },

          },
          sticks: [["1_1","1_3"],["1_1","1_2"],["1_4","1_2"],["1_4","1_5"]]
     },
     2: {
          dots: {
               "2_1": { x: 0, y: 0 },
               "2_2": { x: 4, y: 0 },
               "2_3": { x: 4, y: 4 },
               "2_4": { x: 0, y: 4 },
               "2_5": { x: 0, y: 8 },
               "2_6": { x: 4, y: 8 },

          },
          sticks: [["2_1","2_2"],["2_2","2_3"],["2_3","2_4"],["2_4","2_5"], ["2_5","2_6"]]
     },
     3: {
          dots: {
               "3_1": { x: 0, y: 0 },
               "3_2": { x: 4, y: 0 },
               "3_3": { x: 4, y: 4 },
               "3_4": { x: 0, y: 4 },
               "3_5": { x:  0, y: 8 },
               "3_6": { x: 4, y: 8 },

          },
          sticks: [["3_1","3_2"],["3_2","3_3"],["3_3","3_4"],["3_3","3_6"], ["3_5","3_6"]]
     },

     4: {
          dots: {
               "4_1": { x: 0, y: 0 },
               "4_2": { x: 0, y: 4 },
               "4_3": { x: 4, y: 4 },
               "4_4": { x: 4, y: 0 },
               "4_5": { x: 4, y: 8 },

          },
          sticks: [["4_1","4_2"],["4_2","4_3"],["4_3","4_4"],["4_4","4_5"]]
     },

     5: {
          dots: {
               "5_1": { x: 0, y: 0 },
               "5_2": { x: 4, y: 0 },
               "5_3": { x: 4, y: 4 },
               "5_4": { x: 0, y: 4 },
               "5_5": { x: 0, y: 8 },
               "5_6": { x: 4, y: 8 },

          },
          sticks: [["5_1","5_2"],["5_1","5_4"],["5_3","5_4"],["5_3","5_6"], ["5_5","5_6"]]
     },

     6: {
          dots: {
               "6_1": { x: 0, y: 0 },
               "6_2": { x: 4, y: 0 },
               "6_3": { x: 4, y: 4 },
               "6_4": { x: 0, y: 4 },
               "6_5": { x: 0, y: 8 },
               "6_6": { x: 4, y: 8 },

          },
          sticks: [["6_1","6_2"],["6_1","6_4"],["6_3","6_4"],["6_3","6_6"], ["6_4","6_5"],["6_5","6_6"]]
     },

     7: {
          dots: {
               "7_1": { x: 0, y: 0 },
               "7_2": { x: 4, y: 0 },
               "7_3": { x: 0, y: 8 },

          },
          sticks: [["7_1","7_2"],["7_2","7_3"]]
     },

     8: {
          dots: {
               "8_1": { x: 0, y: 0 },
               "8_2": { x: 4, y: 0 },
               "8_3": { x: 4, y: 4 },
               "8_4": { x: 0, y: 4 },
               "8_5": { x: 0, y: 8 },
               "8_6": { x: 4, y: 8 },

          },
          sticks: [["8_1","8_2"],["8_1","8_4"],["8_3","8_4"],["8_3","8_6"], ["8_4","8_5"],["8_5","8_6"], ["8_2","8_3"]]
     },

     9: {
          dots: {
               "9_1": { x: 0, y: 0 },
               "9_2": { x: 4, y: 0 },
               "9_3": { x: 4, y: 4 },
               "9_4": { x: 0, y: 4 },
               "9_5": { x: 0, y: 8 },
               "9_6": { x: 4, y: 8 },

          },
          sticks: [["9_1","9_2"],["9_1","9_4"],["9_3","9_4"],["9_3","9_6"],["9_5","9_6"], ["9_2","9_3"]]
     },
}