import sendPlayerSelected from "../modules/send-player-selected";

export class MenuScene extends Phaser.Scene {
  buttons!: Phaser.GameObjects.Sprite[]
	constructor() {
		super({
			key: 'MENU',
		});
	}
  init() {}
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
    })
    this.anims.create({
      key: 'player_2',
      frameRate: 10,
      frames: this.anims.generateFrameNames('select', {
        prefix: 'player_2_front_0',
        start: 0,
        end: 4,
      }),
      repeat: -1,
    })
		this.anims.create({
      key: 'player_3',
      frameRate: 10,
      frames: this.anims.generateFrameNames('select', {
        prefix: 'player_3_front_0',
        start: 0,
        end: 4,
      }),
      repeat: -1,
    })
		this.anims.create({
      key: 'player_4',
      frameRate: 10,
      frames: this.anims.generateFrameNames('select', {
        prefix: 'player_4_front_0',
        start: 0,
        end: 4,
      }),
      repeat: -1,
    })
        
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
    
    this.sound.pauseOnBlur = false;
    this.sound.play("music", {loop: true, volume: 0.7})


		this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.2, 'header').setDepth(1);

    this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.35, 'select_header').setDepth(1);

    this.add.image(this.game.renderer.width * 0.30, this.game.renderer.height * 0.8, 'ht_play_1').setDepth(1);
    this.add.image(this.game.renderer.width * 0.60, this.game.renderer.height * 0.8, 'ht_play_2').setDepth(1);
    
    const anims = ['player_1', 'player_2', 'player_3', 'player_4']
    this.buttons.forEach((elem, index) => elem.play(anims[index], true))

		//create audio, disable pauseonblur
		this.buttons.forEach((elem: Phaser.GameObjects.Image, index: number) => {
			elem.setInteractive();
			elem.on('pointerup', () => {
        const id = index + 1;
        sendPlayerSelected(id)
				this.scene.start('GAME', { character_id: id});
			});
		});

		this.sound.pauseOnBlur = false;
		//this.sound.play(CST.AUDIO.TITLE, {loop: true})
	}
}
