export default interface ISessionCreate {
  name: string;
  client_id: string;
  backendURL: string;
  interval: number;
  client_max: number;
  client_min: number;
}
