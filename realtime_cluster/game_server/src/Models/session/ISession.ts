export default interface ISession {
  createdAt: Date,
  session_name: string,
  activ: boolean,
  count: number,
  client_names: string[]
}