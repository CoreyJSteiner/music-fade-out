const ROLE_GM = 4

async function fadeOutPlaylist(playlist){
	if(!playlist.playing) return
	let settingsFadeDuration = game.settings.get('global-playlist-control', 'duration')
	let playingSound = playlist.sounds.filter(s => s.playing).find(_ => true).sound;
	let curVol = playingSound.volume
	if(curVol == 0) return
	await playingSound.fade(0, {
		duration: settingsFadeDuration,
		from: curVol
	})
	//stop the player for all playlists, function pushes natively to users (unlike fade property)
	if(game.user.role == ROLE_GM){
		playlist.stopAll()
	} 
	return
}

function fadeOutPlaying(){
	// ui.notifications.info(`Fading all playlists: ${game.settings.get('global-playlist-control', 'duration')}ms`)
	//fade outfor all playing
	game.playlists.filter(p => p.playing).forEach(p => fadeOutPlaylist(p))
	// ui.notifications.info('Playlists stopped')
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
