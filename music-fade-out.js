function fadeOutPlaylist(playlist){
	if(!playlist.playing) return
	let settingsFadeDuration = game.settings.get('global-playlist-control', 'duration')
	let playingSound = playlist.sounds.filter(s => s.playing).find(_ => true).sound;
	let curVol = playingSound.volume
	if(curVol == 0) return
	playingSound.fade(0, {
		duration: settingsFadeDuration,
		from: curVol
	})
	return
}

function fadeOutPlaying(){
	ui.notifications.info(`Fading all playlists: ${game.settings.get('global-playlist-control', 'duration')}ms`)
	//fade out (volume) for all playing
	game.playlists.filter(p => p.playing).forEach(p => fadeOutPlaylist(p))
	//stop the player for all playlists
	let buffer = game.settings.get('global-playlist-control', 'duration') + 1000
	setTimeout(playlist.stopAll(), buffer)
	ui.notifications.info('Playlists stopped')
}

Hooks.once("setup", async () => {
	game.settings.register('global-playlist-control', 'duration', {
		name: `Playlist Fade Duration`,
		hint: `Global playlist fade duration`,
		scope: "world",
		config: false,
		type: Number,
		default: 5000,
		onChange: value => { }
	})

	game.settings.register('global-playlist-control', 'toggle', {
		name: `Trigger Fade`,
		hint: `Triggers the global playlist fade`,
		scope: "world",
		config: false,
		type: Boolean,
		default: true,
		onChange: value => {
			fadeOutPlaying()
		}
	})

})
