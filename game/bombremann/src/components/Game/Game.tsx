import React from 'react';
import './Game.scss';
import { Chat } from '../Chat/Chat';
import { PhaserGame } from '../PhaserGame/PhserGame';
import createGameRtSocket from '../../modules/create-game-rt-socket';
import { ILoginRegisterAnswer } from '../../models/ILoginRegisterAnswer';
import { createInitInput } from '../../modules/create-new-input';

export interface IGameProps {

}

export interface IGameState {
	game_socket: any
	loaded: boolean
}

export class Game extends React.Component<IGameProps, IGameState> {
	client_data: ILoginRegisterAnswer;
	user_id: string;
	constructor(props: Readonly<IGameProps>) {
		super(props);
		this.state = {
			game_socket: undefined,
			loaded: false
		}
		if(!localStorage.getItem('token'))
			(this.props as any).history.push({
				pathname: '/'
			});
		this.client_data = (this.props as any).location.state.detail
	//	console.log(this.client_data)
		this.user_id = this.client_data.user_name;
	}
	
	componentDidMount = async () => {
			await createGameRtSocket(this.client_data).then(socket => { 
				socket.emit( 'create','client-inputs', createInitInput(localStorage.getItem('token')))
				this.setState({game_socket: socket, loaded: true})
			})
	}

	shouldComponentUpdate() {
		return true;
	}

	public render = (): JSX.Element => {
		return (
			this.state.loaded ? <div className="login-overlay">
				<Chat token={this.client_data.token} user_id={this.user_id} client_data={this.client_data}/>
				<PhaserGame token={this.client_data.token} socket={this.state.game_socket}/>
				<div className="attribution-block credits"><a href="http://dig.ccmixter.org/files/destinazione_altrove/53756">Funk Interlude</a> by Dysfunction_AL (c) copyright 2016 Licensed under a Creative Commons <a href="http://creativecommons.org/licenses/by-nc/3.0/">Attribution Noncommercial  (3.0)</a> license. Ft: Fourstones - Scomber ( Bonus Track )</div>
			</div> : <div></div>
		);
	};
}
