export class StartScene extends Phaser.Scene {
  client!: any;
	constructor() {
		super({
			key: 'START',
		});
	}
  init(data: { client: any }) {
    console.log('init_start', data);
    this.client = data.client;
	}
	create() {
    this.sound.pauseOnBlur = false;
    this.sound.play("music", {loop: true, volume: 0.7})

    this.anims.create({
      key: 'blink',
      repeat: -1,
      frameRate: 8,
      frames: this.anims.generateFrameNames('start', {start: 0, end: 3})
    });
    this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'start', 1).play('blink').setInteractive().on('pointerup', () => {
      this.scene.start('MENU', {client: this.client});
    });
	}
}
