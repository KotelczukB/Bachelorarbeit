import React from 'react';
import Phaser from 'phaser';
import LoadScene from '../../phaser/LoadScene';
import './Game.scss';
import GameScene from '../../phaser/GameScene';
import { MenuScene } from '../../phaser/MenuScene';

export interface IGameProps {}

export interface IGameState {}

export class Game extends React.Component<IGameProps, IGameState> {
	componentDidMount() {
		const game = new Phaser.Game({
			type: Phaser.AUTO,
			width: '100%',
			height: '100%',
			parent: 'phaser-game',
      scene: [LoadScene, MenuScene, GameScene],
      render: {
        pixelArt: true
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: true
        }
      }
		});
	}

	shouldComponentUpdate() {
		return false;
	}

	public render = (): JSX.Element => {
		return (
			<div className="login-overlay">
				<div className="game-container" id="phaser-game" />
				<div className="attribution-block credits"><a href="http://dig.ccmixter.org/files/destinazione_altrove/53756">Funk Interlude</a> by Dysfunction_AL (c) copyright 2016 Licensed under a Creative Commons <a href="http://creativecommons.org/licenses/by-nc/3.0/">Attribution Noncommercial  (3.0)</a> license. Ft: Fourstones - Scomber ( Bonus Track )</div>
			</div>
		);
	};
}
