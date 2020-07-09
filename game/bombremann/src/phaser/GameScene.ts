import { Scene } from 'phaser';
import { players_data } from './CST';
import { CharacterSprite } from '../models/CharacterSprite';
import { BulletSprite } from '../models/BulletSprite';
import send_update from '../modules/send-update';
import startNewGame from '../modules/start-new-game';
import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import { IPlayerData } from '../models/player-models';

export default class GameScene extends Scene {
	keyboard!: { [idx: string]: Phaser.Input.Keyboard.Key };
	characters: CharacterSprite[] = [];
	bullets: BulletSprite[] = [];
	player!: CharacterSprite;
	follower!: CharacterSprite;
	follower_pic_1!: Phaser.GameObjects.Image;
	follower_pic_2!: Phaser.GameObjects.Image;
	char_id!: number;
	gui_hearts: Phaser.GameObjects.Image[] = [];
	won: boolean = false;
	app:any = (feathers as any)();
	connected: boolean = false;
	player_data: IPlayerData[] = players_data;

	constructor() {
		super({
			key: 'GAME',
		});
		this.characters = [];
		this.bullets = [];
		this.gui_hearts = [];
		const socket = io(localStorage.getItem('rt_game_connection') ?? ''); /*'http://localhost:3030'*/

		this.app.configure(feathers.socketio(socket));
		this.app.configure(feathers.authentication());
		try {
			// this.app.service('client-inputs').create({
			// 	data: { client_input: null }, // 'Say hello and send selected player',
			// });
			this.connected = true;
		} catch (error) {
			console.log(error);
		}
		// Phaser do not proviedes somethig else to write in input in same document
		const chat_input = document.getElementById('_chat');
		if (chat_input) {
			chat_input.addEventListener("mouseover", () => {
				this.input.keyboard.keys.forEach(elem => elem.reset())
				this.input.keyboard.disableGlobalCapture()
				this.input.keyboard.enabled = false;
				if(this.player)
				this.player.setVelocity(0,0)
			});
			chat_input.addEventListener("mouseout", () => {
				this.input.keyboard.enableGlobalCapture()
				this.input.keyboard.enabled = true;
			});
		}
	}

	// Feathers communication
	/**************************************** */
	updateGameState_io = () => {
		// this.app.service('client-inputs').on('created', (data: any) => {
		// 	// update Game state
		// });
	};

	sendUpdateGameState_io = () => {
		// this.app.service('client-inputs').create({
		// 	data: {client_input: null} // 'Send new awesome stuff !only own stuff',
		// });
	};
	/***************************************** */

