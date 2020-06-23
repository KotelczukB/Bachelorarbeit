export default interface ISession {
  createdAt: Date,
  session_name: string,
  activ: boolean,
  client_names: string[]
}