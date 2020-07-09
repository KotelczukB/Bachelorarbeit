export interface IGameSnapShot {
  serverURL: string;
  game_session_name: string;
  max_session_members: number;
  rt_session: string;
  chars_in_use: number[];
  players: any[];
  all_bullets: any[];
  game_running: boolean;
}
