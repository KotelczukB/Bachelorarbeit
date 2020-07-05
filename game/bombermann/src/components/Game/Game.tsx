import React from "react";

export interface IGameProps {

}

export interface IGameState {

}

export class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: Readonly<IGameProps>) {
    super(props);
    this.state = {

    }
  }

  public render(): JSX.Element {
    return (
      <div></div>
    )
  }

  
}