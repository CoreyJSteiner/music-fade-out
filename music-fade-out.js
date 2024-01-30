function fadeOutPlaylist(playlist){
	if(!playing.playing) return;
	let settingsFadeDuration = game.settings.get('global-playlist-control', 'duration')
	let playingSound = playlist.sounds.filter(s => s.playing).find(_ => true).sound;
	let curVol = playingSound.volume
	if(curVol == 0) return;
	playingSound.fade(0, {
		duration: settingsFadeDuration,
		from: curVol
	})
	return;
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
			game.playlists.filter(p = p.playing.forEach(p => {
				fadeOutPlaylist(p)
			}))
		}
	})
})