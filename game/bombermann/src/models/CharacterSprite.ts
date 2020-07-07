import { IDirection } from './player-models';

export class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
	hp: number;
	id: number;
	shoot_blocked: number;
	anima: IPlayerAnimations;
	direction: IDirection;
	sheet_id: string;
	shot_anim_fly: string;
	shot_anim_imp: string;

	constructor(
		scene: Phaser.Scene,
		id: number,
		x: number,
		y: number,
		texture: string,
		animations: IPlayerAnimations,
		shot_anim_fly: string,
		shot_anim_imp: string,
		frame?: string | number
	) {
		super(scene, x, y, texture, frame);

		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);
		this.setScale(2);
		scene.physics.world.enableBody(this);
		this.setImmovable(true);
		this.hp = 10;
		this.id = id;
		this.shoot_blocked = 0;
		this.anima = animations;
		this.direction = IDirection.down;
    this.sheet_id = 'player';
    this.shot_anim_fly = shot_anim_fly;
		this.shot_anim_imp = shot_anim_imp;
	}
}

export interface IPlayerAnimations {
	up: { name: string; sheet: string };
	down: { name: string; sheet: string };
	left: { name: string; sheet: string };
	right: { name: string; sheet: string };
}
