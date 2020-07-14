import React from 'react';
import './Game.scss';
import { Chat } from '../Chat/Chat';
import { PhaserGame } from '../PhaserGame/PhserGame';
import createGameRtSocket from '../../modules/create-game-rt-socket';
import { ILoginRegisterAnswer } from '../../models/ILoginRegisterAnswer';

export interface IGameProps {

}

export interface IGameState {}

export class Game extends React.Component<IGameProps, IGameState> {
	game_service: any;
	client_data: ILoginRegisterAnswer;
	user_id: string;
	constructor(props: Readonly<IGameProps>) {
		super(props);
		this.client_data = (this.props as any).location.state.detail
		this.user_id = this.client_data.user_name;
	}
	componentDidMount = async () => {
		if(!this.game_service)
			this.game_service = await createGameRtSocket(this.client_data)
	}

	shouldComponentUpdate() {
		return false;
	}

	public render = (): JSX.Element => {
		return (
			<div className="login-overlay">
				<Chat user_id={this.user_id} client_data={this.client_data}/>
				<PhaserGame client_service={this.game_service}/>
				<div className="attribution-block credits"><a href="http://dig.ccmixter.org/files/destinazione_altrove/53756">Funk Interlude</a> by Dysfunction_AL (c) copyright 2016 Licensed under a Creative Commons <a href="http://creativecommons.org/licenses/by-nc/3.0/">Attribution Noncommercial  (3.0)</a> license. Ft: Fourstones - Scomber ( Bonus Track )</div>
			</div>
		);
	};
}
