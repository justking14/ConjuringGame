class ColorTransition {
     constructor(startHue, startSaturation, startLightness, endHue, endSaturation, endLightness, duration, steps) {
          this.startHue = startHue;
          this.startSaturation = startSaturation;
          this.startLightness = startLightness;
          this.endHue = endHue;
          this.endSaturation = endSaturation;
          this.endLightness = endLightness;
          this.duration = duration;
          this.steps = steps;
          this.step = 0;
          this.interval = null;
     }

     start() {
          // Calculate the HSL values for each step of the animation
          const hStep = (this.endHue - this.startHue) / this.steps;
          const sStep = (this.endSaturation - this.startSaturation) / this.steps;
          const lStep = (this.endLightness - this.startLightness) / this.steps;

          let h = this.startHue;
          let s = this.startSaturation;
          let l = this.startLightness;

          // Update the color with each step of the animation
          this.interval = setInterval(() => {
               // Calculate the current color
               h += hStep;
               s += sStep;
               l += lStep;
               const color = `hsl(${Math.floor(h)}, ${Math.floor(s)}%, ${Math.floor(l)}%)`;

               // Update the UI with the current color
               // For example, set the background color of a div element:
               document.querySelector(".my-div").style.backgroundColor = color;

               this.step++;

               // Stop the animation after the specified duration
               if (this.step >= this.steps) {
                    clearInterval(this.interval);
                    this.interval = null;
                    this.step = 0;
               }
          }, this.duration / this.steps);
     }
}

class colorHSL {
     constructor(H, S, L) {
          this.H = H;
          this.S = S;
          this.L = L;
     }
     setColorFromArray(arr) {
          //console.log(arr)
          this.H = arr[0]
          this.S = arr[1]
          this.L = arr[2]
     }
     getArray() {
          return [this.H, this.S, this.L]
     }
     returnColor() {
          
          let str = `hsl(${Math.floor(this.H)}, ${Math.floor(this.S)}%, ${Math.floor(this.L)}%)`;
          //console.log(this.H)
          return str
     }
     hslToRgb() {
          let r, g, b;
          if(s == 0){
               r = g = b = l; // achromatic
          }else{
               var hue2rgb = function hue2rgb(p, q, t){
                    if(t < 0) t += 1;
                    if(t > 1) t -= 1;
                    if(t < 1/6) return p + (q - p) * 6 * t;
                    if(t < 1/2) return q;
                    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
               }

               var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
               var p = 2 * l - q;
               r = hue2rgb(p, q, h + 1/3);
               g = hue2rgb(p, q, h);
               b = hue2rgb(p, q, h - 1/3);
          }

          return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
     }
}


class colorRGB {
     constructor(r, g, b) {
          this.r = r;
          this.g = g;
          this.b = b;
     }
     setColorFromArray(arr) {
          this.r = arr[0]
          this.g = arr[1]
          this.b = arr[2]
     }
     returnColor() {
          return `rgb(${Math.floor(this.r)}, ${Math.floor(this.g)}, ${Math.floor(this.b)})`;
     }
     rgbToHsl() {
          let r = this.r/255;
          let g = this.g/255;
          let b = this.b/255;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          let h, s, l = (max + min) / 2;

          if (max === min) {
               h = s = 0; // achromatic
          } else {
               const d = max - min;
               s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

               switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
               }

               h *= 60;
          }

          return [h, s, l];
     }
}

function colorAdjuster(colorArray, step, colorIndex, colorSteps) {
     let currentColor = []
     let factor = step / colorSteps
     
     let startColor = colorArray[colorIndex]
     let endColor = colorArray[colorIndex + 1]

     return [
          Math.round(startColor[0] + (endColor[0] - startColor[0]) * factor),
          Math.round(startColor[1] + (endColor[1] - startColor[1]) * factor),
          Math.round(startColor[2] + (endColor[2] - startColor[2]) * factor),
     ];
          //return currentColor
     }
function colorAdjusterSingleDigit(colorArray, step) {
     let currentColor = []
     //let factor = step / colorSteps
     if (step >= 0.9) { step = 0.89 }

     
     const numberString = step.toString();
     const decimalIndex = numberString.indexOf('.') + 1;

     // Extract the digits after the decimal point
     const firstDigit = parseInt(numberString[decimalIndex]);
     const secondDigit = parseInt(numberString[decimalIndex + 1])/10;

     let startColor = colorArray[firstDigit]
     let endColor = colorArray[firstDigit + 1]

     //console.log(firstDigit, secondDigit)
      return [
          Math.round(startColor[0] + (endColor[0] - startColor[0]) * secondDigit),
          Math.round(startColor[1] + (endColor[1] - startColor[1]) * secondDigit),
          Math.round(startColor[2] + (endColor[2] - startColor[2]) * secondDigit),
     ];
          //return currentColor
     }