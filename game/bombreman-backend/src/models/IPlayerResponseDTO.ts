import { IRTServer } from "./IRTServer";

export interface IPlayerResponseDTO {
  rt_serverURLs: IRTServer[] | null;
  id: string;
  user_name: string;
  token: string;
}