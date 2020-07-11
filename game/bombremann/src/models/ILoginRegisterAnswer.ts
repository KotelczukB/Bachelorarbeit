import { IRTServer } from "./IRTServer";

export interface ILoginRegisterAnswer {
  id: string;
  user_name: string;
  backend_url: string;
  token: string
  rt_servers: IRTServer[];
}