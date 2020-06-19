export default interface IUserRequest {
  serverURL: string,
  username: string,
  password: string,
  bearer: string,
  [idx: string]: string
} 