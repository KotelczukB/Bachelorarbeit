export default interface IUser {
  serverURL: string,
  username: string,
  password: string,
  bearer: string,
  [idx: string]: string
} 