import { IRTServer } from "./IRTServer";

export interface IPlayerResponseDTO {
  rt_setUp: IRTServer[] | null;
  user_name: string;
  token: string;
  min_players: number;
}