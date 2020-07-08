import React from 'react';
import Phaser from 'phaser';
import LoadScene from '../../phaser/LoadScene';
import './Game.scss';
import GameScene from '../../phaser/GameScene';
import { MenuScene } from '../../phaser/MenuScene';
import { Chat } from '../Chat/Chat';
import { PhaserGame } from '../PhaserGame/PhserGame';

export interface IGameProps {}

export interface IGameState {}

export class Game extends React.Component<IGameProps, IGameState> {
	componentDidMount() {

	}

	shouldComponentUpdate() {
		return false;
	}

	public render = (): JSX.Element => {
		return (
			<div className="login-overlay">
				<Chat user_id={'1'}/>
				<PhaserGame/>
				<div className="attribution-block credits"><a href="http://dig.ccmixter.org/files/destinazione_altrove/53756">Funk Interlude</a> by Dysfunction_AL (c) copyright 2016 Licensed under a Creative Commons <a href="http://creativecommons.org/licenses/by-nc/3.0/">Attribution Noncommercial  (3.0)</a> license. Ft: Fourstones - Scomber ( Bonus Track )</div>
			</div>
		);
	};
}
