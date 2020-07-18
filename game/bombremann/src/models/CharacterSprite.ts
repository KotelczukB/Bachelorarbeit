import { IPlayerAnimations } from './player-models';

export class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
	hp: number;
	id: number;
	shoot_blocked: boolean;
	anima: IPlayerAnimations;
	sheet_id: string;
	shot_anim_fly: string;
	shot_anim_imp: string;
	stamina: number;
	y_heart_offset: number = 130;
	x_heart_offset: number = 200;
	name: string;
	constructor(
		scene: Phaser.Scene,
		name: string,
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
		this.name = name;
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);
		this.setScale(1.6);
		scene.physics.world.enableBody(this);
		this.setImmovable(true);
		this.setSize(6, 8);
		this.setOffset(5, 5);
		this.setCollideWorldBounds(true);
		this.setDepth(2);
		this.hp = 3;
		this.id = id;
		this.shoot_blocked = false;
		this.anima = animations;
		this.sheet_id = 'player';
		this.shot_anim_fly = shot_anim_fly;
		this.shot_anim_imp = shot_anim_imp;
		this.stamina = 300;
	}
}
