//(X,Y) = (cos(theta), sin(theta)), with theta being the angle between the center end circle
//sin and cos are the same wave, but offset by a fourth from one another, cos(0)=1,sin(0)=0
//sin(450) === sin(90), 450-360 = 90
//180 degrees = pi radians, 360 degrees = 2 * pi radians
///tan = slope of line segment between origin and P = sin(theta)/cos(theta)
//tan = length of the portion of tangential line between p and x axis 

function getRadians(deg) { return (deg * Math.PI) / 180 }//tan takes radians
function moveInCircle(radius, rate, time) {
     return new Vector(
          radius * Math.cos(rate * time),
          radius * Math.sin(rate * time),

     )
}

function dampenedSpring(radius, rate, decay, time) {
     //increase decay over time to produce less and less movement with each iteration 
     let speed = 0.5 ^ (decay * time)
     let x = Math.cos(rate * time)
     return s * x * radius

}

function pendulumSwing(radius, rate, time) {
     let baseAngle = getRadians(270)//facing down 
     let halfAngleRange = getRadians(45)//amount it pivots
     let c = Math.cos(rate * time)

     let angle = halfAngleRange * c + baseAngle;
     return new Vector(
          radius * Math.cos(angle),
          -radius * Math.sin(angle)
     )

}

function tanMovement(radius, rate, time) {
     return Math.Tan(rate * time);
     //moves forward from the -x direction, slows down, and then shoots forward in the +x direction
     //affect can be amplified my multiplying tan by itself

}


//velocity += acceleration * deltaTime
//position += velocity * deltaTime
