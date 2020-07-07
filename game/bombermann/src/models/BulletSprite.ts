import { IDirection } from './player-models';

export class BulletSprite extends Phaser.Physics.Arcade.Sprite {
	destroy_sprite: string;
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		direction: IDirection,
		fly_sprite: string,
		destroy_sprite: string,
		vel_x: number,
		vel_y: number,
		frame?: string | number
	) {
		super(scene, x + 4, y + 4, texture, frame);
		this.play(fly_sprite).once('animationcomplete', () =>
			this.play(fly_sprite).once('animationcomplete', () =>
				this.play(fly_sprite).once('animationcomplete', () =>
					this.play(destroy_sprite).once('animationcomplete', () => this.destroy())
				)
			)
		);
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);
		this.setScale(1);
		scene.physics.world.enableBody(this);
		this.setImmovable(true);
		this.setVelocityX(vel_x * 1.5);
		this.setVelocityY(vel_y * 1.5);
		this.destroy_sprite = destroy_sprite;
	}

	public animComplete(animation: any, frame: any) {
		if (animation.key === this.destroy_sprite) {
			debugger;
			this.destroy();
		}
	}
}
