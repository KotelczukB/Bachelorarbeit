export default interface ISessionCreate {
  name: string;
  client_id: string;
  backend_url: string;
  interval: number;
  client_max: number;
  client_min: number;
}
