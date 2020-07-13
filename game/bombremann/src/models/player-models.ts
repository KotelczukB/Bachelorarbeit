import { CharacterSprite } from './CharacterSprite';
import { BulletSprite } from './BulletSprite';

export interface IPlayerData {
	id: number;
	sheet_id: string;
	prefix: string;
	name: string
	count_prefix: string;
	min: number;
	max: number;
	animations: IPlayerAnimations;
	starting_sprite: string;
	sprite_object: CharacterSprite | null;
	start: { x: number; y: number };
	shot: IShotData;
}

export interface IShotData {
	sheet_id: string;
	prefix: string;
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

