import React from 'react';
import './Game.scss';
import { Chat } from '../Chat/Chat';
import { PhaserGame } from '../PhaserGame/PhserGame';
import createGameRtSocket from '../../modules/create-game-rt-socket';
import { ILoginRegisterAnswer } from '../../models/ILoginRegisterAnswer';

export interface IGameProps {

}

export interface IGameState {
	game_service: any
	loaded: boolean
}

export class Game extends React.Component<IGameProps, IGameState> {
	client_data: ILoginRegisterAnswer;
	user_id: string;
	constructor(props: Readonly<IGameProps>) {
		super(props);
		this.state = {
			game_service: undefined,
			loaded: false
		}
		if(!localStorage.getItem('token'))
			(this.props as any).history.push({
				pathname: '/'
			});
		this.client_data = (this.props as any).location.state.detail
		console.log(this.client_data)
		this.user_id = this.client_data.user_name;
	}
	
	componentDidMount = () => {
			createGameRtSocket(this.client_data).then(value => { this.setState({game_service: value, loaded: true})})
	}

	shouldComponentUpdate() {
		return true;
	}

	public render = (): JSX.Element => {
		return (
			this.state.loaded ? <div className="login-overlay">
				{/* <Chat token={this.client_data.token} user_id={this.user_id} client_data={this.client_data}/> */}
				<PhaserGame token={this.client_data.token} client_service={this.state.game_service}/>
				<div className="attribution-block credits"><a href="http://dig.ccmixter.org/files/destinazione_altrove/53756">Funk Interlude</a> by Dysfunction_AL (c) copyright 2016 Licensed under a Creative Commons <a href="http://creativecommons.org/licenses/by-nc/3.0/">Attribution Noncommercial  (3.0)</a> license. Ft: Fourstones - Scomber ( Bonus Track )</div>
			</div> : <div></div>
		);
	};
}
