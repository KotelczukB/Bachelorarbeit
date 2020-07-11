import { IRTServer } from "./IRTServer";

export interface IPlayerResponseDTO {
  rt_setUp: IRTServer[] | null;
  user_name: string;
  token: string;
  password: string | null;
  backend_url: string;
  min_players: number;
  max_players: number;
  interval: number;
}