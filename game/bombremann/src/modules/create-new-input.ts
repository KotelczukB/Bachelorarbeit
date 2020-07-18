import { CharacterSprite } from '../models/CharacterSprite';
import { BulletSprite } from '../models/BulletSprite';
import IClientMessage from '../models/transfer/IClientMessage';
import { IPlayerObject } from '../models/transfer/IPlayerObject';
import { IBulletObject } from '../models/transfer/IBulletObject';

export const createNewGameInput = (
	char_id: number,
	player: CharacterSprite,
	player_bullets: BulletSprite | undefined,
	game_data: any,
	token: string
): IClientMessage => {
	const player_object: IPlayerObject = {
		pos_x: player.body.x,
		pos_y: player.body.y,
		vel_x: player.body.velocity.x,
		vel_y: player.body.velocity.y,
		hp: player.hp,
		name: player.name,
	};
	if (player_bullets) {
		const bullets_objects: IBulletObject = {
			pos_x: player_bullets.body.x,
			pos_y: player_bullets.body.y,
			vel_x: player_bullets.body.velocity.x,
			vel_y: player_bullets.body.velocity.y,
			owner_id: player_bullets.owner_id,
			created_at: player_bullets.created_at,
      id: player_bullets.id,
      sheet_id: player.sheet_id,
      shot_anim_fly: player.shot_anim_fly,
      shot_anim_imp: player.shot_anim_imp,
		};
    console.log('BULLET', player_bullets)
		return {
			...setDefault(token),
			app: {
				player_data: player_object,
				bullets_data: bullets_objects,
				client_selected: `player_${char_id}`,
			},
		};
	} else {
		return {
			...setDefault(token),
			app: {
				player_data: player_object,
				bullets_data: undefined,
				client_selected: `player_${char_id}`,
			},
		};
	}
};

export const createInitInput = (token: string | null): IClientMessage => {
	return {
		...setDefault(token),
		app: {},
	};
};

export const createNewInput = (client_id: number, token: string, game_data: any): IClientMessage => {
	return {
		...setDefault(token),
		app: {
			client_selected: `player_${client_id}`,
		},
	};
};

export const setDefault = (token: string | null): IClientMessage => {
	return {
		id: +new Date(),
		rang: NaN,
		type: 'client',
		created_utc_timestamp: +new Date(),
		sended_utc_timestamp: +new Date(),
		ping: NaN,
		client_id: localStorage.getItem('client_id'),
		session_name: '',
		target_channel_name: '',
		app: null,
		token: token,
	};
};
