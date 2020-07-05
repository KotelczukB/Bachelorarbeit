import React from "react";
import { getAuthToken } from "../../modules/auth-token";

export interface IGameProps {

}

export interface IGameState {

}

export class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: Readonly<IGameProps>) {
    super(props);
    this.state = {

    }
    if(!getAuthToken())
    (this.props as any).history.push('/');
  }

  public render(): JSX.Element {
    return (
      <div></div>
    )
  }

  
}