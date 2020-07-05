import React from "react";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

export interface IAuthProps {

}

export interface IAuthState {

}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  constructor(props: Readonly<IAuthProps>) {
    super(props);
    this.state = {

    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <Login/> ?? <Register/>
      </div>
    )
  }

  
}