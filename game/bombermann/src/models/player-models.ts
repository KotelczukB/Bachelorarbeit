import { CharacterSprite } from './CharacterSprite';
import { BulletSprite } from './BulletSprite';

export interface IPlayerData {
	id: number;
	sheet_id: string;
	prefix: string;
	count_prefix: string;
	min: number;
	max: number;
	direction: IDirection;
	animations: IPlayerAnimations;
	starting_sprite: string;
	sprite_object: CharacterSprite | null;
	start: { x: number; y: number };
	shot: IShotData;
}

export interface IShotData {
	sheet_id: string;
	prefix: string;
	direction: IDirection;
	animations: {
		fly: { name: string; sheet: string; min: number; max: number };
		impact: { name: string; sheet: string; min: number; max: number };
	};
	starting_sprite: string;
	sprite_object: BulletSprite | null;
}

export interface IPlayerAnimations {
	up: { name: string; sheet: string };
	down: { name: string; sheet: string };
	left: { name: string; sheet: string };
	right: { name: string; sheet: string };
	head: { name: string; sheet: string };
}

export enum IDirection {
	right,
	left,
	up,
	down,
}
