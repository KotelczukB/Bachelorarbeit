import getGameData from "../modules/get-game-data";

export class StartScene extends Phaser.Scene {
	socket!: any;
	character_id!: number;
  can_start: boolean = false;
  start!: Phaser.GameObjects.Sprite;
	wait!: Phaser.GameObjects.Sprite;
	token: string = ''
	constructor() {
		super({
			key: 'START',
		});
	}
	init(data: { character_id: number,  socket: any, token: string }) {
		console.log('init_start', data);
		this.socket = data.socket;
		this.character_id = data.character_id;
		this.token = data.token
	}
	create() {

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
				this.scene.start('GAME', { character_id: this.character_id, socket: this.socket, token: this.token});
      });
      
      this.wait = this.add
			.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, 'wait', 1)
			.play('await')
	}
	update() {
		const local_data = getGameData()
		if (local_data !== null) {
			this.can_start = local_data.game_can_start;
    }
    if(this.can_start) {
      this.wait.destroy();
      this.start.setPosition(this.game.renderer.width / 2, this.game.renderer.height / 2).play('blink', true)
    }
	}
}
