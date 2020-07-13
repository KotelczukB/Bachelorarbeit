import { IRTServer } from "./IRTServer";

export interface ILoginRegisterAnswer {
  user_name: string;
  backend_url: string;
  token: string
  rt_servers: IRTServer[];
}