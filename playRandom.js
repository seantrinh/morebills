function playRandom(e) {
	var sounds = ["artofthedeal.mp3",
				  "beefpeanuts.mp3"]
	var x = Math.floor(Math.random()*(sounds.length + 1)
	sounds[x].play()
}