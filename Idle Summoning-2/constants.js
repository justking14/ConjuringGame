let initialSpeed = 1;
let humanSpeedBuffer = 8;
let humanStepDelay = 5;
let humanAnimationStepAmount = 15;



let blackOutlineTurnedOn = true;

let c_spreadSticks = 0.14;
let c_witherSticks = -0.015;

let dotSize = 8;
let c_lineSize = 14;


          

const c_MAX_SPEED = 10;
const c_MIN_SPEED = 1;

//to do list
//allow rolling ball to roll part-way down before things begin to fall
//add shadow back to boulder
///meter move faster
//player should advance more slowly
//disable meter 
let c_SHADOW_DISTANCE = 6000;


const color_sun = "RGB(253, 184, 19)"
const color_ground_dirt = "RGB(160, 82, 45)"
const color_ground_grass = "RGB(50, 205, 50)"
const color_mountain = "RGB(70, 130, 180)"
const color_person = "RGB(320, 320, 320)"



const c_SUNSET = [
    [135, 206, 235],  // Light Blue Sky
    [135, 206, 250],  // Slightly Lighter Blue Sky
    [130, 197, 255],  // Transition Blue
    [125, 188, 255],  // Transition Blue-Grey
    [120, 179, 255],  // Soft Blue
    [115, 170, 255],  // Soft Blue with a hint of purple
    [252, 176, 69],   // Warm Sunset Yellow
    [252, 166, 77],   // Warm Sunset Orange
    [253, 156, 84],   // Soft Sunset Orange
    [253, 146, 92],   // Brighter Sunset Orange
    [253, 136, 99],   // Sunset Red-Orange
    [253, 126, 106],  // Sunset Red
    [245, 116, 110],  // Soft Sunset Pink
    [237, 106, 114],  // Transition to Purple
    [229, 96, 118],   // Soft Sunset Purple
    [75, 61, 96],     // Deep Sunset Purple
    [50, 50, 90],     // Darker Twilight Blue
    [25, 40, 85],     // Dark Blue Twilight
    [10, 30, 80],     // Deeper Twilight Blue
    [8, 24, 58]       // Deepest Twilight Blue
]

const c_SUNRISE = [...c_SUNSET].reverse()


//to do list
//allow rolling ball to roll part-way down before things begin to fall
//add shadow back to boulder
///meter move faster
//player should advance more slowly
//disable meter 
