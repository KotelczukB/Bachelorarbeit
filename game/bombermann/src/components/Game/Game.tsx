import React from 'react';
import Phaser from 'phaser';
import LoadScene from '../../phaser/LoadScene';
import './Game.scss';
import GameScene from '../../phaser/GameScene';

export interface IGameProps {}

export interface IGameState {}

export class Game extends React.Component<IGameProps, IGameState> {
	componentDidMount() {
		const game = new Phaser.Game({
			type: Phaser.AUTO,
			width: '100%',
			height: '100%',
			parent: 'phaser-game',
      scene: [LoadScene, GameScene],
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
			</div>
		);
	};
}
