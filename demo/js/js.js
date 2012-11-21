(function() {

	function goPlay(song) {
		var tracks = song.tracks;
		var track = tracks[0];
		var length = track.length;
		for ( var i = 0 ; i < length ; i++ ) {
			var note = track[i];

			console.log(note.n);

		}
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

/*
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
*/