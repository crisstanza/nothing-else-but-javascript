(function() {

	function init() {
		var context = new webkitAudioContext();
		var oscillator = context.createOscillator();
		var gainNode = context.createGainNode();
		oscillator.type = 3;
		oscillator.frequency.value = 440;
		gainNode.gain.value = 1;
		oscillator.connect(gainNode);
		gainNode.connect(context.destination);
		oscillator.noteOn(0);
		oscillator.noteOff(1);
	}

	window.addEventListener('load', init, false);	

})();