	init(data: { character_id: number , app: any}) {
		console.log('init', data);
		this.char_id = data.character_id;
	}
	preload() {
		// create animation for all player
		this.player_data.forEach((player) =>
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
		this.player_data.forEach((player) =>
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
			map.createStaticLayer('obstacles', [objects, basic], 0, 0).setDepth(2),
			map.createStaticLayer('decorations', [objects, basic, walls], 0, 0).setDepth(3),
			map.createStaticLayer('roof', [walls, basic, streets], 0, 0).setDepth(5),
		];

		// player map Objects always [0] becouse in tiled I made 4 Objects for every player .. there cannot be more
		const playerPos = [
			map.getObjectLayer('player_1')['objects'][0],
			map.getObjectLayer('player_2')['objects'][0],
			map.getObjectLayer('player_3')['objects'][0],
			map.getObjectLayer('player_4')['objects'][0],
		];
		// setting Player & Chars
		this.player_data.forEach((character) => {
			const position = playerPos.find((elem: any) => elem.id === character.id);
			this.characters.push(
				new CharacterSprite(
					this,
					character.id,
					position ? (position.x as number) : character.start.x,
					position ? (position.y as number) : character.start.y,
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

		// other player agains bullet
		this.physics.world.addCollider(this.characters, this.bullets, (enemie, bullet) => {
			if (
				(bullet as BulletSprite).state === 1 &&
				(bullet as BulletSprite).owner_id !== (enemie as CharacterSprite).id
			) {
				console.log(`${(bullet as BulletSprite).damage} HIT`);
				(enemie as CharacterSprite).hp = (enemie as CharacterSprite).hp - (bullet as BulletSprite).damage;
				(bullet as BulletSprite).destroyOnCollision();
				// kill char
				if ((enemie as CharacterSprite).hp < 1) {
					(enemie as CharacterSprite)
						.play((enemie as CharacterSprite).anima.head.name)
						.setSize(0.1, 0.1)
						.setPosition((enemie as CharacterSprite).body.x, (enemie as CharacterSprite).body.y + 15);
				}
			}
		});
		// player against bullet
		this.physics.world.addCollider(this.bullets, this.player, (bullet, player) => {
			if (
				(bullet as BulletSprite).owner_id !== (player as CharacterSprite).id &&
				(bullet as BulletSprite).state === 1
			) {
				debugger;
				console.log(`${(bullet as BulletSprite).damage} Player HIT`);
				(player as CharacterSprite).hp = (player as CharacterSprite).hp - (bullet as BulletSprite).damage;
				(bullet as BulletSprite).destroyOnCollision();
				this.cameras.main.shake(200, 3);
				//remove health hearts
				for (let index = 0; index < (bullet as BulletSprite).damage; index++) {
					this.gui_hearts.pop()?.destroy();
				}
				if (this.player.hp < 1) {
					this.follower =
						this.characters.find((elem) => (elem.id = (bullet as BulletSprite).owner_id)) ??
						(player as CharacterSprite);
					this.updatePlayerState();
				}
			}
		});

		this.physics.world.addCollider(this.player, this.characters, (player, enemie) => {
			(enemie as CharacterSprite).setVelocityX(1);
			(player as CharacterSprite).setVelocityY(1);
		});

		this.cameras.main.startFollow(this.player).zoom = 2.5;

		this.keyboard = this.input.keyboard.addKeys('W, S, A, D, SPACE, G') as {
			[idx: string]: Phaser.Input.Keyboard.Key;
		};

		this.characters.forEach((enemie) => {
			console.log(enemie);
			enemie.play(enemie.anima.up.name);
		});

		// create life
		for (let index = 0; index < this.player.hp; index++) {
			this.gui_hearts.push(this.add.image(0, 0, 'player_health').setDepth(10));
		}

		// Not Connected
		if (!this.connected) this.add.image(this.player.body.x, this.player.body.y, 'in_use').setDepth(10);
	}
	updatePlayerState() {
		this.cameras.main.flash(200);
		this.player.setVelocity(0, 0);
		this.player
			.play(this.player.anima.head.name)
			.setSize(0.1, 0.1)
			.setPosition(this.player.body.x, this.player.body.y + 15);
		// after death set cam follower
		this.cameras.main.startFollow(this.follower);
		this.follower_pic_1 = this.add
			.image(this.follower.body.x, this.follower.body.y - 60, 'player_dead')
			.setDepth(10);
		this.follower_pic_2 = this.add
			.image(this.follower.body.x, this.follower.body.y + 90, 'play_again')
			.setDepth(10)
			.setInteractive()
			.on('pointerup', () => {
				startNewGame();
			});
	}
	update(time: number, delta: number) {

		if (this.connected) {
			this.updateGameState_io();
			// Dead Follower update
			if (this.player.hp < 0) {
				this.follower_pic_1.setPosition(this.follower.body.x, this.follower.body.y - 60);
				this.follower_pic_2.setPosition(this.follower.body.x, this.follower.body.y + 90);
			}
			// Winning
			if (this.characters.filter((char) => char.hp > 0).length < 1 && !this.won) {
				this.add.image(this.player.body.x, this.player.body.y, 'player_win').setDepth(10);
				this.player.setVelocity(0, 0);
				const again_btn = this.add
					.image(this.player.body.x, this.player.body.y + 60, 'play_again')
					.setDepth(10);
				this.won = true;
				again_btn.setInteractive();
				again_btn.on('pointerup', () => {
					startNewGame();
				});
			}
			// delta 16.66666 60fps
			if (this.player.hp > 0 && !this.won && this.input.keyboard.enabled) {
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
			this.sendUpdateGameState_io();
			send_update(this.player, this.bullets);
		}
	}
}
