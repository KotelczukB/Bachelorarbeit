import React from 'react';
import './Game.scss';
import { Chat } from '../Chat/Chat';
import { PhaserGame } from '../PhaserGame/PhserGame';
import feathers from "@feathersjs/client";
import socketio from '@feathersjs/socketio-client';
import createGameRtSocket from '../../modules/create-game-rt-socket';
import createChatRtSocket from '../../modules/create-chat-rt-socket';

export interface IGameProps {}

export interface IGameState {}

export class Game extends React.Component<IGameProps, IGameState> {
	game_client: any;
	chat_client: any;
	componentDidMount() {
		this.game_client = createGameRtSocket();
		this.chat_client = createChatRtSocket()
	}

	shouldComponentUpdate() {
		return false;
	}

	public render = (): JSX.Element => {
		return (
			<div className="login-overlay">
				<Chat user_id='BartManTroloolo' client={this.chat_client}/>
				<PhaserGame client={this.game_client}/>
				<div className="attribution-block credits"><a href="http://dig.ccmixter.org/files/destinazione_altrove/53756">Funk Interlude</a> by Dysfunction_AL (c) copyright 2016 Licensed under a Creative Commons <a href="http://creativecommons.org/licenses/by-nc/3.0/">Attribution Noncommercial  (3.0)</a> license. Ft: Fourstones - Scomber ( Bonus Track )</div>
			</div>
		);
	};
}
