export class MenuScene extends Phaser.Scene {
	buttons!: Phaser.GameObjects.Sprite[];
	vorbittens!: Phaser.GameObjects.Image[];
	client_service!: any;
	players_selected!: string[];
	anims_list: string[] = ['player_1', 'player_2', 'player_3', 'player_4'];
	constructor() {
		super({
			key: 'MENU',
		});
	}
	init(data: { client: any }) {
		console.log('init_menu', data);
		this.client_service = data.client;
	}
	create() {
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
				const data = "ne"//localStorage.getItem('game_data');
				if (data) {
          // const data_to_send = JSON.parse(data).client.player_selected = id;
					// this.client_service.create(data_to_send);
					this.scene.start('GAME', { character_id: id, client: this.client_service });
				}
			});
		});
	}
	update() {
		const local_data = "ne"//localStorage.getItem('game_data');
		if (local_data !== null) {
			this.players_selected = ['player_1', 'player_2']//JSON.parse(local_data).players_selected;
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
