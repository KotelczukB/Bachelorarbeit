export default interface ISession {
  createdAt: Date,
  session_name: string,
  activ: boolean,
  clients: string[]
  backend: string[]
  [idx: string]: any,
}