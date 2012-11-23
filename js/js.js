(function() {

	function getFrequency(note) {
		var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
		var octave;
		if (note.length == 3) {
			octave = note.charAt(2);
		} else {
			octave = note.charAt(1);
		}
		var keyNumber = notes.indexOf(note.slice(0, -1));
		if (keyNumber < 3) {
			keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1; 
		} else {
			keyNumber = keyNumber + ((octave - 1) * 12) + 1; 
		}
		return 440 * Math.pow(2, (keyNumber- 49) / 12);
	};

	function goPlay(song) {
		var tracks = song.tracks;
		var track = tracks[0];
		playNote(0, track);
	}

	function playNote(i, track) {
		var context = new webkitAudioContext();
		var oscillator = context.createOscillator();
		var gainNode = context.createGainNode();
		oscillator.type = 3;
		gainNode.gain.value = 1;
		oscillator.connect(gainNode);
		gainNode.connect(context.destination);

		var note = track[i];
		oscillator.frequency.value = getFrequency(note.n);
		oscillator.noteOn(0);
		oscillator.noteOff(0.35);

		var length = track.length;
		if ( i < (length - 1) ) {
			setTimeout(
				function() {
					playNote(i + 1, track);
				}, 500
			);
		}

		console.log(i + ') '+ note.n + ': ' + getFrequency(note.n));

	}

	function doPlay() {
		var myDiv = document.getElementById('my-song');
		var mySong = myDiv.getAttribute('data-song');
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if ( request.readyState == 4 ) {
				if ( request.status == 200 ) {
					var response = request.response;
					var result = eval(response);
					goPlay(result);
				} else {
					alert(request.status);
				}
			}
		}
		request.open('GET', mySong, true);
		request.send(null); 
	}

	function doStop() {
	}

	function addCLickListener(id, action) {
		document.getElementById(id).addEventListener('click', action, false);	
	}

	function init() {
		addCLickListener('bt-play', doPlay);
		addCLickListener('bt-stop', doStop);
	}

	window.addEventListener('load', init, false);

})();