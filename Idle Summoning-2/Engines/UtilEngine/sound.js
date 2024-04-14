const audioContext = new (window.AudioContext || window.webkitAudioContext)();


if (typeof AudioWorkletProcessor !== 'undefined') {
  // Your Audio Worklet code here
} else {
  console.error('AudioWorklet API is not supported in this environment.');
}

class PitchShifterWorklet extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage = (event) => {
      if (event.data.pitchShift) {
        this.pitchShift = event.data.pitchShift;
      }
    };
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      for (let i = 0; i < inputChannel.length; i++) {
        const newIndex = Math.floor(i * (1 + this.pitchShift));
        outputChannel[i] = inputChannel[newIndex] || 0;
      }
    }

    return true;
  }
}

registerProcessor('pitch-shifter', PitchShifterWorklet);
