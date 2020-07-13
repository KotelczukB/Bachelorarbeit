export class StartScene extends Phaser.Scene {
  client!: any;
  can_start: boolean = false;
  start!: Phaser.GameObjects.Sprite;
  wait!: Phaser.GameObjects.Sprite;
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
		this.sound.play('music', { loop: true, volume: 0.7 });

		this.anims.create({
			key: 'blink',
			repeat: -1,
			frameRate: 8,
			frames: this.anims.generateFrameNames('start', { start: 0, end: 3 }),
    });

    this.anims.create({
			key: 'await',
			repeat: -1,
			frameRate: 5,
			frames: this.anims.generateFrameNames('wait', { start: 0, end: 3 }),
    });
    
		this.start = this.add
			.sprite(this.game.renderer.width * 100, this.game.renderer.height * 100, 'start', 1)
			.setInteractive()
			.on('pointerup', () => {
				this.scene.start('MENU', { client: this.client });
      });
      
      this.wait = this.add
			.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'wait', 1)
			.play('await')
	}
	update() {
		const local_data = "ne" //localStorage.getItem('game_data');
		if (local_data !== null) {
			this.can_start = true//JSON.parse(local_data).game_can_start;
    }
    if(this.can_start) {
      this.wait.destroy();
      this.start.setPosition(this.game.renderer.width / 2, this.game.renderer.height / 2).play('blink', true)
    }
	}
}
