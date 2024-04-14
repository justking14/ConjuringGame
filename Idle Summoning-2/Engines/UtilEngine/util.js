function customForEach(arr, arrowFunction) {
          arr.forEach((element) => arrowFunction(element))
}
function recreateArrowFunction(arrowFunction, argument){
     return () => arrowFunction(argument);
};

function customObjectForEach(obj, arrowFunction) {
     for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
               arrowFunction(key, obj[key]);
          }
     }
}

function customObjectForEachAndFilter(obj, filter, arrowFunction) {
     if (filter) { obj = Object.filter(obj, filter) }
     for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
               arrowFunction(key, obj[key]);
          }
     }
}

          /*
          customObjectForEachAndFilter(this.figures,
               (figure) => figure.background === false,
               (key, value) => value.entity.updateFigure(false),
          )
               */


function removeNulls(array) {
     return array.filter(Boolean)//removes false, "", null, undefined, 0, etc.
}

//keep value between mix and max 
function constrain(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// * Maps a value from one range to another.
function map(value, start1, stop1, start2, stop2) {
     // Ensure the value is within the current range
     const constrainedValue = constrain(value, start1, stop1);

     // Map the constrained value to the target range
     const mappedValue = ((constrainedValue - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

     return mappedValue;
}

//allows objects to be filtered like arrays
//ex Object.filter(this.figures, figure => figure.background === false)
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce((res, key) => (res[key] = obj[key], res), {});
          


function noise(x, y) {
  const n = x + y * 57;
  const nn = (n << 13) ^ n;
  return (1.0 - ((nn * (nn * nn * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
}
const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

function deleteAllProperties(obj) {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            delete obj[prop];
        }
    }
}
                              
//const audioContext = new (window.AudioContext || window.webkitAudioContext)();


/*
function playSound(url) {
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      audioContext.decodeAudioData(buffer, decodedData => {
        const source = audioContext.createBufferSource();
        source.buffer = decodedData;
        source.connect(audioContext.destination);
        source.start(0);
      });
    });
}
*/

/*
// Check if AudioWorklet is supported
if (window.AudioWorklet) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Load and play multiple sounds with random pitch shift
  function playSound(url) {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        audioContext.decodeAudioData(buffer, decodedData => {
          const source = audioContext.createBufferSource();
          source.buffer = decodedData;

          // Random pitch shift between -0.5 and 0.5
          const pitchShift = Math.random() - 0.5;

          // Create an AudioWorkletNode for pitch shifting
          audioContext.audioWorklet.addModule("/Engines/UtilEngine/sound.js")
            .then(() => {
              const pitchShifterNode = new AudioWorkletNode(audioContext, 'pitch-shifter');
              pitchShifterNode.port.postMessage({ pitchShift });

              // Connect nodes
              source.connect(pitchShifterNode);
              pitchShifterNode.connect(audioContext.destination);

              // Start the sound
              source.start(0);
            });
        });
      });
  }

  // Example usage
  playSound('path/to/sound1.mp3');
  playSound('path/to/sound2.mp3');
} else {
  console.error('AudioWorklet is not supported in this browser.');
}
*/

/*
async function loadAudioWorklet() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  try {
    await audioContext.audioWorklet.addModule('/Engines/UtilEngine/sound.js');
    playSoundWithRandomPitch(audioContext);
  } catch (error) {
    console.error('Error loading audio worklet:', error);
  }
*/


// Initialize the Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a sound with a randomly modified pitch
function playSound(url) {
  // Create an AudioBufferSourceNode
    const source = audioContext.createBufferSource();

  // Fetch and decode the audio file
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer))
    .then(decodedData => {
      // Set the buffer for the AudioBufferSourceNode
      source.buffer = decodedData;

      // Random pitch shift between -0.5 and 0.5
      const pitchShift = Math.random() - 0.5;

      // Create an AudioBufferSourceNode with a custom pitch shifter
      const pitchShifterNode = audioContext.createBufferSource();
      pitchShifterNode.buffer = source.buffer;
      pitchShifterNode.detune.value = pitchShift * 100; // Adjust the detune value for pitch shift

      // Connect nodes
      pitchShifterNode.connect(audioContext.destination);

      // Start playing the sound
      pitchShifterNode.start();

      // Stop the sound and disconnect nodes after it finishes playing
      pitchShifterNode.onended = () => {
        pitchShifterNode.stop();
        pitchShifterNode.disconnect();
        source.disconnect();
      };
    })
    .catch(error => console.error('Error loading or playing sound:', error));
  
}
// Example usage


/*
audioContext.audioWorklet.addModule('/Engines/UtilEngine/sound.js');

function playSound(soundUrl) {
  const audioWorkletNode = new AudioWorkletNode(audioContext, 'pitch-shifter');

  // Example usage: replace with your sound file URL

  fetch(soundUrl)
    .then(response => response.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer))
    .then(decodedData => {
      const source = audioContext.createBufferSource();
      source.buffer = decodedData;

      // Random pitch shift between -0.5 and 0.5
      const pitchShift = Math.random() * 1 - 0.5;

      // Send pitch shift value to the AudioWorkletNode
      audioWorkletNode.port.postMessage({ pitchShift });

      // Connect nodes
      source.connect(audioWorkletNode);
      audioWorkletNode.connect(audioContext.destination);

      // Start the sound
      source.start(0);
    })
    .catch(error => console.error('Error loading or playing sound:', error));
}


*/

function playSoundWav(url) {
    var jump_sound = new Audio(url);
    jump_sound.play();

    jump_sound.onended = function(){
        this.currentSrc = null;
        this.src = "";
        this.srcObject = null;
        this.remove();
    };
}
