import { createNewInput, createInitInput } from "../modules/createNewClientInput";
import getGameData from "../modules/get-game-data";

export class MenuScene extends Phaser.Scene {
	buttons!: Phaser.GameObjects.Sprite[];
	vorbittens!: Phaser.GameObjects.Image[];
	client_service!: any;
	players_selected!: string[];
	anims_list: string[] = ['player_1', 'player_2', 'player_3', 'player_4'];
	token: string = ''
	constructor() {
		super({
			key: 'MENU',
		});
	}
	init(data: { client: any, token: string}) {
		console.log('init_menu', data);
		this.client_service = data.client;
		this.token = data.token;
	}
	create() {
		this.sound.pauseOnBlur = false;
		this.sound.play('music', { loop: true, volume: 0.7 });


		this.anims.create({
			key: 'player_1',
			frameRate: 10,
			frames: this.anims.generateFrameNames('select', {
				prefix: 'player_1_front_0',
				start: 0,
				end: 4,
			}),
			repeat: -1,
		});
		this.anims.create({
			key: 'player_2',
			frameRate: 10,
			frames: this.anims.generateFrameNames('select', {
				prefix: 'player_2_front_0',
				start: 0,
				end: 4,
			}),
			repeat: -1,
		});
		this.anims.create({
			key: 'player_3',
			frameRate: 10,
			frames: this.anims.generateFrameNames('select', {
				prefix: 'player_3_front_0',
				start: 0,
				end: 4,
			}),
			repeat: -1,
		});
		this.anims.create({
			key: 'player_4',
			frameRate: 10,
			frames: this.anims.generateFrameNames('select', {
				prefix: 'player_4_front_0',
				start: 0,
				end: 4,
			}),
			repeat: -1,
		});

		this.buttons = [
			this.add
				.sprite(this.game.renderer.width / 3, this.game.renderer.height / 2, 'select', 0)
				.setDepth(1)
				.setScale(4),

			this.add
				.sprite(this.game.renderer.width / 2.3, this.game.renderer.height / 2, 'select', 2)
				.setDepth(1)
				.setScale(4),

			this.add
				.sprite(this.game.renderer.width / 1.85, this.game.renderer.height / 2, 'select', 3)
				.setDepth(1)
				.setScale(4),

			this.add
				.sprite(this.game.renderer.width / 1.55, this.game.renderer.height / 2, 'select', 12)
				.setDepth(1)
				.setScale(4),
		];

		this.vorbittens = [
			this.add.image(-100, -100, 'in_use'),
			this.add.image(-100, -100, 'in_use'),
			this.add.image(-100, -100, 'in_use'),
			this.add.image(-100, -100, 'in_use'),
		];

		this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.2, 'header').setDepth(1);

		this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.35, 'select_header').setDepth(1);

		this.add.image(this.game.renderer.width * 0.3, this.game.renderer.height * 0.8, 'ht_play_1').setDepth(1);
		this.add.image(this.game.renderer.width * 0.6, this.game.renderer.height * 0.8, 'ht_play_2').setDepth(1);

		//create audio, disable pauseonblur
		this.buttons.forEach((elem: Phaser.GameObjects.Sprite, index: number) => {
			elem.on('pointerup', () => {
				const id = index + 1;
				console.log('sending data')
				console.log(this.client_service)
				this.client_service.create(createNewInput(id, this.token, localStorage.getItem('game_data'))).then(() => {
					this.scene.start('START', { character_id: id, client_service: this.client_service, token: this.token});
				});
				
			});
		});
	}
	update() {
		const local_data = getGameData()
		if (local_data !== null) {
			this.players_selected = local_data.players_selected
			// sortout used
			const anims = this.anims_list.map((animation) =>
				this.players_selected.find((name) => name === animation) !== undefined ? null : animation
			);
			// enable buttons
			this.buttons.forEach((elem, index) => {
				if (anims[index] !== null) {
					elem.play(anims[index] as string, true).setInteractive();
				} else {
					this.vorbittens[index].setPosition(elem.x, elem.y).setDepth(4);
				}
			});
		}
	}
}
