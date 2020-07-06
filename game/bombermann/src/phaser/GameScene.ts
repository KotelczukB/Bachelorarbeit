import { Scene } from "phaser";
import { players_data } from "./CST";

export default class GameScene extends Scene {
  constructor() {
    super({
      key: "GAME"
    })
  }
	preload() {
    players_data.forEach((player) => 
      Object.values(player.animations).forEach((value) => 
        this.anims.create({
          key: value.name,
          frameRate: 10,
          frames: this.anims.generateFrameNames(player.sheet_id, {
            prefix: `${player.prefix}${value.sheet}${player.count_prefix}`,
            start: player.min,
            end: player.max
          }),
          repeat: -1
        })
      )
    )
	}
	create() {
    // create Map
		const map = this.make.tilemap({key: 'map'}); //
		const objects = map.addTilesetImage('objects'); // set tileset name
		const grounds = map.addTilesetImage('grounds'); // set tileset name
		const streets = map.addTilesetImage('street'); // set tileset name
    const walls = map.addTilesetImage('walls'); // set tileset name

      // layers
    map.createStaticLayer("ground", [grounds], 0, 0)
    map.createStaticLayer("street", [streets], 0, 0)
    map.createStaticLayer("walls", [walls], 0, 0)
    map.createStaticLayer("obstacles", [objects], 0, 0)
    map.createStaticLayer("decorations", [objects], 0, 0) 
    map.createStaticLayer("roof", [walls], 0, 0)

    players_data.forEach((player) => player.sprite_object = this.add.sprite(player.start.x, player.start.y, player.sheet_id, player.starting_sprite).setScale(1.5))

    players_data.forEach((player) => player.sprite_object?.play(player.animations.right.name))
	}
}
