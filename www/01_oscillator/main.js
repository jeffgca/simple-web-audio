function animate() {
  requestAnimationFrame(animate);

  analyser.getFloatTimeDomainData(analyserTimeData);
  drawTimeDomainSample(analyserCanvas, analyserTimeData);
}

var audioContext = new AudioContext();
var ouputGain = audioContext.createGain();
ouputGain.connect(audioContext.destination);
ouputGain.gain.value = 0;

// analyzer
var analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
var analyserCanvas = document.querySelector('canvas');
var analyserTimeData = new Float32Array(analyser.frequencyBinCount);
analyser.connect(ouputGain);

// oscillator
var oscillator = audioContext.createOscillator();
oscillator.type = 'sine';
oscillator.connect(analyser);
oscillator.start();
oscillator.frequency.value = 140;
oscillator.detune.value = 43;


var lfo = audioContext.createOscillator();
var lfoGain = audioContext.createGain();
lfoGain.gain.value = 0;
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);
lfo.frequency.value = 10;
lfo.start();

requestAnimationFrame(animate);

