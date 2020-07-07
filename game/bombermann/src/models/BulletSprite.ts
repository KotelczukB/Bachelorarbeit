export class BulletSprite extends Phaser.Physics.Arcade.Sprite {
	destroy_sprite: string;
	owner_id: number;
	state: number;
	damage: number;
	constructor(
		scene: Phaser.Scene,
		owner_id: number,
		x: number,
		y: number,
		texture: string,
		fly_sprite: string,
		destroy_sprite: string,
		vel_x: number,
		vel_y: number,
		frame?: string | number
	) {
		super(scene, x + 13, y + 18, texture, frame);
		this.state = 1;
		this.damage = 1;
		this.destroy_sprite = destroy_sprite;
		this.play(fly_sprite).once('animationcomplete', () => this.explode(2));
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);
		scene.physics.world.enableBody(this);
		this.setCollideWorldBounds(true);
		this.setScale(1.6);
		this.setImmovable(true);
		this.setVelocityX(vel_x * 1.8);
		this.setVelocityY(vel_y * 1.8);
		this.owner_id = owner_id;
		this.setOffset(5, 5);
		this.setCircle(3);
	}

	public destroyOnCollision() {
		if (this.scale !== 2) {
			this.state = -1;
			this.explode(1)
		} else {
			this.state = -1;
		}
	}

	public explode(dmg: number) {
		this.damage = dmg;
		this.setVelocity(0,0);
		this.setCircle(8);
		this.setScale(2);
		this.setOffset(0, 0);
		this.play(this.destroy_sprite).once('animationcomplete', () => {
			this.destroy();
		});
	}
}
