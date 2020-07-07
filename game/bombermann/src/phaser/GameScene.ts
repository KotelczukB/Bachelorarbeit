import { Scene } from 'phaser';
import { players_data } from './CST';
import { IDirection, IPlayerData } from '../models/player-models';
import { CharacterSprite } from '../models/CharacterSprite';
import { BulletSprite } from '../models/BulletSprite';

export default class GameScene extends Scene {
	keyboard!: { [idx: string]: Phaser.Input.Keyboard.Key };
	enemies: CharacterSprite[] = [];
	bullets: BulletSprite[] = [];
	player!: CharacterSprite;
	char_id: number;

	constructor(character_id: number) {
		super({
			key: 'GAME',
		});
		this.char_id = character_id;
	}
	preload() {
		// create animation for all player
		players_data.forEach((player) =>
			Object.values(player.animations).forEach((value) =>
				this.anims.create({
					key: value.name,
					frameRate: 10,
					frames: this.anims.generateFrameNames(player.sheet_id, {
						prefix: `${player.prefix}${value.sheet}${player.count_prefix}`,
						start: player.min,
						end: player.max,
					}),
					repeat: -1,
				})
			)
		);

		// create anim for Bullets
		players_data.forEach((player) =>
			Object.values(player.shot.animations).forEach((value) =>
				this.anims.create({
					key: value.name,
					frameRate: 10,
					frames: this.anims.generateFrameNames(player.sheet_id, {
						prefix: `${player.shot.prefix}${value.sheet}`,
						start: value.min,
						end: value.max,
					})
				})
			)
		);
	}
	create() {
		// create Map
		const map = this.make.tilemap({ key: 'map' });
		const objects = map.addTilesetImage('objects');
		const grounds = map.addTilesetImage('grounds');
		const streets = map.addTilesetImage('street');
		const walls = map.addTilesetImage('walls');

		// layers
		const layers = [
			map.createStaticLayer('ground', [grounds], 0, 0),
			map.createStaticLayer('street', [streets], 0, 0),
			map.createStaticLayer('walls', [walls], 0, 0),
			map.createStaticLayer('obstacles', [objects], 0, 0),
			map.createStaticLayer('decorations', [objects], 0, 0),
			map.createStaticLayer('roof', [walls], 0, 0),
		];
		// const ground = map.createStaticLayer('ground', [grounds], 0, 0);
		// const street = map.createStaticLayer('street', [streets], 0, 0);
		// const wallses = map.createStaticLayer('walls', [walls], 0, 0);
		// const obstacles = map.createStaticLayer('obstacles', [objects], 0, 0);
		// const decorations = map.createStaticLayer('decorations', [objects], 0, 0);
		// const roof = map.createStaticLayer('roof', [walls], 0, 0);

		// layers collistion

		const playerObj = players_data.filter((elem) => elem.id === 2)[0];
		this.player = new CharacterSprite(
			this,
			2,
			playerObj.start.x,
			playerObj.start.y,
			playerObj.sheet_id,
			playerObj.animations,
			playerObj.shot.animations.fly.name,
			playerObj.shot.animations.impact.name,
			26
		);
		// create Sprite objects for players

		players_data
			.filter((elem) => elem.id !== this.player.id)
			.forEach((enemie) => {
				this.enemies.push(
					new CharacterSprite(
						this,
						enemie.id,
						enemie.start.x,
						enemie.start.y,
						enemie.sheet_id,
            enemie.animations,
            playerObj.shot.animations.fly.name,
            playerObj.shot.animations.impact.name,
						26
					)
				);
			});
		// collision

		layers.forEach((elem) => {
			elem.setCollisionByProperty({ collision: true });
			this.physics.add.collider(this.bullets, elem, function (bullet, obj) {
        
				bullet.destroy();
			});
			this.physics.add.collider(this.player, elem);
		});

		this.physics.add.collider(this.player, this.enemies, function() {

    });

		this.cameras.main.startFollow(this.player).zoom = 3;

		this.keyboard = this.input.keyboard.addKeys('W, S, A, D, B') as { [idx: string]: Phaser.Input.Keyboard.Key };
		this.enemies.forEach((enemie) => {
			enemie.play(enemie.anima.up.name);
		});
	}
	update(time: number, delta: number) {
		// delta 16.66666 60fps
		this.player.shoot_blocked = this.player.shoot_blocked - delta;
		if (this.keyboard.D.isDown === true) {
			this.player.setVelocityX(64);
			this.player.direction = IDirection.right;
		}

		if (this.keyboard.A.isDown === true) {
			this.player.setVelocityX(-64);
			this.player.direction = IDirection.left;
		}

		if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
			this.player.setVelocityX(0);
		}

		if (this.keyboard.W.isDown === true) {
			this.player.setVelocityY(-64);
			this.player.direction = IDirection.up;
		}

		if (this.keyboard.S.isDown === true) {
			this.player.setVelocityY(64);
			this.player.direction = IDirection.down;
		}

		if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
			this.player.setVelocityY(0);
		}

		if (this.keyboard.B.isDown === true && this.player.shoot_blocked < 0) {
			this.player.shoot_blocked = 500;
			this.bullets.push(
				new BulletSprite(
					this,
					this.player.x,
					this.player.y,
					this.player.sheet_id,
					this.player.direction,
					this.player.shot_anim_fly,
          this.player.shot_anim_imp,
          this.player.body.velocity.x,
          this.player.body.velocity.y
				)
			);
		}

		if (this.player.body.velocity.x > 0) {
			//moving right
			this.player.play(this.player.anima.right.name, true);
		} else if (this.player.body.velocity.x < 0) {
			//moving left
			this.player.play(this.player.anima.left.name, true);
		} else if (this.player.body.velocity.y < 0) {
			//moving up
			this.player.play(this.player.anima.up.name, true);
		} else if (this.player.body.velocity.y > 0) {
			//moving down
			this.player.play(this.player.anima.down.name, true);
		}
	}
}
