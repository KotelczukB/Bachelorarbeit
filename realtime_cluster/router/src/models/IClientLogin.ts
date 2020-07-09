export interface IClientLogin {
  id: string;
  user_name: string;
  password: string;
  backend_url: string;
  rt_server_names: { serverURL: string; status: number }[];
}
