import React from "react";

export interface IScoreProps {

}

export interface IScoreState {

}

export class Score extends React.Component<IScoreProps, IScoreState> {
  constructor(props: Readonly<IScoreProps>) {
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