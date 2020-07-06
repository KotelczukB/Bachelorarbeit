export const players_data: IPlayerData[] = [
	{
		sheet_id: 'player',
		prefix: 'player_1_',
		count_prefix: '_0',
		min: 0,
		max: 4,
		animations: {
			left: { name: 'player_1_left', sheet: 'side_left' },
			right: { name: 'player_1_right', sheet: 'side_right' },
			up: { name: 'player_1_up', sheet: 'back' },
			down: { name: 'player_1_down', sheet: 'front' },
		},
		starting_sprite: 'player_1_front_01',
    sprite_object: null,
    start: {x: 100, y: 100}
	},
	{
		sheet_id: 'player',
		prefix: 'player_2_',
		count_prefix: '_0',
		min: 0,
		max: 4,
		animations: {
			left: { name: 'player_2_left', sheet: 'side_left' },
			right: { name: 'player_2_right', sheet: 'side_right' },
			up: { name: 'player_2_up', sheet: 'back' },
			down: { name: 'player_2_down', sheet: 'front' },
		},
		starting_sprite: 'player_2_front_01',
    sprite_object: null,
    start: {x: 150, y: 150}
	},
	{
		sheet_id: 'player',
		prefix: 'player_3_',
		count_prefix: '_0',
		min: 0,
		max: 4,
		animations: {
			left: { name: 'player_3_left', sheet: 'side_left' },
			right: { name: 'player_3_right', sheet: 'side_right' },
			up: { name: 'player_3_up', sheet: 'back' },
			down: { name: 'player_3_down', sheet: 'front' },
		},
		starting_sprite: 'player_3_front_01',
    sprite_object: null,
    start: {x: 200, y: 200}
	},
	{
		sheet_id: 'player',
		prefix: 'player_4_',
		count_prefix: '_0',
		min: 0,
		max: 4,
		animations: {
			left: { name: 'player_4_left', sheet: 'side_left' },
			right: { name: 'player_4_right', sheet: 'side_right' },
			up: { name: 'player_4_up', sheet: 'back' },
			down: { name: 'player_4_down', sheet: 'front' },
		},
		starting_sprite: 'player_4_front_01',
    sprite_object: null,
    start: {x: 250, y: 250}
	},
];

export interface IPlayerData {
	sheet_id: string;
	prefix: string;
	count_prefix: string;
	min: number;
	max: number;
	animations: {
		left: { name: string; sheet: string };
		right: { name: string; sheet: string };
		up: { name: string; sheet: string };
		down: { name: string; sheet: string };
	};
	starting_sprite: string;
  sprite_object: Phaser.GameObjects.Sprite | null;
  start: {x: number, y: number}
}
