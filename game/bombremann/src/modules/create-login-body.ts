import { ILoginState } from "../components/Login/Login";

export default (state: ILoginState) => {
  return {
    user_name: state.user_name,
    password: state.password,
    backend_url: 'localhost:8080'
  }
}