import { Scene } from 'phaser';
import { players_data } from './CST';
import { CharacterSprite } from '../models/CharacterSprite';
import { BulletSprite } from '../models/BulletSprite';
import send_update from '../modules/send-update';
import { isObject } from 'util';

export default class GameScene extends Scene {
	keyboard!: { [idx: string]: Phaser.Input.Keyboard.Key };
	characters: CharacterSprite[] = [];
	bullets: BulletSprite[] = [];
	player!: CharacterSprite;
	char_id: number;
	gui_hearts: Phaser.GameObjects.Image[] = [];

	constructor(character_id: number) {
		super({
			key: 'GAME',
		});
		this.char_id = character_id;
	}

	init(data: { character_id: number }) {
		console.log('init', data);
		this.char_id = data.character_id;
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
					}),
					repeat: value.sheet.includes('imp') ? 0 : 5,
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
		const basic = map.addTilesetImage('basic');

		// layers
		const layers = [
			map.createStaticLayer('ground', [grounds, basic], 0, 0),
			map.createStaticLayer('street', [streets, basic], 0, 0),
			map.createStaticLayer('walls', [walls, basic, streets], 0, 0).setDepth(1),
			map.createStaticLayer('obstacles', [objects, basic], 0, 0),
			map.createStaticLayer('decorations', [objects, basic], 0, 0).setDepth(3),
			map.createStaticLayer('roof', [walls, basic, streets], 0, 0).setDepth(5),
		];

		// player map Objects always [0] becouse in tiled I made 4 Objects for every player .. there cannot be more 
		const playerPos = [
			map.getObjectLayer('player_1')['objects'][0],
			map.getObjectLayer('player_2')['objects'][0],
			map.getObjectLayer('player_3')['objects'][0],
			map.getObjectLayer('player_4')['objects'][0],
		]
		// setting Player & Chars
		players_data.forEach((character) => {
			const position = playerPos.find((elem: any) => elem.id === character.id)
			this.characters.push(
				new CharacterSprite(
					this,
					character.id,
					position? (position.x as number) : character.start.x,
					position? (position.y as number) : character.start.y,
					character.sheet_id,
					character.animations,
					character.shot.animations.fly.name,
					character.shot.animations.impact.name,
					26
				)
			);
		});

		this.player = this.characters.find((char) => char.id === this.char_id) as CharacterSprite;
		this.characters = this.characters.filter((char) => char.id !== this.player.id);

		// collision

		layers.forEach((elem) => {
			elem.setCollisionByProperty({ collision: true });
			if (elem.layer.name !== 'street')
				this.physics.add.collider(this.bullets, elem, function (bullet, obj) {
					(bullet as BulletSprite).destroyOnCollision();
				});
			this.physics.add.collider(this.player, elem);
			this.physics.add.collider(this.characters, elem);
		});

		this.physics.world.addCollider(this.characters, this.bullets, (enemie, bullet) => {
			if ((bullet as BulletSprite).state === 1) {
				console.log(`${(bullet as BulletSprite).damage} HIT`);
				(enemie as CharacterSprite).hp = (enemie as CharacterSprite).hp - (bullet as BulletSprite).damage;
				(bullet as BulletSprite).destroyOnCollision();
				// kill char
				if ((enemie as CharacterSprite).hp < 0)
					(enemie as CharacterSprite)
						.play((enemie as CharacterSprite).anima.head.name)
						.setSize(0.1, 0.1)
						.setPosition((enemie as CharacterSprite).body.x, (enemie as CharacterSprite).body.y + 15);
			}
		});

		this.physics.world.addCollider(this.player, this.bullets, (player, bullet) => {
			if (
				(bullet as BulletSprite).owner_id !== (player as CharacterSprite).id &&
				(bullet as BulletSprite).state === 1
			) {
				(player as CharacterSprite).hp--;
				this.gui_hearts.pop()?.destroy();
				this.cameras.main.shake(200, 1);
				this.cameras.main.flash(200);
				// kill player
				if ((player as CharacterSprite).hp < 0) {
					(player as CharacterSprite)
						.play((player as CharacterSprite).anima.head.name)
						.setSize(0.1, 0.1)
						.setPosition((player as CharacterSprite).body.x, (player as CharacterSprite).body.y + 15);
					// drow in middle of camera
					this.add
						.image(this.game.renderer.width / 4, this.game.renderer.height * 0.5, 'player_dead')
						.setDepth(10)
						.setPosition((player as CharacterSprite).body.x, (player as CharacterSprite).body.y);
				}
			}
		});

		this.physics.world.addCollider(this.player, this.characters, (player, enemie) => {
			(enemie as CharacterSprite).setVelocityX(1);
			(player as CharacterSprite).setVelocityY(1);
		});

		this.cameras.main.startFollow(this.player).zoom = 3;

		this.keyboard = this.input.keyboard.addKeys('W, S, A, D, SPACE, G') as {
			[idx: string]: Phaser.Input.Keyboard.Key;
		};
		this.characters.forEach((enemie) => {
			enemie.play(enemie.anima.up.name);
		});

		// create life
		for (let index = 0; index < this.player.hp; index++) {
			this.gui_hearts.push(this.add.image(0, 0, 'player_health').setDepth(10));
		}
	}
	update(time: number, delta: number) {
		// delta 16.66666 60fps
		if (this.player.hp > 0) {
			this.player.shoot_blocked = this.player.shoot_blocked - delta;
			let speed: number = 64;

			if (this.keyboard.G.isDown && this.player.stamina > 0) {
				this.player.stamina = this.player.stamina - 10;
				speed = speed * 2;
			}

			if (this.keyboard.G.isUp && this.player.stamina < 300) {
				this.player.stamina = this.player.stamina + 10;
			}

			if (this.keyboard.D.isDown === true) {
				this.player.setVelocityX(speed);
			}

			if (this.keyboard.A.isDown === true) {
				this.player.setVelocityX(-speed);
			}

			if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
				this.player.setVelocityX(0);
			}

			if (this.keyboard.W.isDown === true) {
				this.player.setVelocityY(-speed);
			}

			if (this.keyboard.S.isDown === true) {
				this.player.setVelocityY(speed);
			}

			if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
				this.player.setVelocityY(0);
			}
			// update life position
			this.gui_hearts.forEach((heart, idx) => {
				if (heart)
					heart.setPosition(
						this.player.body.x - this.game.renderer.width * 0.13 + idx * 32,
						this.player.body.y - this.game.renderer.height * 0.13
					);
			});

			if (this.keyboard.SPACE.isDown === true && this.player.shoot_blocked < 0) {
				this.player.shoot_blocked = 500;
				this.bullets.push(
					new BulletSprite(
						this,
						this.player.id,
						this.player.x,
						this.player.y,
						this.player.sheet_id,
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
			} else if (this.player.body.velocity.y === 0 && this.player.body.velocity.x === 0) {
				//moving down
				this.player.play(this.player.anima.down.name, true);
			}
		}
		// Send Update stuff to server
		send_update(this.player, this.bullets);
	}
}
