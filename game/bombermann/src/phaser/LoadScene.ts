import { Scene } from 'phaser';

export default class LoadScene extends Scene {
	preload() {
    // Map
		this.load.tilemapTiledJSON('map', '/assets/map/level.json');
    this.load.image('objects', '/assets/map/tiledsets/objects.png');
    this.load.image('grounds', '/assets/map/tiledsets/grounds.png');
    this.load.image('street', '/assets/map/tiledsets/street.png');
    this.load.image('walls', '/assets/map/tiledsets/walls.png');
    // Player 1
    //this.load.spritesheet('player_1', '/assets/player/player_1/player.png', {frameHeight: 16, frameWidth: 16});
    this.load.atlas('player','/assets/player/player.png', '/assets/player/player_atlas.json');

    // // Player 2
    // this.load.image('pl_2_front', '/assets/player/player_1/front_2');
    // this.load.image('pl_2_back', '/assets/player/player_1/back_2');
    // this.load.image('pl_2_side', '/assets/player/player_1/side_2');
    // this.load.image('pl_2_head', '/assets/player/player_1/head_2');
    // // Player 3
    // this.load.image('pl_3_front', '/assets/player/player_1/front_3');
    // this.load.image('pl_3_back', '/assets/player/player_1/back_3');
    // this.load.image('pl_3_side', '/assets/player/player_1/side_3');
    // this.load.image('pl_3_head', '/assets/player/player_1/head_3');
    // // Player 4
    // this.load.image('pl_4_front', '/assets/player/player_1/front_4');
    // this.load.image('pl_4_back', '/assets/player/player_1/back_4');
    // this.load.image('pl_4_side', '/assets/player/player_1/side_4');
    // this.load.image('pl_4_head', '/assets/player/player_1/head_4');


    // loading bar
    const loading_bar = this.add.graphics({
      fillStyle: {
        color: 0x999999
      }
    })
    this.load.on("progress", (perc: number) => loading_bar.fillRect(0, (this.game.renderer.height / 2), (this.game.renderer.width * perc), 20 ));


	}
	create() {
		this.scene.start("GAME", {character_id: 1});
	}
}
