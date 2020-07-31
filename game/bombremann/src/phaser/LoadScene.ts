import { Scene } from 'phaser';

export default class LoadScene extends Scene {
  socket!: any
  token: string = ''
  constructor(){
    super({
      key: 'LOAD'
  })
  }

  init(data: {socket: any, token: string}) {
    this.socket = data.socket;
    this.token = data.token;
  }
	preload() {
    // Map
		this.load.tilemapTiledJSON('map', '/assets/map/level.json');
    this.load.image('objects', '/assets/map/tiledsets/objects.png');
    this.load.image('grounds', '/assets/map/tiledsets/grounds.png');
    this.load.image('street', '/assets/map/tiledsets/street.png');
    this.load.image('walls', '/assets/map/tiledsets/walls.png');
    this.load.image('basic', '/assets/map/tiledsets/basic.png');
    
    // Player
    this.load.atlas('player','/assets/player/player.png', '/assets/player/player_atlas.json');

    this.load.image('player_health', '/assets/gui/player_healt.png');
    this.load.image('player_dead', '/assets/gui/dead.png');
    this.load.image('player_win', '/assets/gui/win.png');
    this.load.image('play_again', '/assets/gui/play_again.png');

    // menu imgs
    this.load.spritesheet('start', 'start.png', {frameWidth: 270, frameHeight: 119});
    this.load.spritesheet('wait', 'waiting.png', {frameWidth: 808, frameHeight: 135});
    this.load.atlas('select','assets/player/select/player_select.png', 'assets/player/select/player_select_atlas.json');
		this.load.image('header', 'header_pic.png');
    this.load.image('select_header', 'scene_select.png');
    this.load.image('ht_play_1', 'ht_play_1.png');		
    this.load.image('ht_play_2', 'ht_play_2.png');		
    this.load.image('in_use', 'in_use.png');		

    // loading bar
    const loading_bar = this.add.graphics({
      fillStyle: {
        color: 0x999999
      }
    })
    this.load.on("progress", (perc: number) => loading_bar.fillRect(0, (this.game.renderer.height / 2), (this.game.renderer.width * perc), 20 ));

    
    this.load.audio("music", "assets/music/Funk_Interlude.mp3");

	}
	create() {
		this.scene.start("MENU", {socket: this.socket, token: this.token});
	}
}
